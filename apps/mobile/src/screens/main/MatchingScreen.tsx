import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { IconButton, Button, Dialog, Portal, TextInput } from 'react-native-paper';
import Slider from '@react-native-community/slider'; 
import { useMatching } from '../../context/MatchingContext';
import { likeUser, passUser } from '../../services/match.service';
import { useNavigation } from '@react-navigation/native';

interface FilterState {
  gender: 'male' | 'female' | 'all';
  ageRange: [number, number];
  distance: number;
}

export const MatchingScreen = () => {
  const { profiles, removeProfile, refreshProfiles } = useMatching();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<FilterState>({
    gender: 'all',
    ageRange: [18, 50],
    distance: 50,
  });

  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const currentProfile = profiles[currentIndex];
  const navigation = useNavigation();

  useLayoutEffect(() => {
  navigation.setOptions({
    headerTitle: 'Match',
    headerRight: () => (
      <IconButton
        icon="filter"
        size={28}
        onPress={() => setFilterDialogVisible(true)}
      />
    ),
  });
}, [navigation]);

  const handleLike = async () => {
    if (!currentProfile) return;
    try {
      await likeUser(currentProfile.uid);
      console.log('Liked:', currentProfile.displayName);
      removeProfile(currentProfile.uid);
      nextProfile();
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleDislike = async () => {
    if (!currentProfile) return;
    try {
      await passUser(currentProfile.uid);
      console.log('Disliked:', currentProfile.displayName);
      removeProfile(currentProfile.uid);
      nextProfile();
    } catch (error) {
      console.error('Pass error:', error);
    }
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsProfileExpanded(false);
    } else {
      console.log('No more profiles.');
    }
  };

  const handleFilterSubmit = async () => {
    console.log('Filter applied:', filter);
    await refreshProfiles();
    setFilterDialogVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* TOP NAV */}
      

      {/* FILTER DIALOG */}
      <Portal>
        <Dialog visible={filterDialogVisible} onDismiss={() => setFilterDialogVisible(false)}>
          <Dialog.Title><Text>Filter Settings</Text></Dialog.Title>
          <Dialog.Content>

            <Text>Gender</Text>
            <TextInput
              value={filter.gender}
              onChangeText={(text) => setFilter({ ...filter, gender: text as 'male' | 'female' | 'all' })}
              mode="outlined"
              placeholder="all / male / female"
              style={{ marginBottom: 16 }}
            />

            <Text>Age Range: {filter.ageRange[0]} - {filter.ageRange[1]}</Text>
            <Slider
              minimumValue={18}
              maximumValue={100}
              step={1}
              value={filter.ageRange[0]} // ← Đúng
              onValueChange={(value) => setFilter({ ...filter, ageRange: [value, filter.ageRange[1]] })}
/>

            <Text>Distance: {filter.distance} km</Text>
            <Slider
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={filter.distance}
              onValueChange={(value) => setFilter({ ...filter, distance: value })}
            />

          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleFilterSubmit}><Text>Apply</Text></Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* PROFILE CARD */}
      {currentProfile ? (
        <TouchableOpacity
          style={{ margin: 20, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}
          onPress={() => setIsProfileExpanded(!isProfileExpanded)}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: currentProfile.photoUrl || '/default-avatar.png' }}
            style={{ width: '100%', height: 300 }}
            resizeMode="cover"
          />
          {isProfileExpanded ? (
            <View style={{ padding: 16 }}>
              <IconButton
                icon="close"
                size={24}
                onPress={(e) => {
                  e.stopPropagation();
                  setIsProfileExpanded(false);
                }}
                style={{ alignSelf: 'flex-end' }}
              />
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {currentProfile.displayName}, {currentProfile.age}
              </Text>
              <Text style={{ marginVertical: 8 }}>About me:</Text>
              <Text>{currentProfile.description || "No bio yet."}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 }}>
                <IconButton
                  icon="thumb-down"
                  size={32}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDislike();
                  }}
                />
                <IconButton
                  icon="thumb-up"
                  size={32}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {currentProfile.displayName}, {currentProfile.age}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No more users to show.</Text>
        </View>
      )}
    </View>
  );
};
export default MatchingScreen;
