# Vice City Mission Briefing

**"Pin the evidence. Build the plan."**

An original GTA VI-inspired interactive mission-planning experience created for the **Build with React Image Editor Challenge** by Unlayer. This is a cinematic, immersive web application where users upload surveillance photographs, annotate them using React Image Editor, build a mission dossier, generate a fictional mission briefing, and export the final mission board as a PNG.

> **Disclaimer:** This is an original creative project. It is not affiliated with, endorsed by, or connected to Rockstar Games, Grand Theft Auto, or Take-Two Interactive. All branding, characters, names, locations, graphics, and copy are original.

## Concept

Vice City Mission Control transforms the concept of photo editing into a narrative experience. Instead of editing random images, users prepare **surveillance evidence** for a fictional open-world crime mission. The image editor is the mechanic. The evidence board is the workspace. The mission dossier is the planning system. The fixer briefing is the payoff.

## Features

- 🎯 **Surveillance Evidence Board** — Upload images displayed as physical photographs on an interactive cork board with red investigation strings
- ✏️ **Image Annotation** — Full React Image Editor integration for drawing routes, marking targets, adding text labels, placing shapes, and applying filters
- 📋 **Mission Dossier** — Configure codename, target, mission type, location, crew size, and payout
- 📊 **Dynamic Mission Stats** — Heat, difficulty, and risk calculated from mission parameters using a deterministic formula
- 🎬 **Cinematic Briefing** — "Call the Fixer" generates a full mission briefing with narrative, approaches, risks, and evidence review
- 📸 **PNG Export** — Download the final mission board as a high-quality image via html2canvas
- 📱 **Responsive Design** — Desktop, tablet, and mobile layouts
- 🎮 **Demo Mode** — One-click demo with pre-filled mission data

## React Image Editor

React Image Editor (`@unlayer/react-image-editor`) powers the **core surveillance annotation workflow**. It is not a secondary demo — it is the primary editing tool users interact with during mission planning.

Users edit every evidence photograph before it becomes part of the mission briefing:

- **Draw** — Circle targets, draw entry/exit routes, mark patrol paths
- **Text** — Label locations, add tactical notes, annotate points of interest
- **Shapes** — Place markers, arrows, geometric overlays
- **Filters** — Enhance surveillance imagery for clarity

### Integration Details

```tsx
<ImageEditor
  ref={editorRef}
  image={evidence.image}
  options={{
    theme: 'dark',
    features: {
      imageEditor: {
        tools: {
          crop: false,
          resize: false,
          draw: true,
          text: true,
          shapes: true,
          stickers: false,
          frame: false,
          filter: true,
        },
      },
    },
  }}
  onSave={handleSave}
  onCancel={onCancel}
/>
```

The saved image (`dataUrl`) replaces the original evidence on the board, and the card displays an "ANNOTATED" badge.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tooling |
| @unlayer/react-image-editor | Image annotation |
| html2canvas | PNG export |
| lucide-react | Icons |

## Architecture

```
Upload → Edit → Annotate → Save → Mission Dossier → Generate Briefing → Export
```

### User Flow

1. **Landing** — Cinematic hero with "Start Planning" and "Try Demo"
2. **Mission Control** — Two-column layout: evidence board + mission dossier
3. **Upload** — Drag-and-drop or file picker for surveillance images
4. **Edit** — Open React Image Editor in a modal, annotate the image
5. **Configure** — Set codename, target, type, location, crew, payout
6. **Generate** — "Call the Fixer" triggers cinematic loading + briefing generation
7. **Review** — Full mission briefing with approaches, risks, evidence gallery
8. **Export** — Download mission board as PNG
9. **Complete** — Mission archived, option to create another

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── EvidenceBoard.tsx
│   ├── EvidenceCard.tsx
│   ├── ImageUpload.tsx
│   ├── EditorModal.tsx
│   ├── MissionForm.tsx
│   ├── MissionStats.tsx
│   ├── BriefingPanel.tsx
│   ├── BriefingModal.tsx
│   ├── ExportPreview.tsx
│   ├── Toast.tsx
│   └── LoadingOverlay.tsx
├── data/                # Static data and templates
│   ├── missions.ts
│   ├── locations.ts
│   ├── storyTemplates.ts
│   └── evidence.ts
├── hooks/               # Custom React hooks
│   ├── useMission.ts
│   └── useLocalStorage.ts
├── utils/               # Utilities
│   ├── image.ts
│   ├── export.ts
│   └── missionGenerator.ts
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx
├── main.tsx
└── styles.css
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

No backend required. No environment variables needed for the MVP.

### Future AI Integration

The `missionGenerator.ts` is structured so the deterministic briefing can be replaced with an AI API call:

```ts
// Replace with:
// POST /api/briefing
// API key stays server-side (e.g., Vercel serverless function)
```

Create a `.env` with `AI_API_KEY=` and never commit it.

## Challenge

Built for the **Build with React Image Editor Challenge** by Unlayer.

## License

MIT
