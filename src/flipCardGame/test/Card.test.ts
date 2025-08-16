import { describe, it, expect, beforeEach } from "vitest";
import Card from "../Card";

describe("Card", () => {
  let mockCardData: { title: string; image: string };

  beforeEach(() => {
    // 테스트용 mock 데이터
    mockCardData = {
      title: "Lion",
      image: "https://example.com/lion.jpg",
    };
  });

  describe("새로운 클래스 생성", () => {
    it("생성자로 전달된 모든 값이 올바르게 저장된다.", () => {
      // Given
      const id = "card_123";
      const title = "Lion";
      const image = "https://example.com/lion.jpg";
      const isMatched = false;

      // When
      const card = new Card(id, title, image, isMatched);

      // Then
      expect(card.id).toBe(id);
      expect(card.title).toBe(title);
      expect(card.image).toBe(image);
      expect(card.isMatched).toBe(isMatched);
    });

    it("fromData 정적 메서드로 카드를 생성할 수 있다.", () => {
    // Given
      const cardData = mockCardData;

      // When
      const card = Card.fromData(cardData);

      // Then
      expect(card).toBeInstanceOf(Card);
      expect(card.title).toBe(cardData.title);
      expect(card.image).toBe(cardData.image);
      expect(card.isMatched).toBe(false);
      expect(card.id.length).toBeGreaterThan(0);
    });
  });

  describe("isMatch 기능", () => {
    it("같은 title을 가진 카드들이 매치된다.", () => {
      // Given
      const card1 = new Card(
        "card_1",
        "Lion",
        "https://example.com/lion1.jpg",
        false
      );
      const card2 = new Card(
        "card_2",
        "Lion",
        "https://example.com/lion2.jpg",
        false
      );

      // When
      const result1 = card1.isMatch(card2);
      const result2 = card2.isMatch(card1);

      // Then
      expect(result1).toBe(true);
      expect(result2).toBe(true);
    });

    it("다른 title을 가진 카드들은 매치되지 않는다.", () => {
      // Given
      const card1 = new Card(
        "card_1",
        "Lion",
        "https://example.com/lion.jpg",
        false
      );
      const card2 = new Card(
        "card_2",
        "Elephant",
        "https://example.com/elephant.jpg",
        false
      );

      // When
      const result1 = card1.isMatch(card2);
      const result2 = card2.isMatch(card1);

      // Then
      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
  });
});
