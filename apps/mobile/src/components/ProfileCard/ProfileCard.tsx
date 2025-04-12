import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PublicUserProfile } from '../../types/user.types';

type Props = {
  profile: PublicUserProfile;
};

const ProfileCard: React.FC<Props> = ({ profile }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: profile.photoUrl || 'https://placehold.co/140x140?text=Avatar' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.displayName}, {profile.age}</Text>
      <Text style={styles.description}>{profile.description || 'No bio provided'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
    margin: 16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ProfileCard;
