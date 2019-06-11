import React, { Component, createRef } from 'react';
import { arrayOf, element } from 'prop-types';
import autoBind from 'react-autobind';
import { NavButton, ProgressBar } from '.';
import {
  INCREMENT,
  DECREMENT,
  ARROW_LEFT,
  ARROW_RIGHT,
  SPACEBAR,
  BUTTON_FOCUS_TIMEOUT
} from '../utilities/constants';

export function shouldDoNextSlide(keyboardEvent, enableHotKeys = true) {
  if (!enableHotKeys) {
    return false;
  }
  const { key, shiftKey } = keyboardEvent;
  return key === ARROW_RIGHT || (key === SPACEBAR && !shiftKey);
}

export function shouldDoPrevSlide(keyboardEvent, enableHotKeys = true) {
  if (!enableHotKeys) {
    return false;
  }
  const { key, shiftKey } = keyboardEvent;
  return key === ARROW_LEFT || (key === SPACEBAR && shiftKey);
}

class Deck extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      current: 0,
      settingsMenu: false,
      enableHotKeys: true
    };
    this.slidesContainer = createRef();
    this.closeSettingsButton = createRef();
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
    if (shouldDoNextSlide(event, enableHotKeys)) {
      this.nextButton.current.focus();
      setTimeout(() => {
        this.doNextSlide();
      }, BUTTON_FOCUS_TIMEOUT);
    }
    if (shouldDoPrevSlide(event, enableHotKeys)) {
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

  toggleSettingsMenu() {
    this.setState(
      state => {
        return { settingsMenu: !state.settingsMenu };
      },
      () => {
        const { settingsMenu } = this.state;
        if (settingsMenu) {
          this.closeSettingsButton.current.focus();
        } else {
          this.slidesContainer.current.focus();
        }
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
    const { current, settingsMenu, enableHotKeys } = this.state;
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
            <button
              type="button"
              className="settings-button"
              ref={this.openSettingsButton}
              onClick={this.toggleSettingsMenu}
            >
              settings
            </button>
            <div className="settings-panel" aria-hidden={!settingsMenu}>
              <button
                type="button"
                className="settings-button"
                ref={this.closeSettingsButton}
                onClick={this.toggleSettingsMenu}
              >
                close
              </button>
              <button type="button" className="settings-button" onClick={this.toggleEnableHotKeys}>
                {`${enableHotKeys ? 'disable' : 'enable'} hot keys`}
              </button>
            </div>
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
