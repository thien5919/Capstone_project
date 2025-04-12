import { auth } from './firebase';

export const register = async (email: string, password: string) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

export const login = async (email: string, password: string) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return await auth().signOut();
};

export const resetPassword = async (email: string) => {
  return await auth().sendPasswordResetEmail(email);
};
