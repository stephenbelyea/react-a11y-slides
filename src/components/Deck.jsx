import React, { Component, createRef } from 'react';
import { arrayOf, element } from 'prop-types';
import autoBind from 'react-autobind';
import { PrevNext, Progress, Counter, Settings } from '.';
import {
  INCREMENT,
  DECREMENT,
  BUTTON_FOCUS_TIMEOUT,
  shouldDoNextSlide,
  shouldDoPrevSlide
} from '../utilities';

class Deck extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      current: 0,
      enableHotKeys: true
    };
    this.slidesContainer = createRef();
    this.prevButton = createRef();
    this.nextButton = createRef();
  }

  componentDidMount() {
    this.slidesContainer.current.focus();
  }

  getLastSlide() {
    const { slides } = this.props;
    return slides.length - 1;
  }

  handleSlidesKeyUp(event) {
    const { enableHotKeys } = this.state;
    if (!enableHotKeys) return;

    if (shouldDoNextSlide(event)) {
      this.nextButton.current.focus();
      setTimeout(() => {
        this.changeCurrentSlide(INCREMENT);
      }, BUTTON_FOCUS_TIMEOUT);
    }
    if (shouldDoPrevSlide(event)) {
      this.prevButton.current.focus();
      setTimeout(() => {
        this.changeCurrentSlide(DECREMENT);
      }, BUTTON_FOCUS_TIMEOUT);
    }
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

  toggleEnableHotKeys() {
    this.setState(state => {
      return { enableHotKeys: !state.enableHotKeys };
    });
  }

  render() {
    const { slides } = this.props;
    const { current, enableHotKeys } = this.state;
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
          <PrevNext
            nextButtonRef={this.nextButton}
            prevButtonRef={this.prevButton}
            onClick={this.changeCurrentSlide}
          />
          <Counter current={current} total={slides.length} />
          <Settings
            enableHotKeys={enableHotKeys}
            toggleEnableHotKeys={this.toggleEnableHotKeys}
            exitFocusRef={this.slidesContainer}
          />
        </nav>
        <Progress current={current} total={this.getLastSlide()} />
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
