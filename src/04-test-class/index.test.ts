// Uncomment the code below and write your tests
import { getBankAccount, BankAccount, SynchronizationFailedError } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const amount = 100000;
    const account = getBankAccount(amount);
    expect(account instanceof BankAccount).toBe(true);
    expect(account.getBalance()).toBe(amount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const amount = 100000;
    const withdrawAmount = 200000;
    const account = getBankAccount(amount);
    const expectedErrorMsg = `Insufficient funds: cannot withdraw more than ${amount}`;
    expect(() => { account.withdraw(withdrawAmount); }).toThrow(expectedErrorMsg);
  });

  test('should throw error when transferring more than balance', () => {
    const amount = 100000;
    const transferAmount = 200000;
    const fromAccount = getBankAccount(amount);
    const toAccount = getBankAccount(amount);
    const expectedErrorMsg = `Insufficient funds: cannot withdraw more than ${amount}`;
    expect(() => { fromAccount.transfer(transferAmount, toAccount); }).toThrow(expectedErrorMsg);
  });

  test('should throw error when transferring to the same account', () => {
    const amount = 100000;
    const transferAmount = 5000;
    const fromAccount = getBankAccount(amount);
    const toAccount = fromAccount;
    const expectedErrorMsg = 'Transfer failed';
    expect(() => { fromAccount.transfer(transferAmount, toAccount); }).toThrow(expectedErrorMsg);
  });

  test('should deposit money', () => {
    const amount = 100000;
    const depositAmount = 50000;
    const expectedAmount = amount + depositAmount;
    const account = getBankAccount(amount);
    expect(account.deposit(depositAmount).getBalance()).toBe(expectedAmount);
  });

  test('should withdraw money', () => {
    const amount = 100000;
    const withdrawAmount = 50000;
    const expectedAmount = amount - withdrawAmount;
    const account = getBankAccount(amount);
    expect(account.withdraw(withdrawAmount).getBalance()).toBe(expectedAmount);
  });

  test('should transfer money', () => {
    const fromAmount = 100000;
    const toAmount = 50000;
    const transferAmount = 5000;
    const fromAccount = getBankAccount(fromAmount);
    const toAccount = getBankAccount(toAmount);
    const expectedFromAmount = fromAmount - transferAmount;
    const expectedToAmount = toAmount + transferAmount;
    expect(fromAccount.transfer(transferAmount, toAccount).getBalance()).toBe(expectedFromAmount);
    expect(toAccount.getBalance()).toBe(expectedToAmount);
  });

  test('fetchBalance should return number in case request did not fail', async () => {
    const amount = 100000;
    const account = getBankAccount(amount);
    const fetchedBalance = await account.fetchBalance();

    if (fetchedBalance !== null) {
      expect(typeof fetchedBalance).toBe('number');
    } else {
      expect(fetchedBalance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const amount = 100000;
    const account = getBankAccount(amount);

    // try {
    //   await account.synchronizeBalance();
    //   expect(account.getBalance()).not.toEqual(amount);
    // } catch (e) {}

    const fakeAmount = 97;
    const fakeFetchBalance = jest.fn().mockResolvedValue(fakeAmount);
    account.fetchBalance = fakeFetchBalance;

    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(fakeAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const amount = 100000;
    const account = getBankAccount(amount);

    const fakeAmount = null;
    const fakeFetchBalance = jest.fn().mockResolvedValue(fakeAmount);
    account.fetchBalance = fakeFetchBalance;

    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);

    // try {
    //   await account.synchronizeBalance();
    // } catch (e) {
    //   expect((e instanceof SynchronizationFailedError)).toBe(true);
    // }
  });
});
