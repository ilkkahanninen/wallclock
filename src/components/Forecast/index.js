import React from 'react';
import { connect } from 'react-redux';
import { format, getHours } from 'date-fns';
import { pipe, filter, slice } from 'ramda';
import WeatherIcon from './WeatherIcon';
import Block from '../Block';
import Temperature from '../Temperature';
import './Forecast.css';
import './weather-icons.css';

const FREEZE_LIMIT = -15;
const HEAT_LIMIT = 24;

const kToC = kelvin => kelvin - 273.15;
const unixTimeToDate = dt => new Date(dt * 1000);

const isDayHour = ({ dt }) => getHours(unixTimeToDate(dt)) > 7;
const viewableForecastEntries = pipe(filter(isDayHour), slice(0, 4));

export const Forecast = ({ forecast }) => (
  <Block height={3} vertical>
    {forecast &&
      viewableForecastEntries(forecast).map(item => (
        <Block key={item.dt} width={3} height={3} className="Forecast__item">
          <WeatherIcon icon={item.weather[0].icon} />
          <div className="Forecast__item_value">
            <Temperature
              value={kToC(item.main.temp)}
              freezeLimit={FREEZE_LIMIT}
              heatLimit={HEAT_LIMIT}
            />
          </div>
          <div className="Forecast__item_time">
            {format(unixTimeToDate(item.dt), 'HH')}
          </div>
        </Block>
      ))}
  </Block>
);

export default connect(state => ({
  forecast: state.weather.forecast,
}))(Forecast);
