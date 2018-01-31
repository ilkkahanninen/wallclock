import { bundle } from 'dwindler';
import { createStore } from 'redux';
import { endOfMinute, differenceInMilliseconds, getMinutes } from 'date-fns';
import root from './app';
import services from './services';
import config from '../config.json';

const app = bundle(root, { services });

export const store = createStore(
  app.reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export const actions = app.getActions(store);

// Init app data sources
const runTimer = (fn, minutes) => {
  fn();
  const now = new Date();
  const startTime = differenceInMilliseconds(endOfMinute(now), now) + 100;
  const updateIfOk = () => {
    if (!minutes || minutes.includes(getMinutes(new Date()))) {
      fn();
    }
  };
  setTimeout(() => {
    updateIfOk();
    setInterval(updateIfOk, 60000);
  }, startTime);
};

const EVERY_15_MINUTES = [0, 15, 30, 45];

// Clock
runTimer(actions.clock.updateTime);

// Weather
runTimer(
  () => actions.weather.getObservations(config.fmi.site),
  EVERY_15_MINUTES,
);
runTimer(
  () => actions.weather.getForecast(config.openWeatherMap.cityId),
  EVERY_15_MINUTES,
);

// Trains
actions.trains.getStations();
actions.trains.getCategoryCodes();
runTimer(() => actions.trains.getTimeTables(config.digiTraffic.station));

// Calendar
// actions.calendar.loadCalendar(
//   'holidays',
//   'fi.finnish%23holiday%40group.v.calendar.google.com',
// );
