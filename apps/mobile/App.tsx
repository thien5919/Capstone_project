import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView, Text } from 'react-native-gesture-handler';


import { AuthProvider } from './src/context/AuthContext';
import { RegistrationProvider } from './src/context/RegistrationContext';
import { UserProvider } from './src/context/UserContext';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { ChatProvider } from './src/context/ChatContext';
import { NotificationProvider } from './src/context/NotificationContext';

const App: React.FC = () => {
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
