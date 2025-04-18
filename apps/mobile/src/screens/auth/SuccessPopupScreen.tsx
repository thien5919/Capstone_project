// ✅ File: SuccessPopupScreen.tsx (Updated)

import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Alert, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

import { register } from '../../services/auth.service';
import auth from '@react-native-firebase/auth';
import { useRegistration } from '../../context/RegistrationContext';
import { saveUserProfile, saveUserLocation } from '../../services/user.service';

import DEFAULT from '../../../assets/images/default.png';
const DEFAULT_AVATAR = Image.resolveAssetSource(DEFAULT).uri;

export default function SuccessPopupScreen() {
  const opacity = new Animated.Value(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { registrationData } = useRegistration();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const handleRegistration = async () => {
      try {
        const { email, password, ...profile } = registrationData;

        if (!email || !password) {
          Alert.alert('Error', 'Missing email or password');
          return;
        }

        await register(email, password);
        const currentUser = auth().currentUser;
        if (!currentUser) throw new Error('User not found after registration');

        await saveUserProfile(currentUser.uid, {
          uid: currentUser.uid,
          email,
          displayName: profile.displayName ?? 'Anonymous',
          age: profile.age ?? 18,
          gender: profile.gender ?? '---',
          photoUrl: profile.photoUrl ?? DEFAULT_AVATAR,
          description: profile.description ?? '',
          matchPreferences: profile.matchPreferences ?? {
            preferredGender: '---',
            preferredAgeRange: { min: null, max: null },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await saveUserLocation(currentUser.uid); // ✅ Save location sau khi tạo profile

        navigation.navigate('App');
      } catch (err: any) {
        console.error('Registration error:', err);
        Alert.alert('Registration Failed', err.message || 'Unexpected error');
      }
    };

    handleRegistration();
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.popup, { opacity }]}> 
        <Ionicons name="checkmark-circle" size={60} color="#10B981" />
        <Text style={styles.title}>Success!</Text>
        <Text style={styles.message}>You’ve joined Gym Buddies 🎉</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#111827',
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
});