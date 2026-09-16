import { useState, useCallback } from 'react';
import {
  MissionData,
  Evidence,
  MissionStats,
  FixerBriefing,
  AppView,
  ToastMessage,
} from '../types';
import { useLocalStorage } from './useLocalStorage';
import { generateMissionBriefing, calculateStats } from '../utils/missionGenerator';
import { generateEvidenceId, getRandomLocation, getRandomTimestamp, DEMO_EVIDENCE } from '../data/evidence';
import { readFileAsDataUrl, resizeImage, isValidImageFile } from '../utils/image';

const DEFAULT_MISSION: MissionData = {
  codename: 'NEON VEIL',
  target: 'The Glasshouse Exchange',
  missionType: 'RETRIEVAL',
  location: 'VICE HARBOR',
  crew: 3,
  payout: 75000,
};

export function useMission() {
  const [view, setView] = useState<AppView>('landing');
  const [mission, setMission] = useLocalStorage<MissionData>('vc-mission', DEFAULT_MISSION);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [stats, setStats] = useState<MissionStats>(() => calculateStats(DEFAULT_MISSION, 0));
  const [briefing, setBriefing] = useState<FixerBriefing | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [showExportPreview, setShowExportPreview] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useLocalStorage('vc-onboarding', false);
  const [operationCount, setOperationCount] = useLocalStorage('vc-op-count', 1);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateMission = useCallback(
    (updates: Partial<MissionData>) => {
      setMission((prev) => {
        const updated = { ...prev, ...updates };
        setStats(calculateStats(updated, evidence.length));
        return updated;
      });
    },
    [evidence.length, setMission]
  );

  const addEvidence = useCallback(
    async (files: FileList) => {
      const newEvidence: Evidence[] = [];
      const rotations = [-2, 1, -1, 2, 0, -1.5, 1.5, -0.5];

      for (const file of Array.from(files)) {
        if (!isValidImageFile(file)) {
          addToast('Image could not be loaded.', 'error');
          continue;
        }

        try {
          const dataUrl = await readFileAsDataUrl(file);
          const resized = await resizeImage(dataUrl);
          const idx = evidence.length + newEvidence.length;

          newEvidence.push({
            id: generateEvidenceId(),
            name: `SURVEILLANCE ${String(idx + 1).padStart(2, '0')}`,
            image: resized,
            originalImage: resized,
            timestamp: getRandomTimestamp(),
            location: getRandomLocation(),
            edited: false,
            rotation: rotations[idx % rotations.length],
          });
        } catch {
          addToast('Image could not be loaded.', 'error');
        }
      }

      if (newEvidence.length > 0) {
        setEvidence((prev) => {
          const updated = [...prev, ...newEvidence];
          setStats(calculateStats(mission, updated.length));
          return updated;
        });
        addToast(`${newEvidence.length > 1 ? `${newEvidence.length} files` : 'Evidence'} uploaded.`);
      }
    },
    [evidence.length, mission, addToast]
  );

  const deleteEvidence = useCallback(
    (id: string) => {
      setEvidence((prev) => {
        const updated = prev.filter((e) => e.id !== id);
        setStats(calculateStats(mission, updated.length));
        return updated;
      });
      addToast('Evidence removed.', 'info');
    },
    [mission, addToast]
  );

  const updateEvidenceImage = useCallback(
    (id: string, newImage: string) => {
      setEvidence((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, image: newImage, edited: true } : e
        )
      );
      addToast('Evidence annotated.');
    },
    [addToast]
  );

  const startEditing = useCallback((id: string) => {
    setEditingEvidenceId(id);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingEvidenceId(null);
  }, []);

  const getEditingEvidence = useCallback((): Evidence | null => {
    if (!editingEvidenceId) return null;
    return evidence.find((e) => e.id === editingEvidenceId) || null;
  }, [editingEvidenceId, evidence]);

  const generateBriefing = useCallback(async () => {
    setIsGenerating(true);

    // Simulate cinematic loading sequence
    await new Promise((r) => setTimeout(r, 4000));

    try {
      const result = await generateMissionBriefing(mission, evidence);
      setBriefing(result.briefing);
      setStats(result.stats);
      setIsGenerating(false);
      setShowBriefingModal(true);
      addToast('Mission briefing generated.');
    } catch {
      setIsGenerating(false);
      addToast('Briefing generation failed.', 'error');
    }
  }, [mission, evidence, addToast]);

  const startPlanning = useCallback(() => {
    setView('planning');
  }, []);

  const resetMission = useCallback(() => {
    setMission(DEFAULT_MISSION);
    setEvidence([]);
    setBriefing(null);
    setStats(calculateStats(DEFAULT_MISSION, 0));
    setShowBriefingModal(false);
    setShowExportPreview(false);
    setOperationCount((prev) => prev + 1);
    setView('planning');
  }, [setMission, setOperationCount]);

  const returnToLanding = useCallback(() => {
    setView('landing');
  }, []);

  const loadDemoData = useCallback(() => {
    const demoMission: MissionData = {
      codename: 'NEON VEIL',
      target: 'The Glasshouse Exchange',
      missionType: 'RETRIEVAL',
      location: 'VICE HARBOR',
      crew: 3,
      payout: 75000,
    };
    setMission(demoMission);
    setEvidence(DEMO_EVIDENCE);
    setStats(calculateStats(demoMission, DEMO_EVIDENCE.length));
    setView('planning');
    addToast('Demo mission loaded with surveillance intel.', 'info');
  }, [setMission, addToast]);

  const loadDemoEvidence = useCallback(() => {
    setEvidence(DEMO_EVIDENCE);
    setStats(calculateStats(mission, DEMO_EVIDENCE.length));
    addToast('Sample surveillance intel loaded.');
  }, [mission, addToast]);

  const isFormValid = Boolean(
    mission.codename.trim() &&
    mission.target.trim() &&
    mission.missionType &&
    mission.location &&
    mission.crew >= 1 &&
    mission.crew <= 8 &&
    mission.payout > 0
  );

  return {
    // State
    view,
    mission,
    evidence,
    stats,
    briefing,
    isGenerating,
    editingEvidenceId,
    toasts,
    showBriefingModal,
    showExportPreview,
    onboardingDismissed,
    operationCount,
    isFormValid,

    // Actions
    setView,
    updateMission,
    addEvidence,
    deleteEvidence,
    updateEvidenceImage,
    startEditing,
    stopEditing,
    getEditingEvidence,
    generateBriefing,
    startPlanning,
    resetMission,
    returnToLanding,
    loadDemoData,
    loadDemoEvidence,
    addToast,
    removeToast,
    setShowBriefingModal,
    setShowExportPreview,
    setOnboardingDismissed,
  };
}
