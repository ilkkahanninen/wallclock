import React, { Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Spacer from '../components/Spacer';
import Clock from '../components/Clock';
import CurrentTemperature from '../components/CurrentTemperature';
import Forecast from '../components/Forecast';
import {
  ArrivalTimetable,
  DepartureTimetable,
} from '../components/TrainTimetable';

import './App.css';

class App extends React.Component {
  state = {
    showDetails: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  showDetails = () => {
    this.setState({ showDetails: true });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ showDetails: false }), 5000);
  };

  render() {
    const { showDetails } = this.state;
    return (
      <SwipeableViews onTouchStart={this.showDetails}>
        <Fragment>
          <Spacer height="8vh" />
          <Clock details={showDetails} />
          <Spacer height="4vh" />
          <CurrentTemperature details={showDetails} />
          <Spacer height="4vh" />
          <Forecast details={showDetails} />
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
  }
}

export default App;
