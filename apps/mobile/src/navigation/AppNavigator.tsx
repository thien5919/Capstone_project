import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchScreen from '../screens/main/MatchScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
// import ChatStack from './ChatStack';
import ChallengeScreen from '../screens/main/ChallengeScreen';
import FeaturesScreen from '../screens/main/FeaturesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

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
