export interface CardData {
  title: string;
  image: string;
}

export interface ICard {
  id: string;
  title: string;
  image: string;
  isMatched: boolean;
  isMatch: (card: ICard) => boolean;
}

export interface ICardDeck {
  deck: ICard[];
  shuffle: () => void;
  findCardById: (id: string) => ICard | undefined;
  match: (id1: string, id2: string) => boolean;
}

export interface IFlipCardGame {
  cardDeck: ICardDeck;
  draw: (id1: string, id2: string) => void;

  score: number;
  moves: number;
  status: TFlipCardGameStatus;
}

export type TFlipCardGameStatus = "playing" | "beforeStart" | "ended";
