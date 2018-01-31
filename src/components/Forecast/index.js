import React from 'react';
import { connect } from 'react-redux';
import { format, getHours } from 'date-fns';
import { pipe, filter, slice } from 'ramda';
import classNames from 'classnames';
import WeatherIcon from './WeatherIcon';
import Centered from '../Centered';
import Temperature from '../Temperature';
import config from '../../config.json';
import './Forecast.css';
import './weather-icons.css';
import windName from '../../utils/windName';

// TODO: This stuff should be prepared in the reducer...
const kToC = kelvin => kelvin - 273.15;
const unixTimeToDate = dt => new Date(dt * 1000);

const isDayHour = ({ dt }) => getHours(unixTimeToDate(dt)) > 7;
const viewableForecastEntries = pipe(filter(isDayHour), slice(0, 4));

export const Forecast = ({ forecast, details }) => (
  <Centered vertical>
    {forecast &&
      viewableForecastEntries(forecast).map(item => (
        <Centered key={item.dt} width="23vw" className="Forecast__item">
          <WeatherIcon icon={item.weather[0].icon} />
          <div className="Forecast__item_value">
            <Temperature
              value={kToC(item.main.temp)}
              freezeLimit={config.temperature.freezeLimit}
              heatLimit={config.temperature.heatLimit}
            />
          </div>
          <div className="Forecast__item_time">
            {format(unixTimeToDate(item.dt), 'HH')}
          </div>
          <div
            className={classNames({
              Forecast__details: true,
              Forecast__details_visible: details,
            })}
          >
            <div className="Forecast__item_precipitation">
              {item.snow && (
                <div>
                  <i className="wi wi-snowflake-cold" />{' '}
                  {(item.snow['3h'] || 0).toFixed(1) + ' mm'}
                </div>
              )}
              {item.rain && (
                <div>
                  <i className="wi wi-raindrop" />{' '}
                  {(item.rain['3h'] || 0).toFixed(1) + ' mm'}
                </div>
              )}
            </div>
            <div className="Forecast__item_wind">
              {windName(item.wind.speed)}
            </div>
          </div>
        </Centered>
      ))}
  </Centered>
);

export default connect(state => ({
  forecast: state.weather.forecast,
}))(Forecast);
