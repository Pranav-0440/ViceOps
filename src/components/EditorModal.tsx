import React, { useRef, useState, useCallback } from 'react';
import ImageEditor, {
  type ImageEditorRef,
  type ImageEditorSaveResult,
} from '@unlayer/react-image-editor';
import { Evidence } from '../types';
import { X, Save, Target, Route, StickyNote, Crosshair, Sparkles } from 'lucide-react';

interface EditorModalProps {
  evidence: Evidence;
  onSave: (id: string, imageDataUrl: string) => void;
  onCancel: () => void;
  onError?: (message: string) => void;
}

const EditorModal: React.FC<EditorModalProps> = ({
  evidence,
  onSave,
  onCancel,
  onError,
}) => {
  const editorRef = useRef<ImageEditorRef>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const handleSave = useCallback(
    ({ dataUrl }: ImageEditorSaveResult) => {
      if (dataUrl) {
        onSave(evidence.id, dataUrl);
      }
      setIsSaving(false);
    },
    [evidence.id, onSave]
  );

  const handleSaveClick = useCallback(() => {
    setIsSaving(true);
    try {
      const dataUrl = editorRef.current?.editor?.getImage();
      if (dataUrl) {
        onSave(evidence.id, dataUrl);
        setIsSaving(false);
      } else {
        // Fallback: wait for the onSave callback
        setIsSaving(false);
      }
    } catch {
      setIsSaving(false);
    }
  }, [evidence.id, onSave]);

  const handleLoadError = useCallback(() => {
    onError?.('Surveillance photo could not be decoded. Try another file.');
  }, [onError]);

  const handleError = useCallback((err: Error) => {
    console.error('Unlayer Image Editor error:', err);
    onError?.('Surveillance editor encountered an initialization error.');
  }, [onError]);

  return (
    <div className="editor-modal-overlay" role="dialog" aria-label="Edit surveillance evidence">
      <div className="editor-modal">
        <div className="editor-modal-header">
          <div className="editor-modal-title-area">
            <h2 className="editor-modal-title">EDIT SURVEILLANCE</h2>
            <p className="editor-modal-subtitle">
              Mark tactical entry points, patrol paths, and targets for your crew.
            </p>
          </div>

          <div className="editor-modal-actions">
            <button
              className="btn btn-accent btn-sm"
              onClick={handleSaveClick}
              disabled={isSaving}
              aria-label="Save edited evidence"
            >
              <Save size={14} />
              {isSaving ? 'SAVING...' : 'SAVE EVIDENCE'}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={onCancel}
              aria-label="Cancel editing"
            >
              <X size={14} />
              CANCEL
            </button>
          </div>
        </div>

        <div className="editor-modal-body">
          {/* Tactical Sidebar with field tool hints */}
          <div className="editor-sidebar">
            <h3 className="editor-sidebar-title">FIELD TOOLS</h3>
            <div className="editor-tool-hints">
              <div className="tool-hint">
                <Target size={14} />
                <span>MARK TARGET</span>
              </div>
              <div className="tool-hint">
                <Route size={14} />
                <span>DRAW ROUTE</span>
              </div>
              <div className="tool-hint">
                <StickyNote size={14} />
                <span>ADD NOTE</span>
              </div>
              <div className="tool-hint">
                <Crosshair size={14} />
                <span>PLACE MARKER</span>
              </div>
              <div className="tool-hint">
                <Sparkles size={14} />
                <span>ENHANCE IMAGE</span>
              </div>
            </div>
            <div className="editor-sidebar-note">
              Select tools from the right-hand panel to annotate and prepare intelligence for the fixer.
            </div>
          </div>

          {/* The official Unlayer Standalone Image Editor Component */}
          <div className="editor-container">
            {!editorLoaded && (
              <div className="editor-loading">
                <Crosshair size={24} className="loading-icon-spin" />
                <span>Initializing Unlayer Surveillance Editor...</span>
              </div>
            )}
            <ImageEditor
              ref={editorRef}
              image={evidence.image}
              minHeight="600px"
              options={{
                theme: 'dark',
                features: {
                  imageEditor: {
                    tools: {
                      filter: true,
                      crop: true,
                      resize: false,
                      draw: true,
                      text: true,
                      shapes: true,
                      stickers: true,
                      frame: true,
                    },
                  },
                },
              }}
              onSave={handleSave}
              onCancel={onCancel}
              onLoad={() => setEditorLoaded(true)}
              onLoadError={handleLoadError}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
