import React from 'react';
import { connect } from 'react-redux';
import Centered from '../Centered';
import Temperature from '../Temperature';
import './CurrentTemperature.css';

export const CurrentTemperature = ({ temperature }) => (
  <Centered height="24vh" className="CurrentTemperature__root">
    <Temperature value={temperature} precision={1} />
  </Centered>
);

export default connect(state => ({
  temperature: state.weather.temperature,
}))(CurrentTemperature);
