export interface GameCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  color: string;
  backgroundColor: string;
}

export const gameCategories: GameCategory[] = [
  {
    id: 'normal',
    name: 'ノーマル',
    description: '定番のお題で楽しく盛り上がろう！王道の飲み会ゲーム',
    icon: '🍻',
    isAvailable: true,
    color: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  {
    id: 'romance-ero',
    name: '恋愛・エロ',
    description: '恋愛からちょっとエッチなお題まで！大人の夜にピッタリ',
    icon: '💋',
    isAvailable: false,
    color: '#FF1493',
    backgroundColor: 'rgba(255, 20, 147, 0.1)',
  },
  {
    id: 'comedy',
    name: 'お笑い',
    description: 'とにかく笑いたい時はこれ！面白さ重視のお題',
    icon: '😂',
    isAvailable: false,
    color: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
];