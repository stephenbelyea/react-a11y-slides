import React from 'react';
import { string, func, oneOfType, shape, instanceOf } from 'prop-types';
import { NavButtonLabel } from '.';
import { INCREMENT, LABEL_NEXT, LABEL_PREV } from '../utilities';

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
  buttonRef: oneOfType([func, shape({ current: instanceOf(Element) })]).isRequired,
  onClick: func
};

NavButton.defaultProps = {
  onClick: () => {}
};

export default NavButton;
