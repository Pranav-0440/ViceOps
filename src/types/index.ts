export interface Evidence {
  id: string;
  name: string;
  image: string;
  originalImage: string;
  timestamp: string;
  location: string;
  edited: boolean;
  rotation: number;
}

export type MissionType =
  | 'HEIST'
  | 'HIT'
  | 'RETRIEVAL'
  | 'ESCORT'
  | 'SURVEILLANCE'
  | 'EXTRACTION';

export type LocationName =
  | 'VICE HARBOR'
  | 'OCEAN DRIVE'
  | 'PALM AVENUE'
  | 'LITTLE HAVANA'
  | 'STARFISH ISLAND'
  | 'PORT AUTHORITY'
  | 'NEON DISTRICT'
  | 'SUNSET BOULEVARD';

export interface MissionData {
  codename: string;
  target: string;
  missionType: MissionType;
  location: LocationName;
  crew: number;
  payout: number;
}

export interface MissionStats {
  heat: number;
  difficulty: number;
  risk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
}

export interface Approach {
  id: number;
  name: string;
  description: string;
  details: string[];
  riskLevel: string;
}

export interface FixerBriefing {
  narrative: string;
  objective: string;
  intelligence: string;
  approaches: Approach[];
  risks: string[];
  payoutNote: string;
}

export interface MissionBriefingResult {
  briefing: FixerBriefing;
  stats: MissionStats;
}

export type AppView = 'landing' | 'planning' | 'briefing' | 'complete';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
