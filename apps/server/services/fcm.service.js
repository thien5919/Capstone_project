const { messaging } = require('../firebase');
const admin = require('firebase-admin');

// ✅ Helper: Gửi FCM kèm custom data
const sendNotification = async (toToken, title, body, data = {}) => {
  const message = {
    token: toToken,
    notification: { title, body },
    data,
    android: { priority: 'high' },
    apns: { payload: { aps: { sound: 'default' } } },
  };

  return await messaging.send(message);
};


const sendAndSaveNotification = async (toUid, { title, body, data = {} }) => {
  const userDoc = await admin.firestore().collection('users').doc(toUid).get();
  const fcmToken = userDoc.data()?.fcmToken;

  if (!fcmToken) throw new Error('FCM token not found');

  await sendNotification(fcmToken, title, body, data);

  await admin
    .firestore()
    .collection('notifications')
    .doc(toUid)
    .collection('items')
    .add({
      title,
      body,
      type: data?.type || null,
      refId: data?.refId || null,
      read: false,
      createdAt: new Date(),
    });
};

module.exports = {
  sendNotification,
  sendAndSaveNotification,
};
