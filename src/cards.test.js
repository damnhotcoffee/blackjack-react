import {
  cardToUnicode, newDeck, possibleSums, eligibleSums, winningHands,
} from './cards';

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
  expect(possibleSums([
    { rank: 2, suit: 'h' },
  ])).toEqual([2]);
  expect(possibleSums([
    { rank: 2, suit: 'h' },
    { rank: 5, suit: 'h' },
  ])).toEqual([7]);
  expect(possibleSums([
    { rank: 14, suit: 'h' },
  ])).toEqual([10]);
  expect(possibleSums([
    { rank: 14, suit: 'h' },
    { rank: 10, suit: 'c' },
  ])).toEqual([20]);
});

test('possibleSums works for aces', () => {
  expect(possibleSums([
    { rank: 1, suit: 'h' },
  ])).toEqual([1, 11]);
  expect(possibleSums([
    { rank: 1, suit: 'h' },
    { rank: 1, suit: 'c' },
  ])).toEqual([2, 12, 22]);
  expect(possibleSums([
    { rank: 5, suit: 'h' },
    { rank: 1, suit: 'c' },
    { rank: 7, suit: 'c' },
  ])).toEqual([13, 23]);
  expect(possibleSums([
    { rank: 5, suit: 'h' },
    { rank: 1, suit: 'c' },
    { rank: 1, suit: 'h' },
  ])).toEqual([7, 17, 27]);
});

test('eligibleSums works: good cases', () => {
  expect(eligibleSums([])).toEqual({ good: [0] });
  expect(eligibleSums([
    { rank: 5, suit: 'c' },
  ])).toEqual({ good: [5] });
  expect(eligibleSums([
    { rank: 1, suit: 'h' },
    { rank: 1, suit: 'c' },
  ])).toEqual({ good: [2, 12] });
  expect(eligibleSums([
    { rank: 5, suit: 'h' },
    { rank: 1, suit: 'c' },
    { rank: 1, suit: 'h' },
  ])).toEqual({ good: [7, 17] });
  expect(eligibleSums([
    { rank: 5, suit: 'h' },
    { rank: 1, suit: 'c' },
    { rank: 7, suit: 'c' },
  ])).toEqual({ good: [13] });
  expect(eligibleSums([
    { rank: 11, suit: 'h' },
    { rank: 11, suit: 'c' },
    { rank: 1, suit: 'c' },
  ])).toEqual({ good: [21] });
});

test('eligibleSums works: bad cases', () => {
  expect(eligibleSums([
    { rank: 7, suit: 'h' },
    { rank: 10, suit: 'c' },
    { rank: 5, suit: 'c' },
  ])).toEqual({ leastbad: 22 });
  expect(eligibleSums([
    { rank: 3, suit: 'h' },
    { rank: 13, suit: 'c' },
    { rank: 1, suit: 'c' },
    { rank: 14, suit: 'c' },
  ])).toEqual({ leastbad: 24 });
  expect(eligibleSums([
    { rank: 2, suit: 'h' },
    { rank: 14, suit: 's' },
    { rank: 1, suit: 'c' },
    { rank: 9, suit: 'c' },
  ])).toEqual({ leastbad: 22 });
});

test('winningHand works', () => {
  expect(winningHands(
    [
      { rank: 2, suit: 'h' },
    ],
    [
      { rank: 3, suit: 'h' },
    ],
  )).toEqual([1]);
  expect(winningHands(
    [
      { rank: 2, suit: 'h' },
      { rank: 7, suit: 'h' },
      { rank: 5, suit: 'h' },
      { rank: 6, suit: 'h' },
    ],
    [
      { rank: 1, suit: 'h' },
      { rank: 9, suit: 'h' },
      { rank: 14, suit: 'h' },
    ],
  )).toEqual([0, 1]);
  expect(winningHands(
    [
      { rank: 10, suit: 'h' },
      { rank: 13, suit: 'h' },
    ],
    [
      { rank: 9, suit: 'h' },
      { rank: 2, suit: 'h' },
      { rank: 3, suit: 'h' },
    ],
  )).toEqual([0]);
});
