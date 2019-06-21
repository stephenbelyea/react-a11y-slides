import { ARROW_LEFT, ARROW_RIGHT, SPACEBAR, INCREMENT, LABEL_NEXT, LABEL_PREV } from './constants';

export function shouldDoNextSlide(keyboardEvent) {
  const { key, shiftKey } = keyboardEvent;
  return key === ARROW_RIGHT || (key === SPACEBAR && !shiftKey);
}

export function shouldDoPrevSlide(keyboardEvent) {
  const { key, shiftKey } = keyboardEvent;
  return key === ARROW_LEFT || (key === SPACEBAR && shiftKey);
}

export function getProgressPercentage(current, total) {
  if (total === 0 || current < 0) return 0;
  if (current >= total) return 100;
  return (current / total) * 100;
}

export function getNextOrPrevLabel(direction) {
  return direction === INCREMENT ? LABEL_NEXT : LABEL_PREV;
}

export function getCounterLabel(current, total) {
  if (total === 0) return null;
  return `${current + 1} of ${total}`;
}
