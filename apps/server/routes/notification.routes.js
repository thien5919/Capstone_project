const express = require('express');
const router = express.Router();
const { sendNotification } = require('../services/fcm.service');
const admin = require('firebase-admin');

// Match notification by userId (secure)
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

// Raw token push (optional, for testing)
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