import { bundle } from 'dwindler';
import {
  find,
  map,
  pipe,
  filter,
  prop,
  propEq,
  head,
  last,
  zipObj,
  pluck,
  replace,
  reject,
  isEmpty,
  unnest,
  uniq,
} from 'ramda';

const STATION = 'KOK';

const findTimeTableRow = (station, type) =>
  find(
    row =>
      row.stationShortCode === station &&
      row.type === type &&
      row.actualTime == null,
  );

const findArrival = findTimeTableRow(STATION, 'ARRIVAL');
const findDeparture = findTimeTableRow(STATION, 'DEPARTURE');

const filterPassengerTrains = filter(propEq('trainCategory', 'Long-distance'));

const getCauses = pipe(
  pluck('causes'),
  reject(isEmpty),
  unnest,
  pluck('detailedCategoryCode'),
  uniq,
);

const findTimeTables = findFn =>
  pipe(
    map(({ timeTableRows, ...train }) => ({
      ...train,
      timetable: findFn(timeTableRows),
      departureStation: head(timeTableRows).stationShortCode,
      terminus: last(timeTableRows).stationShortCode,
      causes: getCauses(timeTableRows),
    })),
    filter(prop('timetable')),
  );

const getArrivals = findTimeTables(findArrival);
const getDepartures = findTimeTables(findDeparture);

export default bundle({
  name: 'trains',

  state: {
    stations: {},
    categoryCodes: {},
    arrivals: [],
    departures: [],
  },

  actions: {
    async getStations() {
      const response = await fetch(
        'https://rata.digitraffic.fi/api/v1/metadata/stations',
      );
      const stations = await response.json();
      this.dispatch('receivedStations', stations);
    },
    async getTimeTables() {
      const response = await fetch(
        `https://rata.digitraffic.fi/api/v1/live-trains/station/${STATION}?arriving_trains=15&departing_trains=15&include_nonstopping=false`,
      );
      const trains = await response.json();
      this.dispatch('receivedTrains', filterPassengerTrains(trains));
    },
    async getCategoryCodes() {
      const response = await fetch(
        'https://rata.digitraffic.fi/api/v1/metadata/detailed-cause-category-codes',
      );
      const codes = await response.json();
      this.dispatch('receivedCatCodes', codes);
    },
  },

  reducers: {
    receivedStations: (state, stations) => ({
      stations: zipObj(
        pluck('stationShortCode', stations),
        pipe(pluck('stationName'), map(replace(' asema', '')))(stations),
      ),
    }),
    receivedTrains: (state, trains) => ({
      arrivals: getArrivals(trains),
      departures: getDepartures(trains),
    }),
    receivedCatCodes: (state, codes) => ({
      categoryCodes: zipObj(
        pluck('detailedCategoryCode', codes),
        pluck('detailedCategoryName', codes),
      ),
    }),
  },
});
