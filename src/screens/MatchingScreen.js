import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image, ImageBackground } from "react-native";

export default function MatchingScreen({ navigation }) {
  return (
    <View style={styles.pageContainer}>
        <View style={styles.card}>
            <ImageBackground
                source={{
                uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
                }}
                style={styles.image}>
                <View style={styles.cardInner}>
                    <Text style={styles.name}>Elon Musk</Text>
                    <Text style={styles.bio}>'A dude with a rocket is looking for a gal with fuel'</Text>
                </View>
                </ImageBackground>
        </View>
        
        {/* <Button title="Go to tracking"
            onPress={() => navigation.navigate("TrackingScreen")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1, 
    backgroundColor: "#FAF0D7", 
    justifyContent: "center",
    alignItems: "center",
  },
  card:{
    width: '95%',
    height: '70%',
    borderRadius: 10,
    shadowColor:"#000000",
    shadowOffset: {
    width: 0,
    height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10
  },
  cardInner:{
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',

    justifyContent: 'flex-end',

  },
  name:{
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  bio:{
    fontSize: 18,
    color: 'white',
    lineHeight: 25,
  }
});
