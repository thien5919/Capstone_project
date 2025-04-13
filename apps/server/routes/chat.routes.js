const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory } = require('../services/chat.service');
const verifyFirebaseToken = require('../middlewares/auth.middleware');

// 🔐 Bảo vệ tất cả route bằng Firebase Auth
router.use(verifyFirebaseToken);

// Gửi tin nhắn mới
// Body: { text: "Hello" }
// Param: roomId = uid1_uid2 (alphabet sorted)
router.post('/send/:roomId', async (req, res) => {
  const roomId = req.params.roomId;
  const senderId = req.uid;
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const message = await sendMessage(roomId, { senderId, text });
    res.status(200).json({ success: true, message });
  } catch (err) {
    console.error('[chat.routes/send] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

//  Lấy lịch sử chat theo roomId (Firestore)
// Query optional: ?limit=50
router.get('/history/:roomId', async (req, res) => {
  const roomId = req.params.roomId;
  const limit = parseInt(req.query.limit) || 50;

  try {
    const messages = await getChatHistory(roomId, limit);
    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error('[chat.routes/history] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
