import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, GameCategory } from '../types';

interface GameContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  selectedCategory: GameCategory;
  setSelectedCategory: (category: GameCategory) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('normal');

  const resetGame = () => {
    setPlayers([]);
    setSelectedCategory('normal');
  };

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        selectedCategory,
        setSelectedCategory,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}