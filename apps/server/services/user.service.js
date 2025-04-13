const { firestore } = require('../firebase');

exports.updateUserToken = async (uid, fcmToken) => {
  return await firestore.collection('users').doc(uid).update({ fcmToken });
};

exports.getUserProfile = async (uid) => {
  const doc = await firestore.collection('users').doc(uid).get();
  if (!doc.exists) throw new Error('User not found');
  return doc.data();
};

exports.updateUserProfile = async (uid, updates) => {
  return await firestore.collection('users').doc(uid).update(updates);
};
