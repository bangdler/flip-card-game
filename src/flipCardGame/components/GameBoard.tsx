import React, { useEffect, useState } from "react";
import { useFlipCardGameStore } from "../store/flipCardGameStore";
import GameCard from "./GameCard";
import type { ICard } from "../types/card";

const GameBoard: React.FC = () => {
  const [selectedCard1, setSelectedCard1] = useState<ICard | null>(null);
  const [selectedCard2, setSelectedCard2] = useState<ICard | null>(null);

  const { game, initializeGame, resetGame, shuffleCards, drawCards } =
    useFlipCardGameStore();

  const isFlipped = (card: ICard) => {
    return card.isMatched || selectedCard1?.id === card.id || selectedCard2?.id === card.id;
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

  const getGameStatusText = () => {
    if (!game) return "게임을 초기화하는 중...";

    switch (game.status) {
      case "beforeStart":
        return "게임을 시작하세요!";
      case "playing":
        return "카드를 찾아보세요!";
      case "ended":
        return "축하합니다! 모든 카드를 찾았습니다!";
      default:
        return "";
    }
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (selectedCard1 && selectedCard2) {
      setTimeout(() => {
        drawCards(selectedCard1.id, selectedCard2.id);
        setSelectedCard1(null);
        setSelectedCard2(null);
      }, 1000);
    }
  }, [selectedCard1, selectedCard2, drawCards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 게임 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎴 카드 뒤집기 게임
          </h1>
          <p className="text-lg text-gray-600 mb-6">{getGameStatusText()}</p>

          {/* 게임 정보 */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {game?.score || 0}
              </div>
              <div className="text-sm text-gray-600">점수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {game?.moves || 0}
              </div>
              <div className="text-sm text-gray-600">턴</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {game
                  ? game.cardDeck.deck.filter((card) => card.isMatched).length /
                    2
                  : 0}
              </div>
              <div className="text-sm text-gray-600">매치</div>
            </div>
          </div>

          {/* 게임 컨트롤 */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={shuffleCards}
              className="px-6 py-3 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              🔀 카드 섞기
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-red-500  font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              🔄 게임 리셋
            </button>
          </div>
        </div>

        {/* 5초 타이머 프로그레스바 */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            {selectedCard1 && !selectedCard2 ? (
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-progress"
                onAnimationEnd={() => {
                  setSelectedCard1(null);
                }}
              />
            ) : (
              <div className="h-full bg-gray-300 rounded-full" />
            )}
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            {selectedCard1 && !selectedCard2
              ? "5초 타이머"
              : "카드를 선택하세요"}
          </div>
        </div>

        {/* 게임 보드 */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {game?.cardDeck.deck ? (
            <div className="grid grid-cols-6 gap-1 justify-items-center">
              {game.cardDeck.deck.map((card) => (
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
          ) : (
            <div className="text-center text-gray-500 py-12">
              카드를 불러오는 중...
            </div>
          )}
        </div>

        {/* 게임 규칙 */}
        <div className="mt-8 text-center text-gray-600">
          <h3 className="text-lg font-semibold mb-2">게임 규칙</h3>
          <p className="text-sm">
            같은 12지 동물 카드를 찾아서 매치하세요!
            <br />
            매치할 때마다 10점을 얻고, 모든 카드를 찾으면 게임 클리어!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
