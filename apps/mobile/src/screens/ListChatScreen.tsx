import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { List, Avatar, Text } from "react-native-paper";

const chatData = [
  { id: "1", name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg", lastMessage: "Hey! How’s it going?", time: "2m ago" },
  { id: "2", name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg", lastMessage: "Let’s meet up later!", time: "15m ago" },
  { id: "3", name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg", lastMessage: "Sounds good!", time: "30m ago" },
  { id: "4", name: "Diana", avatar: "https://randomuser.me/api/portraits/women/4.jpg", lastMessage: "See you soon.", time: "1h ago" },
];

const ChatListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.lastMessage}
      left={(props) => <Avatar.Image size={50} source={{ uri: item.avatar }} />}
      right={(props) => <Text style={styles.time}>{item.time}</Text>}
      onPress={() => navigation.navigate("RoomChat", { user: item })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList data={chatData} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  time: { fontSize: 12, color: "gray", alignSelf: "center", marginRight: 10 },
});

export default ChatListScreen;
