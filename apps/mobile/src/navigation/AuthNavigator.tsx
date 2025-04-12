import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import ProfileInfoScreeen from '../screens/auth/ProfileInfoScreen';
import MatchPreferenceScreen from '../screens/auth/MatchPreferenceScreen';
import SuccessPopupScreen from '../screens/auth/SuccessPopupScreen';

const Stack = createNativeStackNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CreateAccount" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfoScreeen} />
      <Stack.Screen name="MatchPreference" component={MatchPreferenceScreen} />
      <Stack.Screen name="SuccessPopup" component={SuccessPopupScreen} />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp">{() => <SignUpNavigator />}</Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;