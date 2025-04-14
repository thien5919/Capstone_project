const { admin } = require('../firebase');

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    console.warn('🚫 No Bearer token found in header');
    return res.status(401).json({ error: 'No token provided' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    console.log('✅ Firebase token verified for UID:', decoded.uid); // 👈 Bây giờ sẽ hoạt động

    req.user = { uid: decoded.uid };
    next();
  } catch (error) {
    console.error('❌ Firebase auth error:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyFirebaseToken;
