import React from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { userProfile, loading, error } = useUser();
  const { logoutUser } = useAuth();

  return (
    <SafeAreaView style={styles.fullscreen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={{ marginTop: 12 }}>Loading profile...</Text>
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : userProfile ? (
          <>
            <Text style={styles.title}>👋 Hello, {userProfile.displayName || 'User'}</Text>
            <Text style={styles.text}>Email: {userProfile.email || 'N/A'}</Text>
            <Text style={styles.text}>Age: {userProfile.age || 'N/A'}</Text>
            <Text style={styles.text}>Gender: {userProfile.gender || 'N/A'}</Text>
            <Text style={styles.text}>Bio: {userProfile.description || 'N/A'}</Text>
          </>
        ) : (
          <View style={styles.centered}>
            <Text>Profile not found.</Text>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.logoutContainer}>
        <Button title="Log Out" color="#EF4444" onPress={logoutUser} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  spacer: {
    height: 100,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
