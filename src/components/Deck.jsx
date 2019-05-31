import React from 'react';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const BUTTON_FOCUS_TIMEOUT = 500;

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.slidesContainer = React.createRef();
    this.prevButton = React.createRef();
    this.nextButton = React.createRef();
  }

  getLastSlide() {
    return this.props.slides.length - 1;
  }

  getProgressPercentage() {
    return ((this.state.current + 1) / this.props.slides.length) * 100;
  }

  handleSlidesKeyUp = event => {
    const { key } = event;

    if (key === ARROW_RIGHT) {
      this.nextButton.current.focus();
      setTimeout(() => {
        this.doNextSlide();
      }, BUTTON_FOCUS_TIMEOUT);
    }
    if (key === ARROW_LEFT) {
      this.prevButton.current.focus();
      setTimeout(() => {
        this.doPrevSlide();
      }, BUTTON_FOCUS_TIMEOUT);
    }
  };

  doPrevSlide = () => {
    this.changeCurrentSlide(DECREMENT);
  };

  doNextSlide = () => {
    this.changeCurrentSlide(INCREMENT);
  };

  changeCurrentSlide = direction => {
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
        this.slidesContainer.current.focus();
      }
    );
  };

  componentDidMount() {
    this.slidesContainer.current.focus();
  }

  render() {
    const { slides } = this.props;
    const { current } = this.state;
    return (
      <div className="deck">
        <section
          className="slides"
          tabIndex="-1"
          ref={this.slidesContainer}
          onKeyUp={this.handleSlidesKeyUp}
        >
          {slides[current]}
        </section>
        <nav className="controls">
          <div className="counter" role="status">
            {current + 1} of {slides.length}
          </div>
          <div className="prev-next">
            <button
              className="next"
              type="button"
              aria-label="Next slide"
              ref={this.nextButton}
              onClick={this.doNextSlide}
            >
              <span className="text-icon" aria-hidden="true">
                <span className="text">next</span> <span className="icon">&gt;</span>
              </span>
            </button>
            <button
              className="prev"
              type="button"
              aria-label="Previous slide"
              ref={this.prevButton}
              onClick={this.doPrevSlide}
            >
              <span className="text-icon" aria-hidden="true">
                <span className="icon">&lt;</span> <span className="icon">prev</span>
              </span>
            </button>
          </div>
        </nav>
        <div className="progress" role="presentation" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${this.getProgressPercentage()}%` }} />
        </div>
      </div>
    );
  }
}

export default Deck;
