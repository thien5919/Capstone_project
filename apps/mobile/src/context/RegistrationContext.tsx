import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MatchPreferences {
  preferredGender: string | null;
  preferredAgeRange: {
    min: number | null;
    max: number | null;
  };
}

interface RegistrationData {
  email?: string;
  password?: string;
  displayName?: string;
  age?: number;
  gender?: string;
  photoUrl?: string;
  description?: string;
  matchPreferences?: MatchPreferences;
}

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
        updated.matchPreferences = {
          preferredGender: data.matchPreferences.preferredGender ?? prev.matchPreferences?.preferredGender ?? null,
          preferredAgeRange: {
            min: data.matchPreferences.preferredAgeRange?.min ?? prev.matchPreferences?.preferredAgeRange?.min ?? null,
            max: data.matchPreferences.preferredAgeRange?.max ?? prev.matchPreferences?.preferredAgeRange?.max ?? null,
          },
        };
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
