import React from 'react';
import { connect } from 'react-redux';
import Block from '../Block';
import './Weather.css';

export const Weather = ({ temperature }) => (
  <Block>
    <div className="Weather__temperature">
      {temperature ? temperature + '°C' : '–'}
    </div>
  </Block>
);

export default connect(state => ({
  temperature: state.weather.temperature,
}))(Weather);
