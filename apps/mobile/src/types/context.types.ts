import { UserProfile } from './user.types';
import { Match } from './match.types';
import { Message } from './chat.types';
import { MatchPreferences } from './user.types';
import { Gender } from './user.types';

export interface RegistrationData {
  email?: string;
  password?: string;
  displayName?: string;
  age?: number;
  gender?: Gender;
  photoUrl?: string;
  description?: string;
  matchPreferences?: MatchPreferences;
}

export interface AppData {
  profile: UserProfile | null;
  matches: Match[];
  messages: { [matchId: string]: Message[] };
}
