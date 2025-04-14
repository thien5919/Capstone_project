import React, { JSX, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Like from "../../../assets/images/LIKE.png";
import Nope from "../../../assets/images/nope.png";

interface UserProfile {
  id: string;
  name: string;
  image: string | ImageSourcePropType;
  bio: string;
}

interface AnimatedStackProps {
  data: UserProfile[];
  renderItem: ({ item }: { item: UserProfile }) => JSX.Element;
  onSwipeRight?: (user: UserProfile) => void;
  onSwipeLeft?: (user: UserProfile) => void;
}

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

export default function AnimatedStack({ data, renderItem, onSwipeLeft, onSwipeRight }: AnimatedStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];

  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(() =>
    interpolate(translateX.value, [-hiddenTranslateX, hiddenTranslateX], [-ROTATION, ROTATION])
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.9, 1]),
      },
    ],
    opacity: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.6, 1]),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      const direction = Math.sign(event.velocityX);
      translateX.value = withSpring(hiddenTranslateX * direction, {}, () => {
        runOnJS(setCurrentIndex)((prev) => prev + 1);
        const onSwipe = direction > 0 ? onSwipeRight : onSwipeLeft;
        if (onSwipe && currentProfile) runOnJS(onSwipe)(currentProfile);
      });
    });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex]);

  return (
    <View style={styles.root}>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({ item: nextProfile })}
          </Animated.View>
        </View>
      )}

      {currentProfile && (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image source={Like} style={[styles.like, { left: 10 }, likeStyle]} resizeMode="contain" />
            <Animated.Image source={Nope} style={[styles.like, { right: 10 }, nopeStyle]} resizeMode="contain" />
            {renderItem({ item: currentProfile })}
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  animatedCard: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  like: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 10,
    zIndex: 1,
    elevation: 1,
  },
});
