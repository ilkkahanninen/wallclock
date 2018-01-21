import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import Block from '../Block';
import './Clock.css';

export const Clock = ({ time }) => (
  <Fragment>
    <Block className="Clock__time" height={3}>
      {format(time, 'HH:mm')}
    </Block>
    <Block className="Clock__date" height={1}>
      {format(time, 'ddd D.M.YYYY')}
    </Block>
  </Fragment>
);

export default connect(state => ({
  time: state.clock.time,
}))(Clock);
