// mobile/utils/location.ts
import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const loc = await Location.getCurrentPositionAsync({});
  return { lat: loc.coords.latitude, lng: loc.coords.longitude };
};