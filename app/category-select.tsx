import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { gameCategories } from '../src/data/categories';
import CategoryCard from '../src/components/CategoryCard';

export default function CategorySelectScreen() {
  const router = useRouter();
  const { players: playersParam } = useLocalSearchParams();
  const players = JSON.parse(playersParam as string);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('normal');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const handleComingSoonPress = (categoryId: string) => {
    const category = gameCategories.find(c => c.id === categoryId);
    Alert.alert(
      '近日公開！',
      `「${category?.name}」カテゴリは今後のアップデートで追加予定です。お楽しみに！`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const startGame = () => {
    const selectedCategory = gameCategories.find(c => c.id === selectedCategoryId);
    if (selectedCategory?.isAvailable) {
      router.push({
        pathname: '/game',
        params: { 
          players: JSON.stringify(players), 
          category: selectedCategoryId
        }
      });
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'カテゴリ選択',
          headerBackTitle: 'プレイヤー登録'
        }} 
      />
      <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>カテゴリを選択</Text>
          <Text style={styles.subtitle}>
            プレイしたいお題のカテゴリを選んでください
          </Text>
          <Text style={styles.playerInfo}>
            {players.length}人でプレイ
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {gameCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategoryId === category.id}
              onSelect={handleCategorySelect}
              onComingSoonPress={handleComingSoonPress}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            !gameCategories.find(c => c.id === selectedCategoryId)?.isAvailable && styles.disabledButton
          ]}
          onPress={startGame}
          disabled={!gameCategories.find(c => c.id === selectedCategoryId)?.isAvailable}
        >
          <Text style={[
            styles.startButtonText,
            !gameCategories.find(c => c.id === selectedCategoryId)?.isAvailable && styles.disabledText
          ]}>
            ゲームを開始
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  playerInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '600',
  },
  categoriesContainer: {
    padding: 20,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    backgroundColor: '#34C759',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#999',
  },
});