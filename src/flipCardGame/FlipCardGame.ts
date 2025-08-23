import type {
  ICardDeck,
  IFlipCardGame,
  TFlipCardGameStatus,
  DrawResult,
} from "./types/card";

class FlipCardGame implements IFlipCardGame {
  cardDeck: ICardDeck;
  score: number;
  moves: number;
  status: TFlipCardGameStatus;
  drawHistory: DrawResult[];

  constructor(
    cardDeck: ICardDeck,
    score: number,
    moves: number,
    status: TFlipCardGameStatus,
    drawHistory: DrawResult[]
  ) {
    this.cardDeck = cardDeck;
    this.score = score;
    this.moves = moves;
    this.status = status;
    this.drawHistory = drawHistory;
  }

  draw(id1: string, id2: string): IFlipCardGame {
    const isMatch = this.cardDeck.match(id1, id2);
    if (!isMatch) return this;

    if (this.status === "beforeStart") {
      this.status = "playing";
    }

    if (isMatch.isMatch) {
      this.score += 1;
    }

    if (this.isAllMatched()) {
      this.status = "ended";
    }

    this.moves += 1;
    this.drawHistory.push(isMatch);

    return new FlipCardGame(
      this.cardDeck,
      this.score,
      this.moves,
      this.status,
      this.drawHistory
    );
  }

  shuffle(): IFlipCardGame {
    this.cardDeck.shuffle();
    return new FlipCardGame(
      this.cardDeck,
      this.score,
      this.moves,
      this.status,
      this.drawHistory
    );
  }

  isAllMatched(): boolean {
    return this.cardDeck.deck.every((card) => card.isMatched);
  }
}

export default FlipCardGame;
