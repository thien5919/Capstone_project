import { messaging } from './firebase';
import { updateUserProfile } from './user.service';
import axios from 'axios';

export const registerFcmToken = async (uid: string) => {
  const token = await messaging().getToken();
  if (token) {
    await updateUserProfile(uid, { fcmToken: token });
  }
};

export const listenNotification = () => {
  messaging().onMessage(async (remoteMessage) => {
    console.log('🔔 Notification:', remoteMessage.notification);
  });
};

const FCM_SERVER_KEY = 'YOUR_FCM_SERVER_KEY'; // 🔐 Replace or use .env

export const sendPushNotification = async (token: string, title: string, body: string) => {
  const message = {
    to: token,
    notification: {
      title,
      body,
    },
  };

  await axios.post('https://fcm.googleapis.com/fcm/send', message, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${FCM_SERVER_KEY}`,
    },
  });
};
//xoa