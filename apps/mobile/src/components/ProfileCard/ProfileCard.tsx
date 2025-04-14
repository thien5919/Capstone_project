import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PublicUserProfile } from '../../types/user.types';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProfileCardProps {
  profile: PublicUserProfile & { distanceKm?: number };
  onLike?: () => void;
  onDislike?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onLike, onDislike }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.card, { width: screenWidth * 0.9 }]}>
      {/* Background Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: profile.photoUrl || 'https://via.placeholder.com/300' }}
          style={styles.backgroundImage}
          onLoad={() => setImageLoaded(true)}
          resizeMode="cover"
        />
        {!imageLoaded && (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={styles.loadingOverlay}
          />
        )}
        <View style={styles.overlay} />
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {profile.displayName}, {profile.age}
        </Text>
        <Text style={styles.description}>
          {profile.description || 'No bio available'}
        </Text>
        {profile.distanceKm !== undefined && (
          <Text style={styles.distance}>
            📍 {profile.distanceKm.toFixed(1)} km away
          </Text>
        )}

        {/* Like / Dislike Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onDislike} style={styles.circleButtonRed}>
            <Icon name="close" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onLike} style={styles.circleButtonGreen}>
            <Icon name="heart" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 6,
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loadingOverlay: {
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#4B5563',
  },
  distance: {
    marginTop: 10,
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  circleButtonRed: {
    backgroundColor: '#ef4444',
    borderRadius: 40,
    padding: 16,
  },
  circleButtonGreen: {
    backgroundColor: '#22c55e',
    borderRadius: 40,
    padding: 16,
  },
});