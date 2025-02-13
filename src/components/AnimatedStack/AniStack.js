import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, useDerivedValue, interpolate, runOnJS } from "react-native-reanimated";
import { PanGestureHandler, } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import Like from "../../../assets/TinderAssets/assets/images/LIKE.png";
import Nope from "../../../assets/TinderAssets/assets/images/nope.png";
import 'react-native-gesture-handler'
const ROTATION = 60;
const SWIPE_VELOCITY = 800;
export default function AnimatedStack(props) {


    const {data, renderItem, onSwipeRight, onSwipeLeft} = props;
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(currentIndex + 1)

    const currentProfile = data[currentIndex]
    const nextProfile = data[nextIndex]
    const { width: screenWidth } = useWindowDimensions()
    
    const hiddenTranslateX = 2 * screenWidth

    const translateX = useSharedValue(0)
    const rotate = useDerivedValue(()=> interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) + 'deg')
    const cardStyle = useAnimatedStyle(()=> ({
        transform: [{
        translateX: translateX.value,
        
        },
        {
        rotate: rotate.value
        }
    ],
    })); 

  const nextCardStyle = useAnimatedStyle(()=> ({
    transform: [
      {
        scale: interpolate(translateX.value, [-hiddenTranslateX,0, hiddenTranslateX], [1,0.9, 1])
      },
    ],
    opacity: interpolate(translateX.value, [-hiddenTranslateX,0, hiddenTranslateX], [1,0.6, 1])
  })); 

  const likeStyle = useAnimatedStyle(()=> ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1])
  }))

  const nopeStyle = useAnimatedStyle(()=> ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1])
  }))

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context )=>{
      context.startX = translateX.value;
      // console.warn("onStart")
    },
    onActive: (event, context) =>{
      translateX.value = context.startX + event.translationX
      // console.log("Touch x: ", event.translationX)
    },
    onEnd: (event) => {
      if(Math.abs(event.velocityX) < SWIPE_VELOCITY){
        translateX.value = withSpring(0)
        return;
      }

      translateX.value = withSpring(hiddenTranslateX * Math.sign(event.velocityX), {}, () => runOnJS(setCurrentIndex)(currentIndex + 1));

      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft
      onSwipe && runOnJS(onSwipe)(currentProfile);
      
    }
  });

  useEffect(() =>{
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex])

  return (
    <View style={styles.root}>
      {nextProfile && (<View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item: nextProfile})}
        </Animated.View>
      </View>)}
      

      {currentProfile && (<PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Animated.Image source={Like} style={[styles.like, {left: 10}, likeStyle]} resizeMode="contain" />
          <Animated.Image source={Nope} style={[styles.like, {right: 10}, nopeStyle]} resizeMode="contain" />
          {renderItem({item: currentProfile})}
        </Animated.View>
      </PanGestureHandler>)}
      
      {/* <Pressable onPress={() => sharedValue.value = withSpring(Math.random())}>
          <Text>Change Value</Text>
      </Pressable> */}
        {/* <Button title="Go to tracking"
            onPress={() => navigation.navigate("TrackingScreen")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    backgroundColor: "#FAF0D7", 
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  animatedCard:{
    width: '90%',
    height: '70%',
    justifyContent: "center",
    alignItems: "center",

  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%', 
    justifyContent: "center",
    alignItems: "center",
  }, like:{
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    elevation: 1,
  }
});
