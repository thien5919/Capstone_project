// src/context/RegistrationContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MatchPreferences, RegistrationData } from '../types/user.types';
import { mergePreferences } from '../components/mergePreferences/mergePreferences';

interface RegistrationContextType {
  registrationData: RegistrationData;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  resetRegistrationData: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => {
      const updated: RegistrationData = {
        ...prev,
        ...data,
      };

      if (data.matchPreferences) {
        updated.matchPreferences = mergePreferences(
          prev.matchPreferences,
          data.matchPreferences
        );
      }

      return updated;
    });
  };

  const resetRegistrationData = () => setRegistrationData({});

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData, resetRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
