const express = require('express');
const router = express.Router();
const {
  swipeUser,
  checkMatch,
  getMatchesForUser,
  getPendingMatchesForUser, 
} = require('../services/match.service');

const verifyFirebaseToken = require('../middlewares/auth.middleware');

router.use(verifyFirebaseToken);

// POST /api/match/swipe
router.post('/swipe', async (req, res) => {
  const { targetUserId, liked } = req.body;
  const currentUserId = req.user.uid;

  try {
    await swipeUser(currentUserId, targetUserId, liked);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/match/check-match
router.post('/check-match', async (req, res) => {
  const { targetUserId } = req.body;
  const currentUserId = req.user.uid;

  try {
    const isMatch = await checkMatch(currentUserId, targetUserId);
    res.status(200).json({ success: true, isMatch });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET /api/match/me
router.get('/me', async (req, res) => {
  const uid = req.user.uid;
  const limit = parseInt(req.query.limit) || 10;
  const startAfter = req.query.startAfter || null;

  try {
    const matches = await getMatchesForUser(uid, limit, startAfter);
    res.status(200).json({ success: true, matches });
  } catch (err) {
    console.error('Error getting matches:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// GET /api/match/pending
router.get('/pending', async (req, res) => {
  const uid = req.user.uid;

  try {
    const pendingMatches = await getPendingMatchesForUser(uid);
    res.status(200).json({ success: true, pendingMatches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});




module.exports = router;
