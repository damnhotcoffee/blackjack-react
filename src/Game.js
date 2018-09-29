import React from 'react';
import './Game.css';

import { cardToUnicode, newDeck, eligibleSums } from './cards';

function Card(props) {
  return (
    <div className={`card card-${props.suit}`}>
      {cardToUnicode(props.rank, props.suit)}
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: newDeck(),
    };
  }

  render() {
    const playerCards = this.state.deck.slice(0, 4);
    const sums = eligibleSums(playerCards);

    const sumsBlock = 'good' in sums
      ? <div>{sums.good.join('/')}</div>
      : <div>You lose! {sums.leastbad}</div>;

    return (
      <div className="board">
        {sumsBlock}
        <div className="card-holder">
          {playerCards.map(card => (
            <Card
              key={cardToUnicode(card.rank, card.suit)}
              rank={card.rank}
              suit={card.suit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
