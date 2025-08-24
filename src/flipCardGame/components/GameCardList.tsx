import GameCard from "./GameCard";
import type { ICard, ICardDeck } from "../types/card";

interface Props {
  cardDeck: ICardDeck;
  selectedCard1: ICard | null;
  selectedCard2: ICard | null;
  setSelectedCard1: (card: ICard | null) => void;
  setSelectedCard2: (card: ICard | null) => void;
}

const GameCardList = ({
  cardDeck,
  selectedCard1,
  selectedCard2,
  setSelectedCard1,
  setSelectedCard2,
}: Props) => {
  const isFlipped = (card: ICard) => {
    return (
      card.isMatched ||
      selectedCard1?.id === card.id ||
      selectedCard2?.id === card.id
    );
  };

  const isDisabled = (card: ICard) => {
    return (
      (selectedCard1 !== null && selectedCard2 !== null) ||
      selectedCard1?.id === card.id ||
      selectedCard2?.id === card.id ||
      card.isMatched
    );
  };

  const handleCardClick = (card: ICard) => {
    if (!card.isMatched) {
      if (selectedCard1 === null) {
        setSelectedCard1(card);
      } else if (selectedCard2 === null) {
        setSelectedCard2(card);
      }
    }
  };

  return (
    <div className="grid grid-cols-6 gap-1 justify-items-center">
      {cardDeck.deck.map((card) => (
        <GameCard
          key={card.id}
          card={card}
          isFlipped={isFlipped(card)}
          onClick={handleCardClick}
          disabled={isDisabled(card)}
          defaultFlipRotation={180}
        />
      ))}
    </div>
  );
};

export default GameCardList;
