// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MatchScreen from '../screens/main/MatchingScreen';
import FeaturesScreen from '../screens/main/FeaturesScreen';
import ChallengeScreen from '../screens/main/ChallengeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { AppStackParamList } from './types';

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: { [key: string]: string } = {
            Match: 'people-outline',
            Notifications: 'star-outline',
            Challenge: 'trophy-outline',
            Chats: 'chatbubble-outline',
            Profile: 'person-outline',
            Features: 'list-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#121212' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Features" component={FeaturesScreen} />
      <Tab.Screen name="Notifications" component={ChallengeScreen} />
      <Tab.Screen name="Chats" component={FeaturesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
