// src/controllers/authController.js
const admin = require('../firebase');

exports.verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return res.status(200).json({ uid: decodedToken.uid });
  } catch (error) {
    console.error('[verifyIdToken] Error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
