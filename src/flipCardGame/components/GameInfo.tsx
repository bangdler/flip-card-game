import type { IFlipCardGame } from "../types/card";

interface Props {
  game: IFlipCardGame;
}

const GameInfo = ({ game }: Props) => {
  const getGameStatusText = () => {
    switch (game.status) {
      case "beforeStart":
        return "게임 시작";
      case "playing":
        return "카드 찾는 중...";
      case "ended":
        return "게임 종료";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center space-x-8 mb-6">
        <p className="text-lg text-gray-600">{getGameStatusText()}</p>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{game?.score || 0}</p>
          <p className="text-sm text-gray-600">점수</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {game?.moves || 0}
          </p>
          <p className="text-sm text-gray-600">턴</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">
            {game
              ? game.cardDeck.deck.filter((card) => card.isMatched).length / 2
              : 0}
          </p>
          <div className="text-sm text-gray-600">매치</div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
