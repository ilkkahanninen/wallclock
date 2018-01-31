import { bundle } from 'dwindler';
import { createStore } from 'redux';
import root from './app';
import services from './services';
import cron from './cron';

const app = bundle(root, { services });

export const store = createStore(
  app.reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export const actions = app.getActions(store);

cron(actions);
