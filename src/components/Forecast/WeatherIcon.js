import React from 'react';

const WeatherIcon = ({ icon, color }) => (
  <i className={`Forecast__icon wi wi-${icon}`} style={{ color }} />
);

export default WeatherIcon;
