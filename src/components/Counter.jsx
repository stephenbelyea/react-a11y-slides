import React from 'react';
import { number } from 'prop-types';
import { getCounterLabel } from '../utilities';

function Counter({ current, total }) {
  return (
    <div className="counter" role="status">
      {getCounterLabel(current, total)}
    </div>
  );
}

Counter.propTypes = {
  current: number,
  total: number
};

Counter.defaultProps = {
  current: 0,
  total: 0
};

export default Counter;
