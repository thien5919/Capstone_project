import { createStackNavigator } from '@react-navigation/stack';
import FBSectionScreen from '../screens/FBSectionScreen';
import MatchingScreen from '../screens/MatchingScreen';
import TrackingScreen from '../screens/TrackingScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MatchingScreen">
        <Stack.Screen name="FBSectionScreen" component={FBSectionScreen} />
        <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
        <Stack.Screen name="MatchingScreen" component={MatchingScreen} />
    </Stack.Navigator>
  );
}