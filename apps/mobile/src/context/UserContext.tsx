import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { api } from '../services/api.service';
import { UserProfile } from '../types/user.types';

interface UserContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userProfile: null,
  loading: true,
  error: null,
  refreshUserProfile: async () => {},
  updateUserProfile: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('No authenticated user');
  
      const idToken = await user.getIdToken(true); // ✅ force refresh
      const profile = await api.getProfile(idToken);
  
      console.log('📦 Loaded user profile from API:', JSON.stringify(profile, null, 2));
      console.log('🔥 Firebase ID Token:', idToken);

  
      setUserProfile(profile);
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('No authenticated user');
      const idToken = await user.getIdToken();
      await api.updateProfile(idToken, updates);
      await refreshUserProfile();
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) refreshUserProfile();
      else {
        setUserProfile(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{ userProfile, loading, error, refreshUserProfile, updateUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
