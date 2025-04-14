const BASE_URL = 'http://10.0.2.2:3000/api';

export const api = {
  // ✅ Get user profile
  getProfile: async (token: string) => {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch profile');
    }

    return data;
  },

  // ✅ Update user profile
  updateProfile: async (token: string, updates: any) => {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update profile');
    }

    return data;
  },

  // ✅ Send FCM token
  sendFcmToken: async (token: string, fcmToken: string) => {
    const res = await fetch(`${BASE_URL}/users/update-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fcmToken }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to send FCM token');
    }

    return data;
  },

  // ✅ Swipe action
  swipe: async (token: string, payload: any) => {
    const res = await fetch(`${BASE_URL}/match/swipe`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Swipe failed');
    }

    return data;
  },
};
