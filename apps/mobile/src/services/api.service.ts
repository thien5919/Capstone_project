import auth from '@react-native-firebase/auth';

const BASE_URL = 'http://10.0.2.2:3000/api';

// 🛠 Helper: Lấy token Firebase từ current user
const getAuthToken = async (): Promise<string> => {
  const currentUser = auth().currentUser;
  console.log('🧩 Current UID:', currentUser?.uid); 
  if (!currentUser) throw new Error('User not authenticated');
  const idToken = await currentUser.getIdToken();
  return idToken;
};

// 🛠 Helper: Gửi request
const request = async (path: string, method: string = 'GET', body?: any) => {
  const token = await getAuthToken(); 

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  const text = await res.text(); 
  let data;
  try {
    data = JSON.parse(text); 
  } catch (error) {
    console.error('🛑 Failed to parse JSON. Raw response:', text);
    throw new Error('Invalid JSON response from server');
  }

  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
};


// 🚀 Final export object
export const api = {
  // ✅ User Profile
  getProfile: () => request('/users/me', 'GET'),
  updateProfile: (updates: any) => request('/users/me', 'PUT', updates),
  sendFcmToken: (fcmToken: string) => request('/users/update-token', 'POST', { fcmToken }),

  // ✅ Matching
  swipe: (payload: { targetUserId: string; direction: 'like' | 'pass' }) => request('/match/swipe', 'POST', payload),
  fetchNearbyUsers: () => request('/users/nearby', 'GET'),
  fetchPendingRequests: () => request('/match/pending', 'GET'),
  acceptMatchRequest: (requestUserId: string) => request('/match/accept', 'POST', { requestUserId }),
  rejectMatchRequest: (requestUserId: string) => request('/match/reject', 'POST', { requestUserId }),
};
