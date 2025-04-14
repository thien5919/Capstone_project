import React from "react";
import { ImageSourcePropType } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";

// Define the user prop type
type User = {
  name: string;
  image: string | ImageSourcePropType;
  bio: string;
};

type CardProps = {
  user: User;
};

const Card: React.FC<CardProps> = ({ user }) => {
  const { name, image, bio } = user;

  return (
    <View style={styles.card}>
      <ImageBackground
       source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
  },
  name: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
});

export default Card;
