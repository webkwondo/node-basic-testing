// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue('some value');
    expect(data).toBe('some value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => { throwError('Error message'); }).toThrow('Error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (e) {
      expect((e as MyAwesomeError).message).toMatch('This is my awesome custom error!');
    }
  });
});
