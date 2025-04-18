import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const getChatId = (uid1: string, uid2: string) => [uid1, uid2].sort().join('_');

export const sendChatMessage = async (
  senderId: string,
  receiverId: string,
  text: string
) => {
  const chatId = getChatId(senderId, receiverId);
  const timestamp = Date.now();
  const message = { senderId, text, timestamp };

  // Realtime DB
  await database().ref(`/chats/${chatId}/messages`).push(message);

  // Firestore archive
  await firestore().collection('messages').doc(chatId).collection('messages').add(message);

  // Last message
  await firestore().collection('lastMessages').doc(chatId).set({
    userIds: [senderId, receiverId],
    lastMessage: text,
    timestamp,
    [`unreadCount_${receiverId}`]: firestore.FieldValue.increment(1)
  }, { merge: true });
};

export const listenToRealtimeMessages = (
  uid1: string,
  uid2: string,
  onNewMessage: (msg: any) => void
) => {
  const chatId = getChatId(uid1, uid2);
  const ref = database().ref(`/chats/${chatId}/messages`);

  ref.on('child_added', (snapshot) => {
    onNewMessage({ id: snapshot.key, ...snapshot.val() });
  });

  return () => ref.off();
};

export const markMessagesAsRead = async (chatId: string, uid: string) => {
  await firestore().collection('lastMessages').doc(chatId).update({
    [`unreadCount_${uid}`]: 0,
  });
};

export const fetchLastMessages = async (uid: string) => {
  const snapshot = await firestore()
    .collection('lastMessages')
    .where('userIds', 'array-contains', uid)
    .orderBy('timestamp', 'desc')
    .get();

  return await Promise.all(snapshot.docs.map(async doc => {
    const data = doc.data();
    const otherId = data.userIds.find((id: string) => id !== uid);
    const userDoc = await firestore().collection('users').doc(otherId).get();
    return {
      chatId: doc.id,
      displayName: userDoc.data()?.displayName || otherId,
      lastMessage: data.lastMessage,
      timestamp: data.timestamp,
      unreadCount: data[`unreadCount_${uid}`] || 0,
      uid: otherId,
    };
  }));
};
