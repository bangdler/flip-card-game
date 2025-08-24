import React, { useEffect, useState } from "react";
import { useFlipCardGameStore } from "../store/flipCardGameStore";
import type { ICard } from "../types/card";
import GameCardList from "./GameCardList";
import GameInfo from "./GameInfo";

const GameBoard: React.FC = () => {
  const [selectedCard1, setSelectedCard1] = useState<ICard | null>(null);
  const [selectedCard2, setSelectedCard2] = useState<ICard | null>(null);
  const [showLastDrawResult, setShowLastDrawResult] = useState(false);

  const { game, initializeGame, resetGame, shuffleCards, drawCards } =
    useFlipCardGameStore();

  const lastDrawResult = game?.drawHistory[game.drawHistory.length - 1];

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (selectedCard1 && selectedCard2) {
      setTimeout(() => {
        drawCards(selectedCard1.id, selectedCard2.id);
        setSelectedCard1(null);
        setSelectedCard2(null);
        setShowLastDrawResult(true);
      }, 1000);
    }
  }, [selectedCard1, selectedCard2, drawCards]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (lastDrawResult) {
      timer = setTimeout(() => {
        setShowLastDrawResult(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [lastDrawResult]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 게임 헤더 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            카드 뒤집기 게임
          </h2>

          {/* 게임 규칙 */}
          <div className="my-4 text-center text-gray-600">
            <p className="text-sm">
              같은 동물 카드를 찾아서 매치하세요!
              <br />
              모든 카드를 찾으면 게임 클리어!
            </p>
          </div>

          {/* 게임 정보 */}
          {game && <GameInfo game={game} />}

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
          <div className={"text-center text-sm text-gray-600 mt-2"}>
            5초 타이머
          </div>
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
          {showLastDrawResult ? (
            <div className="text-center text-sm text-gray-600 mt-2">
              {lastDrawResult?.isMatch ? "매치!" : "노매치!"}
            </div>
          ) : (
            <div className="text-center text-sm text-gray-600 mt-2">
              카드를 선택하세요
            </div>
          )}
        </div>

        {/* 게임 보드 */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {game ? (
            <GameCardList
              cardDeck={game.cardDeck}
              selectedCard1={selectedCard1}
              selectedCard2={selectedCard2}
              setSelectedCard1={setSelectedCard1}
              setSelectedCard2={setSelectedCard2}
            />
          ) : (
            <div className="text-center text-gray-500 py-12">
              카드를 불러오는 중...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
