import React from 'react';

const dayNightPair = (n, icon) => ({
  [n + 'd']: 'day-' + icon,
  [n + 'n']: 'night-' + icon,
});

const neutralPair = (n, icon) => ({
  [n + 'd']: icon,
  [n + 'n']: icon,
});

const iconMap = {
  '01d': 'day-sunny',
  '01n': 'night-clear',
  ...dayNightPair('02', 'cloudy'),
  ...neutralPair('03', 'cloud'),
  ...neutralPair('04', 'cloudy'),
  ...neutralPair('09', 'rain'),
  ...dayNightPair('10', 'rain'),
  ...neutralPair('11', 'storm-showers'),
  ...neutralPair('13', 'snow'),
  ...neutralPair('50', 'fog'),
};

const getColor = code => {
  switch (code) {
    // Sunny day
    case '01d':
      return '#FFEB3B';
    // Rain
    case '09d':
    case '09n':
    case '10d':
    case '10n':
    case '11d':
    case '11n':
      return '#2196F3';
    // Snow
    case '13d':
    case '13n':
      return 'white';
    // Default
    default:
      return '#90A4AE';
  }
};

const WeatherIcon = ({ icon }) => (
  <i
    className={`Forecast__icon wi wi-${iconMap[icon] || icon}`}
    style={{ color: getColor(icon) }}
  />
);

export default WeatherIcon;
