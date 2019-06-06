import React from 'react';
import { arrayOf, element } from 'prop-types';
import { NavButton, ProgressBar } from '.';
import {
  INCREMENT,
  DECREMENT,
  ARROW_LEFT,
  ARROW_RIGHT,
  SPACEBAR,
  BUTTON_FOCUS_TIMEOUT
} from '../utilities/constants';

export function shouldDoNextSlide(keyboardEvent) {
  const { key, shiftKey } = keyboardEvent;

  return key === ARROW_RIGHT || (key === SPACEBAR && !shiftKey);
}

export function shouldDoPrevSlide(keyboardEvent) {
  const { key, shiftKey } = keyboardEvent;

  return key === ARROW_LEFT || (key === SPACEBAR && shiftKey);
}

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.handleSlidesKeyUp = this.handleSlidesKeyUp.bind(this);
    this.doNextSlide = this.doNextSlide.bind(this);
    this.doPrevSlide = this.doPrevSlide.bind(this);
    this.slidesContainer = React.createRef();
    this.prevButton = React.createRef();
    this.nextButton = React.createRef();
  }

  componentDidMount() {
    this.slidesContainer.current.focus();
  }

  getLastSlide() {
    const { slides } = this.props;
    return slides.length - 1;
  }

  handleSlidesKeyUp(event) {
    if (shouldDoNextSlide(event)) {
      this.nextButton.current.focus();
      setTimeout(() => {
        this.doNextSlide();
      }, BUTTON_FOCUS_TIMEOUT);
    }
    if (shouldDoPrevSlide(event)) {
      this.prevButton.current.focus();
      setTimeout(() => {
        this.doPrevSlide();
      }, BUTTON_FOCUS_TIMEOUT);
    }
  }

  doPrevSlide() {
    this.changeCurrentSlide(DECREMENT);
  }

  doNextSlide() {
    this.changeCurrentSlide(INCREMENT);
  }

  changeCurrentSlide(direction) {
    this.setState(
      state => {
        const prevSlide = state.current;
        const current = direction === INCREMENT ? prevSlide + 1 : prevSlide - 1;
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
          <div className="prev-next">
            <NavButton
              direction={INCREMENT}
              buttonRef={this.nextButton}
              onClick={this.doNextSlide}
            />
            <NavButton
              direction={DECREMENT}
              buttonRef={this.prevButton}
              onClick={this.doPrevSlide}
            />
          </div>
          <div className="counter" role="status">
            {`${current + 1} of ${slides.length}`}
          </div>
          <div className="settings">
            <button type="button" className="settings-button">
              settings
            </button>
          </div>
        </nav>
        <div className="progress" role="presentation" aria-hidden="true">
          <ProgressBar current={current} total={this.getLastSlide()} />
        </div>
      </div>
    );
  }
}

Deck.propTypes = {
  slides: arrayOf(element)
};

Deck.defaultProps = {
  slides: []
};

export default Deck;
