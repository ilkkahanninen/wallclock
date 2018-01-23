import React, { Fragment } from 'react';
import { format, getDay, getMonth } from 'date-fns';
import { connect } from 'react-redux';
import Centered from '../Centered';
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
    <Centered className="Clock__time" height="24vh">
      {format(time, 'HH:mm')}
    </Centered>
    {showDate && (
      <Centered className="Clock__date" height="8vh">
        {weekDays[getDay(time)] +
          ' ' +
          format(time, 'D.') +
          ' ' +
          months[getMonth(time)]}
      </Centered>
    )}
  </Fragment>
);

Clock.defaultProps = {
  showDate: true,
};

export default connect(state => ({
  time: state.clock.time,
}))(Clock);
