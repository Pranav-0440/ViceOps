import React, { useRef } from 'react';
import {
  MissionData,
  MissionStats,
  FixerBriefing,
  Evidence,
} from '../types';
import { exportElementAsPng, generateFilename } from '../utils/export';
import {
  X,
  Download,
  Shield,
  Target,
  MapPin,
  Users,
  DollarSign,
  Flame,
  BarChart3,
  Radio,
  CheckCircle,
} from 'lucide-react';

interface ExportPreviewProps {
  mission: MissionData;
  stats: MissionStats;
  briefing: FixerBriefing;
  evidence: Evidence[];
  onClose: () => void;
  onToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ExportPreview: React.FC<ExportPreviewProps> = ({
  mission,
  stats,
  briefing,
  evidence,
  onClose,
  onToast,
}) => {
  const exportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!exportRef.current) return;

    try {
      await exportElementAsPng(exportRef.current, generateFilename(mission.codename));
      onToast('Mission board exported.');
    } catch {
      onToast('Export failed. Try again.', 'error');
    }
  };

  return (
    <div className="export-overlay" role="dialog" aria-label="Export preview">
      <div className="export-modal">
        <div className="export-header">
          <h2>EXPORT PREVIEW</h2>
          <div className="export-actions">
            <button className="btn btn-accent" onClick={handleDownload} aria-label="Download PNG">
              <Download size={16} />
              DOWNLOAD PNG
            </button>
            <button className="btn btn-ghost" onClick={onClose} aria-label="Cancel export">
              <X size={16} />
              CANCEL
            </button>
          </div>
        </div>

        <div className="export-scroll">
          <div className="export-board" ref={exportRef}>
            {/* Export Board Content — clean version without interactive elements */}
            <div className="export-board-header">
              <Shield size={20} />
              <div>
                <div className="export-brand">VICE CITY MISSION CONTROL</div>
                <div className="export-confidential">CONFIDENTIAL — FIELD OPERATIONS</div>
              </div>
            </div>

            <div className="export-divider" />

            <div className="export-mission-identity">
              <div className="export-label">MISSION</div>
              <div className="export-codename">{mission.codename}</div>
              <div className="export-target-row">
                <span><Target size={14} /> {mission.target}</span>
                <span><MapPin size={14} /> {mission.location}</span>
              </div>
            </div>

            <div className="export-divider" />

            <div className="export-stats-row">
              <div className="export-stat">
                <span className="export-stat-label">TYPE</span>
                <span className="export-stat-value">{mission.missionType}</span>
              </div>
              <div className="export-stat">
                <span className="export-stat-label">CREW</span>
                <span className="export-stat-value"><Users size={12} /> {mission.crew}</span>
              </div>
              <div className="export-stat">
                <span className="export-stat-label">PAYOUT</span>
                <span className="export-stat-value"><DollarSign size={12} /> {mission.payout.toLocaleString()}</span>
              </div>
              <div className="export-stat">
                <span className="export-stat-label">HEAT</span>
                <span className="export-stat-value"><Flame size={12} /> {stats.heat}%</span>
              </div>
              <div className="export-stat">
                <span className="export-stat-label">DIFFICULTY</span>
                <span className="export-stat-value"><BarChart3 size={12} /> {stats.difficulty}%</span>
              </div>
            </div>

            <div className="export-divider" />

            {/* Surveillance */}
            <div className="export-section">
              <div className="export-section-title">SURVEILLANCE</div>
              <div className="export-evidence-row">
                {evidence.map((ev, i) => (
                  <div key={ev.id} className="export-evidence-item">
                    <img src={ev.image} alt={ev.name} />
                    <div className="export-evidence-meta">
                      <span>EVIDENCE {String(i + 1).padStart(2, '0')}</span>
                      {ev.edited && (
                        <span className="export-annotated">
                          <CheckCircle size={8} /> ANNOTATED
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="export-divider" />

            {/* Fixer Transmission */}
            <div className="export-section">
              <div className="export-section-title">
                <Radio size={14} /> FIXER TRANSMISSION
              </div>
              <p className="export-fixer-text">{briefing.narrative}</p>
            </div>

            <div className="export-divider" />

            {/* Approaches */}
            <div className="export-section">
              <div className="export-section-title">APPROACHES</div>
              <div className="export-approaches">
                {briefing.approaches.map((a) => (
                  <div key={a.id} className="export-approach">
                    <div className="export-approach-header">
                      APPROACH {String(a.id).padStart(2, '0')} — {a.name}
                    </div>
                    <p>{a.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="export-board-footer">
              <span>VICE CITY MISSION CONTROL</span>
              <span>OPERATION #{String(Date.now()).slice(-6)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPreview;
