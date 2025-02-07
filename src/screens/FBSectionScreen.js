import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity  } from 'react-native';

export default function FBSectionScreen({navigation}) {
  return (
    <View style={styles.container}>
    {/* Placeholder for App Icon */}
    <View style={styles.iconApp} />

    {/* Fitness Tracker Card */}
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TrackingScreen")}
    >
      <Text style={styles.cardTitle}>Fitness Tracker ⚡</Text>
      <Text style={styles.cardDescription}>
        "Track your workouts, monitor progress, and set fitness goals. Log
        exercises, duration, and calories burned to stay on top of your
        fitness journey!"
      </Text>
    </TouchableOpacity>

    {/* Find Buddies Card */}
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MatchingScreen")} 
    >
      <Text style={styles.cardTitle}>Find Buddies 🎉</Text>
      <Text style={styles.cardDescription}>
        "Discover workout partners nearby who share your fitness goals.
        Connect, match, and motivate each other to achieve more together!"
      </Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FAF0D7", // Light beige background
      alignItems: "center",
      justifyContent: "center",
    },
    iconApp: {
      width: 120,
      height: 80,
      backgroundColor: "#D3D3D3", // Gray placeholder
      borderRadius: 10,
      marginBottom: 20,
    },
    card: {
      width: "90%",
      backgroundColor: "white",
      padding: 15,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4, // For Android shadow
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: 13,
      fontWeight: "300",
      color: "#444",
    },
  });
