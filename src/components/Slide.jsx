import React from 'react';
import { node } from 'prop-types';

function Slide({ children }) {
  return <article className="slide">{children}</article>;
}

Slide.propTypes = {
  children: node.isRequired
};

export default Slide;
