import { Evidence, LocationName } from '../types';

const RANDOM_LOCATIONS: LocationName[] = [
  'VICE HARBOR',
  'OCEAN DRIVE',
  'PALM AVENUE',
  'LITTLE HAVANA',
  'STARFISH ISLAND',
  'PORT AUTHORITY',
  'NEON DISTRICT',
  'SUNSET BOULEVARD',
];

export function getRandomLocation(): LocationName {
  return RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)];
}

export function getRandomTimestamp(): string {
  const h = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
  return `${h}:${m}:${s} ${ampm}`;
}

export function generateEvidenceId(): string {
  return `ev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Tactical SVG Illustrations as base64 / SVG data URIs
const VAULT_BLUEPRINT_SVG = `data:image/svg+xml;utf8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450" fill="#080e18">
  <defs>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00f0ff" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#080e18" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#070c14"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="50" y="50" width="500" height="350" fill="url(#glow)"/>
  
  <!-- Outer Walls -->
  <rect x="80" y="80" width="440" height="290" fill="none" stroke="#00f0ff" stroke-width="3"/>
  
  <!-- Rooms -->
  <rect x="80" y="80" width="220" height="150" fill="#00f0ff" fill-opacity="0.05" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="4,4"/>
  <rect x="300" y="80" width="220" height="150" fill="#ff6840" fill-opacity="0.08" stroke="#ff6840" stroke-width="2"/>
  <rect x="80" y="230" width="440" height="140" fill="#00f0ff" fill-opacity="0.03" stroke="#00f0ff" stroke-width="1.5"/>
  
  <!-- Vault Room Circle -->
  <circle cx="410" cy="155" r="45" fill="none" stroke="#ff6840" stroke-width="2" stroke-dasharray="6,3"/>
  <circle cx="410" cy="155" r="15" fill="#ff6840" fill-opacity="0.4"/>
  
  <!-- Laser Tripwires -->
  <line x1="300" y1="120" x2="520" y2="120" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="8,4"/>
  <line x1="300" y1="180" x2="520" y2="180" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="8,4"/>
  
  <!-- Camera Arcs -->
  <path d="M 85 85 L 135 135 A 70 70 0 0 1 85 160 Z" fill="#e8b45d" fill-opacity="0.2" stroke="#e8b45d" stroke-width="1"/>
  <path d="M 515 365 L 465 315 A 70 70 0 0 1 515 290 Z" fill="#e8b45d" fill-opacity="0.2" stroke="#e8b45d" stroke-width="1"/>
  
  <!-- Blueprint Annotations -->
  <text x="310" y="105" fill="#ff6840" font-family="monospace" font-size="12" font-weight="bold">TARGET // PRIMARY VAULT</text>
  <text x="95" y="105" fill="#00f0ff" font-family="monospace" font-size="11">SECURITY ANTECHAMBER</text>
  <text x="95" y="255" fill="#00f0ff" font-family="monospace" font-size="11">LOADING DOCK // ACCESS CORRIDOR</text>
  
  <!-- Header Stamp -->
  <rect x="80" y="20" width="200" height="24" fill="#00f0ff" fill-opacity="0.1" stroke="#00f0ff" stroke-width="1"/>
  <text x="90" y="36" fill="#00f0ff" font-family="monospace" font-size="10" letter-spacing="1">SCHEMATIC: FL-44B / CLASS-4</text>
  <text x="430" y="36" fill="#ff6840" font-family="monospace" font-size="10" letter-spacing="2">[RESTRICTED INTEL]</text>
</svg>
`);

const HARBOR_DOCK_SVG = `data:image/svg+xml;utf8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450" fill="#09111e">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="70%" stop-color="#141a2e"/>
      <stop offset="100%" stop-color="#0c223a"/>
    </linearGradient>
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#061828"/>
      <stop offset="100%" stop-color="#020910"/>
    </linearGradient>
  </defs>
  
  <!-- Sky -->
  <rect width="600" height="270" fill="url(#skyGrad)"/>
  
  <!-- Skyline Silhouettes -->
  <polygon points="50,270 50,140 90,140 90,270" fill="#050a14"/>
  <polygon points="100,270 100,100 130,80 160,100 160,270" fill="#070d18"/>
  <polygon points="170,270 170,160 210,160 210,270" fill="#050a14"/>
  <polygon points="450,270 450,120 490,120 490,270" fill="#060c18"/>
  
  <!-- Crane silhouette -->
  <path d="M 280 270 L 320 90 L 460 60 L 480 90 L 350 110 L 330 270 Z" fill="#ff6840" fill-opacity="0.8"/>
  <line x1="320" y1="90" x2="430" y2="170" stroke="#ff6840" stroke-width="1.5"/>
  <line x1="370" y1="78" x2="370" y2="210" stroke="#ff6840" stroke-width="1" stroke-dasharray="4,2"/>
  
  <!-- Cargo Containers -->
  <rect x="220" y="220" width="70" height="30" fill="#e74c3c"/>
  <rect x="230" y="190" width="65" height="30" fill="#3498db"/>
  <rect x="300" y="210" width="80" height="40" fill="#e8b45d"/>
  
  <!-- Dock Pier -->
  <rect x="0" y="250" width="600" height="20" fill="#111822"/>
  
  <!-- Water -->
  <rect x="0" y="270" width="600" height="180" fill="url(#waterGrad)"/>
  
  <!-- Water Reflections -->
  <ellipse cx="370" cy="300" rx="80" ry="6" fill="#ff6840" fill-opacity="0.3"/>
  <ellipse cx="300" cy="320" rx="100" ry="8" fill="#00f0ff" fill-opacity="0.15"/>
  
  <!-- Night Vision / Surveillance Crosshair HUD -->
  <circle cx="370" cy="180" r="40" fill="none" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="6,4"/>
  <line x1="370" y1="120" x2="370" y2="240" stroke="#00f0ff" stroke-width="0.8" stroke-dasharray="4,4"/>
  <line x1="310" y1="180" x2="430" y2="180" stroke="#00f0ff" stroke-width="0.8" stroke-dasharray="4,4"/>
  <rect x="350" y="160" width="40" height="40" fill="none" stroke="#e74c3c" stroke-width="2"/>
  
  <!-- HUD Text Overlay -->
  <text x="30" y="40" fill="#00f0ff" font-family="monospace" font-size="12" font-weight="bold">CAM-04 // VICE HARBOR DOCK 4</text>
  <text x="30" y="60" fill="#a6a094" font-family="monospace" font-size="10">NIGHT PATROL RECON // 02:44:12 AM</text>
  <text x="440" y="40" fill="#e74c3c" font-family="monospace" font-size="11" font-weight="bold">● LIVE FEED</text>
</svg>
`);

const DISPATCH_LOG_SVG = `data:image/svg+xml;utf8,` + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450" fill="#14120e">
  <!-- Document Texture -->
  <rect width="600" height="450" fill="#181610"/>
  <rect x="25" y="25" width="550" height="400" fill="#1f1c14" stroke="#e8b45d" stroke-width="1" stroke-opacity="0.4"/>
  
  <!-- Header Bar -->
  <rect x="25" y="25" width="550" height="50" fill="#2a2519"/>
  <text x="45" y="56" fill="#e8b45d" font-family="monospace" font-size="14" font-weight="bold" letter-spacing="2">SECURITY DISPATCH & ACCESS LOG</text>
  <text x="420" y="56" fill="#ff6840" font-family="monospace" font-size="11" letter-spacing="1">REF: SEC-9904</text>
  
  <!-- Table Header -->
  <rect x="45" y="100" width="510" height="26" fill="#252117"/>
  <text x="55" y="117" fill="#a6a094" font-family="monospace" font-size="10" font-weight="bold">POST</text>
  <text x="140" y="117" fill="#a6a094" font-family="monospace" font-size="10" font-weight="bold">OFFICER</text>
  <text x="260" y="117" fill="#a6a094" font-family="monospace" font-size="10" font-weight="bold">SHIFT HOURS</text>
  <text x="400" y="117" fill="#a6a094" font-family="monospace" font-size="10" font-weight="bold">ALARM OVERRIDE</text>
  
  <!-- Table Rows -->
  <text x="55" y="150" fill="#f4efe4" font-family="monospace" font-size="11">GATE 1</text>
  <text x="140" y="150" fill="#f4efe4" font-family="monospace" font-size="11">G. MARTINEZ</text>
  <text x="260" y="150" fill="#f4efe4" font-family="monospace" font-size="11">22:00 - 06:00</text>
  <text x="400" y="150" fill="#ff6840" font-family="monospace" font-size="11">KEYCARD [B-4]</text>
  
  <line x1="45" y1="165" x2="555" y2="165" stroke="#332c20" stroke-width="1"/>
  
  <text x="55" y="190" fill="#f4efe4" font-family="monospace" font-size="11">VAULT</text>
  <text x="140" y="190" fill="#f4efe4" font-family="monospace" font-size="11">J. VANCE</text>
  <text x="260" y="190" fill="#f4efe4" font-family="monospace" font-size="11">00:00 - 08:00</text>
  <text x="400" y="190" fill="#ff6840" font-family="monospace" font-size="11">BIOMETRIC 2-MAN</text>
  
  <line x1="45" y1="205" x2="555" y2="205" stroke="#332c20" stroke-width="1"/>
  
  <text x="55" y="230" fill="#f4efe4" font-family="monospace" font-size="11">ROOF CCTV</text>
  <text x="140" y="230" fill="#f4efe4" font-family="monospace" font-size="11">M. KOWALSKI</text>
  <text x="260" y="230" fill="#f4efe4" font-family="monospace" font-size="11">20:00 - 04:00</text>
  <text x="400" y="230" fill="#00f0ff" font-family="monospace" font-size="11">AUTO PATROL (3m)</text>
  
  <!-- Big Red Stamp -->
  <g transform="translate(340, 270) rotate(-12)">
    <rect x="0" y="0" width="180" height="50" rx="4" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="10,2"/>
    <text x="15" y="34" fill="#e74c3c" font-family="monospace" font-size="20" font-weight="900" letter-spacing="3">CONFIDENTIAL</text>
  </g>
  
  <!-- Barcode -->
  <g transform="translate(50, 360)">
    <rect x="0" y="0" width="2" height="30" fill="#e8b45d"/>
    <rect x="5" y="0" width="4" height="30" fill="#e8b45d"/>
    <rect x="12" y="0" width="1" height="30" fill="#e8b45d"/>
    <rect x="16" y="0" width="6" height="30" fill="#e8b45d"/>
    <rect x="25" y="0" width="3" height="30" fill="#e8b45d"/>
    <rect x="32" y="0" width="1" height="30" fill="#e8b45d"/>
    <rect x="36" y="0" width="5" height="30" fill="#e8b45d"/>
    <rect x="44" y="0" width="2" height="30" fill="#e8b45d"/>
    <text x="0" y="45" fill="#a6a094" font-family="monospace" font-size="9">VC-INTEL-883019</text>
  </g>
</svg>
`);

export const DEMO_EVIDENCE: Evidence[] = [
  {
    id: 'ev-demo-01',
    name: 'DOWNTOWN VAULT BLUEPRINT',
    image: VAULT_BLUEPRINT_SVG,
    originalImage: VAULT_BLUEPRINT_SVG,
    timestamp: '01:15:30 AM',
    location: 'NEON DISTRICT',
    edited: false,
    rotation: -1.5,
  },
  {
    id: 'ev-demo-02',
    name: 'HARBOR DOCK 4 PATROL ROUTE',
    image: HARBOR_DOCK_SVG,
    originalImage: HARBOR_DOCK_SVG,
    timestamp: '02:44:12 AM',
    location: 'VICE HARBOR',
    edited: false,
    rotation: 1.2,
  },
  {
    id: 'ev-demo-03',
    name: 'SECURITY DISPATCH LOG',
    image: DISPATCH_LOG_SVG,
    originalImage: DISPATCH_LOG_SVG,
    timestamp: '03:10:00 AM',
    location: 'PORT AUTHORITY',
    edited: false,
    rotation: -0.8,
  },
];

