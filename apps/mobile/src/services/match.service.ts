import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const API_BASE = 'http://10.0.2.2:3000/api/api/match'; // 🔁 Replace with real IP

// 🔐 Get Auth Header for REST API
const getAuthHeaders = async () => {
  const token = await auth().currentUser?.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

///// 🔥 FIRESTORE FUNCTIONS /////

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

export const saveSwipedUser = async (currentUserId: string, swipedUserId: string) => {
  try {
    await firestore()
      .collection('swipes')
      .doc(currentUserId)
      .collection('users')
      .doc(swipedUserId)
      .set({ swipedAt: new Date() });
  } catch (error) {
    console.error('Error saving swiped user:', error);
  }
};

export const fetchSwipedUserIds = async (uid: string): Promise<string[]> => {
  const snapshot = await firestore()
    .collection('swipes')
    .doc(uid)
    .collection('users')
    .get();
  return snapshot.docs.map((doc) => doc.id);
};

export const checkMutualSwipeAndCreateMatch = async (
  currentUserId: string,
  swipedUserId: string
): Promise<boolean> => {
  try {
    const doc = await firestore()
      .collection('swipes')
      .doc(swipedUserId)
      .collection('users')
      .doc(currentUserId)
      .get();

    const hasSwipedBack = doc.exists;

    if (hasSwipedBack) {
      await createMatch(currentUserId, swipedUserId);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking mutual swipe:', error);
    return false;
  }
};

export const addFriendById = async (
  currentUserId: string,
  friendUserId: string
): Promise<void> => {
  await firestore()
    .collection('friends')
    .doc(currentUserId)
    .collection('list')
    .doc(friendUserId)
    .set({ addedAt: new Date() });

  await firestore()
    .collection('friends')
    .doc(friendUserId)
    .collection('list')
    .doc(currentUserId)
    .set({ addedAt: new Date() });
};

///// 🌐 BACKEND REST FUNCTIONS /////

export const swipeUser = async (targetUserId: string, liked: boolean) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_BASE}/swipe`, { targetUserId, liked }, { headers });
};

export const checkMatch = async (targetUserId: string): Promise<boolean> => {
  const headers = await getAuthHeaders();
  const res = await axios.post(`${API_BASE}/check-match`, { targetUserId }, { headers });
  return res.data?.isMatch || false;
};

export const notifyMatch = async (toUid: string, title: string, body: string) => {
  const headers = await getAuthHeaders();
  return axios.post(`${API_BASE}`, { toUid, title, body }, { headers });
};
