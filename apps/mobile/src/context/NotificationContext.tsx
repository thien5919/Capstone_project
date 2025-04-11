import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  fcmToken: string | null;
  setFcmToken: (token: string) => void;
  enableNotification: boolean;
  toggleNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [fcmToken, setFcmTokenState] = useState<string | null>(null);
  const [enableNotification, setEnableNotification] = useState(true);

  const setFcmToken = (token: string) => setFcmTokenState(token);
  const toggleNotification = () => setEnableNotification((prev) => !prev);

  return (
    <NotificationContext.Provider
      value={{ fcmToken, setFcmToken, enableNotification, toggleNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
