const admin = require('firebase-admin');

const saveNotification = async (uid, { title, body, type = null, refId = null }) => {
    return await admin
      .firestore()
      .collection('notifications')
      .doc(uid)
      .collection('items')
      .add({
        title,
        body,
        type,
        refId,
        read: false,
        createdAt: new Date(),
      });
  };

const getNotifications = async (uid, limit = 20) => {
  const snapshot = await admin
    .firestore()
    .collection('notifications')
    .doc(uid)
    .collection('items')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const markAsRead = async (uid, notificationId) => {
  await admin
    .firestore()
    .collection('notifications')
    .doc(uid)
    .collection('items')
    .doc(notificationId)
    .update({ read: true });
};

module.exports = {
  saveNotification,
  getNotifications,
  markAsRead,
};
