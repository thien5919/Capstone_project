// screens/ProfileScreen.tsx

import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { appData } = useUser();
  const navigation = useNavigation();
  const user = appData.profile;

  if (!user) return null;

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Tracking' as never)}>
          <Ionicons name="barbell" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings' as never)}>
          <Ionicons name="settings-outline" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Profile Photo */}
      <View style={styles.photoContainer}>
        <Image source={{ uri: user.photoUrl }} style={styles.photo} />
        <Text style={styles.name}>{user.displayName}, {user.age}</Text>
        <Text style={styles.description}>{user.description}</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Gender: <Text style={styles.value}>{user.gender}</Text></Text>
        {/* <Text style={styles.label}>Training Years: <Text style={styles.value}>{user.settings?.trainingYears ?? 'N/A'}</Text></Text> */}
      </View>

      {/* Logout Button */}
      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={logout}
      >
        Log Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  photoContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 12,
    backgroundColor: '#e5e7eb',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  infoSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  value: {
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 48,
    marginHorizontal: 24,
    borderColor: '#EF4444',
    borderWidth: 1,
  },
});
