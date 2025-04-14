import React, { createContext, useContext, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import auth from '@react-native-firebase/auth';
import { api } from '../services/api.service';

type Location = {
  latitude: number;
  longitude: number;
};

interface LocationContextType {
  location: Location | null;
  updateLocation: () => void;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  updateLocation: () => {},
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);

  const updateLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(coords);

        const idToken = await auth().currentUser?.getIdToken();
        if (idToken) {
          await api.updateProfile(idToken, { location: coords });
        }
      },
      (error) => {
        console.warn('Location error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
