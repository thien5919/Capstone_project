import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TopNavigation() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Bumble</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-undo-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconSpacing}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 15,
  },
});
