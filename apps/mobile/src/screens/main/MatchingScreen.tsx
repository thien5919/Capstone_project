
import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import { Button, Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { PublicUserProfile } from '../../types/user.types';
import { useLocation } from '../../context/LocationContext';
import { filterNearbyUsers } from '../../services/haversine.service';
import { getCurrentLocation, saveUserLocation } from '../../services/location.service';
import { fetchSwipedUserIds, checkMutualSwipeAndCreateMatch, saveSwipedUser, addFriendById } from '../../services/match.service';

const { width } = Dimensions.get('window');

const MatchingScreen = () => {
  const navigation = useNavigation();
  const [showAddFriendBar, setShowAddFriendBar] = useState(false);
  const [friendIdInput, setFriendIdInput] = useState('');
  const [matchedModalVisible, setMatchedModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState<PublicUserProfile | null>(null);
  const [profiles, setProfiles] = useState<(PublicUserProfile & { distanceKm: number })[]>([]);
  const [loading, setLoading] = useState(true);

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
      if (!currentUser) return;

      try {
        const snapshot = await firestore().collection('users').get();
        const allUsers = snapshot.docs
          .map((doc) => {
            const data = doc.data() as PublicUserProfile & { location?: { latitude: number; longitude: number } };
            return { ...data, uid: doc.id };
          })
          .filter((user) => user.uid !== currentUser.uid && user.location);

        const nearbyUsers = myLocation
          ? filterNearbyUsers(allUsers as any, myLocation)
          : allUsers.map((u) => ({ ...u, distanceKm: -1 }));

        const swipedUserIds = await fetchSwipedUserIds(currentUser.uid);
        const filtered = nearbyUsers.filter((user) => !swipedUserIds.includes(user.uid));

        setProfiles(filtered);
      } catch (err) {
        console.error('❌ Error fetching profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [currentUser, myLocation]);

  const handleSwipe = async (cardIndex: number, liked: boolean) => {
    const userId = currentUser?.uid;
    if (!userId) return;

    const swipedUser = profiles[cardIndex];
    try {
      await saveSwipedUser(userId, swipedUser.uid);

      if (liked) {
        const matched = await checkMutualSwipeAndCreateMatch(userId, swipedUser.uid);
        if (matched) {
          setMatchedUser(swipedUser);
          setMatchedModalVisible(true);
        }
      }
    } catch (err) {
      console.error('❌ Error saving swipe:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Matching" />
        <Appbar.Action icon="account-plus" onPress={() => setShowAddFriendBar(!showAddFriendBar)} />
        <Appbar.Action icon="filter" onPress={() => navigation.navigate('MatchPreference' as never)} />
      </Appbar.Header>

      {showAddFriendBar && (
        <View style={{ padding: 10 }}>
          <TextInput
            label="Enter Friend ID"
            value={friendIdInput}
            onChangeText={setFriendIdInput}
            mode="outlined"
            right={<TextInput.Icon icon="send" onPress={async () => {
              const user = auth().currentUser;
              if (user && friendIdInput) {
                await addFriendById(user.uid, friendIdInput);
                setFriendIdInput('');
                setShowAddFriendBar(false);
              }
            }} />}
          />
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#10B981" />
      ) : (
        <Swiper
          ref={swiperRef}
          cards={profiles}
          renderCard={(user: PublicUserProfile & { distanceKm: number }) =>
            user ? <ProfileCard profile={user} /> : (
              <View style={styles.card}><Text>No more profiles</Text></View>
            )
          }
          onSwipedRight={(i: number) => handleSwipe(i, true)}
          onSwipedLeft={(i: number) => handleSwipe(i, false)}
          backgroundColor="#fff"
          stackSize={3}
          cardIndex={0}
        />
      )}

      <Modal isVisible={matchedModalVisible}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>🎉 It's a Match!</Text>
          {matchedUser && <Text>You and {matchedUser.displayName || matchedUser.displayName || matchedUser.uid} liked each other!</Text>}
          <Button mode="contained" onPress={() => setMatchedModalVisible(false)} style={{ marginTop: 15 }}>
            Close
          </Button>
        </View>
      </Modal>
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