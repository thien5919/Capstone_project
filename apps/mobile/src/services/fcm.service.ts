import { messaging } from './firebase';
import { updateUserProfile } from './user.service';

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
