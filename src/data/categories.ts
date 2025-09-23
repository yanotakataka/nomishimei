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
    id: 'romance',
    name: '恋愛',
    description: '恋愛にまつわるドキドキお題！カップルや気になる人がいる時に',
    icon: '💕',
    isAvailable: false,
    color: '#FF69B4',
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
  },
  {
    id: 'spicy',
    name: '激辛',
    description: '大人の夜にふさわしい刺激的なお題！覚悟のある方のみ',
    icon: '🌶️',
    isAvailable: false,
    color: '#FF4500',
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
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