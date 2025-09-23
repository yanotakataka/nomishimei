import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

interface Player {
  id: string;
  name: string;
}

export default function PlayerSetupScreen() {
  const router = useRouter();
  const { players: playersParam } = useLocalSearchParams();
  
  // Initialize players from parameter or empty array
  const initialPlayers = React.useMemo(() => {
    if (playersParam && typeof playersParam === 'string') {
      try {
        const playerNames = JSON.parse(playersParam);
        return playerNames.map((name: string, index: number) => ({
          id: `${Date.now()}-${index}`,
          name: name
        }));
      } catch (error) {
        console.warn('Failed to parse players parameter:', error);
        return [];
      }
    }
    return [];
  }, [playersParam]);
  
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState('');

  const validateName = (name: string): string | null => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      return '名前を入力してください';
    }
    
    if (trimmedName.length > 20) {
      return '名前は20文字以内で入力してください';
    }
    
    const isDuplicate = players.some((player, index) => 
      player.name === trimmedName && index !== editingIndex
    );
    
    if (isDuplicate) {
      return 'この名前は既に登録されています';
    }
    
    return null;
  };

  const addPlayer = () => {
    const validationError = validateName(inputValue);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (players.length >= 10) {
      setError('プレイヤーは最大10人まで登録できます');
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: inputValue.trim(),
    };

    setPlayers([...players, newPlayer]);
    setInputValue('');
    setError('');
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setInputValue(players[index].name);
    setError('');
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    
    const validationError = validateName(inputValue);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedPlayers = [...players];
    updatedPlayers[editingIndex] = {
      ...updatedPlayers[editingIndex],
      name: inputValue.trim(),
    };
    
    setPlayers(updatedPlayers);
    setInputValue('');
    setEditingIndex(null);
    setError('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setInputValue('');
    setError('');
  };

  const removePlayer = (index: number) => {
    Alert.alert(
      'プレイヤーを削除',
      `${players[index].name}を削除しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '削除', 
          style: 'destructive',
          onPress: () => {
            setPlayers(players.filter((_, i) => i !== index));
            if (editingIndex === index) {
              cancelEdit();
            }
          }
        }
      ]
    );
  };

  const startGame = () => {
    if (players.length >= 2) {
      const playerNames = players.map(p => p.name);
      router.push({
        pathname: '/category-select',
        params: { players: JSON.stringify(playerNames) }
      });
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'プレイヤー登録',
          headerBackTitle: 'ホーム'
        }} 
      />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>プレイヤーを登録</Text>
        <Text style={styles.subtitle}>
          2人〜10人まで登録できます ({players.length}/10人)
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="名前を入力（20文字以内）"
            value={inputValue}
            onChangeText={(text) => {
              setInputValue(text);
              if (error) setError('');
            }}
            onSubmitEditing={editingIndex !== null ? saveEdit : addPlayer}
            maxLength={20}
            returnKeyType={editingIndex !== null ? 'done' : 'next'}
          />
          
          {editingIndex !== null ? (
            <View style={styles.editButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]} 
                onPress={saveEdit}
              >
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={cancelEdit}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.actionButton, styles.addButton, players.length >= 10 ? styles.disabledButton : null]} 
              onPress={addPlayer}
              disabled={players.length >= 10}
            >
              <Text style={[styles.addButtonText, players.length >= 10 ? styles.disabledText : null]}>
                追加
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          style={styles.playerList}
          renderItem={({ item, index }) => (
            <View style={[styles.playerItem, editingIndex === index ? styles.editingItem : null]}>
              <Text style={styles.playerNumber}>{index + 1}</Text>
              <Text style={styles.playerName}>{item.name}</Text>
              <View style={styles.playerActions}>
                <TouchableOpacity 
                  style={styles.editPlayerButton} 
                  onPress={() => startEdit(index)}
                  disabled={editingIndex !== null}
                >
                  <Text style={styles.editPlayerButtonText}>編集</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.removePlayerButton} 
                  onPress={() => removePlayer(index)}
                  disabled={editingIndex !== null}
                >
                  <Text style={styles.removePlayerButtonText}>削除</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
      </ScrollView>

      <TouchableOpacity
        style={[styles.startButton, players.length < 2 ? styles.disabledButton : null]}
        onPress={startGame}
        disabled={players.length < 2}
      >
        <Text style={[styles.startButtonText, players.length < 2 ? styles.disabledText : null]}>
          ゲームを開始 ({players.length}人)
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButtons: {
    flexDirection: 'column',
    gap: 5,
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#FF9500',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#999',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  playerList: {
    marginBottom: 20,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editingItem: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  playerNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 15,
    minWidth: 25,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  playerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editPlayerButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editPlayerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  removePlayerButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removePlayerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#34C759',
    paddingVertical: 18,
    margin: 20,
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
});