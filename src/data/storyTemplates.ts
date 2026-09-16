import { MissionType, LocationName } from '../types';

interface TemplateVars {
  codename: string;
  target: string;
  missionType: MissionType;
  location: LocationName;
  crew: number;
  payout: number;
  evidenceCount: number;
  heat: number;
  difficulty: number;
}

const NARRATIVE_TEMPLATES: Record<MissionType, string[]> = {
  HEIST: [
    `Listen carefully. We've been watching {location} for weeks. The target is {target}. Your surveillance shows {evidenceCount} possible angles. The clean route requires precision and timing. Keep the crew tight — {crew} operators, no more. The payout is ${'{payout}'}. The heat is already at {heat}%. Once you move, there's no second attempt.`,
    `Here's the situation. {target} at {location} — it's been locked down, but not locked tight. Your team of {crew} has a narrow window. I've reviewed the surveillance — {evidenceCount} files, all marked. The take is ${'{payout}'}. Difficulty sits at {difficulty}%. Don't get creative. Get in, get the score, get out.`,
    `We've got a play at {location}. {target} is holding what we need. {crew} crew members, {evidenceCount} surveillance captures. The job pays ${'{payout}'} if you're clean about it. Heat index: {heat}%. That means patrol routes are tightening. I've mapped three approaches. Pick one and commit.`,
  ],
  HIT: [
    `This one's delicate. {target} at {location} needs to disappear — quietly. Your surveillance package has {evidenceCount} files. Study them. {crew} people, in and out. The contract pays ${'{payout}'}. Heat level: {heat}%. The window is small. Don't miss it.`,
    `The contract is live. {target}, last seen around {location}. Your {crew}-person team has {evidenceCount} surveillance captures to work with. Payment on completion: ${'{payout}'}. Current heat: {heat}%. Make it clean. Make it final.`,
  ],
  RETRIEVAL: [
    `Simple job — on paper. {target} at {location} has something that belongs to our client. {evidenceCount} surveillance files confirm the location. Send your {crew} operators in quiet. Payout: ${'{payout}'}. Heat sits at {heat}%. Retrieve the package, leave no trace.`,
    `We need something from {target} at {location}. The surveillance — {evidenceCount} files — shows the layout. {crew} people should be enough. The client pays ${'{payout}'} on delivery. Difficulty: {difficulty}%. Don't let the heat climb above {heat}%.`,
  ],
  ESCORT: [
    `Escort job. Someone important needs to move through {location}. {target} is the objective. Your {crew}-person detail has {evidenceCount} surveillance captures of the route. Fee: ${'{payout}'}. Current threat level: {heat}%. Keep them alive, keep them moving, keep it quiet.`,
    `Protection detail at {location}. The asset connects to {target}. I've got {evidenceCount} surveillance files on the route. {crew} crew members for the escort. Pay is ${'{payout}'}. Heat index: {heat}%. Watch the intersections.`,
  ],
  SURVEILLANCE: [
    `Eyes only. {target} at {location} — we need more intelligence before the main operation. Your {crew}-person team will extend the surveillance. We already have {evidenceCount} files. This pays ${'{payout}'} and keeps the heat at {heat}%. Document everything. Trust nothing.`,
    `Recon operation. {target}, {location}. Current surveillance package: {evidenceCount} files. Add to it. {crew} operatives, low profile. Payment: ${'{payout}'}. Heat must stay under {heat}%. If you're spotted, the main job is blown.`,
  ],
  EXTRACTION: [
    `Extraction protocol. {target} needs to be pulled from {location}. {evidenceCount} surveillance files show the situation. {crew} operators for the grab. Payout: ${'{payout}'}. Heat: {heat}%. Speed matters more than stealth on this one.`,
    `We're pulling {target} out of {location}. The surveillance — {evidenceCount} captures — shows the obstacles. {crew}-person team, fast movers only. The job pays ${'{payout}'}. Difficulty: {difficulty}%. Heat: {heat}%. Get them out alive.`,
  ],
};

const OBJECTIVE_TEMPLATES: Record<MissionType, string[]> = {
  HEIST: [
    `Infiltrate {target} at {location}. Secure the primary asset. Extract with zero civilian contact.`,
    `Breach {target} perimeter at {location}. Acquire target materials. Exfiltrate via designated route.`,
  ],
  HIT: [
    `Locate and neutralize the target associated with {target} at {location}. Confirm completion.`,
    `Execute contract on {target} at {location}. Ensure no witnesses. Verify and report.`,
  ],
  RETRIEVAL: [
    `Recover designated package from {target} at {location}. Maintain asset integrity during extraction.`,
    `Locate, secure, and return the item held at {target}, {location}. Handle with discretion.`,
  ],
  ESCORT: [
    `Escort designated asset through {location} to secure extraction point. Protect against all threats.`,
    `Move the principal safely through {location}, neutralizing any interference near {target}.`,
  ],
  SURVEILLANCE: [
    `Maintain covert observation of {target} at {location}. Document all movement and contacts.`,
    `Establish surveillance perimeter around {target}, {location}. Catalog all activity for 48 hours.`,
  ],
  EXTRACTION: [
    `Extract {target} from {location}. Overcome any resistance. Deliver to safe house.`,
    `Pull the asset from {target} at {location}. Time-critical operation. No delays.`,
  ],
};

const INTEL_TEMPLATES = [
  `Surveillance package contains {evidenceCount} annotated files. All evidence has been marked by field operatives. Entry points, patrol routes, and blind spots have been identified. Local heat index reads {heat}% — expect increased security presence in the {location} area.`,
  `Field intelligence gathered over the past 72 hours. {evidenceCount} surveillance captures processed and annotated. The {location} sector shows elevated activity. Difficulty assessment: {difficulty}%. Recommend reviewing all marked evidence before deployment.`,
  `Our operatives have compiled {evidenceCount} surveillance files on {target}. Current threat assessment for {location}: {heat}% heat, {difficulty}% difficulty. All evidence has been annotated with tactical markers. Review the approach options carefully.`,
];

function pickRandom<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function fillTemplate(template: string, vars: TemplateVars): string {
  return template
    .replace(/\{codename\}/g, vars.codename)
    .replace(/\{target\}/g, vars.target)
    .replace(/\{missionType\}/g, vars.missionType)
    .replace(/\{location\}/g, vars.location)
    .replace(/\{crew\}/g, String(vars.crew))
    .replace(/\{payout\}/g, `$${vars.payout.toLocaleString()}`)
    .replace(/\{evidenceCount\}/g, String(vars.evidenceCount))
    .replace(/\{heat\}/g, String(vars.heat))
    .replace(/\{difficulty\}/g, String(vars.difficulty));
}

export function getStoryNarrative(vars: TemplateVars): string {
  const seed = hashString(vars.codename + vars.target + vars.location);
  const templates = NARRATIVE_TEMPLATES[vars.missionType];
  return fillTemplate(pickRandom(templates, seed), vars);
}

export function getObjective(vars: TemplateVars): string {
  const seed = hashString(vars.codename + vars.missionType);
  const templates = OBJECTIVE_TEMPLATES[vars.missionType];
  return fillTemplate(pickRandom(templates, seed), vars);
}

export function getIntelligence(vars: TemplateVars): string {
  const seed = hashString(vars.codename + vars.location);
  return fillTemplate(pickRandom(INTEL_TEMPLATES, seed), vars);
}
