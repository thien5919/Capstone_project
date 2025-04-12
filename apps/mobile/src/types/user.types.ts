export type Gender = 'male' | 'female' | '---';

export interface AgeRange {
  min: number | null;
  max: number | null;
}

export interface MatchPreferences {
  preferredGender: Gender;
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

export type RegistrationData = Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>> & {
  password?: string;
};

export type PublicUserProfile = Pick<
  UserProfile,
  'uid' | 'displayName' | 'photoUrl' | 'age' | 'gender' | 'description' | 'matchPreferences'
>;
