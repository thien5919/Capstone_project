import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper'; // 🛠️ react-native-paper Provider

import { AuthProvider } from './src/context/AuthContext';
import { RegistrationProvider } from './src/context/RegistrationContext';
import { UserProvider } from './src/context/UserContext';


import { ThemeProvider } from './src/context/ThemeContext';


import RootNavigator from './src/navigation/RootNavigator';
import { requestAllPermissions } from './src/services/permission.service';

const App: React.FC = () => {
  useEffect(() => {
    requestAllPermissions();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      requestAllPermissions();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <ThemeProvider> {/* 🎨 Theme phải bọc ngoài để styling toàn app */}
          <AuthProvider>
            <RegistrationProvider>
              <UserProvider>                  
                      <RootNavigator />                  
              </UserProvider>
            </RegistrationProvider>
          </AuthProvider>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
