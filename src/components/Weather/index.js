import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { format, getHours } from 'date-fns';
import { pipe, filter, slice } from 'ramda';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import Block from '../Block';
import './Weather.css';
import './weather-icons.css';

const FREEZE_LIMIT = -15;
const HEAT_LIMIT = 24;

const kToC = kelvin => kelvin - 273.15;
const unixTimeToDate = dt => new Date(dt * 1000);

const isDayHour = ({ dt }) => getHours(unixTimeToDate(dt)) > 7;
const viewableForecastEntries = pipe(filter(isDayHour), slice(0, 4));

export const Weather = ({ temperature, forecast }) => (
  <Fragment>
    <Block height={3} className="Weather__temperature">
      <Temperature value={temperature} precision={1} />
    </Block>
    <Block height={3} vertical>
      {forecast &&
        viewableForecastEntries(forecast).map(item => (
          <Block
            key={item.dt}
            width={3}
            height={3}
            className="Weather__forecast"
          >
            <WeatherIcon icon={item.weather[0].icon} />
            <div className="Weather__forecast_value">
              <Temperature
                value={kToC(item.main.temp)}
                freezeLimit={FREEZE_LIMIT}
                heatLimit={HEAT_LIMIT}
              />
            </div>
            <div className="Weather__forecast_time">
              {format(unixTimeToDate(item.dt), 'HH')}
            </div>
          </Block>
        ))}
    </Block>
  </Fragment>
);

export default connect(state => ({
  temperature: state.weather.temperature,
  forecast: state.weather.forecast,
}))(Weather);

/* <Block key={item.dt} width={3} height={3} className="Weather__forecast">
<WeatherIcon icon="sunny" />
<div className="Weather__forecast_value">{item.CELSIUS}</div>
12:00
</Block> */
