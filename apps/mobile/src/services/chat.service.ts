import { database } from './firebase';

export const sendMessage = async (matchId: string, message: any) => {
  const msgRef = database().ref(`/messages/${matchId}`).push();
  await msgRef.set(message);
};

export const listenForMessages = (matchId: string, callback: (msgs: any[]) => void) => {
  return database()
    .ref(`/messages/${matchId}`)
    .on('value', (snapshot) => {
      const msgs = snapshot.val() || {};
      const arr = Object.keys(msgs).map((key) => ({ id: key, ...msgs[key] }));
      callback(arr);
    });
};
/