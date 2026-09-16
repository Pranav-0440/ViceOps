import { MissionType } from '../types';

export const MISSION_TYPES: { value: MissionType; label: string }[] = [
  { value: 'HEIST', label: 'HEIST' },
  { value: 'HIT', label: 'HIT' },
  { value: 'RETRIEVAL', label: 'RETRIEVAL' },
  { value: 'ESCORT', label: 'ESCORT' },
  { value: 'SURVEILLANCE', label: 'SURVEILLANCE' },
  { value: 'EXTRACTION', label: 'EXTRACTION' },
];

export const CODENAME_SUGGESTIONS = [
  'NEON VEIL',
  'SUNSET RUN',
  'BLACK HARBOR',
  'GLASS TIGER',
  'NIGHT MARKET',
  'CORAL SHADOW',
  'PALM FURY',
  'OCEAN PHANTOM',
  'CRIMSON TIDE',
  'AMBER DRIFT',
];

export const MISSION_TYPE_MODIFIERS: Record<MissionType, number> = {
  HEIST: 25,
  HIT: 30,
  RETRIEVAL: 15,
  ESCORT: 20,
  SURVEILLANCE: 10,
  EXTRACTION: 22,
};
