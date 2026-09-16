import React from 'react';
import { Evidence } from '../types';
import { Pencil, Trash2, CheckCircle, MapPin, Clock } from 'lucide-react';

interface EvidenceCardProps {
  evidence: Evidence;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`evidence-card ${evidence.edited ? 'evidence-annotated' : ''}`}
      style={{ transform: `rotate(${evidence.rotation}deg)` }}
    >
      <div className="evidence-pin" aria-hidden="true" />

      <div className="evidence-photo-wrapper">
        <img
          src={evidence.image}
          alt={`Surveillance ${String(index + 1).padStart(2, '0')}`}
          className="evidence-photo"
          loading="lazy"
        />

        {evidence.edited && (
          <div className="evidence-badge">
            <CheckCircle size={12} />
            ANNOTATED
          </div>
        )}
      </div>

      <div className="evidence-meta">
        <div className="evidence-label">{evidence.name}</div>
        <div className="evidence-details">
          <span className="evidence-detail">
            <Clock size={10} />
            {evidence.timestamp}
          </span>
          <span className="evidence-detail">
            <MapPin size={10} />
            {evidence.location}
          </span>
        </div>
      </div>

      <div className="evidence-actions">
        <button
          className="btn btn-sm btn-evidence"
          onClick={() => onEdit(evidence.id)}
          aria-label={`Edit ${evidence.name}`}
        >
          <Pencil size={12} />
          EDIT
        </button>
        <button
          className="btn btn-sm btn-evidence btn-danger"
          onClick={() => onDelete(evidence.id)}
          aria-label={`Delete ${evidence.name}`}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(EvidenceCard);
