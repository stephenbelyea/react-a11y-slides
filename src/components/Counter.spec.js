import React from 'react';
import { shallow } from 'enzyme';

import Counter from './Counter';

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
