import React from 'react';
import { shallow } from 'enzyme';

import Progress, { getProgressPercentage } from './Progress';

describe('getProgressPercentage', () => {
  it('returns 0 when passed total of 0', () => {
    const percentage = getProgressPercentage(1, 0);
    expect(percentage).toBe(0);
  });

  it('returns 0 when passed current less than 0', () => {
    const percentage = getProgressPercentage(-1, 1);
    expect(percentage).toBe(0);
  });

  it('returns 100 when passed current equal to total', () => {
    const percentage = getProgressPercentage(1, 1);
    expect(percentage).toBe(100);
  });

  it('returns 100 when passed current larger than total', () => {
    const percentage = getProgressPercentage(2, 1);
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
  const wrapper = shallow(<Progress />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a div with .progress', () => {
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('progress')).toBe(true);
  });

  it('returns a div with role presentation', () => {
    expect(wrapper.exists('div[role="presentation"]')).toBe(true);
  });

  it('returns a div with aria-hidden true', () => {
    expect(wrapper.exists('div[aria-hidden="true"]')).toBe(true);
  });

  it('returns a child div with .progress-bar', () => {
    expect(
      wrapper
        .find('div.progress')
        .find('div.progress-bar')
        .exists()
    ).toBe(true);
  });

  it('sets a width of 0% by default', () => {
    expect(wrapper.find('.progress-bar').prop('style').width).toBe('0%');
  });

  it('sets a width of 100% when passed current equal to total', () => {
    const fullWrapper = shallow(<Progress current={1} total={1} />);
    expect(fullWrapper.find('.progress-bar').prop('style').width).toBe('100%');
  });

  it('sets a width of 50% when passed current 1/2 of total', () => {
    const halfWrapper = shallow(<Progress current={1} total={2} />);
    expect(halfWrapper.find('.progress-bar').prop('style').width).toBe('50%');
  });
});
