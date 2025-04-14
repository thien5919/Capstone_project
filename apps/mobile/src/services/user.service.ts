import { firestore } from './firebase';
import { UserProfile, MatchPreferences } from '../types/user.types';

export const saveUserProfile = async (uid: string, data: UserProfile): Promise<void> => {
  await firestore().collection('users').doc(uid).set(data, { merge: true });
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  await firestore().collection('users').doc(uid).update(data);
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const doc = await firestore().collection('users').doc(uid).get();
  return doc.exists ? (doc.data() as UserProfile) : null;
};

export const saveMatchPreference = async (
  uid: string,
  pref: MatchPreferences
): Promise<void> => {
  await updateUserProfile(uid, { matchPreferences: pref });
};

export const deleteUserProfile = async (uid: string): Promise<void> => {
  await firestore().collection('users').doc(uid).delete();
};

export const checkUserExists = async (uid: string): Promise<boolean> => {
  const doc = await firestore().collection('users').doc(uid).get();
  return doc.exists;
};

export const upsertUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  await firestore().collection('users').doc(uid).set(data, { merge: true });
};
