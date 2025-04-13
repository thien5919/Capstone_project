import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRegistration } from '../../context/RegistrationContext';
import { Gender } from '../../types/user.types';

export default function MatchPreferenceScreen() {
  const navigation = useNavigation();
  const { updateRegistrationData } = useRegistration();

  const [preferredGender, setPreferredGender] = useState<Gender>('---');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  const handleComplete = () => {
    const min = parseInt(minAge);
    const max = parseInt(maxAge);

    if (isNaN(min) || isNaN(max) || min > max) {
      Alert.alert('Invalid age range', 'Please enter a valid minimum and maximum age.');
      return;
    }

    updateRegistrationData({
      matchPreferences: {
        preferredGender,
        preferredAgeRange: {
          min,
          max,
        },
      },
    });

    navigation.navigate('SuccessPopup' as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Who are you looking to match with?</Text>

      <Text style={styles.label}>Preferred Gender</Text>
      <RadioButton.Group
        onValueChange={(value) => setPreferredGender(value as Gender)}
        value={preferredGender}
      >
        <View style={styles.radioRow}>
          <RadioButton value="male" />
          <Text>Male</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="female" />
          <Text>Female</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="other" />
          <Text>Other</Text>
        </View>
      </RadioButton.Group>

      <TextInput
        label="Min Age"
        value={minAge}
        onChangeText={setMinAge}
        keyboardType="number-pad"
        style={styles.input}
      />
      <TextInput
        label="Max Age"
        value={maxAge}
        onChangeText={setMaxAge}
        keyboardType="number-pad"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleComplete} style={styles.button}>
        Complete Registration
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});
