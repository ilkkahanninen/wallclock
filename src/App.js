import React, { Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Block from './components/Block';
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
      <Block height={1} />
      <Clock />
      <CurrentTemperature />
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
