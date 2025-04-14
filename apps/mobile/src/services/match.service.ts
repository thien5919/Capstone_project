
import { firestore } from './firebase';

// Tạo match giữa hai người
export const createMatch = async (user1: string, user2: string) => {
  return await firestore().collection('matches').add({
    userIds: [user1, user2],
    status: 'matched',
    createdAt: new Date(),
  });
};

// Lấy các match của user
export const getMatchesForUser = async (uid: string) => {
  const snapshot = await firestore()
    .collection('matches')
    .where('userIds', 'array-contains', uid)
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Lưu người đã vuốt
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

// ✅ Lấy danh sách người đã vuốt
export const fetchSwipedUserIds = async (uid: string): Promise<string[]> => {
  const snapshot = await firestore()
    .collection('swipes')
    .doc(uid)
    .collection('users')
    .get();

  return snapshot.docs.map(doc => doc.id);
};

// 🆕 ✅ Kiểm tra nếu cả 2 người đều vuốt nhau thì tạo match
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
      return true; // matched
    }

    return false; // not matched
  } catch (error) {
    console.error('Error checking mutual swipe:', error);
    return false;
  }
};
export const addFriendById = async (currentUserId: string, friendUserId: string) => {
  await firestore().collection('friends').doc(currentUserId).collection('list').doc(friendUserId).set({ addedAt: new Date() });
  await firestore().collection('friends').doc(friendUserId).collection('list').doc(currentUserId).set({ addedAt: new Date() });
};
