import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Clipboard from '@react-native-clipboard/clipboard';

const TokenScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const loadToken = async () => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not logged in');
      const idToken = await user.getIdToken(true); // ✅ force refresh
      setToken(idToken);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to load token');
    }
  };

  const copyToken = () => {
    if (token) {
      Clipboard.setString(token);
      Alert.alert('Copied ✅', 'ID Token copied to clipboard');
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 Firebase ID Token</Text>
      <Text selectable style={styles.token}>{token || 'Loading...'}</Text>
      <View style={styles.buttonRow}>
        <Button title="Copy Token" onPress={copyToken} disabled={!token} />
        <Button title="Refresh" onPress={loadToken} />
      </View>
    </ScrollView>
  );
};

export default TokenScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  token: {
    fontSize: 12,
    color: '#333',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
});
