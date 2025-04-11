import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRegistration } from '../../context/RegistrationContext';

export default function PersonalInfoScreen() {
  const navigation = useNavigation();
  const { updateRegistrationData } = useRegistration();

  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');

  const handleNext = () => {
    updateRegistrationData({
      displayName,
      age: parseInt(age, 10),
      gender,
      description,
    });
    navigation.navigate('MatchPreference' as never);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Your Info</Text>

        <TextInput
          label="Name"
          value={displayName}
          onChangeText={setDisplayName}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <Text style={styles.label}>Gender</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.radioRow}>
            <RadioButton value="male" /><Text>Male</Text>
            <RadioButton value="female" /><Text>Female</Text>
            <RadioButton value="non-binary" /><Text>Non-binary</Text>
          </View>
        </RadioButton.Group>

        <TextInput
          label="Short Bio"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleNext} style={styles.button}>
          Next
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
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 16,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#6366f1',
  },
});
