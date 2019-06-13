import React from 'react';
import { shallow } from 'enzyme';

import NavButton, { getNextOrPrevLabel } from './NavButton';
import { INCREMENT, DECREMENT, LABEL_PREV, LABEL_NEXT } from '../utilities/constants';

describe('getNextOrPrevLabel', () => {
  it('returns LABEL_PREV by default', () => {
    expect(getNextOrPrevLabel()).toBe(LABEL_PREV);
  });

  it('returns LABEL_PREV when passed direction DECREMENT', () => {
    expect(getNextOrPrevLabel(DECREMENT)).toBe(LABEL_PREV);
  });

  it('returns LABEL_NEXT when passed direction INCREMENT', () => {
    expect(getNextOrPrevLabel(INCREMENT)).toBe(LABEL_NEXT);
  });
});

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
