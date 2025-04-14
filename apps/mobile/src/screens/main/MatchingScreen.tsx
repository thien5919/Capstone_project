import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { PublicUserProfile } from '../../types/user.types';
import { useLocation } from '../../context/LocationContext';
import { filterNearbyUsers } from '../../services/haversine.service';

const MatchingScreen = () => {
  const [profiles, setProfiles] = useState<(PublicUserProfile & { distanceKm: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchedUser, setMatchedUser] = useState<PublicUserProfile | null>(null);
  const swiperRef = useRef<Swiper<PublicUserProfile & { distanceKm: number }>>(null);
  const currentUser = auth().currentUser;
  const { location: myLocation } = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await firestore().collection('users').get();

      const allUsers = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            ...data,
            uid: doc.id,
          } as PublicUserProfile & { location: { latitude: number; longitude: number } };
        })
        .filter((user) => user.uid !== currentUser?.uid && !!user.location && !!myLocation);

      const nearby = filterNearbyUsers(allUsers, myLocation!);
      setProfiles(nearby);
      setLoading(false);
    };

    if (myLocation) fetchUsers();
  }, [myLocation]);

  const handleSwipeRight = async (likedUser: PublicUserProfile) => {
    if (!currentUser?.uid) return;

    try {
      const db = firestore();
      await db
        .collection('users')
        .doc(currentUser.uid)
        .collection('swipes')
        .doc(likedUser.uid)
        .set({ liked: true, timestamp: new Date() });

      const reverseSwipe = await db
        .collection('users')
        .doc(likedUser.uid)
        .collection('swipes')
        .doc(currentUser.uid)
        .get();

      if (reverseSwipe.exists) {
        const matchId = [currentUser.uid, likedUser.uid].sort().join('_');
        await db.collection('matches').doc(matchId).set({
          userIds: [currentUser.uid, likedUser.uid],
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        setMatchedUser(likedUser);

        try {
          const idToken = await currentUser.getIdToken();
          await fetch('https://<YOUR_SERVER_URL>/api/notify/match', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              toUid: likedUser.uid,
              title: 'New Gym Buddy Match 💪',
              body: `${currentUser.displayName || 'Someone'} just matched with you!`,
            }),
          });
        } catch (err) {
          console.error('FCM notification error:', err);
        }
      }
    } catch (error) {
      console.error('Swipe error:', error);
    }
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
          ref={swiperRef}
          cards={profiles}
          renderCard={(card) => (
            <ProfileCard
              profile={card}
              onLike={() => swiperRef.current?.swipeRight()}
              onDislike={() => swiperRef.current?.swipeLeft()}
            />
          )}
          onSwipedRight={(cardIndex) => handleSwipeRight(profiles[cardIndex])}
          onSwipedLeft={(cardIndex) => handleSwipeLeft(profiles[cardIndex])}
          backgroundColor="white"
          stackSize={3}
        />
      )}

      {matchedUser && (
        <View style={styles.matchPopup}>
          <Text style={styles.matchText}>
            🎉 You matched with {matchedUser.displayName}!
          </Text>
          <TouchableOpacity onPress={() => setMatchedUser(null)} style={styles.matchButton}>
            <Text style={styles.matchButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  matchPopup: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 10,
  },
  matchText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  matchButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  matchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MatchingScreen;