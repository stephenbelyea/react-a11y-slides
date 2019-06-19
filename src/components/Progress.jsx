import React from 'react';
import { number } from 'prop-types';

export function getProgressPercentage(current, total) {
  if (total === 0 || current < 0) return 0;
  if (current >= total) return 100;
  return (current / total) * 100;
}

function Progress({ current, total }) {
  return (
    <div className="progress" role="presentation" aria-hidden="true">
      <div
        className="progress-bar bg-red"
        style={{ width: `${getProgressPercentage(current, total)}%` }}
      />
    </div>
  );
}

Progress.propTypes = {
  current: number,
  total: number
};

Progress.defaultProps = {
  current: 0,
  total: 0
};

export default Progress;
