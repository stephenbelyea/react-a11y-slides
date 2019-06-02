import { func, shape, oneOfType, instanceOf } from 'prop-types';

const refType = oneOfType([func, shape({ current: instanceOf(Element) })]);

export default { refType };
