import React from 'react';
import { string, func } from 'prop-types';
import { INCREMENT, LABEL_NEXT, LABEL_PREV } from '../constants';

export function getNextOrPrevLabel(direction) {
  return direction === INCREMENT ? LABEL_NEXT : LABEL_PREV;
}

export function NavButtonLabel({ direction }) {
  if (direction === INCREMENT) {
    return (
      <span className="text-icon" aria-hidden="true">
        <span className="text">{LABEL_NEXT}</span> <span className="icon">&gt;</span>
      </span>
    );
  }
  return (
    <span className="text-icon" aria-hidden="true">
      <span className="icon">&lt;</span> <span className="text">{LABEL_PREV}</span>
    </span>
  );
}

function NavButton({ direction, buttonRef, onClick }) {
  const nextOrPrev = getNextOrPrevLabel(direction);

  return (
    <button
      type="button"
      ref={buttonRef}
      className={nextOrPrev}
      aria-label={`${nextOrPrev} slide`}
      onClick={onClick}
    >
      <NavButtonLabel direction={direction} />
    </button>
  );
}

NavButton.propTypes = {
  direction: string.isRequired,
  buttonRef: func,
  onClick: func
};

NavButton.defaultProps = {
  buttonRef: () => {},
  onClick: () => {}
};

export default NavButton;
