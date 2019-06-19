import React, { Component, createRef } from 'react';
import { arrayOf, element } from 'prop-types';
import autoBind from 'react-autobind';
import { PrevNext, Progress, Counter } from '.';
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
          <PrevNext
            nextButtonRef={this.nextButton}
            prevButtonRef={this.prevButton}
            onClick={this.changeCurrentSlide}
          />
          <Counter current={current} total={slides.length} />
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
