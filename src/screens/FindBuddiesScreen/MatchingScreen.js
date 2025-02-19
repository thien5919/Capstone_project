import { StyleSheet, View, Pressable} from "react-native";
import Card from "../../components/FindBuddyCard/card";
import users from "../../../assets/TinderAssets/assets/data/users";
import AnimatedStack from "../../components/AnimatedStack/AniStack";
import React, {useState} from "react";

export default function MatchingScreen({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('MatchingScreen');
  const onSwipeLeft = (user) =>{
    console.warn("SwipeLeft", user.name)
  }

  const onSwipeRight = (user) =>{
    console.warn("SwipeRight", user.name)
  }
  const activeColor = 'black'
  return (
    
    <View style={styles.pageContainer}>
      {/* <TopNavigation /> */}
      
      <AnimatedStack 
        data={users}
        renderItem={({item}) => <Card user={item}/>}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />

      {/* <View style={styles.bottomNavigation}>
        
      <Pressable onPress={() => setActiveScreen('UserProfileScreen')}>
        <Ionicons
          name={activeScreen === 'UserProfileScreen' ? "person" : "person-outline"} 
          size={30}
          color={activeScreen === 'UserProfileScreen' ? activeColor : 0.4} // ✅ Filled when active, outline when inactive
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen('ForYouScreen')}>
        <MaterialCommunityIcons
          name={activeScreen === 'ForYouScreen' ? "star-four-points" : "star-four-points-outline"}
          size={30}
          color={activeScreen === 'ForYouScreen' ? activeColor : 0.4}
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen('MatchingScreen')}>
          <Ionicons
            name={activeScreen === 'MatchingScreen' ? "color-filter" : "color-filter-outline"} 
            size={30}
            color={activeScreen === 'MatchingScreen' ?  activeColor : 0.4 }
          />
        </Pressable>

      <Pressable onPress={() => setActiveScreen('LikedYouScreen')}>
        <Fontisto
          name={activeScreen === 'LikedYouScreen' ? "heart" : "heart-alt"} 
          size={30}
          color={activeScreen === 'LikedYouScreen' ? activeColor : 0.4}
        />
      </Pressable>

      <Pressable onPress={() => setActiveScreen('ChatScreen')}>
        <Ionicons
          name={activeScreen === 'ChatScreen' ? "chatbubbles" : "chatbubbles-outline"}
          size={30}
          color={activeScreen === 'ChatScreen' ? activeColor : 0.4}
        />
      </Pressable>
      </View> */}
     
      {/* <Pressable onPress={() => sharedValue.value = withSpring(Math.random())}>
          <Text>Change Value</Text>
      </Pressable> */}
        {/* <Button title="Go to tracking"
            onPress={() => navigation.navigate("TrackingScreen")} /> */}
      {/* <BottomTabNavigator /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1, 
    backgroundColor: "#fff", 
    justifyContent: "center",
    alignItems: "center",
  },
});
