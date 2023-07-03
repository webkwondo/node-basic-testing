// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cbFn = jest.fn();
    const timeout = 800;
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cbFn, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    const cbFn = jest.fn();
    const timeout = 800;

    doStuffByTimeout(cbFn, timeout);

    expect(cbFn).not.toBeCalled();

    jest.runAllTimers();

    expect(cbFn).toBeCalled();
    expect(cbFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cbFn = jest.fn();
    const interval = 200;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(cbFn, interval);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cbFn = jest.fn();
    const interval = 200;
    const intervalsNum = 5;

    doStuffByInterval(cbFn, interval);

    expect(cbFn).not.toBeCalled();

    jest.advanceTimersByTime(interval * intervalsNum);

    expect(cbFn).toBeCalled();
    expect(cbFn).toHaveBeenCalledTimes(intervalsNum);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'file.txt';
    const fullPath = 'full/path/to/file.txt';

    (existsSync as jest.Mock<boolean>).mockReturnValue(false);
    (join as jest.Mock<string>).mockReturnValue(fullPath);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
    expect(existsSync).toHaveBeenCalledWith(fullPath);
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'file.txt';
    const fullPath = 'full/path/to/file.txt';
    const fileContent = 'Some file content';

    (existsSync as jest.Mock<boolean>).mockReturnValue(true);
    (join as jest.Mock<string>).mockReturnValue(fullPath);
    (readFile as jest.Mock<Promise<Buffer | string>>).mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
    expect(existsSync).toHaveBeenCalledWith(fullPath);
    expect(readFile).toHaveBeenCalledWith(fullPath);
  });
});
