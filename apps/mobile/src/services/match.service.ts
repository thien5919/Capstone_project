import { firestore } from './firebase';

export const createMatch = async (user1: string, user2: string) => {
  return await firestore().collection('matches').add({
    userIds: [user1, user2],
    status: 'matched',
    createdAt: new Date(),
  });
};

export const getMatchesForUser = async (uid: string) => {
  const snapshot = await firestore()
    .collection('matches')
    .where('userIds', 'array-contains', uid)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
