import { createStore } from 'redux';
import app from './app';

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
runTimer(() => actions.weather.getObservations('Kokkola'), 15 * 60000);
runTimer(() => actions.weather.getForecast('Kokkola'), 30 * 60000);

// Trains
actions.trains.getStations();
actions.trains.getCategoryCodes();
runTimer(() => actions.trains.getTimeTables(), 1 * 60000);
