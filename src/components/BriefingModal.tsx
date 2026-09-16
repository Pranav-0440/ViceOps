import React, { useState } from 'react';
import {
  MissionData,
  MissionStats,
  FixerBriefing,
  Evidence,
} from '../types';
import {
  X,
  Shield,
  Target,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Radio,
  Eye,
  Download,
  DollarSign,
} from 'lucide-react';

interface BriefingModalProps {
  mission: MissionData;
  stats: MissionStats;
  briefing: FixerBriefing;
  evidence: Evidence[];
  onClose: () => void;
  onExport: () => void;
  onComplete: () => void;
}

const BriefingModal: React.FC<BriefingModalProps> = ({
  mission,
  stats,
  briefing,
  evidence,
  onClose,
  onExport,
  onComplete,
}) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="briefing-modal-overlay" role="dialog" aria-label="Mission briefing">
      <div className="briefing-modal">
        <div className="briefing-modal-header">
          <div className="briefing-confidential">
            <Shield size={14} />
            CONFIDENTIAL — MISSION BRIEFING
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close briefing">
            <X size={16} />
          </button>
        </div>

        <div className="briefing-modal-body">
          {/* Mission Identity */}
          <div className="briefing-identity">
            <h1 className="briefing-codename">{mission.codename}</h1>
            <div className="briefing-target-info">
              <span><Target size={14} /> {mission.target}</span>
              <span><MapPin size={14} /> {mission.location}</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="briefing-quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-label">TYPE</span>
              <span className="quick-stat-value">{mission.missionType}</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-label">CREW</span>
              <span className="quick-stat-value">{mission.crew}</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-label">PAYOUT</span>
              <span className="quick-stat-value">${mission.payout.toLocaleString()}</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-label">HEAT</span>
              <span className="quick-stat-value stat-heat">{stats.heat}%</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-label">DIFFICULTY</span>
              <span className="quick-stat-value">{stats.difficulty}%</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-label">RISK</span>
              <span className={`quick-stat-value risk-${stats.risk.toLowerCase()}`}>
                {stats.risk}
              </span>
            </div>
          </div>

          {/* Fixer Transmission */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <Radio size={16} />
              FIXER TRANSMISSION
            </h2>
            <div className="fixer-transmission">
              <p className="fixer-text">{briefing.narrative}</p>
            </div>
          </div>

          {/* Objective */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <Target size={16} />
              OBJECTIVE
            </h2>
            <p className="briefing-text">{briefing.objective}</p>
          </div>

          {/* Intelligence */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <Eye size={16} />
              INTELLIGENCE
            </h2>
            <p className="briefing-text">{briefing.intelligence}</p>
          </div>

          {/* Approaches */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <MapPin size={16} />
              APPROACHES
            </h2>
            <div className="approaches-grid">
              {briefing.approaches.map((approach) => (
                <div key={approach.id} className="approach-card">
                  <div className="approach-header">
                    <span className="approach-number">
                      APPROACH {String(approach.id).padStart(2, '0')}
                    </span>
                    <span className={`approach-risk risk-badge risk-${approach.riskLevel.toLowerCase()}`}>
                      {approach.riskLevel}
                    </span>
                  </div>
                  <h3 className="approach-name">{approach.name}</h3>
                  <p className="approach-desc">{approach.description}</p>
                  <ul className="approach-details">
                    {approach.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <AlertTriangle size={16} />
              RISKS
            </h2>
            <ul className="risks-list">
              {briefing.risks.map((risk, i) => (
                <li key={i} className="risk-item">{risk}</li>
              ))}
            </ul>
          </div>

          {/* Payout */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <DollarSign size={16} />
              PAYOUT
            </h2>
            <p className="briefing-text payout-text">{briefing.payoutNote}</p>
          </div>

          {/* Evidence */}
          <div className="briefing-section">
            <h2 className="briefing-section-title">
              <Eye size={16} />
              EVIDENCE ({evidence.length})
            </h2>
            <div className="briefing-evidence-grid">
              {evidence.map((ev, i) => (
                <div
                  key={ev.id}
                  className="briefing-evidence-item"
                  onClick={() => setExpandedImage(ev.image)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${ev.name}`}
                  onKeyDown={(e) => e.key === 'Enter' && setExpandedImage(ev.image)}
                >
                  <img src={ev.image} alt={ev.name} />
                  <div className="briefing-evidence-label">
                    <span>EVIDENCE {String(i + 1).padStart(2, '0')}</span>
                    {ev.edited && (
                      <span className="evidence-annotated-tag">
                        <CheckCircle size={10} /> ANNOTATED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="briefing-modal-footer">
          <button className="btn btn-accent" onClick={onExport} aria-label="Export mission board">
            <Download size={16} />
            DOWNLOAD MISSION BOARD
          </button>
          <button className="btn btn-primary" onClick={onComplete} aria-label="Complete mission">
            MISSION COMPLETE
          </button>
        </div>
      </div>

      {/* Expanded Image */}
      {expandedImage && (
        <div
          className="expanded-image-overlay"
          onClick={() => setExpandedImage(null)}
          role="dialog"
          aria-label="Enlarged evidence"
        >
          <img src={expandedImage} alt="Enlarged evidence" className="expanded-image" />
          <button
            className="btn btn-ghost btn-sm expanded-close"
            onClick={() => setExpandedImage(null)}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BriefingModal;
