import { ARROW_LEFT, ARROW_RIGHT, SPACEBAR } from './constants';

export function shouldDoNextSlide(keyboardEvent) {
  const { key, shiftKey } = keyboardEvent;
  return key === ARROW_RIGHT || (key === SPACEBAR && !shiftKey);
}

export function shouldDoPrevSlide(keyboardEvent) {
  const { key, shiftKey } = keyboardEvent;
  return key === ARROW_LEFT || (key === SPACEBAR && shiftKey);
}
