import React from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView, Image } from 'react-native';
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
          <View style={styles.profileContainer}>
            {/* Avatar hình tròn */}
            <Image
              source={{ uri: userProfile.photoUrl || 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <Text style={styles.name}>
              {userProfile.displayName || 'User'}, {userProfile.age || 'N/A'}
            </Text>
            <Text style={styles.gender}>{userProfile.gender || 'N/A'}</Text>

            {/* Thông tin chi tiết */}
            <View style={styles.details}>
              <Text style={styles.label}>📧 Email:</Text>
              <Text style={styles.value}>{userProfile.email || 'N/A'}</Text>

              <Text style={styles.label}>📝 Bio:</Text>
              <Text style={styles.value}>{userProfile.description || 'N/A'}</Text>
            </View>
          </View>
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
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // hình tròn
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  gender: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  details: {
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10,
    color: '#374151',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#111827',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
