import React from 'react';
import Block from './components/Block';
import Clock from './components/Clock';
import Weather from './components/Weather';

const App = () => (
  <div>
    <Block height={1} />
    <Clock />
    <Weather />
  </div>
);

export default App;
