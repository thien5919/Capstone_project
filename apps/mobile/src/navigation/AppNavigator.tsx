// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStackParamList } from './types';

import { ChatProvider } from '../context/ChatContext';
import { NotificationProvider } from '../context/NotificationContext';
import { MatchingProvider } from '../context/MatchingContext';

import MatchingScreen from '../screens/main/MatchingScreen';
import FeaturesScreen from '../screens/main/FeaturesScreen';
import ChallengeScreen from '../screens/main/NotificationScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import ChatListScreen from '../screens/main/ChatListScreen';

const Tab = createBottomTabNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <NotificationProvider>
      <ChatProvider>
        <MatchingProvider>
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
              headerShown: true,
              headerStyle: {
                backgroundColor: '#1e1e1e',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            })}
          >
            <Tab.Screen name="Match" component={MatchingScreen} />
            <Tab.Screen name="Features" component={FeaturesScreen} />
            <Tab.Screen name="Notifications" component={ChallengeScreen} />
            <Tab.Screen name="Chats" component={ChatListScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </MatchingProvider>
      </ChatProvider>
    </NotificationProvider>
  );
};

export default AppNavigator;
