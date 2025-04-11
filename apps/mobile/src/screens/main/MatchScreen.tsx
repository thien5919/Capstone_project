import { useState } from "react";
import { View, StyleSheet } from "react-native"; // ✅ View phải import
import Card from "../../components/findBuddiesCard/Card";
import users from "../../../assets/data/user";
import AnimatedStack from "../../components/animatedStack/AniStack";

export default function MatchScreen() {
  const [activeScreen, setActiveScreen] = useState("MatchingScreen");

  const onSwipeLeft = (user: { name: string }) => {
    console.warn("swiped left", user.name);
  };

  const onSwipeRight = (user: { name: string }) => {
    console.warn("swiped right", user.name);
  };

  const activeColor = "black";

  return (
    <View style={styles.pageContainer}>
      {/* <TopNavigation /> */}

      <AnimatedStack
        data={users}
        renderItem={({ item }) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View> // ✅ đóng thẻ View
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
