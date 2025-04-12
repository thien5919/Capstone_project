import { storage } from './firebase';

export const uploadAvatar = async (uid: string, uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const ext = uri.split('.').pop();
  const ref = storage().ref(`avatars/${uid}.${ext}`);
  await ref.put(blob);

  return await ref.getDownloadURL();
};
