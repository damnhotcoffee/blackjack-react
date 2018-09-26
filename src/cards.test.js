import { cardToUnicode, newDeck } from './cards';

test('cardToUnicode works with Jack of Hearts', () => {
  expect(cardToUnicode(11, 'h')).toBe('🂻');
});

test('cardToUnicode works with Knight of Hearts even though it\'s weird', () => {
  expect(cardToUnicode(12, 'h')).toBe('🂼');
});

test('newDeck has 52 cards', () => {
  expect(newDeck().length).toBe(52);
});
