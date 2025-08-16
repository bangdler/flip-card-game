import type {
  ICardDeck,
  IFlipCardGame,
  TFlipCardGameStatus,
} from "./types/card";

class FlipCardGame implements IFlipCardGame {
  cardDeck: ICardDeck;
  score: number;
  moves: number;
  status: TFlipCardGameStatus;

  constructor(
    cardDeck: ICardDeck,
    score: number,
    moves: number,
    status: TFlipCardGameStatus
  ) {
    this.cardDeck = cardDeck;
    this.score = score;
    this.moves = moves;
    this.status = status;
  }

  draw(id1: string, id2: string): IFlipCardGame {
    const isMatch = this.cardDeck.match(id1, id2);
    if (this.status === "beforeStart") {
      this.status = "playing";
    }

    if (isMatch) {
      this.score += 1;
    }

    if (this.cardDeck.deck.every((card) => card.isMatched)) {
      this.status = "ended";
    }
    
    this.moves += 1;

    return new FlipCardGame(this.cardDeck, this.score, this.moves, this.status);
  }

  shuffle(): IFlipCardGame {
    this.cardDeck.shuffle();
    return new FlipCardGame(this.cardDeck, this.score, this.moves, this.status);
  }
}

export default FlipCardGame;
