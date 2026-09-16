import React from 'react';
import { MissionData, MissionType, LocationName } from '../types';
import { MISSION_TYPES } from '../data/missions';
import { LOCATIONS } from '../data/locations';
import { FileText, User, MapPin, Users, DollarSign, Tag } from 'lucide-react';

interface MissionFormProps {
  mission: MissionData;
  onUpdate: (updates: Partial<MissionData>) => void;
}

const MissionForm: React.FC<MissionFormProps> = ({ mission, onUpdate }) => {
  return (
    <div className="mission-form">
      <div className="form-group">
        <label htmlFor="codename" className="form-label">
          <Tag size={14} />
          CODENAME
        </label>
        <input
          id="codename"
          type="text"
          className="form-input"
          value={mission.codename}
          onChange={(e) => onUpdate({ codename: e.target.value.toUpperCase() })}
          placeholder="NEON VEIL"
          maxLength={30}
          aria-label="Mission codename"
        />
      </div>

      <div className="form-group">
        <label htmlFor="target" className="form-label">
          <User size={14} />
          TARGET
        </label>
        <input
          id="target"
          type="text"
          className="form-input"
          value={mission.target}
          onChange={(e) => onUpdate({ target: e.target.value })}
          placeholder="Enter target or objective"
          maxLength={60}
          aria-label="Mission target"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mission-type" className="form-label">
          <FileText size={14} />
          MISSION TYPE
        </label>
        <select
          id="mission-type"
          className="form-select"
          value={mission.missionType}
          onChange={(e) => onUpdate({ missionType: e.target.value as MissionType })}
          aria-label="Mission type"
        >
          {MISSION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label">
          <MapPin size={14} />
          LOCATION
        </label>
        <select
          id="location"
          className="form-select"
          value={mission.location}
          onChange={(e) => onUpdate({ location: e.target.value as LocationName })}
          aria-label="Mission location"
        >
          {LOCATIONS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="crew" className="form-label">
            <Users size={14} />
            CREW
          </label>
          <input
            id="crew"
            type="number"
            className="form-input"
            value={mission.crew}
            onChange={(e) =>
              onUpdate({ crew: Math.min(8, Math.max(1, parseInt(e.target.value) || 1)) })
            }
            min={1}
            max={8}
            aria-label="Crew size"
          />
        </div>

        <div className="form-group">
          <label htmlFor="payout" className="form-label">
            <DollarSign size={14} />
            PAYOUT
          </label>
          <div className="form-input-wrapper">
            <span className="form-input-prefix">$</span>
            <input
              id="payout"
              type="number"
              className="form-input form-input-payout"
              value={mission.payout}
              onChange={(e) =>
                onUpdate({ payout: Math.max(0, parseInt(e.target.value) || 0) })
              }
              min={0}
              step={5000}
              aria-label="Mission payout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionForm;
