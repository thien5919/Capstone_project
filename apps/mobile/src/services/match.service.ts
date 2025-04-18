import { api } from './api.service';

// ✅ Swipe Right (Like)
export const likeUser = async (likedUserId: string) => {
  return api.swipe({ targetUserId: likedUserId, direction: 'like' });
};

// ✅ Swipe Left (Pass)
export const passUser = async (passedUserId: string) => {
  return api.swipe({ targetUserId: passedUserId, direction: 'pass' });
};

// ✅ Accept MatchRequest
export const acceptMatchRequest = async (requestUserId: string) => {
  return api.acceptMatchRequest(requestUserId);
};

// ✅ Reject MatchRequest
export const rejectMatchRequest = async (requestUserId: string) => {
  return api.rejectMatchRequest(requestUserId);
};

// ✅ Fetch Nearby Users
export const fetchNearbyUsers = async () => {
  return api.fetchNearbyUsers();
};

// ✅ Fetch Pending MatchRequests
export const fetchPendingRequests = async () => {
  return api.fetchPendingRequests();
};
