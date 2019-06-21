import React from 'react';
import { shallow } from 'enzyme';

import Settings from './Settings';

const props = {
  toggleEnableHotKeys: jest.fn(),
  exitFocusRef: jest.fn()
};

describe('<Settings />', () => {
  const wrapper = shallow(<Settings {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a div with .settings', () => {
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('settings')).toBe(true);
  });

  it('contains a settings button', () => {
    expect(wrapper.exists('button.settings-button')).toBe(true);
  });

  it('contains a settings panel that is hidden by default', () => {
    expect(wrapper.exists('.settings-panel')).toBe(true);
    expect(wrapper.find('.settings-panel').props()['aria-hidden']).toBe(true);
  });

  it('reveals the panel when the button is selected', () => {
    wrapper
      .find('.settings-button')
      .first()
      .simulate('click');
    expect(wrapper.find('.settings-panel').props()['aria-hidden']).toBe(false);
  });
});
