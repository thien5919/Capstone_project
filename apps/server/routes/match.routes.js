const express = require('express');
const router = express.Router();
const { sendNotification } = require('../services/fcm.service');
const admin = require('firebase-admin');
const verifyFirebaseToken = require('../middlewares/auth.middleware');

// Bảo vệ toàn bộ route bằng Firebase Token
router.use(verifyFirebaseToken);

/**
 * Gửi thông báo push khi match thành công
 * POST /api/notification/match
 * Body: { toUid, title, body }
 */
router.post('/match', async (req, res) => {
  const { toUid, title, body } = req.body;

  try {
    const userDoc = await admin.firestore().collection('users').doc(toUid).get();
    const fcmToken = userDoc.data()?.fcmToken;

    if (!fcmToken) {
      return res.status(400).json({ success: false, error: 'FCM token not found' });
    }

    const result = await sendNotification(fcmToken, title, body);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error('Notification error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Gửi thông báo push qua token trực tiếp (dùng cho test)
 * POST /api/notification/
 * Body: { toToken, title, body }
 */
router.post('/', async (req, res) => {
  const { toToken, title, body } = req.body;

  try {
    const result = await sendNotification(toToken, title, body);
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
