import React, { createContext, useContext, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { login, register, logout } from '../services/auth.service';
import { ActivityIndicator, View } from 'react-native';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean;
  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const createUserProfileIfNotExists = async (user: FirebaseAuthTypes.User) => {
  const userRef = firestore().collection('users').doc(user.uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    await userRef.set({
      email: user.email,
      displayName: user.displayName || 'Anonymous',
      photoUrl: user.photoURL || '',          // 🔥 Bổ sung avatar
      age: 18,                                // 🔥 Để mặc định 18
      gender: 'male',                         // 🔥 Để mặc định male
      description: '',
      location: null,                         // 🔥 Quan trọng: location để sau match
      matchPreferences: {
        preferredGender: 'all',               // 🔥 'all' mới đúng
        preferredAgeRange: { min: 18, max: 100 },
        maxDistanceKm: 50,
      },
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(), // 🔥 Luôn thêm updatedAt
    });
    console.log('🆕 Created profile for new user:', user.uid);
  } else {
    console.log('✅ Profile already exists for user:', user.uid);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
        await createUserProfileIfNotExists(firebaseUser);
      } else {
        setToken(null);
      }
      setLoading(false);
    });
  
    
    const interval = setInterval(async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const refreshedToken = await currentUser.getIdToken(true);
        setToken(refreshedToken);
        console.log('🔄 Token refreshed');
      }
    }, 30 * 60 * 1000); // 30 phút
  
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);
  

  const loginUser = async (email: string, password: string) => {
    await login(email, password);
    const currentUser = auth().currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      console.log('🔑 ID Token:', idToken);
      setToken(idToken);
      await createUserProfileIfNotExists(currentUser);
    }
  };

  const registerUser = async (email: string, password: string) => {
    await register(email, password);
    const currentUser = auth().currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      setToken(idToken);
      await createUserProfileIfNotExists(currentUser);
    }
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    setToken(null);
  };

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated: !!user,
            token,
            loginUser,
            registerUser,
            logoutUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
