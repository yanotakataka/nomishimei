export interface Player {
  id: string;
  name: string;
}

export interface GameCard {
  id: string;
  category: string;
  text: string;
  playerSlots: number;
}

export type GameCategory = 'normal' | 'romance' | 'spicy';

export interface GameState {
  players: Player[];
  currentCardIndex: number;
  selectedCategory: GameCategory;
  isGameActive: boolean;
}