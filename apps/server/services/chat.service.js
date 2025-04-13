const admin = require('firebase-admin');
const { sendAndSaveNotification } = require('./fcm.service');

// 🧠 Tách người nhận dựa trên roomId + sender
const extractRecipientFromRoomId = (roomId, senderId) => {
  const [uid1, uid2] = roomId.split('_');
  return senderId === uid1 ? uid2 : uid1;
};

// ✅ Tự động tạo room nếu chưa có (Realtime DB)
const ensureChatRoomExists = async (roomId, uid1, uid2) => {
  const ref = admin.database().ref(`chats/${roomId}/members`);
  const snapshot = await ref.once('value');
  if (!snapshot.exists()) {
    await ref.set({
      [uid1]: true,
      [uid2]: true,
    });
  }
};

// ✅ Gửi tin nhắn + xử lý notification
const sendMessage = async (roomId, message) => {
  const timestamp = Date.now();
  const messageData = {
    senderId: message.senderId,
    text: message.text,
    timestamp,
  };

  // 1. Ghi vào Realtime Database
  await admin.database().ref(`chats/${roomId}/messages`).push(messageData);

  // 2. Ghi vào Firestore để lưu trữ lâu dài
  await admin
    .firestore()
    .collection('chatRooms')
    .doc(roomId)
    .collection('messages')
    .add({
      ...messageData,
      sentAt: new Date(timestamp),
    });

  // 3. Xác định người nhận
  const recipientId = extractRecipientFromRoomId(roomId, message.senderId);

  // 4. Đảm bảo room đã tồn tại (Realtime DB)
  await ensureChatRoomExists(roomId, message.senderId, recipientId);

  // 5. Gửi FCM + lưu thông báo
  await sendAndSaveNotification(recipientId, {
    title: '💬 New Message',
    body: message.text.substring(0, 60),
    data: {
      type: 'chat',
      refId: roomId,
    },
  });

  return messageData;
};

// ✅ Lấy lịch sử tin nhắn từ Firestore
const getChatHistory = async (roomId, limit = 50) => {
  const snapshot = await admin
    .firestore()
    .collection('chatRooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('sentAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

module.exports = {
  sendMessage,
  getChatHistory,
};
