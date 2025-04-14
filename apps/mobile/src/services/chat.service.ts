import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const getChatId = (uid1: string, uid2: string) =>
  [uid1, uid2].sort().join('_');

export const sendChatMessage = async (
  senderId: string,
  receiverId: string,
  text: string
) => {
  const chatId = getChatId(senderId, receiverId);
  const message = {
    senderId,
    text,
    timestamp: Date.now(),
  };

  // ✅ Realtime DB (instant)
  await database().ref(`/chats/${chatId}/messages`).push(message);

  // ✅ Firestore (archive)
  await firestore().collection('messages').doc(chatId).collection('messages').add(message);
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

  return () => ref.off(); // cleanup listener
};
