import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar, BackHandler } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { normalCards } from '../src/data/gameCards';
import GameCard from '../src/components/GameCard';
import GameMenuModal from '../src/components/GameMenuModal';

interface GameState {
  currentCardIndex: number;
  showCard: boolean;
  shuffledCards: typeof normalCards;
  usedCards: Set<string>;
  turnNumber: number;
}

export default function GameScreen() {
  const router = useRouter();
  const { players: playersParam } = useLocalSearchParams();
  const players = JSON.parse(playersParam as string);
  const [showMenu, setShowMenu] = useState(false);
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const shuffled = [...normalCards].sort(() => Math.random() - 0.5);
    return {
      currentCardIndex: 0,
      showCard: false,
      shuffledCards: shuffled,
      usedCards: new Set(),
      turnNumber: 1,
    };
  });

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (showMenu) {
        setShowMenu(false);
        return true;
      }
      setShowMenu(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showMenu]);

  const currentCard = gameState.shuffledCards[gameState.currentCardIndex % gameState.shuffledCards.length];

  const getRandomPlayers = (count: number): string[] => {
    if (count === 0) return [];
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, players.length));
  };

  const formatCardText = (text: string, playerSlots: number): string => {
    if (playerSlots === 0) return text;
    
    const selectedPlayers = getRandomPlayers(playerSlots);
    let formattedText = text;
    
    selectedPlayers.forEach((player, index) => {
      formattedText = formattedText.replace(`{プレイヤー${index + 1}}`, player);
    });
    
    return formattedText;
  };

  const flipCard = () => {
    setGameState(prev => ({ ...prev, showCard: true }));
  };

  const nextCard = () => {
    setGameState(prev => {
      const newUsedCards = new Set(prev.usedCards);
      newUsedCards.add(currentCard.id);
      
      // If all cards have been used, reshuffle (excluding just used cards for variety)
      let newShuffledCards = prev.shuffledCards;
      let newCurrentIndex = prev.currentCardIndex + 1;
      
      if (newUsedCards.size >= prev.shuffledCards.length * 0.8) {
        // Reshuffle when 80% of cards have been used
        newShuffledCards = [...normalCards].sort(() => Math.random() - 0.5);
        newCurrentIndex = 0;
        newUsedCards.clear();
      }
      
      return {
        ...prev,
        currentCardIndex: newCurrentIndex,
        showCard: false,
        shuffledCards: newShuffledCards,
        usedCards: newUsedCards,
        turnNumber: prev.turnNumber + 1,
      };
    });
  };

  const resetGameWithConfirmation = () => {
    setShowMenu(false);
    Alert.alert(
      'ゲームをリセット',
      '同じメンバーでゲームを最初からやり直しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: 'リセット', 
          onPress: () => {
            const shuffled = [...normalCards].sort(() => Math.random() - 0.5);
            setGameState({
              currentCardIndex: 0,
              showCard: false,
              shuffledCards: shuffled,
              usedCards: new Set(),
              turnNumber: 1,
            });
          }
        }
      ]
    );
  };

  const endGameWithConfirmation = () => {
    setShowMenu(false);
    Alert.alert(
      'ゲームを終了',
      'ホーム画面に戻ります。本当にゲームを終了しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '終了', onPress: () => router.replace('/(tabs)') }
      ]
    );
  };

  const startNewGame = () => {
    setShowMenu(false);
    Alert.alert(
      '新しいゲーム',
      'プレイヤー登録画面に戻って新しいゲームを開始しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '新しいゲーム', onPress: () => router.replace('/player-setup') }
      ]
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>≡</Text>
        </TouchableOpacity>
        
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoText}>Turn {gameState.turnNumber}</Text>
          <Text style={styles.playersInfo}>{players.length}人でプレイ中</Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* Game Card */}
      <GameCard
        isFlipped={gameState.showCard}
        cardText={formatCardText(currentCard.text, currentCard.playerSlots)}
        onFlip={flipCard}
        turnNumber={gameState.turnNumber}
      />

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {gameState.showCard && (
          <TouchableOpacity style={styles.nextButton} onPress={nextCard}>
            <Text style={styles.nextButtonText}>次の人へ</Text>
          </TouchableOpacity>
        )}
        
        {!gameState.showCard && (
          <Text style={styles.instructionText}>
            カードをタップしてお題を確認しよう！
          </Text>
        )}
      </View>

      {/* Game Menu Modal */}
      <GameMenuModal
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        onResetGame={resetGameWithConfirmation}
        onEndGame={endGameWithConfirmation}
        onNewGame={startNewGame}
        turnNumber={gameState.turnNumber}
        playerCount={players.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameInfo: {
    alignItems: 'center',
  },
  gameInfoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playersInfo: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  headerSpacer: {
    width: 60,
  },
  bottomControls: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});