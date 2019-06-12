import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar, { getProgressPercentage } from './ProgressBar';

describe('getProgressPercentage', () => {
  it('returns 0 when passed total of 0', () => {
    const percentage = getProgressPercentage(1, 0);
    expect(percentage).toBe(0);
  });

  it('returns 100 when passed current equal to total', () => {
    const percentage = getProgressPercentage(1, 1);
    expect(percentage).toBe(100);
  });

  it('returns 50 when passed current 1/2 of total', () => {
    const percentage = getProgressPercentage(1, 2);
    expect(percentage).toBe(50);
  });

  it('returns 25 when passed current 1/4 of total', () => {
    const percentage = getProgressPercentage(1, 4);
    expect(percentage).toBe(25);
  });
});

describe('<ProgressBar />', () => {
  const wrapper = shallow(<ProgressBar />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a div with .progress-bar', () => {
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('progress-bar')).toBe(true);
  });

  it('sets a width of 0% by default', () => {
    expect(wrapper.prop('style').width).toBe('0%');
  });

  it('sets a width of 100% when passed current equal to total', () => {
    const fullWrapper = shallow(<ProgressBar current={1} total={1} />);
    expect(fullWrapper.prop('style').width).toBe('100%');
  });
});
