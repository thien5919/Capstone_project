import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatStackParamList } from '../../navigation/types';

const ChatListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          navigation.navigate('Chat', {
            otherUser: {
              uid: 'user123',
              displayName: 'Test User'
            }
          })
        }
      >
        <Text>Chat with Test User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default ChatListScreen;