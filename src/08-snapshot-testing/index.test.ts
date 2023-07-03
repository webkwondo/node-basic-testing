// Uncomment the code below and write your tests
import { LinkedListNode, generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3, 4, 5];
    const expectedLinkedList: LinkedListNode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null
              }
            }
          }
        }
      }
    };

    const result = generateLinkedList(values);

    expect(result).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c'];
    const expectedLinkedList: LinkedListNode<string> = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: null,
            next: null
          }
        }
      }
    };

    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot(expectedLinkedList);
  });
});
