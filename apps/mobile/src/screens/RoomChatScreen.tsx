import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Appbar, Avatar, TextInput, Button, Card, Text } from "react-native-paper";

type Message = {
  id: string;
  text: string;
  sender: string;
};

const ChatRoomScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello!", sender: "Alice" },
    { id: "2", text: "Hi, how are you?", sender: "You" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      navigation.setOptions({ tabBarStyle: { backgroundColor: '#121212' } });
    };
  }, [navigation]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { id: String(messages.length + 1), text: newMessage, sender: "You" }]);
    setNewMessage("");
  };

  const renderItem = ({ item }: { item: Message }) => (
    <Card style={[styles.message, item.sender === "You" ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Avatar.Image size={40} source={{ uri: user.avatar }} />
        <Appbar.Content title={user.name} />
      </Appbar.Header>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
        />
        <Button mode="contained" onPress={sendMessage}>
          Send
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messageList: { padding: 10 },
  message: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
  sentMessage: { backgroundColor: "#0084ff", alignSelf: "flex-end" },
  receivedMessage: { backgroundColor: "#e5e5ea", alignSelf: "flex-start" },
  messageText: { color: "#fff" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  input: { flex: 1, marginRight: 10 },
});

export default ChatRoomScreen;
