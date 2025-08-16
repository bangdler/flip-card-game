import { describe, it, expect, beforeEach } from "vitest";
import DeckMaker from "../DeckMaker";
import type { CardData } from "../types/card";

describe("DeckMaker", () => {
  let mockAnimalData: CardData[];

  beforeEach(() => {
    mockAnimalData = [
      {
        title: "Lion",
        image: "https://example.com/lion.jpg",
      },
      {
        title: "Elephant",
        image: "https://example.com/elephant.jpg",
      },
      {
        title: "Giraffe",
        image: "https://example.com/giraffe.jpg",
      },
    ];
  });

  describe("덱 생성하기", () => {
    it("덱 생성 시 각 카드에 고유한 ID가 부여된다.", () => {
      // Given
      const animalData = mockAnimalData;

      // When   
      const deck = DeckMaker.createDeck(animalData);
      const ids = deck.map((card) => card.id);

      // Then
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(6);
      expect(ids.length).toBe(6);
    });

    it("덱 생성 시 각 카드에 올바른 구조로 생성된다.", () => {
      // Given
      const animalData = mockAnimalData;

      // When
      const deck = DeckMaker.createDeck(animalData);

      // Then
      deck.forEach((card) => {
        expect(card).toHaveProperty("id");
        expect(card).toHaveProperty("title");
        expect(card).toHaveProperty("image");
        expect(card).toHaveProperty("isMatched");

        expect(typeof card.id).toBe("string");
        expect(typeof card.title).toBe("string");
        expect(typeof card.image).toBe("string");
        expect(typeof card.isMatched).toBe("boolean");
        expect(card.isMatched).toBe(false);
      });
    });

    it("덱 생성 시 각 카드 종류가 정확히 2장씩 있다.", () => {
      // Given
      const animalData = mockAnimalData;

      // When
      const deck = DeckMaker.createDeck(animalData);

      // Then
      const titles = deck.map((card) => card.title);

      expect(titles.filter((title) => title === "Lion")).toHaveLength(2);
      expect(titles.filter((title) => title === "Elephant")).toHaveLength(2);
      expect(titles.filter((title) => title === "Giraffe")).toHaveLength(2);
    });

    it("덱 생성 시 각 카드의 isMatched 값은 false로 초기화된다.", () => {
      // Given
      const animalData = mockAnimalData;

      // When
      const deck = DeckMaker.createDeck(animalData);

      // Then
      deck.forEach((card) => {
        expect(card.isMatched).toBe(false);
      });
    });

    it("빈 데이터로 덱을 생성할 때 빈 배열을 반환한다.", () => {
      // Given
      const emptyAnimalData: CardData[] = [];

      // When
      const deck = DeckMaker.createDeck(emptyAnimalData);

      // Then
      expect(deck).toHaveLength(0);
      expect(Array.isArray(deck)).toBe(true);
    });
  });
});
