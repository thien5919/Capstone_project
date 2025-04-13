const { firestore } = require('../firebase');

exports.swipeUser = async (currentUserId, targetUserId, liked) => {
  await firestore
    .collection('users')
    .doc(currentUserId)
    .collection('swipes')
    .doc(targetUserId)
    .set({ liked, timestamp: new Date() });
};

exports.checkMatch = async (currentUserId, targetUserId) => {
  const reverseSwipe = await firestore
    .collection('users')
    .doc(targetUserId)
    .collection('swipes')
    .doc(currentUserId)
    .get();

  if (reverseSwipe.exists && reverseSwipe.data()?.liked) {
    const matchId = [currentUserId, targetUserId].sort().join('_');
    await firestore.collection('matches').doc(matchId).set({
      userIds: [currentUserId, targetUserId],
      createdAt: new Date(),
    });
    return true;
  }
  return false;
};
