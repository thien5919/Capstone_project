import {
    PERMISSIONS,
    request,
    requestMultiple,
    requestNotifications,
    checkMultiple,
    checkNotifications,
    RESULTS,
    Permission,
  } from 'react-native-permissions';
  import { Alert, Linking, Platform } from 'react-native';
  
  // Automatically re-check & re-request if needed
  export const requestAllPermissions = async (): Promise<boolean> => {
    try {
      const permissions: Permission[] =
        Platform.OS === 'android'
          ? [
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            ]
          : [
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              PERMISSIONS.IOS.CAMERA,
              PERMISSIONS.IOS.PHOTO_LIBRARY,
              PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
            ];
  
      const checks = await checkMultiple(permissions);
      const toRequest = Object.entries(checks)
        .filter(([, status]) => status !== RESULTS.GRANTED)
        .map(([key]) => key as Permission);
  
      const requested = await requestMultiple(toRequest);
  
      const notifStatus = (await requestNotifications(['alert', 'sound'])).status;
      const notifCheck = (await checkNotifications()).status;
  
      const denied = Object.entries(requested).filter(([, status]) => status !== RESULTS.GRANTED);
      if (notifStatus !== RESULTS.GRANTED && notifCheck !== RESULTS.GRANTED) {
        denied.push(['NOTIFICATIONS', notifStatus]);
      }
  
      if (denied.length > 0) {
        Alert.alert(
          'Permissions Needed',
          'Some features may not work properly without full permissions.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
  
      return denied.length === 0;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  };
  
  export const requestLocationPermission = async (): Promise<boolean> => {
    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    );
  
    if (result !== RESULTS.GRANTED) {
      Alert.alert(
        'Location Required',
        'Please enable location access to find gym buddies near you.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  };
  
  export const requestCameraPermission = async (): Promise<boolean> => {
    const result = await request(
      Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    );
  
    if (result !== RESULTS.GRANTED) {
      Alert.alert(
        'Camera Permission Required',
        'Please allow camera access to take profile photos.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  };
  