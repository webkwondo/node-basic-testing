// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 6, action: Action.Subtract, expected: 2 },
  { a: 5, b: 7, action: Action.Multiply, expected: 35 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: 'invalid', expected: null },
  { a: '3', b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should calculate $a $action $b', ({a, b, action, expected}) => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  });
});
