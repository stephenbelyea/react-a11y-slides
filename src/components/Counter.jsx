import React from 'react';
import { number } from 'prop-types';

export function getCounterLabel(current, total) {
  if (total === 0) return null;
  return `${current + 1} of ${total}`;
}

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
