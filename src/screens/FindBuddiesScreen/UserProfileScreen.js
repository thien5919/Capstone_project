import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF0D7",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
