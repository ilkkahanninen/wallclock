import React, { Fragment } from 'react';
import { format, getDay, getMonth } from 'date-fns';
import { connect } from 'react-redux';
import Block from '../Block';
import './Clock.css';

const weekDays = [
  'Sunnuntai',
  'Maanantai',
  'Tiistai',
  'Keskiviikko',
  'Torstai',
  'Perjantai',
  'Lauantai',
];

const months = [
  'tammikuuta',
  'helmikuuta',
  'maaliskuuta',
  'huhtikuuta',
  'toukokuuta',
  'kesäkuuta',
  'heinäkuuta',
  'elokuuta',
  'syyskuuta',
  'lokakuuta',
  'marraskuuta',
  'joulukuuta',
];

export const Clock = ({ time, showDate }) => (
  <Fragment>
    <Block className="Clock__time" height={3}>
      {format(time, 'HH:mm')}
    </Block>
    {showDate && (
      <Block className="Clock__date" height={1}>
        {weekDays[getDay(time)] +
          ' ' +
          format(time, 'D.') +
          ' ' +
          months[getMonth(time)]}
      </Block>
    )}
  </Fragment>
);

Clock.defaultProps = {
  showDate: true,
};

export default connect(state => ({
  time: state.clock.time,
}))(Clock);
