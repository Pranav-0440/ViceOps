import React, { lazy, Suspense, useEffect } from 'react';
import { useMission } from './hooks/useMission';
import Header from './components/Header';
import Hero from './components/Hero';
import EvidenceBoard from './components/EvidenceBoard';
import BriefingPanel from './components/BriefingPanel';
import LoadingOverlay from './components/LoadingOverlay';
import Toast from './components/Toast';
import { Crosshair, ArrowLeft, RotateCcw } from 'lucide-react';
import './styles.css';

// Lazy-loaded modal components to optimize initial bundle size & defer canvas dependencies
const EditorModal = lazy(() => import('./components/EditorModal'));
const BriefingModal = lazy(() => import('./components/BriefingModal'));
const ExportPreview = lazy(() => import('./components/ExportPreview'));

const App: React.FC = () => {
  const m = useMission();
  const editingEvidence = m.getEditingEvidence();

  // Global Keyboard Shortcuts (Escape to dismiss modals, Ctrl/Cmd+Enter to trigger briefing)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingEvidence) m.stopEditing();
        else if (m.showExportPreview) m.setShowExportPreview(false);
        else if (m.showBriefingModal) m.setShowBriefingModal(false);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (m.view === 'planning' && m.isFormValid && !m.isGenerating && !editingEvidence && !m.showBriefingModal) {
          m.generateBriefing();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingEvidence, m]);

  return (
    <div className="app">
      <Header view={m.view} />
      <Toast toasts={m.toasts} onRemove={m.removeToast} />
      <LoadingOverlay isVisible={m.isGenerating} />

      {/* LANDING VIEW */}
      {m.view === 'landing' && (
        <Hero
          onStartPlanning={m.startPlanning}
          onLoadDemo={m.loadDemoData}
          onDismissOnboarding={() => m.setOnboardingDismissed(true)}
          showOnboarding={!m.onboardingDismissed}
        />
      )}

      {/* PLANNING VIEW */}
      {m.view === 'planning' && (
        <main className="planning-view">
          <div className="planning-header">
            <div className="planning-header-left">
              <button
                className="btn btn-ghost btn-sm"
                onClick={m.returnToLanding}
                aria-label="Return to landing"
              >
                <ArrowLeft size={16} />
                BACK
              </button>
              <div className="planning-label">
                NEW OPERATION // {String(m.operationCount).padStart(3, '0')}
              </div>
            </div>
            <h1 className="planning-title">BUILD THE JOB</h1>
          </div>

          <div className="planning-layout">
            <div className="planning-board">
              <EvidenceBoard
                evidence={m.evidence}
                onUpload={m.addEvidence}
                onEdit={m.startEditing}
                onDelete={m.deleteEvidence}
                onLoadSample={m.loadDemoEvidence}
              />
            </div>
            <aside className="planning-sidebar">
              <BriefingPanel
                mission={m.mission}
                stats={m.stats}
                evidence={m.evidence}
                isFormValid={m.isFormValid}
                isGenerating={m.isGenerating}
                onUpdate={m.updateMission}
                onGenerate={m.generateBriefing}
              />
            </aside>
          </div>
        </main>
      )}

      {/* COMPLETE VIEW */}
      {m.view === 'complete' && (
        <div className="complete-view fade-in">
          <div className="complete-content">
            <Crosshair size={48} className="complete-icon" />
            <h1 className="complete-title">MISSION COMPLETE</h1>
            <div className="complete-details">
              <div className="complete-detail">
                <span className="complete-label">MISSION</span>
                <span className="complete-value">{m.mission.codename}</span>
              </div>
              <div className="complete-detail">
                <span className="complete-label">STATUS</span>
                <span className="complete-value complete-status">BRIEFING ARCHIVED</span>
              </div>
            </div>
            <div className="complete-actions">
              <button className="btn btn-primary btn-lg" onClick={m.resetMission}>
                <RotateCcw size={16} />
                CREATE ANOTHER MISSION
              </button>
              <button className="btn btn-ghost" onClick={m.returnToLanding}>
                RETURN TO CONTROL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUSPENSE BOUNDARY */}
      <Suspense fallback={null}>
        {/* EDITOR MODAL */}
        {editingEvidence && (
          <EditorModal
            evidence={editingEvidence}
            onSave={m.updateEvidenceImage}
            onCancel={m.stopEditing}
            onError={(msg) => m.addToast(msg, 'error')}
          />
        )}

        {/* BRIEFING MODAL */}
        {m.showBriefingModal && m.briefing && (
          <BriefingModal
            mission={m.mission}
            stats={m.stats}
            briefing={m.briefing}
            evidence={m.evidence}
            onClose={() => m.setShowBriefingModal(false)}
            onExport={() => {
              m.setShowBriefingModal(false);
              m.setShowExportPreview(true);
            }}
            onComplete={() => {
              m.setShowBriefingModal(false);
              m.setView('complete');
            }}
          />
        )}

        {/* EXPORT PREVIEW */}
        {m.showExportPreview && m.briefing && (
          <ExportPreview
            mission={m.mission}
            stats={m.stats}
            briefing={m.briefing}
            evidence={m.evidence}
            onClose={() => m.setShowExportPreview(false)}
            onToast={m.addToast}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
