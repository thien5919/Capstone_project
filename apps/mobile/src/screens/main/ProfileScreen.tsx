import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator, Text, Card, Divider } from 'react-native-paper';
import { useUser } from '../../context/UserContext';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { userProfile, refreshUserProfile, updateUserProfile, loading } = useUser();
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    refreshUserProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.displayName || '');
      setBio(userProfile.description || '');
    }
  }, [userProfile]);

  const handleUpdate = async () => {
    await updateUserProfile({ displayName: name, description: bio });
    alert('✅ Profile updated successfully!');
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium" style={{ color: 'red' }}>
          No profile found. Please login.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="User Details" titleStyle={styles.title} />
        <Card.Content>
          <Text style={styles.detailItem}>👤 Name: {userProfile.displayName || 'N/A'}</Text>
          <Text style={styles.detailItem}>📧 Email: {userProfile.email || 'N/A'}</Text>
          <Text style={styles.detailItem}>🎂 Age: {userProfile.age ?? 'N/A'}</Text>
          <Text style={styles.detailItem}>🚻 Gender: {userProfile.gender || 'N/A'}</Text>
          
          
        </Card.Content>
      </Card>

      <Divider style={{ marginVertical: 20 }} />

      <Card style={styles.card}>
        <Card.Title title="Edit Profile" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            placeholder="Your name"
          />
          <TextInput
            label="Bio"
            value={bio}
            onChangeText={setBio}
            mode="outlined"
            placeholder="Tell something about yourself..."
            multiline
            numberOfLines={4}
            style={[styles.input, { height: 100 }]}
          />
          <Button
            mode="contained"
            onPress={handleUpdate}
            style={styles.button}
            contentStyle={{ paddingVertical: 6 }}
          >
            Save Changes
          </Button>

          <Button
            mode="outlined"
            onPress={handleLogout}
            style={[styles.button, { marginTop: 10, backgroundColor: '#ffdddd' }]}
            textColor="red"
            contentStyle={{ paddingVertical: 6 }}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});
