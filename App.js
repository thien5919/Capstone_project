import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigatorScreen from './src/components/NavigatorScreen';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <NavigatorScreen />
    // </SafeAreaView>
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
  },
});
