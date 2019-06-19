import { oneOfType, func, shape, instanceOf } from 'prop-types';

export const refType = oneOfType([func, shape({ current: instanceOf(Element) })]);
