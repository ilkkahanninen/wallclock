import React from 'react';

class TextCarousel extends React.Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ index: this.state.index + 1 }),
      3000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { texts } = this.props;
    const index = this.state.index % texts.length;
    return <span>{texts[index]}</span>;
  }
}

export default TextCarousel;
