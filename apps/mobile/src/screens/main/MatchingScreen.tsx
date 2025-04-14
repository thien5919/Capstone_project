import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { PublicUserProfile } from '../../types/user.types';
import { useLocation } from '../../context/LocationContext';
import { filterNearbyUsers } from '../../services/haversine.service';
import { getCurrentLocation, saveUserLocation } from '../../services/location.service';

const { width } = Dimensions.get('window');

const MatchingScreen = () => {
  const [profiles, setProfiles] = useState<(PublicUserProfile & { distanceKm: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchedUser, setMatchedUser] = useState<PublicUserProfile | null>(null);
  const swiperRef = useRef<Swiper<PublicUserProfile & { distanceKm: number }>>(null);
  const currentUser = auth().currentUser;
  const { location: myLocation } = useLocation();

  useEffect(() => {
    const updateLocation = async () => {
      try {
        const location = await getCurrentLocation();
        await saveUserLocation(location);
      } catch (e) {
        console.warn('❌ Failed to get or save location');
      }
    };

    updateLocation();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const snapshot = await firestore().collection('users').get();
        const allUsers = snapshot.docs
          .map((doc) => {
            const data = doc.data() as PublicUserProfile & { location?: { latitude: number; longitude: number } };
            return {
              ...data,
              uid: doc.id,
            };
          })
          .filter((user) => user.uid !== currentUser?.uid && user.location);

        const nearbyUsers = myLocation
          ? filterNearbyUsers(allUsers as any, myLocation)
          : allUsers.map((u) => ({ ...u, distanceKm: -1 }));

        setProfiles(nearbyUsers);
      } catch (err) {
        console.error('❌ Error fetching profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = async (cardIndex: number, liked: boolean) => {
    const swipedUser = profiles[cardIndex];
    try {
      await firestore()
        .collection('swipes')
        .doc(currentUser?.uid)
        .collection('interactions')
        .doc(swipedUser.uid)
        .set({ liked, timestamp: Date.now() });
    } catch (err) {
      console.error('❌ Error saving swipe:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#10B981" />
      ) : (
        <Swiper
          ref={swiperRef}
          cards={profiles}
          renderCard={(user) =>
            user ? (
              <ProfileCard profile={user} />
            ) : (
              <View style={styles.card}><Text>No more profiles</Text></View>
            )
          }
          onSwipedRight={(i) => handleSwipe(i, true)}
          onSwipedLeft={(i) => handleSwipe(i, false)}
          backgroundColor="#fff"
          stackSize={3}
          cardIndex={0}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: 500,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MatchingScreen;
