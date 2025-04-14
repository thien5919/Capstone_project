const { firestore } = require('../firebase');

exports.updateUserToken = async (uid, fcmToken) => {
  return await firestore.collection('users').doc(uid).update({ fcmToken });
};

exports.getUserProfile = async (uid) => {
  console.log('🔍 Fetching profile for UID:', uid);

  const ref = firestore.collection('users').doc(uid);
  const doc = await ref.get(); // ✅ Được khai báo đúng thứ tự

  console.log('📦 Document exists?', doc.exists);

  if (!doc.exists) {
    console.warn('🆕 Document not found, creating profile...');
    await ref.set({
      createdAt: new Date(),
      email: '',
      name: '',
    });
    return { created: true, uid };
  }

  return doc.data();
};

exports.updateUserProfile = async (uid, updates) => {
  return await firestore.collection('users').doc(uid).update(updates);
};
