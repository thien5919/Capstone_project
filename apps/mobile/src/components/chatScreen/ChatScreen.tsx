import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { sendChatMessage, listenToRealtimeMessages } from '../../services/chat.service';

interface Props {
  route: {
    params: {
      otherUser: {
        uid: string;
        displayName: string;
      };
    };
  };
}

const ChatScreen: React.FC<Props> = ({ route }) => {
  const { otherUser } = route.params;
  const currentUser = auth().currentUser;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenToRealtimeMessages(currentUser.uid, otherUser.uid, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return unsubscribe;
  }, [currentUser, otherUser.uid]);

  const handleSend = async () => {
    if (!text.trim() || !currentUser) return;
    await sendChatMessage(currentUser.uid, otherUser.uid, text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.sort((a, b) => a.timestamp - b.timestamp)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.message,
              item.senderId === currentUser?.uid ? styles.myMessage : styles.theirMessage,
            ]}
          >
            {item.text}
          </Text>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={{ flex: 1, marginRight: 8 }}
          placeholder="Type your message..."
        />
        <Button mode="contained" onPress={handleSend}><Text>Send</Text></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default ChatScreen;
