const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gymbuddiesapp-15d35-default-rtdb.firebaseio.com",
  projectId: "gymbuddiesapp-15d35",
});
const firestore = admin.firestore();
module.exports = { admin, firestore };
