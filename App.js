import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigatorScreen from './src/components/NavigatorScreen';
export default function App() {
  return (
    <NavigatorScreen />
    // <View style={styles.container}>
    //   <NavigatorScreen />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
