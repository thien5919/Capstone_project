const { firestore } = require('../firebase');

exports.sendFriendRequest = async (currentUserId, targetCustomId) => {
  const userSnap = await firestore.collection('users').where('customId', '==', targetCustomId).limit(1).get();

  if (userSnap.empty) throw new Error("User not found");

  const targetUserId = userSnap.docs[0].id;

  if (currentUserId === targetUserId) throw new Error("Cannot friend yourself");

  await firestore
    .collection('friendRequests')
    .doc(targetUserId)
    .collection('requests')
    .doc(currentUserId)
    .set({
      status: 'pending',
      requestedAt: new Date()
    });

  return { requestSent: true };
};
