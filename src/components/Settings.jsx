import React, { createRef } from 'react';
import { bool, func } from 'prop-types';
import autoBind from 'react-autobind';
import { refType } from '../utilities';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      settingsMenu: false
    };
    this.closeSettingsButton = createRef();
  }

  toggleSettingsMenu() {
    this.setState(
      state => {
        return { settingsMenu: !state.settingsMenu };
      },
      () => {
        const { settingsMenu } = this.state;
        const { exitFocusRef } = this.props;
        if (settingsMenu) {
          if (this.closeSettingsButton.current) {
            this.closeSettingsButton.current.focus();
          }
        } else {
          exitFocusRef.current.focus();
        }
      }
    );
  }

  render() {
    const { settingsMenu } = this.state;
    const { enableHotKeys, toggleEnableHotKeys } = this.props;

    return (
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
          <button type="button" className="settings-button" onClick={toggleEnableHotKeys}>
            {`${enableHotKeys ? 'disable' : 'enable'} hot keys`}
          </button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  toggleEnableHotKeys: func.isRequired,
  exitFocusRef: refType.isRequired,
  enableHotKeys: bool
};

Settings.defaultProps = {
  enableHotKeys: true
};

export default Settings;
