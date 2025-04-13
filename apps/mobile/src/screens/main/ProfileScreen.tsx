import React from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { userProfile } = useUser();
  const { logoutUser } = useAuth();

  return (
    <SafeAreaView style={styles.fullscreen}>
      {userProfile ? (
        <>
          {/* Hiển thị nội dung hồ sơ */}
          <Text style={styles.title}>Hello, {userProfile.displayName}</Text>
          {/* ... */}
        </>
      ) : (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={{ marginTop: 12 }}>Loading profile...</Text>
        </View>
      )}

      {/* 🔒 Log Out luôn xuất hiện ở cuối */}
      <View style={styles.logoutContainer}>
        <Button title="Log Out" color="#EF4444" onPress={logoutUser} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    padding: 20,
  },
});
