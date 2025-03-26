import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native"; // Import Navigation type

// Define type for navigation prop
type WelcomeScreenProps = {
  navigation: NavigationProp<any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // Add login logic here
  };

  const handleRegister = () => {
    console.log("Navigating to Register Screen");
    navigation.navigate("RegisterScreen");
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Welcome to the App!" />
        <Card.Content>
          <TextInput
            label="Email or Username"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={handleLogin}>
            Login
          </Button>
          <Button mode="text" onPress={handleRegister}>
            Register
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "90%",
    paddingVertical: 20,
  },
  input: {
    marginBottom: 10,
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default WelcomeScreen;
