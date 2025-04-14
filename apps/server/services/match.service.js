const { firestore } = require('../firebase');

// ✅ Save a swipe
exports.swipeUser = async (currentUserId, targetUserId, liked) => {
  await firestore
    .collection('users')
    .doc(currentUserId)
    .collection('swipes')
    .doc(targetUserId)
    .set({ liked, timestamp: new Date() });
};

// ✅ Check for mutual match
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

// ✅ Get matches with user profiles, sorted by newest, paginated
exports.getMatchesForUser = async (uid, limit = 10, startAfterId = null) => {
  let query = firestore
    .collection('matches')
    .where('userIds', 'array-contains', uid)
    .orderBy('createdAt', 'desc')
    .limit(limit);

  if (startAfterId) {
    const startAfterDoc = await firestore.collection('matches').doc(startAfterId).get();
    if (startAfterDoc.exists) {
      query = query.startAfter(startAfterDoc);
    }
  }

  const snapshot = await query.get();
  const matches = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const otherUserId = data.userIds.find((id) => id !== uid);

    const userDoc = await firestore.collection('users').doc(otherUserId).get();
    const profile = userDoc.exists ? userDoc.data() : null;

    matches.push({
      id: doc.id,
      matchedWith: otherUserId,
      profile,
      createdAt: data.createdAt,
    });
  }

  return matches;
};
