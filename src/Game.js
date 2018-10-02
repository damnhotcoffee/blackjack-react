import React from 'react';
import './Game.css';

import { cardToUnicode, newDeck, eligibleSums } from './cards';

const DEALER_MESSAGES = {
  preGame: 'Welcome to the table!',
  playerTurn: "Player's turn.",
  dealerTurn: 'Dealing...',
  playerWon: 'You win!',
  dealerWon: 'You lose!',
};

function DealerMessage(props) {
  return (
    <div className="dealer-message">
      {DEALER_MESSAGES[props.state]}
    </div>
  );
}

function Card(props) {
  return (
    <div className={`card card-${props.suit}`}>
      {cardToUnicode(props.rank, props.suit)}
    </div>
  );
}

function CardHolder(props) {
  return (
    <div className="card-holder">
      {props.cards.map(card => (
        <Card
          key={cardToUnicode(card.rank, card.suit)}
          rank={card.rank}
          suit={card.suit}
        />
      ))}
    </div>
  );
}

function SumsBlock(props) {
  const sums = eligibleSums(props.cards);

  const sumsBlock = 'good' in sums
    ? sums.good.join('/')
    : sums.leastbad;

  const sumColor = 'good' in sums ? 'good' : 'bad';

  return (
    <div className={`sums-block color-${sumColor}`}>{sumsBlock}</div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const gameState = 'preGame';
    const deck = newDeck();
    const playerCards = [deck.pop()];
    const dealerCards = [deck.pop()];
    this.state = {
      gameState,
      deck,
      playerCards,
      dealerCards,
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
    const buttons = ['Hit', 'Stand'];

    return (
      <div className="board">
        <div className="dealer-block">
          <DealerMessage state={this.state.gameState} />
          <div className="card-block">
            <SumsBlock cards={this.state.dealerCards} />
            <CardHolder cards={this.state.dealerCards} />
          </div>
        </div>
        <div className="player-block">
          <div className="card-block">
            <SumsBlock cards={this.state.playerCards} />
            <CardHolder cards={this.state.playerCards} />
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
      </div>
    );
  }
}

export default Game;
