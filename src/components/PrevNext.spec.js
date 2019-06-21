import React from 'react';
import { shallow } from 'enzyme';
import PrevNext from './PrevNext';

const props = {
  nextButtonRef: jest.fn(),
  prevButtonRef: jest.fn(),
  onClick: jest.fn()
};

describe('<PrevNext />', () => {
  const wrapper = shallow(<PrevNext {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns a div with .prev-next class', () => {
    expect(wrapper.type()).toBe('div');
    expect(wrapper.hasClass('prev-next')).toBe(true);
  });
});
