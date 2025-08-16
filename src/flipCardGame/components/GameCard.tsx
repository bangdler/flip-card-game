import React from "react";
import type { ICard } from "../types/card";
import TiltedCard from "../../components/TiltedCard";

interface GameCardProps {
  card: ICard;
  isFlipped: boolean;
  onClick: (card: ICard) => void;
  disabled: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  card,
  isFlipped,
  onClick,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(card);
    }
  };

  return (
    <div onClick={handleClick}>
      <TiltedCard
        frontImageSrc={card.image}
        backImageSrc={"./card-back.png"}
        isFlipped={isFlipped}
        containerHeight={"150px"}
        containerWidth={"100px"}
        imageWidth={"100px"}
        imageHeight={"150px"}
        disableFlip={disabled}
      ></TiltedCard>
    </div>
  );
};

export default GameCard;
