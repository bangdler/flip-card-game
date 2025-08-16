import { nanoid } from "nanoid";
import type { ICard, CardData } from "./types/card";

export default class Card implements ICard {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  isMatched: boolean;

  constructor(id: string, title: string, image: string, isMatched: boolean) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.isMatched = isMatched;
  }

  isMatch(card: ICard): boolean {
    return this.title === card.title;
  }

  static fromData(data: CardData): ICard {
    return new Card(nanoid(), data.title, data.image, false);
  }
}
