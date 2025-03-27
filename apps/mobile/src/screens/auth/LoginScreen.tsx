import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const API_URL = 'http://10.0.2.2:3000'; // VD: http://10.0.2.2:3000 cho Android emulator

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
  
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error('Backend verification failed');
  
      const result = await response.json();
      Alert.alert('✅ Success', `Welcome ${result.uid}`);
    } catch (error: any) {
      console.error('Login failed:', error);
      const message = error.message.includes('Network request failed')
        ? 'Check your internet or local server is running at 10.0.2.2:3000'
        : error.message;
  
      Alert.alert('❌ Error', message);
    }
  };

  return (
    <View>
      
    </View>
  );
};

export default LoginScreen;
