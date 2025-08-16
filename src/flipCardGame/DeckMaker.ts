import Card from "./Card";
import type { ICard, CardData } from "./types/card";
import { nanoid } from "nanoid";

class DeckMaker {
  private static transformDataToCards(data: CardData[]): ICard[] {
    return data.map((item) => Card.fromData(item));
  }

  private static duplicateCards(cards: ICard[]): ICard[] {
    const duplicatedCards: ICard[] = [...cards];

    cards.forEach((card) => {
      duplicatedCards.push({
        ...card,
        id: nanoid(),
      });
    });

    return duplicatedCards;
  }

  public static createDeck(data: CardData[]): ICard[] {
    const cards = this.transformDataToCards(data);

    const duplicatedCards = this.duplicateCards(cards);

    return duplicatedCards;
  }
}

export default DeckMaker;
