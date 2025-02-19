import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import BottomNavigation from '../../components/NavBars/BottomTabNavigator'
import MatchingScreen from "./MatchingScreen";
import ChatScreen from "./ChatScreen";
import UserProfileScreen from "./UserProfileScreen";
import LikedYouScreen from "./LikedYouScreen";
import ForYouScreen from "./ForYouScreen";
export default function FindBudScreen() {
    const [activeScreen, setActiveScreen] = useState("MatchingScreen");
  
    const renderActiveScreen = () => {
      switch (activeScreen) {
        case "UserProfileScreen":
          return <UserProfileScreen />;
        case "ForYouScreen":
          return <ForYouScreen />;
        case "LikedYouScreen":
          return <LikedYouScreen />;
        case "ChatScreen":
          return <ChatScreen />;
        case "MatchingScreen":
        default:
          return <MatchingScreen />;
      }
    };
  
    return (
      <View style={styles.container}>
        {renderActiveScreen()}
        <BottomNavigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  });
