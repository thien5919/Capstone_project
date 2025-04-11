export type Gender = 'male' | 'female' | 'prefer-not-to-say';

export interface AgeRange {
  min: number | null;
  max: number | null;
}

export interface MatchPreferences {
  preferredGender: Gender | 'any' | null;
  preferredAgeRange: AgeRange;
}

export interface NotificationSettings {
  matchAlerts: boolean;
  messageAlerts: boolean;
}

export interface UserSettings {
  notifications?: NotificationSettings;
  accountPrivacy?: 'public' | 'private';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  age: number;
  gender: Gender;
  photoUrl?: string;
  description?: string;
  matchPreferences?: MatchPreferences;
  settings?: UserSettings;
  createdAt?: any;
  updatedAt?: any;
}
