import { bundle } from 'dwindler';
import Metolib from '@fmidev/metolib';
import { addHours } from 'date-fns';
import { lensPath, view, last } from 'ramda';

const API_KEY = process.env.REACT_APP_FMI_API_KEY;
const URL = `http://data.fmi.fi/fmi-apikey/${API_KEY}/wfs`;
const OBSERVATION = 'fmi::observations::weather::multipointcoverage';
// const FORECAST = 'fmi::forecast::hirlam::surface::point::multipointcoverage';

const dataLens = lensPath(['locations', 0, 'data', 't', 'timeValuePairs']);
const getTimeValuePairs = view(dataLens);

export default bundle({
  name: 'weather',

  state: {
    temperature: null,
    temperatureTime: null,
  },

  actions: {
    getObservations(site) {
      const connection = new Metolib.WfsConnection();
      if (connection.connect(URL, OBSERVATION)) {
        const now = new Date();
        connection.getData({
          requestParameter: 't',
          begin: addHours(now, -1),
          end: now,
          // timestep: 60 * 60 * 1000,
          sites: [site],
          callback: data => {
            if (data) {
              this.dispatch('receivedObservations', data);
            }
            connection.disconnect();
          },
        });
      }
    },
  },

  reducers: {
    receivedObservations: (state, observations) => {
      const pair = last(getTimeValuePairs(observations));
      return pair
        ? {
            ...state,
            temperature: pair.value,
            temperatureTime: new Date(pair.time),
          }
        : state;
    },
  },
});
