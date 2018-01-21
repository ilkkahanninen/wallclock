import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import WeatherIcon from './WeatherIcon';
import Block from '../Block';
import './Weather.css';
import './weather-icons.css';

const CELSIUS = '°C';

const formatTemp = kelvin => `${parseFloat(kelvin).toFixed(1)}°C`;
const kelvinToCelsius = kelvin => kelvin - 273.15;

export const Weather = ({ temperature, forecast }) => (
  <Fragment>
    <Block height={3} className="Weather__temperature">
      {temperature != null ? formatTemp(temperature + CELSIUS) : '–'}
    </Block>
    <Block height={3} vertical>
      {forecast &&
        forecast.slice(0, 4).map(item => (
          <Block
            key={item.dt}
            width={3}
            height={3}
            className="Weather__forecast"
          >
            <WeatherIcon icon={item.weather[0].icon} />
            <div className="Weather__forecast_value">
              {formatTemp(kelvinToCelsius(item.main.temp))}
            </div>
            <div>{format(item.dt * 1000, 'HH:mm')}</div>
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
