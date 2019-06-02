import React from 'react';
import { number } from 'prop-types';

export function getProgressPercentage(current, total) {
  if (total === 0) return 0;
  return (current / total) * 100;
}

function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar" style={{ width: `${getProgressPercentage(current, total)}%` }} />
  );
}

ProgressBar.propTypes = {
  current: number,
  total: number
};

ProgressBar.defaultProps = {
  current: 0,
  total: 0
};

export default ProgressBar;
