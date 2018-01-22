import React from 'react';
import './Carousel.css';

class Carousel extends React.Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ index: this.state.index + 1 }),
      10000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { components } = this.props;
    const index = this.state.index % components.length;
    return (
      <div className="Carousel__root">
        {components.map((Child, childIndex) => (
          <div
            key={childIndex}
            className={
              childIndex === index ? 'Carousel__activeComponent' : null
            }
          >
            <Child />
          </div>
        ))}
      </div>
    );
  }
}

export default Carousel;
