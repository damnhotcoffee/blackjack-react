import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import shuffle from 'lodash/fp/shuffle';
import reduce from 'lodash/fp/reduce';
import sortedUniq from 'lodash/fp/sortedUniq';
import reject from 'lodash/fp/reject';
import min from 'lodash/fp/min';
import clamp from 'lodash/clamp';

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

function makeCard(rank, suit) {
  return {
    rank,
    suit,
  };
}

export function newDeck() {
  return compose(
    shuffle,
    flatten,
    map(suit => RANKS.map(rank => makeCard(rank, suit))),
  )(Object.keys(SUIT_UNICODE_BASE));
}

export function possibleSums(cards) {
  return reduce((sums, card) => {
    const v = clamp(card.rank, 10);
    if (v === 1) {
      return compose(
        sortedUniq,
        flatten,
        map(x => [x + 1, x + 11]),
      )(sums);
    }
    return map(x => x + v)(sums);
  }, [0], cards);
}

export function eligibleSums(cards) {
  const s = possibleSums(cards);
  const good = reject(x => x > 21, s);
  if (good.length > 0) {
    return {
      good,
    };
  }
  return {
    leastbad: min(s),
  };
}
