import { cardToUnicode, newDeck, possibleSums } from './cards';

test('cardToUnicode works with Jack of Hearts', () => {
  expect(cardToUnicode(11, 'h')).toBe('🂻');
});

test('cardToUnicode works with Knight of Hearts even though it\'s weird', () => {
  expect(cardToUnicode(12, 'h')).toBe('🂼');
});

test('newDeck has 52 cards', () => {
  expect(newDeck().length).toBe(52);
});

test('possibleSums works for non-aces', () => {
  expect(possibleSums(
    { rank: 2, suit: 'h' },
  )).toEqual([2]);
  expect(possibleSums(
    { rank: 2, suit: 'h' },
    { rank: 5, suit: 'h' },
  )).toEqual([7]);
  expect(possibleSums(
    { rank: 14, suit: 'h' },
  )).toEqual([10]);
  expect(possibleSums(
    { rank: 14, suit: 'h' },
    { rank: 10, suit: 'c' },
  )).toEqual([20]);
});

test('possibleSums works for aces', () => {
  expect(possibleSums(
    { rank: 1, suit: 'h' },
  )).toEqual([1, 11]);
  expect(possibleSums(
    { rank: 1, suit: 'h' },
    { rank: 1, suit: 'c' },
  )).toEqual([2, 12, 22]);
  expect(possibleSums(
    { rank: 5, suit: 'h' },
    { rank: 1, suit: 'c' },
    { rank: 7, suit: 'c' },
  )).toEqual([13, 23]);
  expect(possibleSums(
    { rank: 5, suit: 'h' },
    { rank: 1, suit: 'c' },
    { rank: 1, suit: 'h' },
  )).toEqual([7, 17, 27]);
});
