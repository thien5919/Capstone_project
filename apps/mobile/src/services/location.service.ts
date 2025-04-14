import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        console.warn('Location error:', error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  });
};

export const saveUserLocation = async (location: { latitude: number; longitude: number }) => {
  const currentUser = auth().currentUser;
  if (!currentUser) return;

  try {
    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({
        location,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    console.log('✅ User location saved to Firestore');
  } catch (error) {
    console.error('❌ Error saving location:', error);
  }
};
