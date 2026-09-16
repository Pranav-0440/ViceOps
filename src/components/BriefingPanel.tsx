import React from 'react';
import { MissionData, MissionStats, Evidence } from '../types';
import MissionForm from './MissionForm';
import MissionStatsComponent from './MissionStats';
import { Phone, Lock, FileWarning } from 'lucide-react';

interface BriefingPanelProps {
  mission: MissionData;
  stats: MissionStats;
  evidence: Evidence[];
  isFormValid: boolean;
  isGenerating: boolean;
  onUpdate: (updates: Partial<MissionData>) => void;
  onGenerate: () => void;
}

const BriefingPanel: React.FC<BriefingPanelProps> = ({
  mission,
  stats,
  evidence,
  isFormValid,
  isGenerating,
  onUpdate,
  onGenerate,
}) => {
  const canGenerate = isFormValid && evidence.length > 0;

  return (
    <div className="briefing-panel">
      <div className="panel-header">
        <h2 className="panel-title">MISSION DOSSIER</h2>
        <p className="panel-subtitle">BUILD THE JOB</p>
      </div>

      <MissionForm mission={mission} onUpdate={onUpdate} />

      <div className="panel-divider" />

      <MissionStatsComponent stats={stats} />

      <div className="panel-divider" />

      <div className="panel-footer">
        {!canGenerate && (
          <div className="validation-note">
            <FileWarning size={14} />
            {evidence.length === 0
              ? 'Upload at least one surveillance file'
              : 'Complete all mission details'}
          </div>
        )}

        <button
          className="btn btn-primary btn-lg btn-generate"
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          aria-label="Generate mission briefing"
        >
          <Phone size={16} />
          {isGenerating ? 'CONNECTING...' : 'CALL THE FIXER'}
        </button>

        <div className="panel-security">
          <Lock size={12} />
          <span>ENCRYPTED CHANNEL</span>
        </div>
      </div>
    </div>
  );
};

export default BriefingPanel;
