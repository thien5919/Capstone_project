import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import { saveUserLocation } from '../../services/user.service'; // 🔥 Import thêm

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Notice', 'Please enter both email and password.');
    }
  
    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
      const currentUser = auth().currentUser;
      if (currentUser) {
        await saveUserLocation(currentUser.uid); 
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Log In" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Create a new account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 16, paddingVertical: 8 },
  link: { marginTop: 16, color: '#007bff', textAlign: 'center' },
});
