import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screen components
import LoginScreen from '../screens/auth/LoginScreen';

import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import PersonalInfoScreen from '../screens/auth/ProfileInfoScreen';

const Stack = createNativeStackNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CreateAccount" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      
    </Stack.Navigator>
  );
};


const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
