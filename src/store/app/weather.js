/* globals Promise, process */
import Metolib from '@fmidev/metolib';
import { addHours } from 'date-fns';
import { lensPath, view, last } from 'ramda';

const FMI_API_KEY = process.env.REACT_APP_FMI_API_KEY;
const OWM_API_KEY = process.env.REACT_APP_OWM_API_KEY;
const URL = `https://data.fmi.fi/fmi-apikey/${FMI_API_KEY}/wfs`;
const OBSERVATION = 'fmi::observations::weather::multipointcoverage';

const dataLens = param =>
  lensPath(['locations', 0, 'data', param, 'timeValuePairs']);
const temperatureLens = dataLens('t');
const windSpeedLens = dataLens('ws');
const getTemperaturePairs = view(temperatureLens);
const getWindSpeedPairs = view(windSpeedLens);

const getData = (query, params) =>
  new Promise((resolve, reject) => {
    const connection = new Metolib.WfsConnection();
    if (connection.connect(URL, OBSERVATION)) {
      connection.getData({
        ...params,
        callback: (data, errors) => {
          connection.disconnect();
          if (data) {
            resolve(data);
          } else {
            reject(errors);
          }
        },
      });
    } else {
      reject('Could not create connection');
    }
  });

export default {
  state: {
    temperature: null,
    windSpeed: null,
    forecast: null,
  },

  actions: {
    async getObservations(site) {
      const now = new Date();
      const observations = await getData(OBSERVATION, {
        requestParameter: 't,ws',
        begin: addHours(now, -1),
        end: now,
        sites: [site],
      });
      this.dispatch('receivedObservations', observations);
    },
    async getForecast(cityId) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${OWM_API_KEY}`,
      );
      const forecast = await response.json();
      this.dispatch('receivedForecast', forecast.list);
    },
  },

  reducers: {
    receivedObservations: (state, observations) => {
      const t = last(getTemperaturePairs(observations));
      const ws = last(getWindSpeedPairs(observations));
      return {
        ...state,
        temperature: t.value,
        windSpeed: ws.value,
      };
    },
    receivedForecast: (state, forecast) => ({
      ...state,
      forecast,
    }),
  },
};
