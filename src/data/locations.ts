import { LocationName } from '../types';

export const LOCATIONS: { value: LocationName; label: string }[] = [
  { value: 'VICE HARBOR', label: 'VICE HARBOR' },
  { value: 'OCEAN DRIVE', label: 'OCEAN DRIVE' },
  { value: 'PALM AVENUE', label: 'PALM AVENUE' },
  { value: 'LITTLE HAVANA', label: 'LITTLE HAVANA' },
  { value: 'STARFISH ISLAND', label: 'STARFISH ISLAND' },
  { value: 'PORT AUTHORITY', label: 'PORT AUTHORITY' },
  { value: 'NEON DISTRICT', label: 'NEON DISTRICT' },
  { value: 'SUNSET BOULEVARD', label: 'SUNSET BOULEVARD' },
];

export const LOCATION_DETAILS: Record<LocationName, { area: string; district: string }> = {
  'VICE HARBOR': { area: 'Waterfront', district: 'Maritime Quarter' },
  'OCEAN DRIVE': { area: 'Beachfront', district: 'South Strip' },
  'PALM AVENUE': { area: 'Residential', district: 'Upper Gardens' },
  'LITTLE HAVANA': { area: 'Cultural', district: 'West Side' },
  'STARFISH ISLAND': { area: 'Private', district: 'Island Estates' },
  'PORT AUTHORITY': { area: 'Industrial', district: 'Docklands' },
  'NEON DISTRICT': { area: 'Nightlife', district: 'Downtown Core' },
  'SUNSET BOULEVARD': { area: 'Commercial', district: 'West End' },
};
