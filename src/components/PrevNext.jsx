import React from 'react';
import { func } from 'prop-types';
import { NavButton } from '.';
import { INCREMENT, DECREMENT, refType } from '../utilities';

function PrevNext({ prevButtonRef, nextButtonRef, onClick }) {
  return (
    <div className="prev-next">
      <NavButton
        direction={INCREMENT}
        buttonRef={nextButtonRef}
        onClick={() => onClick(INCREMENT)}
      />
      <NavButton
        direction={DECREMENT}
        buttonRef={prevButtonRef}
        onClick={() => onClick(DECREMENT)}
      />
    </div>
  );
}

PrevNext.propTypes = {
  prevButtonRef: refType.isRequired,
  nextButtonRef: refType.isRequired,
  onClick: func.isRequired
};

export default PrevNext;
