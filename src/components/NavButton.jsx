import React from 'react';
import { string, func } from 'prop-types';
import { NavButtonLabel } from '.';
import { INCREMENT, LABEL_NEXT, LABEL_PREV, refType } from '../utilities';

export function getNextOrPrevLabel(direction) {
  return direction === INCREMENT ? LABEL_NEXT : LABEL_PREV;
}

function NavButton({ direction, buttonRef, onClick }) {
  const nextOrPrev = getNextOrPrevLabel(direction);

  return (
    <button
      type="button"
      ref={buttonRef}
      className={`nav-button ${nextOrPrev}`}
      aria-label={`${nextOrPrev} slide`}
      onClick={onClick}
    >
      <NavButtonLabel direction={direction} />
    </button>
  );
}

NavButton.propTypes = {
  direction: string.isRequired,
  buttonRef: refType.isRequired,
  onClick: func
};

NavButton.defaultProps = {
  onClick: () => {}
};

export default NavButton;
