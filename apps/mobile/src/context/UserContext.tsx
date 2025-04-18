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
    try {
      const profile = await api.getProfile();
  
      if (profile.created) {
        console.log('⚠️ Profile was just created. Skip setting userProfile.');
        setLoading(false); 
        return;
      }
  
      console.log('✅ Loaded user profile:', profile);
      setUserProfile(profile);
    } catch (error) {
      console.error('❌ Failed to fetch user profile:', error);
      setError((error as any).message ?? 'Unknown error'); // thêm nếu muốn
    } finally {
      setLoading(false); // 👈 cái này đảm bảo lúc nào cũng set loading false
    }
  };
  
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('No authenticated user');
      
      await api.updateProfile(updates); 
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
