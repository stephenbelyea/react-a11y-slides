import React from 'react';
import { shallow } from 'enzyme';

import NavButton from './NavButton';
import { INCREMENT, LABEL_NEXT } from '../utilities';

const props = {
  direction: INCREMENT,
  buttonRef: () => {},
  onClick: jest.fn()
};

describe('<NavButton />', () => {
  const wrapper = shallow(<NavButton {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a button with type button', () => {
    expect(wrapper.type()).toBe('button');
    expect(wrapper.exists('button[type="button"]')).toBe(true);
  });

  it('returns a button with .nav-button', () => {
    expect(wrapper.hasClass('nav-button')).toBe(true);
  });

  it('returns a button with an aria-label matching the direction', () => {
    expect(wrapper.exists('button[aria-label]')).toBe(true);
    expect(wrapper.props()['aria-label']).toBe(`${LABEL_NEXT} slide`);
  });

  it('calls onClick when selected', () => {
    wrapper.find('button').simulate('click');
    expect(props.onClick).toBeCalled();
  });
});
