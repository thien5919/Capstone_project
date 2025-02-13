import { StyleSheet, View} from "react-native";
import Card from "../components/FindBuddyCard/card";
import users from "../../assets/TinderAssets/assets/data/users";
import AnimatedStack from "../components/AnimatedStack/AniStack";

export default function MatchingScreen({ navigation }) {

  const onSwipeLeft = (user) =>{
    console.warn("SwipeLeft", user.name)
  }

  const onSwipeRight = (user) =>{
    console.warn("SwipeRight", user.name)
  }

  return (
    <View style={styles.pageContainer}>
      
      <AnimatedStack 
        data={users}
        renderItem={({item}) => <Card user={item}/>}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />

     
      
      {/* <Pressable onPress={() => sharedValue.value = withSpring(Math.random())}>
          <Text>Change Value</Text>
      </Pressable> */}
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
});
