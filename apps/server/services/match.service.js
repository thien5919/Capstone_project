const { firestore, messaging } = require('../firebase');

// Swipe Right: Like user
exports.likeUser = async (currentUserId, likedUserId) => {
  if (currentUserId === likedUserId) {
    throw new Error("Cannot like yourself");
  }

  // 1. Save like action
  await firestore
    .collection('likes')
    .doc(currentUserId)
    .collection('likedUsers')
    .doc(likedUserId)
    .set({ likedAt: new Date() });

  // 2. Check reciprocal like
  const reciprocal = await firestore
    .collection('likes')
    .doc(likedUserId)
    .collection('likedUsers')
    .doc(currentUserId)
    .get();

  if (reciprocal.exists) {
    const matchId = [currentUserId, likedUserId].sort().join('_');

    // 3. Create Match document
    await firestore.collection('matches').doc(matchId).set({
      users: [currentUserId, likedUserId],
      matchedAt: new Date()
    });

    // 4. Create MatchRequest for likedUserId
    await firestore
      .collection('matchRequests')
      .doc(likedUserId)
      .collection('requests')
      .doc(currentUserId)
      .set({
        status: 'pending',
        createdAt: new Date()
      });

    // 5. Send FCM Notification to likedUser
    const likedUserSnap = await firestore.collection('users').doc(likedUserId).get();
    const likedUser = likedUserSnap.data();

    if (likedUser?.fcmToken) {
      await messaging.send({
        token: likedUser.fcmToken,
        notification: {
          title: '🎯 New Match Request!',
          body: `You have a match request! Check it now!`,
        },
        data: {
          type: 'matchRequest',
          requestFrom: currentUserId
        }
      });
    }

    return { matched: true, matchId };
  }

  return { matched: false };
};

// Swipe Left: Pass user
exports.passUser = async (currentUserId, passedUserId) => {
  if (currentUserId === passedUserId) {
    throw new Error("Cannot pass yourself");
  }

  await firestore
    .collection('passes')
    .doc(currentUserId)
    .collection('passedUsers')
    .doc(passedUserId)
    .set({ passedAt: new Date() });

  return { passed: true };
};

// Accept Match Request
exports.acceptMatchRequest = async (currentUserId, requestUserId) => {
  const requestRef = firestore
    .collection('matchRequests')
    .doc(currentUserId)
    .collection('requests')
    .doc(requestUserId);

  const requestSnap = await requestRef.get();
  if (!requestSnap.exists) {
    throw new Error("Match request not found");
  }

  // 1. Update status to accepted
  await requestRef.update({
    status: 'accepted',
    acceptedAt: new Date()
  });

  // 2. Check reciprocal acceptance
  const reciprocalSnap = await firestore
    .collection('matchRequests')
    .doc(requestUserId)
    .collection('requests')
    .doc(currentUserId)
    .get();

  if (reciprocalSnap.exists && reciprocalSnap.data().status === 'accepted') {
    // 🎯 Both users accepted → Create Chat Room
    const chatId = [currentUserId, requestUserId].sort().join('_');

    await firestore.collection('chats').doc(chatId).set({
      users: [currentUserId, requestUserId],
      createdAt: new Date()
    });

    // 3. Optionally: Send FCM Notification to both users
    const [userA, userB] = await Promise.all([
      firestore.collection('users').doc(currentUserId).get(),
      firestore.collection('users').doc(requestUserId).get()
    ]);

    if (userA.data()?.fcmToken) {
      await messaging.send({
        token: userA.data().fcmToken,
        notification: {
          title: '🎉 New Chat!',
          body: `You can now chat with your match!`,
        },
        data: {
          type: 'newChat',
          chatId: chatId
        }
      });
    }

    if (userB.data()?.fcmToken) {
      await messaging.send({
        token: userB.data().fcmToken,
        notification: {
          title: '🎉 New Chat!',
          body: `You can now chat with your match!`,
        },
        data: {
          type: 'newChat',
          chatId: chatId
        }
      });
    }
  }

  return { success: true };
};

// (Optional) Reject Match Request
exports.rejectMatchRequest = async (currentUserId, requestUserId) => {
  const requestRef = firestore
    .collection('matchRequests')
    .doc(currentUserId)
    .collection('requests')
    .doc(requestUserId);

  const requestSnap = await requestRef.get();
  if (!requestSnap.exists) {
    throw new Error("Match request not found");
  }

  await requestRef.update({
    status: 'rejected',
    rejectedAt: new Date()
  });

  return { rejected: true };
};
// Get Pending Matches
exports.getPendingMatchesForUser = async (uid) => {
  const snapshot = await firestore
    .collection('matchRequests')
    .doc(uid)
    .collection('requests')
    .where('status', '==', 'pending')
    .orderBy('createdAt', 'desc')
    .get();

  const pending = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return pending;
};

