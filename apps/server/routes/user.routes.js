const express = require('express');
const router = express.Router();
const { updateUserToken, getUserProfile, updateUserProfile } = require('../services/user.service');
const verifyFirebaseToken = require('../middlewares/auth.middleware');

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
  try {
    const profile = await getUserProfile(uid);
    res.status(200).json(profile);
  } catch (err) {
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
router.get('/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const profile = await getUserProfile(uid);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;