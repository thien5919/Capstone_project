const { firestore } = require('../firebase');
const haversine = require('haversine-distance');

exports.getNearbyUsers = async (uid) => {
  const currentUserRef = firestore.collection('users').doc(uid);
  const currentUserSnap = await currentUserRef.get();

  if (!currentUserSnap.exists) {
    console.log('❌ User profile not found for UID:', uid);
    throw new Error('User not found');
  }

  const currentUser = currentUserSnap.data();
  const { location } = currentUser || {};

  if (!location) {
    console.log('❗ No location set for current user:', uid);
    return []; // Trả empty mảng nếu user chưa setup location
  }

  const allUsersSnap = await firestore.collection('users').get();
  const nearbyUsers = [];

  allUsersSnap.forEach(doc => {
    if (doc.id === 'nearby') return; // 🛡️ Bỏ skip document dummy `nearby`

    const other = doc.data();
    if (!other.location) return;
    if (doc.id === uid) return; // 🛡️ Không tự match chính mình

    nearbyUsers.push({ uid: doc.id, ...other });
  });

  return nearbyUsers;
};



exports.getUserProfile = async (uid) => {
  const ref = firestore.collection('users').doc(uid);
  const doc = await ref.get();

  if (!doc.exists) {
    throw new Error('User not found');
  }

  return { uid: doc.id, ...doc.data() };
};
async function createUserProfile(uid) {
  const newProfile = {
    uid,
    name: '',
    age: null,
    gender: '',
    bio: '',
    location: null,
    createdAt: new Date(),
  };
  await firestore.collection('users').doc(uid).set(newProfile);
}
