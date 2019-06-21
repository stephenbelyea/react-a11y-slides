import {
  shouldDoNextSlide,
  getProgressPercentage,
  getNextOrPrevLabel,
  getCounterLabel,
  shouldDoPrevSlide
} from './helpers';
import {
  LABEL_NEXT,
  LABEL_PREV,
  DECREMENT,
  INCREMENT,
  ARROW_RIGHT,
  ARROW_LEFT,
  SPACEBAR
} from './constants';

describe('shouldDoNextSlide', () => {
  it('should return true if key is ARROW_RIGHT', () => {
    expect(shouldDoNextSlide({ key: ARROW_RIGHT })).toBe(true);
  });

  it('should return true if key is SPACEBAR', () => {
    expect(shouldDoNextSlide({ key: SPACEBAR })).toBe(true);
  });

  it('should return false if key is SPACEBAR and shiftKey is active', () => {
    expect(shouldDoNextSlide({ key: SPACEBAR, shiftKey: true })).toBe(false);
  });

  it('should return false if key is anything else', () => {
    expect(shouldDoNextSlide({ key: ARROW_LEFT })).toBe(false);
  });
});

describe('shouldDoPrevSlide', () => {
  it('should return true if key is ARROW_LEFT', () => {
    expect(shouldDoPrevSlide({ key: ARROW_LEFT })).toBe(true);
  });

  it('should return true if key is SPACEBAR and shiftKey is active', () => {
    expect(shouldDoPrevSlide({ key: SPACEBAR, shiftKey: true })).toBe(true);
  });

  it('should return false if key is SPACEBAR and shiftKey is not active', () => {
    expect(shouldDoPrevSlide({ key: SPACEBAR, shiftKey: false })).toBe(false);
  });

  it('should return false if key is anything else', () => {
    expect(shouldDoPrevSlide({ key: ARROW_RIGHT })).toBe(false);
  });
});

describe('getProgressPercentage', () => {
  it('returns 0 when passed total of 0', () => {
    const percentage = getProgressPercentage(1, 0);
    expect(percentage).toBe(0);
  });

  it('returns 0 when passed current less than 0', () => {
    const percentage = getProgressPercentage(-1, 1);
    expect(percentage).toBe(0);
  });

  it('returns 100 when passed current equal to total', () => {
    const percentage = getProgressPercentage(1, 1);
    expect(percentage).toBe(100);
  });

  it('returns 100 when passed current larger than total', () => {
    const percentage = getProgressPercentage(2, 1);
    expect(percentage).toBe(100);
  });

  it('returns 50 when passed current 1/2 of total', () => {
    const percentage = getProgressPercentage(1, 2);
    expect(percentage).toBe(50);
  });

  it('returns 25 when passed current 1/4 of total', () => {
    const percentage = getProgressPercentage(1, 4);
    expect(percentage).toBe(25);
  });
});

describe('getNextOrPrevLabel', () => {
  it('returns LABEL_PREV by default', () => {
    expect(getNextOrPrevLabel()).toBe(LABEL_PREV);
  });

  it('returns LABEL_PREV when passed direction DECREMENT', () => {
    expect(getNextOrPrevLabel(DECREMENT)).toBe(LABEL_PREV);
  });

  it('returns LABEL_NEXT when passed direction INCREMENT', () => {
    expect(getNextOrPrevLabel(INCREMENT)).toBe(LABEL_NEXT);
  });
});

describe('getCounterLabel', () => {
  it('returns null when total is 0', () => {
    expect(getCounterLabel(0, 0)).toBe(null);
  });

  it('returns x of x when total is passed', () => {
    expect(getCounterLabel(0, 1)).toBe('1 of 1');
  });

  it('returns current adjusted from array index', () => {
    expect(getCounterLabel(1, 2)).toBe('2 of 2');
  });
});
