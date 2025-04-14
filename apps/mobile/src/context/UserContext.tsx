// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { api } from '../services/api.service';
import { PublicUserProfile } from '../types/user.types';

interface UserContextType {
  userProfile: PublicUserProfile | null;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<PublicUserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userProfile: null,
  refreshUserProfile: async () => {},
  updateUserProfile: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<PublicUserProfile | null>(null);

  const refreshUserProfile = async () => {
    const idToken = await auth().currentUser?.getIdToken();
    if (idToken) {
      const profile = await api.getProfile(idToken);
      setUserProfile(profile);
    }
  };

  const updateUserProfile = async (updates: Partial<PublicUserProfile>) => {
    const idToken = await auth().currentUser?.getIdToken();
    if (idToken) {
      await api.updateProfile(idToken, updates);
      await refreshUserProfile();
    }
  };

  useEffect(() => {
    refreshUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, refreshUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
