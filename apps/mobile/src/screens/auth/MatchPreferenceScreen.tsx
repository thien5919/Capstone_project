// screens/signup/MatchPreferenceScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRegistration } from '../../context/RegistrationContext';
import { Picker } from '@react-native-picker/picker';
import { Gender } from '../../types/user.types';

export default function MatchPreferenceScreen() {
  const navigation = useNavigation();
  const { updateRegistrationData } = useRegistration();

  const [preferredGender, setPreferredGender] = useState<Gender>('---');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  const handleSubmit = () => {
    updateRegistrationData({
      matchPreferences: {
        preferredGender: preferredGender as Gender,
        preferredAgeRange: {
          min: minAge ? parseInt(minAge, 10) : null,
          max: maxAge ? parseInt(maxAge, 10) : null,
        },
      },
    });
    navigation.navigate('SuccessPopup' as never);
  };

  const handleSkip = () => {
    updateRegistrationData({
      matchPreferences: {
        preferredGender: '---',
        preferredAgeRange: {
          min: null,
          max: null,
        },
      },
    });
    navigation.navigate('SuccessPopup' as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Partner Preferences</Text>

        <Text style={styles.label}>Preferred Gender</Text>
        <Picker
          selectedValue={preferredGender}
          onValueChange={(itemValue) => setPreferredGender(itemValue as Gender)}>
            <Picker.Item label="--- (No Preference)" value="---" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            </Picker>

      

        <TextInput
          label="Min Age"
          value={minAge}
          onChangeText={setMinAge}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Max Age"
          value={maxAge}
          onChangeText={setMaxAge}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Complete Registration
        </Button>

        <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
          Skip and Go to App
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F3F4F6',
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 16,
  },
  radioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#6366f1',
  },
  skipButton: {
    marginTop: 8,
  },
});
