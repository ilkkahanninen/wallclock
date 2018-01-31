/* globals Promise, process */
import Metolib from '@fmidev/metolib';
import { addHours } from 'date-fns';

const FMI_API_KEY = process.env.REACT_APP_FMI_API_KEY;
const URL = `https://data.fmi.fi/fmi-apikey/${FMI_API_KEY}/wfs`;
const OBSERVATION = 'fmi::observations::weather::multipointcoverage';

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
  async getObservations(site) {
    const now = new Date();
    return getData(OBSERVATION, {
      requestParameter: 't,ws',
      begin: addHours(now, -1),
      end: now,
      sites: [site],
    });
  },
};
