import React from 'react';
import { shallow } from 'enzyme';

import Slide from './Slide';

const props = {
  children: 'Foo'
};

describe('<Slide />', () => {
  const wrapper = shallow(<Slide {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('returns an article with .slide', () => {
    expect(wrapper.type()).toBe('article');
    expect(wrapper.hasClass('slide')).toBe(true);
  });

  it('contains any child text', () => {
    expect(wrapper.text()).toBe('Foo');
  });

  it('contains any child element', () => {
    const childWrapper = shallow(
      <Slide>
        <span>Bar</span>
      </Slide>
    ).find('span');
    expect(childWrapper.exists()).toBe(true);
    expect(childWrapper.text()).toBe('Bar');
  });
});
