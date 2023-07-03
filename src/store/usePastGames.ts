import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameMemory {
  address: `0x${string}`;
  salt?: `0x${string}`;
  solveTxHash?: `0x${string}`;
}

interface PastGamesState {
  games: GameMemory[];
  addGame: (address: `0x${string}`, salt?: `0x${string}`) => void;
  removeGame: (address: `0x${string}`) => void;
  addSalt: (address: `0x${string}`, salt?: `0x${string}`) => void;
  addSolveHash: (address: `0x${string}`, solveTxHash?: `0x${string}`) => void;
}

const usePastGames = create(
  persist<PastGamesState>(
    (set, get) => ({
      games: [],
      addGame: (address: `0x${string}`, salt?: `0x${string}`) => {
        if (get().games.find((game) => game.address === address)) return;

        set({
          games: [...get().games, { address, salt }],
        });
      },

      removeGame: (address: `0x${string}`) => set({ games: get().games.filter((game) => game.address !== address) }),

      addSalt: (address: `0x${string}`, salt?: `0x${string}`) =>
        set({ games: get().games.map((game) => (game.address === address ? { ...game, salt } : game)) }),

      addSolveHash: (address: `0x${string}`, solveTxHash?: `0x${string}`) =>
        set({ games: get().games.map((game) => (game.address === address ? { ...game, solveTxHash } : game)) }),
    }),
    {
      name: "past-games",
    }
  )
);

export default usePastGames;
