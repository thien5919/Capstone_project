import haversine from 'haversine';
import { PublicUserProfile } from '../types/user.types';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Tạo type NearbyUser tạm thời để gộp location vào PublicUserProfile
type NearbyUser = PublicUserProfile & { location: Coordinates };

/**
 * Kiểm tra nếu hai vị trí gần nhau trong bán kính cho trước
 */
export const isNearby = (
  loc1: Coordinates | undefined,
  loc2: Coordinates | undefined,
  maxDistanceKm = 20
): boolean => {
  if (!loc1 || !loc2) return false;
  const distance = haversine(loc1, loc2, { unit: 'km' });
  return distance <= maxDistanceKm;
};

/**
 * Tính khoảng cách (km) giữa hai điểm
 */
export const getDistanceInKm = (
  from: Coordinates,
  to: Coordinates
): number => {
  return haversine(from, to, { unit: 'km' });
};

/**
 * Lọc danh sách user trong phạm vi X km, đồng thời thêm trường distanceKm vào user
 *
 * @param users 
 * @param myLocation 
 * @param maxDistanceKm 
 * @returns 
 */
export const filterNearbyUsers = (
  users: NearbyUser[],
  myLocation: Coordinates,
  maxDistanceKm = 20
): (PublicUserProfile & { distanceKm: number })[] => {
  return users
    .filter((user) => isNearby(myLocation, user.location, maxDistanceKm))
    .map((user) => ({
      ...user,
      distanceKm: getDistanceInKm(myLocation, user.location),
    }));
};
