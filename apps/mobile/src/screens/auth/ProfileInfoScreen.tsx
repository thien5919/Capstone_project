import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useRegistration } from '../../context/RegistrationContext';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Gender } from '../../types/user.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignUpStackParamList } from '../../navigation/types';


type SignUpNav = NativeStackNavigationProp<SignUpStackParamList, 'ProfileInfo'>;

export default function ProfileInfoScreen() {
  const navigation = useNavigation<SignUpNav>();
  const { updateRegistrationData } = useRegistration();

  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('---');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_AVATAR = Image.resolveAssetSource(require('../../../assets/images/default.png')).uri;
  const handlePickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      setPhotoUrl(result.assets[0].uri || null);
    }
  };

  const handleNext = () => {
    if (!displayName || !age || !gender) {
      setError('Please fill out all required fields.');
      return;
    }
    updateRegistrationData({
      displayName,
      age: parseInt(age, 10),
      gender,
      description,
      photoUrl: photoUrl || DEFAULT_AVATAR,
    });
    navigation.navigate('MatchPreference');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Tell us about yourself</Text>
        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          label="Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={styles.input}
        />
       
        <Text style={{ marginBottom: 6, marginTop: 8 }}>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue as Gender)}
          style={{
            marginBottom: 12,
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
            <Picker.Item label="-- Select gender --" value="---" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Prefer not to say" value="prefer-not-to-say" />
          </Picker>
        <TextInput
          label="Short Bio"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <TouchableOpacity onPress={handlePickImage} style={styles.avatarButton}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarText}>Select Avatar</Text>
          )}
        </TouchableOpacity>

        <Button mode="contained" onPress={handleNext} style={styles.button}>
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  form: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  avatarButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    color: '#888',
    fontSize: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
