import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRegistration } from '../../context/RegistrationContext';
import { Alert } from 'react-native';
import { Gender } from '../../types/user.types';

export default function ProfileInfoScreen() {
  const navigation = useNavigation();
  const { updateRegistrationData } = useRegistration();
  
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('---');
  const [description, setDescription] = useState('');

  const handleNext = () => {
    const parsedAge = parseInt(age);
    if (!displayName || isNaN(parsedAge)) {
      return Alert.alert('Please fill out all required fields.');
    }

    updateRegistrationData({
      displayName,
      age: parsedAge,
      gender,
      description,
    });

    navigation.navigate('MatchPreference' as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      <TextInput
        label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        style={styles.input}
      />
      <Text style={styles.label}>Gender</Text>
      <RadioButton.Group onValueChange={(value) => setGender(value as Gender)} value= {gender}>
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
        label="Short Bio"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
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
  input: {
    marginBottom: 16,
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
  button: {
    marginTop: 24,
  },
});
