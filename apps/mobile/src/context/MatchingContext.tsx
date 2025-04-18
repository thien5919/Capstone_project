import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicUserProfile } from '../types/user.types';
import { api } from '../services/api.service'; 
import { useAuth } from './AuthContext';
import { useUser } from './UserContext'; // 🛠

interface MatchingContextProps {
  profiles: PublicUserProfile[];
  pendingRequests: PublicUserProfile[];
  refreshProfiles: () => Promise<void>;
  refreshPendingRequests: () => Promise<void>;
  removeProfile: (userId: string) => void;
  removePendingRequest: (userId: string) => void;
}

const MatchingContext = createContext<MatchingContextProps | undefined>(undefined);

export const useMatching = () => {
  const context = useContext(MatchingContext);
  if (!context) {
    throw new Error('useMatching must be used inside MatchingProvider');
  }
  return context;
};

export const MatchingProvider = ({ children }: { children: React.ReactNode }) => {
  const [profiles, setProfiles] = useState<PublicUserProfile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PublicUserProfile[]>([]);
  const { isAuthenticated } = useAuth();
  const { userProfile, loading } = useUser(); // 🛠

  const refreshProfiles = async () => {
    try {
      const users = await api.fetchNearbyUsers();
      console.log('🧩 Nearby users:', users); 
      setProfiles(users);
    } catch (error) {
      console.error('Failed to fetch nearby users:', error);
    }
  };

  const refreshPendingRequests = async () => {
    try {
      const requests = await api.fetchPendingRequests();
      setPendingRequests(requests);
    } catch (error) {
      console.error('Failed to fetch pending requests:', error);
    }
  };

  const removeProfile = (userId: string) => {
    setProfiles((prev) => prev.filter((u) => u.uid !== userId));
  };

  const removePendingRequest = (userId: string) => {
    setPendingRequests((prev) => prev.filter((u) => u.uid !== userId));
  };

  useEffect(() => {
    if (isAuthenticated && userProfile && !loading) {
      refreshProfiles();
      refreshPendingRequests();
    }
  }, [isAuthenticated, userProfile, loading]);

  return (
    <MatchingContext.Provider
      value={{
        profiles,
        pendingRequests,
        refreshProfiles,
        refreshPendingRequests,
        removeProfile,
        removePendingRequest,
      }}
    >
      {children}
    </MatchingContext.Provider>
  );
};
