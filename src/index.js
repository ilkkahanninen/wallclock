import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// Auto updater
const version = process.env.REACT_APP_VERSION;
if (version) {
  console.log('Current version:', version);
  const checkForUpdate = async () => {
    const headers = await fetch('/index.html');
    const response = await headers.text();
    const match = response.match(/<meta name="version" content="(.*?)">/);
    if (match && match[1] !== version) {
      window.location.reload(true);
    }
  };
  setInterval(checkForUpdate, 5 * 60000);
}
