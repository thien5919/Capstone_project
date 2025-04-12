import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { PublicUserProfile } from '../../types/user.types';

const MatchingScreen = () => {
  const [profiles, setProfiles] = useState<PublicUserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await firestore().collection('users').get();
      const users: PublicUserProfile[] = snapshot.docs
        .map((doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
          const data = doc.data() as PublicUserProfile;
          return { ...data, uid: doc.id };
        })
        .filter((user: PublicUserProfile) => user.uid !== currentUser?.uid);

      setProfiles(users);
      setLoading(false);
    };

    fetchUsers();
  }, []);
  const handleSwipeRight = (likedUser: PublicUserProfile) => {
    console.log('Swiped right on', likedUser.displayName);
  };

  const handleSwipeLeft = (dislikedUser: PublicUserProfile) => {
    console.log('Swiped left on', dislikedUser.displayName);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : profiles.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 16 }}>
          No users found nearby. Try again later!
        </Text>
      ) : (
        <Swiper
          cards={profiles}
          renderCard={(card: PublicUserProfile) => <ProfileCard profile={card} />}
          onSwipedRight={(cardIndex: number) => handleSwipeRight(profiles[cardIndex])}
          onSwipedLeft={(cardIndex: number) => handleSwipeLeft(profiles[cardIndex])}
          backgroundColor="white"
          stackSize={3}
        />
      )}
    </View>
  );
};

export default MatchingScreen;
