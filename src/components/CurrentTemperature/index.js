import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Centered from '../Centered';
import Temperature from '../Temperature';
import windName from '../../utils/windName';
import './CurrentTemperature.css';

export const CurrentTemperature = ({ temperature, windSpeed, details }) => (
  <Centered height="24vh" className="CurrentTemperature__root">
    <Temperature value={temperature} precision={1} />
    <div
      className={classNames({
        CurrentTemperature__wind: true,
        CurrentTemperature__wind_visible: details,
      })}
    >
      {windName(windSpeed)}
    </div>
  </Centered>
);

export default connect(state => ({
  temperature: state.weather.temperature,
  windSpeed: state.weather.windSpeed,
}))(CurrentTemperature);
