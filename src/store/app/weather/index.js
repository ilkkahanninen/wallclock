import parseObservations from './parseObservations';
import parseForecast from './parseForecast';

export default {
  state: {
    temperature: null,
    windSpeed: null,
    windSpeedText: null,
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
        parseForecast(await this.services.owm.getForecast(cityId)),
      );
    },
  },

  reducers: {
    receivedObservations: (state, observations) => ({
      ...state,
      ...parseObservations(observations),
    }),
    receivedForecast: (state, forecast) => ({
      ...state,
      forecast,
    }),
  },
};
