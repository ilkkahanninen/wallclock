import { createStore } from 'redux';
import app from './app';
import config from '../config.json';

export const store = createStore(
  app.reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export const actions = app.getActions(store);

// Init app data sources
const runTimer = (fn, msecs) => {
  fn();
  return setInterval(fn, msecs);
};

// Clock
runTimer(actions.clock.updateTime, 1000);

// Weather
runTimer(
  () => actions.weather.getObservations(config.fmi.site),
  config.fmi.refreshInterval * 60000,
);
runTimer(
  () => actions.weather.getForecast(config.openWeatherMap.cityId),
  config.openWeatherMap.refreshInterval * 60000,
);

// Trains
actions.trains.getStations();
actions.trains.getCategoryCodes();
runTimer(
  () => actions.trains.getTimeTables(config.digiTraffic.station),
  config.digiTraffic.refreshInterval * 60000,
);
