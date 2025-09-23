import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameCategory } from '../data/categories';

interface CategoryCardProps {
  category: GameCategory;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
  onComingSoonPress?: (categoryId: string) => void;
}

export default function CategoryCard({ 
  category, 
  isSelected, 
  onSelect, 
  onComingSoonPress 
}: CategoryCardProps) {
  const handlePress = () => {
    if (category.isAvailable) {
      onSelect(category.id);
    } else {
      onComingSoonPress?.(category.id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: category.backgroundColor },
        !category.isAvailable && styles.disabledCard,
        isSelected && styles.selectedCard,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <Text style={styles.iconText}>{category.icon}</Text>
        
        <View style={styles.textContainer}>
          <Text style={[
            styles.categoryName,
            { color: category.color },
            !category.isAvailable && styles.disabledText
          ]}>
            {category.name}
          </Text>
          
          <Text style={[
            styles.categoryDescription,
            !category.isAvailable && styles.disabledText
          ]}>
            {category.description}
          </Text>
        </View>

        {!category.isAvailable && (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>近日公開</Text>
          </View>
        )}

        {isSelected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>選択中</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
  },
  disabledCard: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  cardContent: {
    position: 'relative',
  },
  iconText: {
    fontSize: 32,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  disabledText: {
    color: '#999',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});