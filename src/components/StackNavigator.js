// import { createStackNavigator } from '@react-navigation/stack';
// import FBSectionScreen from '../screens/FBSectionScreen';
// import MatchingScreen from '../screens/FindBuddiesScreen/MatchingScreen';
// import TrackingScreen from '../screens/TrackingScreen/TrackingScreen';
// import FindBudScreen from '../screens/FindBuddiesScreen/FindBudScreen';

// const Stack = createStackNavigator();

// export default function StackNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="FBSectionScreen">
//         <Stack.Screen name="FBSectionScreen" component={FBSectionScreen} />
//         <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
//         <Stack.Screen name="FindBudScreen" component={FindBudScreen} />
//     </Stack.Navigator>
//   );
// }

import { createStackNavigator } from "@react-navigation/stack";
import FBSectionScreen from "../screens/FBSectionScreen";
import MatchingScreen from "../screens/FindBuddiesScreen/MatchingScreen";
import TrackingScreen from "../screens/TrackingScreen/TrackingScreen";
import FindBudScreen from "../screens/FindBuddiesScreen/FindBudScreen";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

// ✅ Custom Header Component for `FindBudScreen`
function CustomFindBudHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* Left Icons (Two black squares) */}
      <View style={styles.leftIcons}>
        <MaterialCommunityIcons name="menu" size={30} color="black" />
      </View>

      {/* Center Title */}
      <Text style={styles.title}>today mission process</Text>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
          <AntDesign name="filter" size={30} color="black" />  
      </View>
    </View>
  );
}

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="FBSectionScreen">
      <Stack.Screen name="FBSectionScreen" component={FBSectionScreen} />
      <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
      <Stack.Screen
        name="FindBudScreen"
        component={FindBudScreen}
        options={{
          headerTitle: () => <CustomFindBudHeader />, // ✅ Custom Header with Icons
          headerStyle: { backgroundColor: "white", elevation: 0, shadowOpacity: 0 }, // No Shadow
        }}
      />
    </Stack.Navigator>
  );
}

// ✅ Custom Header Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  leftIcons: {
    flexDirection: "column",
  },
  iconSpacing: {
    marginTop: 3, // Adjust space between the stacked icons
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineIcons: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 5,
  },
});
