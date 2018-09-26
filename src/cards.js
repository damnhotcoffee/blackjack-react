import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import shuffle from 'lodash/fp/shuffle';

const SUIT_UNICODE_BASE = {
  s: 0x1F0A0,
  h: 0x1F0B0,
  d: 0x1F0C0,
  c: 0x1F0D0,
};
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14];

export function cardToUnicode(rank, suit) {
  return String.fromCodePoint(SUIT_UNICODE_BASE[suit] + parseInt(rank, 10));
}

function makeCard(suit, rank) {
  return {
    suit,
    rank,
  };
}

export function newDeck() {
  return compose(
    shuffle,
    flatten,
    map(suit => RANKS.map(rank => makeCard(suit, rank))),
  )(Object.keys(SUIT_UNICODE_BASE));
}
