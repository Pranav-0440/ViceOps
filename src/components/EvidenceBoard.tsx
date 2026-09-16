import React from 'react';
import { Evidence } from '../types';
import EvidenceCard from './EvidenceCard';
import ImageUpload from './ImageUpload';
import { Camera, FileText } from 'lucide-react';

interface EvidenceBoardProps {
  evidence: Evidence[];
  onUpload: (files: FileList) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadSample?: () => void;
}

const EvidenceBoard: React.FC<EvidenceBoardProps> = ({
  evidence,
  onUpload,
  onEdit,
  onDelete,
  onLoadSample,
}) => {
  return (
    <div className="evidence-board">
      <div className="board-header">
        <div>
          <h2 className="board-title">
            <Camera size={18} />
            SURVEILLANCE FILES
          </h2>
          <p className="board-subtitle">Pin what matters.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {onLoadSample && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={onLoadSample}
              title="Load preset surveillance photos"
            >
              + SAMPLE INTEL
            </button>
          )}
          <ImageUpload onUpload={onUpload} />
        </div>
      </div>

      <div className="board-surface">
        {/* Red investigation strings - SVG behind cards */}
        {evidence.length > 1 && (
          <svg className="investigation-strings" aria-hidden="true">
            {evidence.slice(0, -1).map((_, i) => {
              const x1 = 120 + (i % 3) * 220 + 80;
              const y1 = Math.floor(i / 3) * 280 + 100;
              const x2 = 120 + ((i + 1) % 3) * 220 + 80;
              const y2 = Math.floor((i + 1) / 3) * 280 + 100;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#c23616"
                  strokeWidth="1"
                  opacity="0.4"
                />
              );
            })}
          </svg>
        )}

        {evidence.length === 0 ? (
          <div className="empty-state">
            <Camera size={40} />
            <h3>NO SURVEILLANCE FILES</h3>
            <p>Upload your first image or load preset surveillance intel to begin.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
              <ImageUpload onUpload={onUpload} />
              {onLoadSample && (
                <button
                  className="btn btn-secondary"
                  onClick={onLoadSample}
                >
                  LOAD PRESET INTEL
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="evidence-grid">
            {evidence.map((ev, i) => (
              <EvidenceCard
                key={ev.id}
                evidence={ev}
                index={i}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {/* Field note pinned to board */}
        {evidence.length > 0 && (
          <div className="field-note" aria-label="Field note">
            <div className="field-note-pin" aria-hidden="true" />
            <div className="field-note-header">
              <FileText size={12} />
              FIELD NOTE
            </div>
            <p className="field-note-text">
              Circle anything useful.<br />
              Routes.<br />
              Cameras.<br />
              Entrances.<br />
              Exits.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceBoard;
