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
  ...dayNightPair('01', 'sunny'),
  ...dayNightPair('02', 'cloudy'),
  ...neutralPair('03', 'cloud'),
  ...neutralPair('04', 'cloudy'),
  ...neutralPair('09', 'rain'),
  ...dayNightPair('10', 'rain'),
  ...neutralPair('11', 'storm-showers'),
  ...neutralPair('13', 'snow'),
  ...neutralPair('50', 'fog'),
};

const WeatherIcon = ({ icon }) => (
  <i className={`Weather__icon wi wi-${iconMap[icon] || icon}`} />
);

export default WeatherIcon;
