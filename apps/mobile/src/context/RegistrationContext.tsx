import React, { createContext, useContext, useState } from 'react';
import { RegistrationData } from '../types/user.types';

interface RegistrationContextType {
  registrationData: Partial<RegistrationData>;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  resetRegistrationData: () => void;
}

const RegistrationContext = createContext<RegistrationContextType>({
  registrationData: {},
  updateRegistrationData: () => {},
  resetRegistrationData: () => {},
});

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<Partial<RegistrationData>>({});

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
  };

  const resetRegistrationData = () => {
    setRegistrationData({});
  };

  return (
    <RegistrationContext.Provider
      value={{ registrationData, updateRegistrationData, resetRegistrationData }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
