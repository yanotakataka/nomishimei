import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

interface GameMenuModalProps {
  visible: boolean;
  onClose: () => void;
  onResetGame: () => void;
  onEndGame: () => void;
  onNewGame: () => void;
  turnNumber: number;
  playerCount: number;
}

export default function GameMenuModal({
  visible,
  onClose,
  onResetGame,
  onEndGame,
  onNewGame,
  turnNumber,
  playerCount,
}: GameMenuModalProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>ゲームメニュー</Text>
            <Text style={styles.gameInfo}>
              ターン {turnNumber} • {playerCount}人でプレイ中
            </Text>
          </View>

          <View style={styles.menuOptions}>
            <TouchableOpacity style={styles.menuButton} onPress={onClose}>
              <Text style={styles.menuButtonIcon}>▶️</Text>
              <View style={styles.menuButtonTextContainer}>
                <Text style={styles.menuButtonText}>ゲームを続ける</Text>
                <Text style={styles.menuButtonSubtext}>現在のゲームに戻る</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuButton, styles.warningButton]} 
              onPress={onResetGame}
            >
              <Text style={styles.menuButtonIcon}>🔄</Text>
              <View style={styles.menuButtonTextContainer}>
                <Text style={styles.menuButtonText}>最初から始める</Text>
                <Text style={styles.menuButtonSubtext}>同じメンバーで最初から</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuButton, styles.successButton]} 
              onPress={onNewGame}
            >
              <Text style={styles.menuButtonIcon}>👥</Text>
              <View style={styles.menuButtonTextContainer}>
                <Text style={styles.menuButtonText}>新しいゲーム</Text>
                <Text style={styles.menuButtonSubtext}>メンバーを変更してもう一度</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuButton, styles.dangerButton]} 
              onPress={onEndGame}
            >
              <Text style={styles.menuButtonIcon}>🏠</Text>
              <View style={styles.menuButtonTextContainer}>
                <Text style={styles.menuButtonText}>ホームに戻る</Text>
                <Text style={styles.menuButtonSubtext}>ゲームを終了する</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: Math.min(width - 40, 350),
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  gameInfo: {
    fontSize: 14,
    color: '#666',
  },
  menuOptions: {
    gap: 12,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  warningButton: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
    borderColor: '#FF9500',
  },
  successButton: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderColor: '#FF3B30',
  },
  menuButtonIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuButtonTextContainer: {
    flex: 1,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuButtonSubtext: {
    fontSize: 12,
    color: '#666',
  },
});