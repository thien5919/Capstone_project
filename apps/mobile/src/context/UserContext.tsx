import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  uid: string;
  displayName: string;
  age: number;
  gender: string;
  photoUrl?: string;
  description?: string;
  matchPreferences?: {
    preferredGender: string | null;
    preferredAgeRange: {
      min: number | null;
      max: number | null;
    };
  };
  settings?: {
    notifications?: {
      matchAlerts: boolean;
      messageAlerts: boolean;
    };
    accountPrivacy?: 'public' | 'private';
  };
}

export interface Match {
  id: string;
  users: string[];
  lastMessage?: string;
  lastMessageTime?: any;
}

export interface Message {
  sender: string;
  text: string;
  timestamp: any;
}

interface AppData {
  profile: UserProfile | null;
  matches: Match[];
  messages: { [matchId: string]: Message[] };
}

interface UserContextType {
  appData: AppData;
  setAppData: (data: AppData) => void;
  clearAppData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [appData, setAppDataState] = useState<AppData>({
    profile: null,
    matches: [],
    messages: {},
  });

  const setAppData = (data: AppData) => setAppDataState(data);
  const clearAppData = () =>
    setAppDataState({ profile: null, matches: [], messages: {} });

  return (
    <UserContext.Provider value={{ appData, setAppData, clearAppData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
