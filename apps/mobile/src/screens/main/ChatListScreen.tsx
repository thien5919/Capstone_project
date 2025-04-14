import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

interface Match {
  id: string;
  userIds: string[];
  lastMessage: string;
  lastMessageAt: any;
}

interface User {
  uid: string;
  name: string;
  avatarUrl?: string;
}

const ChatListScreen = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const userId = auth().currentUser?.uid!;
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('matches')
      .where('userIds', 'array-contains', userId)
      .orderBy('lastMessageAt', 'desc')
      .onSnapshot(async (snapshot) => {
        const matchList: Match[] = [];
        const userFetches: Promise<any>[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          matchList.push({ id: doc.id, ...data } as Match);
          const otherUserId = data.userIds.find((id: string) => id !== userId);
          if (otherUserId && !users[otherUserId]) {
            userFetches.push(
              firestore().collection('users').doc(otherUserId).get()
            );
          }
        });

        const fetchedUsers = await Promise.all(userFetches);
        const newUsers = { ...users };
        fetchedUsers.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data() as User;
            newUsers[doc.id] = { uid: doc.id, ...data };
          }
        });

        setUsers(newUsers);
        setMatches(matchList);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Match }) => {
    const otherUserId = item.userIds.find((id) => id !== userId)!;
    const otherUser = users[otherUserId];

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('ChatScreen', { matchId: item.id })
        }
      >
        <View>
          <Text style={styles.name}>{otherUser?.name || 'User'}</Text>
          <Text style={styles.preview}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.timestamp}>
          {item.lastMessageAt?.toDate()?.toLocaleTimeString() || ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});
