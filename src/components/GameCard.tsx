import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface GameCardProps {
  isFlipped: boolean;
  cardText: string;
  onFlip: () => void;
  turnNumber: number;
}

export default function GameCard({ isFlipped, cardText, onFlip, turnNumber }: GameCardProps) {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 1 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, flipAnimation]);

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={!isFlipped ? onFlip : undefined}
        activeOpacity={!isFlipped ? 0.8 : 1}
        disabled={isFlipped}
      >
        {/* Card Back (When flipped) */}
        <Animated.View
          style={[
            styles.cardFace,
            styles.cardBack,
            {
              opacity: backOpacity,
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <Text style={styles.cardText}>{cardText}</Text>
        </Animated.View>

        {/* Card Front (Initial state) */}
        <Animated.View
          style={[
            styles.cardFace,
            styles.cardFront,
            {
              opacity: frontOpacity,
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <View style={styles.cardFrontContent}>
            <Text style={styles.turnNumber}>Turn {turnNumber}</Text>
            <Text style={styles.flipInstruction}>タップして{'\n'}カードをめくる</Text>
            <View style={styles.cardDesign}>
              <View style={styles.designCircle} />
              <View style={[styles.designCircle, styles.designCircle2]} />
              <View style={[styles.designCircle, styles.designCircle3]} />
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#007AFF',
  },
  cardBack: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  cardFrontContent: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  turnNumber: {
    position: 'absolute',
    top: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  flipInstruction: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardDesign: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  designCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: 50,
    left: 20,
  },
  designCircle2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    top: 120,
    right: 30,
    left: 'auto',
  },
  designCircle3: {
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: 40,
    left: '50%',
    marginLeft: -50,
    top: 'auto',
  },
  cardText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
});