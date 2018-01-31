import React from 'react';
import Centered from '../Centered';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error, info); // eslint-disable-line no-console
  }

  render() {
    if (this.state.hasError) {
      return (
        <Centered>
          <h1>Ilkan koodi bugittaa nyt :(</h1>
        </Centered>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
