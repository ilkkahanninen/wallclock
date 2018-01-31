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
  sort,
} from 'ramda';
import { compareAsc } from 'date-fns';

const findTimeTableRow = (station, type) =>
  find(
    row =>
      row.stationShortCode === station &&
      row.type === type &&
      row.actualTime == null,
  );

const findArrival = station => findTimeTableRow(station, 'ARRIVAL');
const findDeparture = station => findTimeTableRow(station, 'DEPARTURE');

const filterPassengerTrains = filter(propEq('trainCategory', 'Long-distance'));

const getCauses = pipe(
  pluck('causes'),
  reject(isEmpty),
  unnest,
  pluck('detailedCategoryCode'),
  uniq,
);

const compareTimetableTimes = (a, b) =>
  compareAsc(a.timetable.scheduledTime, b.timetable.scheduledTime);

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
    sort(compareTimetableTimes),
  );

const getArrivals = station => findTimeTables(findArrival(station));
const getDepartures = station => findTimeTables(findDeparture(station));

export default {
  state: {
    stations: {},
    categoryCodes: {},
    arrivals: [],
    departures: [],
  },

  actions: {
    async getStations() {
      this.dispatch(
        'receivedStations',
        await this.services.digiTraffic.get('/metadata/stations'),
      );
    },
    async getTimeTables(station) {
      const trains = await this.services.digiTraffic.get(
        `/live-trains/station/${station}`,
        {
          minutes_before_departure: 1440,
          minutes_after_departure: 15,
          minutes_before_arrival: 1440,
          minutes_after_arrival: 15,
        },
      );
      this.dispatch('receivedTrains', {
        station,
        trains: filterPassengerTrains(trains),
      });
    },
    async getCategoryCodes() {
      this.dispatch(
        'receivedCatCodes',
        await this.services.digiTraffic.get(
          '/metadata/detailed-cause-category-codes',
        ),
      );
    },
  },

  reducers: {
    receivedStations: (state, stations) => ({
      stations: zipObj(
        pluck('stationShortCode', stations),
        pipe(pluck('stationName'), map(replace(' asema', '')))(stations),
      ),
    }),
    receivedTrains: (state, { station, trains }) => ({
      arrivals: getArrivals(station)(trains),
      departures: getDepartures(station)(trains),
    }),
    receivedCatCodes: (state, codes) => ({
      categoryCodes: zipObj(
        pluck('detailedCategoryCode', codes),
        pluck('detailedCategoryName', codes),
      ),
    }),
  },
};
