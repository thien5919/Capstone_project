import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ChatStackParamList } from '../../navigation/types';

const ChatRoomScreen = () => {
  const route = useRoute<RouteProp<ChatStackParamList, 'ChatRoom'>>();
  const { chatId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Welcome to Chat Room: {chatId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ChatRoomScreen;
