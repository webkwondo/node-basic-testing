// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 2, b: 3, action: Action.Add})).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 7, b: 4, action: Action.Subtract})).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 3, b: 5, action: Action.Multiply})).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 12, b: 4, action: Action.Divide})).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 2, b: 3, action: Action.Exponentiate})).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 5, b: 2, action: 'invalid'})).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: '3', b: '1', action: Action.Add})).toBe(null);
  });
});
