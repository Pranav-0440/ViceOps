import React, { useEffect, useState } from 'react';
import { MissionStats as MissionStatsType } from '../types';
import { Flame, BarChart3, AlertTriangle } from 'lucide-react';

interface MissionStatsProps {
  stats: MissionStatsType;
}

const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({
  value,
  suffix = '%',
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      start = Math.round(eased * value);
      setDisplay(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className="stat-number">
      {display}
      {suffix}
    </span>
  );
};

const MissionStats: React.FC<MissionStatsProps> = ({ stats }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return 'risk-critical';
      case 'HIGH':
        return 'risk-high';
      case 'MODERATE':
        return 'risk-moderate';
      default:
        return 'risk-low';
    }
  };

  return (
    <div className="mission-stats">
      <h3 className="stats-title">MISSION STATS</h3>

      <div className="stat-item">
        <div className="stat-label">
          <Flame size={14} />
          HEAT
        </div>
        <div className="stat-bar-wrapper">
          <div
            className="stat-bar stat-bar-heat"
            style={{ width: `${stats.heat}%` }}
          />
        </div>
        <AnimatedNumber value={stats.heat} />
      </div>

      <div className="stat-item">
        <div className="stat-label">
          <BarChart3 size={14} />
          DIFFICULTY
        </div>
        <div className="stat-bar-wrapper">
          <div
            className="stat-bar stat-bar-difficulty"
            style={{ width: `${stats.difficulty}%` }}
          />
        </div>
        <AnimatedNumber value={stats.difficulty} />
      </div>

      <div className="stat-item">
        <div className="stat-label">
          <AlertTriangle size={14} />
          RISK
        </div>
        <span className={`risk-badge ${getRiskColor(stats.risk)}`}>
          {stats.risk}
        </span>
      </div>
    </div>
  );
};

export default MissionStats;
