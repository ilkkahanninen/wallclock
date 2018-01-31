import { getHours } from 'date-fns';
import { pipe, filter, slice, propOr, map, path, head, values } from 'ramda';
import windSpeedText from '../../utils/windName';

const kToC = kelvin => (kelvin != null ? kelvin - 273.15 : null);
const unixTimeToDate = dt => new Date(dt * 1000);

const isDayHour = ({ dt }) => getHours(unixTimeToDate(dt)) > 7;

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

const parsePrecipitation = (type, item) => {
  if (!item[type]) {
    return null;
  }
  const v = values(item[type]);
  return v.length > 0 ? head(v) : 0;
};

const parseItem = item => {
  const code = path(['weather', 0, 'icon'], item);
  const date = unixTimeToDate(item.dt);
  const windSpeed = path(['wind', 'speed'], item) || 0;
  return {
    date: date.toISOString(),
    temperature: Math.round(kToC(path(['main', 'temp'], item))),
    pressure: path(['main', 'pressure'], item),
    humidity: path(['main', 'humidity'], item),
    icon: {
      code,
      weatherIcon: iconMap[code],
      color: getColor(code),
    },
    clouds: path(['clouds', 'all'], item),
    windSpeed,
    windSpeedText: windSpeedText(windSpeed),
    windDirection: path(['wind', 'deg'], item) || 0,
    snow: parsePrecipitation('snow', item),
    rain: parsePrecipitation('rain', item),
  };
};

export default pipe(
  propOr([], 'list'),
  // x => (console.log('list:', x), x),
  filter(isDayHour),
  slice(0, 4),
  map(parseItem),
);
