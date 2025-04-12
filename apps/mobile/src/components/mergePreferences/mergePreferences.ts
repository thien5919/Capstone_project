import { MatchPreferences } from "../../types/user.types";

export const defaultMatchPreferences: MatchPreferences = {
  preferredGender: null,
  preferredAgeRange: {
    min: null,
    max: null,
  },
};

export const mergePreferences = (
  prev: MatchPreferences = defaultMatchPreferences,
  incoming: Partial<MatchPreferences>
): MatchPreferences => ({
  preferredGender: incoming.preferredGender ?? prev.preferredGender ?? null,
  preferredAgeRange: {
    min: incoming.preferredAgeRange?.min ?? prev.preferredAgeRange?.min ?? null,
    max: incoming.preferredAgeRange?.max ?? prev.preferredAgeRange?.max ?? null,
  },
});
