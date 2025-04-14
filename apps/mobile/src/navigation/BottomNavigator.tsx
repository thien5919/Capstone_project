import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import ChatStack from './ChatStack';
import ChallengeScreen from '../screens/ChallengeScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: { [key: string]: string } = {
            Match: 'heart-outline',
            Features: 'star-outline',
            Challenge: 'trophy-outline',
            Chat: 'chatbubble-outline',
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
      <Tab.Screen name="Challenge" component={ChallengeScreen} />
      {/* <Tab.Screen name="Chat" component={ChatStack} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
