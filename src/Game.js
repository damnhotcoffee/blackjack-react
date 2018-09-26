import React from 'react';

import { cardToUnicode, newDeck } from './cards';

function Card(props) {
  return (
    <div className="card">
      {props.rank}{props.suit}
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
    const playerCards = this.state.deck.slice(0, 2);

    return (
      <div className="Board">
        {playerCards.map(card => (
          <Card
            key={cardToUnicode(card.rank, card.suit)}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>
    );
  }
}

export default Game;
