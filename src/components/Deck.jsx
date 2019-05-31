import React from 'react';

const INCREMENT = 'INCREMENT';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.slidesRef = React.createRef();
  }

  getLastSlide() {
    return this.props.slides.length - 1;
  }

  changeSlide = (_, direction = INCREMENT) => {
    this.setState(
      (state, props) => {
        const prevSlide = state.current;
        let current = direction === INCREMENT ? prevSlide + 1 : prevSlide - 1;
        if (current < 0) {
          return { current: this.getLastSlide() };
        }
        if (current > this.getLastSlide()) {
          return { current: 0 };
        }
        return { current };
      },
      () => {
        this.slidesRef.current.focus();
      }
    );
  };

  componentDidMount() {
    this.slidesRef.current.focus();
  }

  render() {
    const { slides } = this.props;
    const { current } = this.state;
    return (
      <div className="deck" aria-live="polite" onClick={this.changeSlide}>
        <div className="slides" tabIndex="-1" ref={this.slidesRef}>
          {slides[current]}
        </div>
      </div>
    );
  }
}

export default Deck;
