const BASE_URL = 'http://192.168.1.191:3000';

export const api = {
  getProfile: async (token: string) => {
    const res = await fetch(`${BASE_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  updateProfile: async (token: string, updates: any) => {
    const res = await fetch(`${BASE_URL}/user/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return await res.json();
  },

  sendFcmToken: async (token: string, fcmToken: string) => {
    const res = await fetch(`${BASE_URL}/user/update-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fcmToken }),
    });
    return await res.json();
  },

  swipe: async (token: string, payload: any) => {
    const res = await fetch(`${BASE_URL}/match/swipe`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
};
