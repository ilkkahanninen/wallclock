import React from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import Block from '../Block';
import './Clock.css';

export const Clock = ({ time }) => (
  <Block>
    <div className="Clock__time">{format(time, 'HH:mm')}</div>
    <div className="Clock__date">{format(time, 'ddd D.M.YYYY')}</div>
  </Block>
);

export default connect(state => ({
  time: state.clock.time,
}))(Clock);
