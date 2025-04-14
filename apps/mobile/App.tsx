import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from './src/context/AuthContext';
import { RegistrationProvider } from './src/context/RegistrationContext';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { ChatProvider } from './src/context/ChatContext';
import { NotificationProvider } from './src/context/NotificationContext';
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
      <AuthProvider>
        <RegistrationProvider>
          <UserProvider>
            <NotificationProvider>
              <ChatProvider>
                <ThemeProvider>
                    <RootNavigator />             
                </ThemeProvider>
              </ChatProvider>
            </NotificationProvider>
          </UserProvider>
        </RegistrationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;