import React from 'react';
import { connect } from 'react-redux';
import Block from '../Block';
import Temperature from '../Temperature';
import './CurrentTemperature.css';

export const CurrentTemperature = ({ temperature }) => (
  <Block height={3} className="CurrentTemperature__root">
    <Temperature value={temperature} precision={1} />
  </Block>
);

export default connect(state => ({
  temperature: state.weather.temperature,
}))(CurrentTemperature);
