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
  match: (id1: string, id2: string) => DrawResult | null;
  allFlipBack: () => void;
}

export interface IFlipCardGame {
  cardDeck: ICardDeck;
  draw: (id1: string, id2: string) => IFlipCardGame;
  shuffle: () => IFlipCardGame;
  isAllMatched: () => boolean;
  score: number;
  moves: number;
  status: TFlipCardGameStatus;
  drawHistory: DrawResult[];
}

export interface DrawResult {
  drawCards: [ICard, ICard];
  isMatch: boolean;
}

export type TFlipCardGameStatus = "playing" | "beforeStart" | "ended";
