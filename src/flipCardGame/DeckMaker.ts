import type { Card, CardData } from "./types/card";
import { nanoid } from "nanoid";

class DeckMaker {
  private static transformDataToCards(data: CardData[]): Card[] {
    return data.map((item) => ({
      id: nanoid(),
      title: item.title,
      image: item.image,
      isMatched: false,
    }));
  }

  private static duplicateCards(cards: Card[]): Card[] {
    const duplicatedCards: Card[] = [...cards];

    cards.forEach((card) => {
      duplicatedCards.push({
        ...card,
        id: nanoid(),
      });
    });

    return duplicatedCards;
  }

  public static createDeck(data: CardData[]): Card[] {
    const cards = this.transformDataToCards(data);

    const duplicatedCards = this.duplicateCards(cards);

    return duplicatedCards;
  }
}

export default DeckMaker;
