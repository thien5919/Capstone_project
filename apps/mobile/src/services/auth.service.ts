// src/services/auth.service.ts

import auth from '@react-native-firebase/auth';

/**
 * Register a user with email and password using Firebase Authentication
 * @param email User email
 * @param password User password
 * @returns Firebase user credential
 */
export const register = async (email: string, password: string) => {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  return userCredential;
};

/**
 * Sign in with email and password
 */
export const login = async (email: string, password: string) => {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  return userCredential;
};

/**
 * Sign out the current user
 */
export const logout = async () => {
  await auth().signOut();
};
