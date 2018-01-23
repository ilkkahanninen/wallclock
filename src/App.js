import React, { Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Spacer from './components/Spacer';
import Clock from './components/Clock';
import CurrentTemperature from './components/CurrentTemperature';
import Forecast from './components/Forecast';
import {
  ArrivalTimetable,
  DepartureTimetable,
} from './components/TrainTimetable';

const App = () => (
  <SwipeableViews>
    <Fragment>
      <Spacer height="8vh" />
      <Clock />
      <Spacer height="4vh" />
      <CurrentTemperature />
      <Spacer height="4vh" />
      <Forecast />
    </Fragment>
    <Fragment>
      <Clock showDate={false} />
      <DepartureTimetable />
    </Fragment>
    <Fragment>
      <Clock showDate={false} />
      <ArrivalTimetable />
    </Fragment>
  </SwipeableViews>
);

export default App;
