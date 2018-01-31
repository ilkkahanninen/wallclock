import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import classNames from 'classnames';
import WeatherIcon from './WeatherIcon';
import Centered from '../Centered';
import Temperature from '../Temperature';
import config from '../../config.json';
import './Forecast.css';
import './weather-icons.css';

export const Forecast = ({ forecast, details }) => (
  <Centered vertical>
    {forecast &&
      forecast.map(item => (
        <Centered key={item.date} width="23vw" className="Forecast__item">
          <WeatherIcon icon={item.icon.weatherIcon} color={item.icon.color} />
          <div className="Forecast__item_value">
            <Temperature
              value={item.temperature}
              freezeLimit={config.temperature.freezeLimit}
              heatLimit={config.temperature.heatLimit}
            />
          </div>
          <div className="Forecast__item_time">{format(item.date, 'HH')}</div>
          <div
            className={classNames({
              Forecast__details: true,
              Forecast__details_visible: details,
            })}
          >
            <div className="Forecast__item_precipitation">
              {item.snow != null ? (
                <div>
                  <i className="wi wi-snowflake-cold" />{' '}
                  {item.snow.toFixed(1) + ' mm'}
                </div>
              ) : null}
              {item.rain != null ? (
                <div>
                  <i className="wi wi-raindrop" />{' '}
                  {item.rain.toFixed(1) + ' mm'}
                </div>
              ) : null}
            </div>
            <div className="Forecast__item_wind">{item.windSpeedText}</div>
          </div>
        </Centered>
      ))}
  </Centered>
);

export default connect(state => ({
  forecast: state.weather.forecast,
}))(Forecast);
