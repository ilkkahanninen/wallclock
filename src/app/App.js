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
import ErrorBoundary from '../components/ErrorBoundary';

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
          <ErrorBoundary>
            <Clock details={showDetails} />
          </ErrorBoundary>
          <Spacer height="4vh" />
          <ErrorBoundary>
            <CurrentTemperature details={showDetails} />
          </ErrorBoundary>
          <Spacer height="4vh" />
          <ErrorBoundary>
            <Forecast details={showDetails} />
          </ErrorBoundary>
        </Fragment>
        <Fragment>
          <ErrorBoundary>
            <Clock showDate={false} />
          </ErrorBoundary>
          <ErrorBoundary>
            <DepartureTimetable />
          </ErrorBoundary>
        </Fragment>
        <Fragment>
          <ErrorBoundary>
            <Clock showDate={false} />
          </ErrorBoundary>
          <ErrorBoundary>
            <ArrivalTimetable />
          </ErrorBoundary>
        </Fragment>
      </SwipeableViews>
    );
  }
}

export default App;
