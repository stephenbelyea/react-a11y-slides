import React from 'react';
import { shallow } from 'enzyme';

import Counter, { getCounterLabel } from './Counter';

describe('getCounterLabel', () => {
  it('returns null when total is 0', () => {
    expect(getCounterLabel(0, 0)).toBe(null);
  });

  it('returns x of x when total is passed', () => {
    expect(getCounterLabel(0, 1)).toBe('1 of 1');
  });

  it('returns current adjusted from array index', () => {
    expect(getCounterLabel(1, 2)).toBe('2 of 2');
  });
});

describe('<Counter />', () => {
  const wrapper = shallow(<Counter />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a div with .counter', () => {
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('counter')).toBe(true);
  });

  it('returns a div with role status', () => {
    expect(wrapper.exists('div[role="status"]')).toBe(true);
  });

  it('contains no label text when no total is passed', () => {
    expect(wrapper.find('div').text()).toBeFalsy();
  });

  it('contains label text with current defaulting to 1 when total is passed', () => {
    const labelWrapper = shallow(<Counter total={3} />);
    expect(labelWrapper.find('div').text()).toBe('1 of 3');
  });

  it('contains label text with current adjusted from array index', () => {
    const labelWrapper = shallow(<Counter current={1} total={3} />);
    expect(labelWrapper.find('div').text()).toBe('2 of 3');
  });
});
