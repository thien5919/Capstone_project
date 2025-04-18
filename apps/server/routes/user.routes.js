const express = require('express');
const router = express.Router();
const { updateUserToken, getUserProfile, updateUserProfile } = require('../services/user.service');
const verifyFirebaseToken = require('../middlewares/auth.middleware');
const { getNearbyUsers } = require('../services/user.service');

// Protected route: update FCM token for logged-in user
router.post('/update-token', verifyFirebaseToken, async (req, res) => {
  const { fcmToken } = req.body;
  const uid = req.user.uid;
  try {
    await updateUserToken(uid, fcmToken);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route: get current user's profile
router.get('/me', verifyFirebaseToken, async (req, res) => {
  const uid = req.user.uid;
  console.log('📌 Requested UID:', uid);
  try {
    let profile = await getUserProfile(uid);
    if (!profile) {
      console.log('⚡ User not found, creating profile');
      await createUserProfile(uid);
      return res.json({ created: true }); // 👉 báo cho FE là profile mới được tạo
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error('❌ Error fetching profile:', err);
    res.status(500).json({ error: err.message });
  }
});



// Protected route: update user profile
router.put('/me', verifyFirebaseToken, async (req, res) => {
  const uid = req.user.uid;
  const updates = req.body;
  try {
    await updateUserProfile(uid, updates);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public route: get user profile by uid
router.get('/:uid', verifyFirebaseToken, async (req, res) => {
  const { uid } = req.params;
  try {
    const profile = await getUserProfile(uid);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/nearby', verifyFirebaseToken, async (req, res) => {
  const uid = req.user.uid;
  try {
    const nearbyUsers = await getNearbyUsers(uid);
    res.status(200).json(nearbyUsers);
  } catch (err) {
    console.error('❌ Error fetching nearby users:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;