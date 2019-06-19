import React from 'react';
import { shallow } from 'enzyme';

import NavButtonLabel from './NavButtonLabel';
import { INCREMENT, DECREMENT, LABEL_NEXT, LABEL_PREV } from '../utilities';

const props = {
  direction: INCREMENT
};

describe('<NavButtonLabel />', () => {
  const wrapper = shallow(<NavButtonLabel {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a span with .text-icon', () => {
    expect(wrapper.type()).toBe('span');
    expect(wrapper.hasClass('text-icon')).toBe(true);
  });

  it('returns a span with aria-hidden=true', () => {
    expect(wrapper.exists('span[aria-hidden="true"]')).toBe(true);
  });

  it('contains LABEL_NEXT text when direction is INCREMENT', () => {
    expect(wrapper.find('span.text').text()).toBe(LABEL_NEXT);
  });

  it('contains LABEL_PREV text when direction is DECREMENT', () => {
    const prevWrapper = shallow(<NavButtonLabel direction={DECREMENT} />);
    expect(prevWrapper.find('span.text').text()).toBe(LABEL_PREV);
  });
});
