export interface CardData {
  title: string;
  image: string;
}

export interface Card {
  id: string;
  title: string;
  image: string;
  isMatched: boolean;
}

export interface CardDeck {
  deck: Card[];
  shuffle: () => void;
  isMatch: (card1: Card, card2: Card) => boolean;
}

export interface FlipCardGame {
  cardDeck: CardDeck;
  draw: (card1: Card, card2: Card) => void;

  score: number;
  moves: number;
  time: number;
  isGameOver: boolean;
  isGameWon: boolean;
  isGameLost: boolean;
}
