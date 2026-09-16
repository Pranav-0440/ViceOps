import {
  MissionData,
  MissionStats,
  MissionBriefingResult,
  FixerBriefing,
  Approach,
  Evidence,
} from '../types';
import { MISSION_TYPE_MODIFIERS } from '../data/missions';
import { LOCATION_DETAILS } from '../data/locations';
import { getStoryNarrative, getObjective, getIntelligence } from '../data/storyTemplates';

/**
 * Calculate mission statistics based on mission parameters.
 * Uses an original deterministic formula.
 */
export function calculateStats(
  mission: MissionData,
  evidenceCount: number
): MissionStats {
  const typeModifier = MISSION_TYPE_MODIFIERS[mission.missionType];

  // Base heat: higher payout = more heat
  const payoutModifier = Math.min((mission.payout / 10000) * 3, 40);

  // More crew = slightly less heat (better coverage) but more exposure
  const crewModifier = mission.crew * 2;

  // More evidence = better planning = lower difficulty
  const evidenceModifier = Math.min(evidenceCount * 5, 20);

  const heat = Math.round(
    Math.min(100, Math.max(0, typeModifier + payoutModifier + crewModifier - evidenceModifier + 10))
  );

  const difficulty = Math.round(
    Math.min(100, Math.max(0, typeModifier + payoutModifier - crewModifier + 20 - evidenceModifier * 0.5))
  );

  let risk: MissionStats['risk'];
  const avgRisk = (heat + difficulty) / 2;
  if (avgRisk >= 75) risk = 'CRITICAL';
  else if (avgRisk >= 55) risk = 'HIGH';
  else if (avgRisk >= 35) risk = 'MODERATE';
  else risk = 'LOW';

  return { heat, difficulty, risk };
}

/**
 * Generate three fictional approach options based on mission type.
 */
function generateApproaches(mission: MissionData): Approach[] {
  const locationDetail = LOCATION_DETAILS[mission.location];

  const approaches: Approach[] = [
    {
      id: 1,
      name: 'QUIET ENTRY',
      description: 'Low visibility approach through secondary access points.',
      details: [
        'Minimal exposure to surveillance',
        'Lower heat generation',
        'Slower execution time',
        `Approach via ${locationDetail.area} sector`,
      ],
      riskLevel: 'LOW',
    },
    {
      id: 2,
      name: 'MAIN GATE',
      description: 'Direct approach through primary entry point.',
      details: [
        'Fast execution',
        'High exposure risk',
        'More resistance expected',
        `Through ${locationDetail.district} main corridor`,
      ],
      riskLevel: 'HIGH',
    },
    {
      id: 3,
      name: 'BACK CHANNEL',
      description: 'Timing-dependent route through service infrastructure.',
      details: [
        'Requires precise timing',
        'Moderate risk profile',
        'Highest payout potential',
        `Via ${locationDetail.area} service network`,
      ],
      riskLevel: 'MODERATE',
    },
  ];

  return approaches;
}

/**
 * Generate risk assessment strings.
 */
function generateRisks(mission: MissionData, stats: MissionStats): string[] {
  const risks: string[] = [];

  if (stats.heat >= 60) {
    risks.push(`High heat index (${stats.heat}%) — expect increased patrols in the ${mission.location} area.`);
  }

  if (mission.crew <= 2) {
    risks.push('Skeleton crew increases individual exposure. No room for error.');
  }

  if (mission.payout >= 100000) {
    risks.push('High-value target will attract attention. Expect rapid response if detected.');
  }

  if (stats.difficulty >= 70) {
    risks.push(`Difficulty rating at ${stats.difficulty}% — recommend additional surveillance before deployment.`);
  }

  risks.push('Communication blackout during final phase. No extraction support once committed.');

  if (mission.missionType === 'HEIST' || mission.missionType === 'HIT') {
    risks.push('Collateral risk elevated. Civilian presence variable. Maintain operational discipline.');
  }

  return risks;
}

/**
 * Generate a complete mission briefing.
 * This function is structured so it can be replaced with an AI API call later.
 */
export async function generateMissionBriefing(
  mission: MissionData,
  evidence: Evidence[]
): Promise<MissionBriefingResult> {
  const stats = calculateStats(mission, evidence.length);

  const templateVars = {
    codename: mission.codename,
    target: mission.target,
    missionType: mission.missionType,
    location: mission.location,
    crew: mission.crew,
    payout: mission.payout,
    evidenceCount: evidence.length,
    heat: stats.heat,
    difficulty: stats.difficulty,
  };

  const briefing: FixerBriefing = {
    narrative: getStoryNarrative(templateVars),
    objective: getObjective(templateVars),
    intelligence: getIntelligence(templateVars),
    approaches: generateApproaches(mission),
    risks: generateRisks(mission, stats),
    payoutNote: `Contract value: $${mission.payout.toLocaleString()}. Payment on verified completion. ${
      stats.heat >= 60
        ? 'Hazard premium included.'
        : 'Standard terms apply.'
    }`,
  };

  return { briefing, stats };
}
