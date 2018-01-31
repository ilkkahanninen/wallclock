import { lensPath, view, last } from 'ramda';

const dataLens = param =>
  lensPath(['locations', 0, 'data', param, 'timeValuePairs']);
const temperatureLens = dataLens('t');
const windSpeedLens = dataLens('ws');
const getTemperaturePairs = view(temperatureLens);
const getWindSpeedPairs = view(windSpeedLens);

export default {
  state: {
    temperature: null,
    windSpeed: null,
    forecast: null,
  },

  actions: {
    async getObservations(site) {
      this.dispatch(
        'receivedObservations',
        await this.services.fmi.getObservations(site),
      );
    },
    async getForecast(cityId) {
      this.dispatch(
        'receivedForecast',
        await this.services.owm.getForecast(cityId),
      );
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
