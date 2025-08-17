import { create } from "zustand";
import { devtools } from "zustand/middleware";
import FlipCardGame from "../FlipCardGame";
import CardDeck from "../CardDeck";
import DeckMaker from "../DeckMaker";
import animalData from "../mock/animalData";

interface FlipCardGameState {
  game: FlipCardGame | null;

  // 액션들
  initializeGame: () => void;
  resetGame: () => void;
  shuffleCards: () => void;
  drawCards: (id1: string, id2: string) => void;
}

export const useFlipCardGameStore = create<FlipCardGameState>()(
  devtools(
    (set, get) => ({
      game: null,

      // 게임 초기화
      initializeGame: () => {
        const cards = DeckMaker.createDeck(animalData);
        const cardDeck = new CardDeck(cards);
        cardDeck.shuffle()
        const game = new FlipCardGame(cardDeck, 0, 0, "beforeStart");

        set({ game });
      },

      resetGame: () => {
        get().initializeGame();
      },

      shuffleCards: () => {
        const { game } = get();
        if (!game) return;

        const newGame = game.shuffle();
        set({ game: newGame });
      },

      drawCards: (id1: string, id2: string) => {
        const { game } = get();
        if (!game) return;
        const newGame = game.draw(id1, id2);
        set({ game: newGame });
      },
    }),
    {
      name: "flip-card-game-store",
    }
  )
);
