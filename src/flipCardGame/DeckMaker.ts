import Card from "./Card";
import type { ICard, CardData } from "./types/card";

class DeckMaker {
  private static duplicateData(data: CardData[]): CardData[] {
    return [...data, ...data];
  }

  private static transformDataToCards(data: CardData[]): ICard[] {
    return data.map((item) => {
      return Card.fromData(item);
    });
  }

  public static createDeck(data: CardData[]): ICard[] {
    const duplicatedData = this.duplicateData(data);
    const cards = this.transformDataToCards(duplicatedData);
    return cards;
  }
}

export default DeckMaker;
