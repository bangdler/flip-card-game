import type { ICardDeck, IFlipCardGame, TFlipCardGameStatus } from "./types/card";

class FlipCardGame implements IFlipCardGame {
  cardDeck: ICardDeck;
  score: number;
  moves: number;
  status: TFlipCardGameStatus;

  constructor(cardDeck: ICardDeck) {
    this.cardDeck = cardDeck;
    this.score = 0;
    this.moves = 0;
    this.status = "beforeStart";
  }

  draw(id1: string, id2: string) {
    const isMatch = this.cardDeck.match(id1, id2);
    if (this.status === "beforeStart") {
      this.status = "playing";
    }

    if (isMatch) {
      this.score += 1;
      this.moves += 1;
    }

    if (this.cardDeck.deck.every((card) => card.isMatched)) {
      this.status = "ended";
    }
  }
}

export default FlipCardGame;
