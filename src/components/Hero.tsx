import React from 'react';
import { ArrowRight, Crosshair } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onLoadDemo: () => void;
  onDismissOnboarding: () => void;
  showOnboarding: boolean;
}

const Hero: React.FC<HeroProps> = ({
  onStartPlanning,
  onLoadDemo,
  onDismissOnboarding,
  showOnboarding,
}) => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-skyline" />
        <div className="hero-grain" />
        <div className="hero-scanlines" />
      </div>

      <div className="hero-content fade-up">
        <div className="hero-status">
          <span className="hero-status-dot" />
          PRIVATE OPERATIONS // SECURE CHANNEL
        </div>

        <h1 className="hero-heading">
          <span className="hero-heading-line">BUILD YOUR</span>
          <span className="hero-heading-line hero-heading-accent">MISSION.</span>
        </h1>

        <p className="hero-description">
          Every job starts with a photo.<br />
          Mark the details. Build the plan.<br />
          Decide how it goes.
        </p>

        <div className="hero-actions">
          <button
            className="btn btn-primary btn-lg"
            onClick={onStartPlanning}
            aria-label="Start planning a mission"
          >
            <Crosshair size={18} />
            START PLANNING
            <ArrowRight size={18} />
          </button>

          <button
            className="btn btn-ghost"
            onClick={onLoadDemo}
            aria-label="Try demo mission"
          >
            TRY DEMO
          </button>
        </div>

        <div className="hero-footer">
          MISSION CONTROL // FIELD OPERATIONS
        </div>
      </div>

      {showOnboarding && (
        <div className="onboarding-hint fade-in">
          <div className="onboarding-content">
            <p>
              Your first job is simple:<br />
              Upload surveillance.<br />
              Mark what matters.<br />
              Build the operation.
            </p>
            <button
              className="btn btn-sm btn-outline"
              onClick={onDismissOnboarding}
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
