import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function BottomNavigation({ activeScreen, setActiveScreen }) {
  const activeColor = "black";

  return (
    <View style={styles.bottomNavigation}>
      <Pressable onPress={() => setActiveScreen("UserProfileScreen")}>
        <Ionicons
          name={activeScreen === "UserProfileScreen" ? "person" : "person-outline"}
          size={30}
          color={activeScreen === "UserProfileScreen" ? activeColor : "gray"}
          style={{ opacity: activeScreen === "UserProfileScreen" ? 1 : 0.4 }}
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen("ForYouScreen")}>
        <MaterialCommunityIcons
          name={activeScreen === "ForYouScreen" ? "star-four-points" : "star-four-points-outline"}
          size={30}
          color={activeScreen === "ForYouScreen" ? activeColor : "gray"}
          style={{ opacity: activeScreen === "ForYouScreen" ? 1 : 0.4 }}
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen("MatchingScreen")}>
        <Ionicons
          name={activeScreen === "MatchingScreen" ? "color-filter" : "color-filter-outline"}
          size={30}
          color={activeScreen === "MatchingScreen" ? activeColor : "gray"}
          style={{ opacity: activeScreen === "MatchingScreen" ? 1 : 0.4 }}
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen("LikedYouScreen")}>
        <Fontisto
          name={activeScreen === "LikedYouScreen" ? "heart" : "heart-alt"}
          size={30}
          color={activeScreen === "LikedYouScreen" ? activeColor : "gray"}
          style={{ opacity: activeScreen === "LikedYouScreen" ? 1 : 0.4 }}
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen("ChatScreen")}>
        <Ionicons
          name={activeScreen === "ChatScreen" ? "chatbubbles" : "chatbubbles-outline"}
          size={30}
          color={activeScreen === "ChatScreen" ? activeColor : "gray"}
          style={{ opacity: activeScreen === "ChatScreen" ? 1 : 0.4 }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    position: "absolute",
    bottom: 10,
    backgroundColor: "white",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
