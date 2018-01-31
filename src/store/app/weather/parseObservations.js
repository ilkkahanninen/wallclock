import { lensPath, view, last, prop, pipe } from 'ramda';
import windName from '../../utils/windName';

const dataLens = param =>
  lensPath(['locations', 0, 'data', param, 'timeValuePairs']);
const temperatureLens = dataLens('t');
const windSpeedLens = dataLens('ws');
const getValue = lens => pipe(view(lens), last, prop('value'));

const getTemperature = getValue(temperatureLens);
const getWindSpeed = getValue(windSpeedLens);

export default observations => {
  const windSpeed = getWindSpeed(observations);
  return {
    temperature: getTemperature(observations),
    windSpeed: windSpeed,
    windSpeedText: windName(windSpeed),
  };
};
