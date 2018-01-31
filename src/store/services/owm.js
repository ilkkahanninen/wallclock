/* global process */

const OWM_API_KEY = process.env.REACT_APP_OWM_API_KEY;

export default {
  async getForecast(cityId) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${OWM_API_KEY}`,
    );
    return response.json();
  },
};
