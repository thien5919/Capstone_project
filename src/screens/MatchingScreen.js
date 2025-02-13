import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View, Text, useWindowDimensions} from "react-native";
import Card from "../components/FindBuddyCard/card";
import users from "../../assets/TinderAssets/assets/data/users";
import Animated, {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, useDerivedValue, interpolate } from "react-native-reanimated";
import { PanGestureHandler, } from "react-native-gesture-handler";

export default function MatchingScreen({ navigation }) {

  const { width: screenWidth } = useWindowDimensions()

  const translateX = useSharedValue(0)
  const rotate = useDerivedValue(()=> interpolate(translateX.value, [0, screenWidth], [0, 60]) + 'deg')
  const cardStyle = useAnimatedStyle(()=> ({
    transform: [{
      translateX: translateX.value,
    },
    {
      rotate: rotate.value
    }
  ],
  })); 

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context )=>{
      context.startX = translateX.value;
      // console.warn("onStart")
    },
    onActive: (event, context) =>{
      translateX.value = context.startX + event.translationX
      // console.log("Touch x: ", event.translationX)
    },
    onEnd: () => {
      console.warn('Touch End')
    }
  });
  return (
    <View style={styles.pageContainer}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Card user={users[2]} />
        </Animated.View>
      </PanGestureHandler>
      
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
  animatedCard:{
    width: '100%', 
    justifyContent: "center",
    alignItems: "center",

  }
});
