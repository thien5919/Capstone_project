import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function TrackingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Tracking Screen</Text>
      <Button title="Go to Menu"
      onPress={() => navigation.navigate("FBSectionScreen")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
