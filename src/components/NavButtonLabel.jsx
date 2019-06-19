import React from 'react';
import { string } from 'prop-types';
import { INCREMENT, LABEL_NEXT, LABEL_PREV } from '../utilities';

function NavButtonLabel({ direction }) {
  if (direction === INCREMENT) {
    return (
      <span className="text-icon" aria-hidden="true">
        <span className="text">{LABEL_NEXT}</span>
        <span className="icon">&nbsp;&gt;</span>
      </span>
    );
  }
  return (
    <span className="text-icon" aria-hidden="true">
      <span className="icon">&lt;&nbsp;</span>
      <span className="text">{LABEL_PREV}</span>
    </span>
  );
}

NavButtonLabel.propTypes = {
  direction: string.isRequired
};

export default NavButtonLabel;
