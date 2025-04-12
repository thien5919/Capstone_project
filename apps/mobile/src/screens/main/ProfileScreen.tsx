import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useUser } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { profile } = useUser();

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
   <SafeAreaView>
    <ScrollView>
      <ProfileHeader></ProfileHeader>
      <View>
        <View>
          <Text>About Me</Text>
          <Text></Text>
        </View>
      </View>
      
    </ScrollView>
   </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  section: {
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
