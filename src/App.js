import React from 'react';
import Block from './components/Block';
import Carousel from './components/Carousel';
import Clock from './components/Clock';
import CurrentTemperature from './components/CurrentTemperature';
import Forecast from './components/Forecast';

const App = () => (
  <div>
    <Block height={1} />
    <Clock />
    <CurrentTemperature />
    <Carousel components={[Forecast]} />
  </div>
);

export default App;
