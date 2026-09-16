import React, { useState, useEffect } from 'react';
import { Shield, Lock, Radio, Eye, Crosshair } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LOADING_STEPS = [
  { text: 'CONNECTING...', icon: Radio, delay: 0 },
  { text: 'ENCRYPTING CHANNEL...', icon: Lock, delay: 700 },
  { text: 'UPLOADING SURVEILLANCE...', icon: Eye, delay: 1400 },
  { text: 'ANALYZING EVIDENCE...', icon: Crosshair, delay: 2100 },
  { text: 'BUILDING OPERATION...', icon: Shield, delay: 2800 },
];

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setComplete(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    LOADING_STEPS.forEach((step, index) => {
      timers.push(
        setTimeout(() => setCurrentStep(index), step.delay)
      );
    });

    timers.push(
      setTimeout(() => setComplete(true), 3500)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="loading-overlay" role="alert" aria-busy="true">
      <div className="loading-content">
        <div className="loading-logo">
          <Crosshair size={32} className="loading-icon-spin" />
        </div>

        <div className="loading-steps">
          {LOADING_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep && !complete;

            return (
              <div
                key={index}
                className={`loading-step ${isActive ? 'step-active' : ''} ${isCurrent ? 'step-current' : ''}`}
              >
                <StepIcon size={14} />
                <span>{step.text}</span>
                {isActive && <span className="step-check">✓</span>}
              </div>
            );
          })}
        </div>

        {complete && (
          <div className="loading-complete fade-in">
            <Shield size={20} />
            <span>MISSION BRIEFING READY</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
