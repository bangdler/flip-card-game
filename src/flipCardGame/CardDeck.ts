import type { DrawResult, ICard, ICardDeck } from "./types/card";

class CardDeck implements ICardDeck {
  readonly deck: ICard[];


  constructor(cards: ICard[]) {
    this.deck = cards;
  }


  shuffle(): void {
    this.deck.sort(() => Math.random() - 0.5);
  }

  findCardById(id: string): ICard | undefined {
    return this.deck.find((card) => card.id === id)!;
  }
  
  match(id1: string, id2: string): DrawResult | null {
    const card1 = this.findCardById(id1);
    const card2 = this.findCardById(id2);

    if (!card1 || !card2) {
      return null
    }

    const isMatched = card1.isMatch(card2);

    if (isMatched) {
      card1.isMatched = true;
      card2.isMatched = true;
    }

    return {
      drawCards: [card1, card2],
      isMatch: isMatched,
    };
  }

  allFlipBack(): void {
    this.deck.forEach((card) => {
      card.isMatched = false;
    });
  }
}

export default CardDeck;
