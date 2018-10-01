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
    const deck = newDeck();
    const playerCards = [deck.pop()];
    this.state = {
      deck,
      playerCards,
    };
  }

  dealCard() {
    const { deck, playerCards } = this.state;
    playerCards.push(deck.pop());
    this.setState({
      deck,
      playerCards,
    });
  }

  render() {
    const sums = eligibleSums(this.state.playerCards);

    const sumsBlock = 'good' in sums
      ? sums.good.join('/')
      : `You lose! ${sums.leastbad}`;

    const buttons = ['Hit', 'Stand'];

    return (
      <div className="board">
        <div className="sums-block">{sumsBlock}</div>
        <div className="card-holder">
          {this.state.playerCards.map(card => (
            <Card
              key={cardToUnicode(card.rank, card.suit)}
              rank={card.rank}
              suit={card.suit}
            />
          ))}
        </div>
        <div className="button-holder">
          {buttons.map(name => (
            <button
              type="button"
              key={name}
              onClick={() => this.dealCard()}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
