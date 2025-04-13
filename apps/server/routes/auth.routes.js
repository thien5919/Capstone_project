const express = require('express');
const router = express.Router();
const verifyFirebaseToken = require('../middlewares/auth.middleware');

router.get('/me', verifyFirebaseToken, (req, res) => {
  res.status(200).json({ uid: req.uid, message: 'Token is valid!' });
});

module.exports = router;
