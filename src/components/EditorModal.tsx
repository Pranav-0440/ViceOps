import React, { useRef, useState, useCallback } from 'react';
import ImageEditor from '@unlayer/react-image-editor';
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
  const editorRef = useRef<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const handleSave = useCallback(
    ({ dataUrl }: { dataUrl: string; blob: Blob }) => {
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
      const image = editorRef.current?.editor?.getImage();
      if (image) {
        onSave(evidence.id, image);
        setIsSaving(false);
      }
    } catch {
      // Fallback: the onSave prop will handle it
      setIsSaving(false);
    }
  }, [evidence.id, onSave]);

  const handleError = useCallback(() => {
    onError?.('Surveillance image unavailable. Try another image.');
  }, [onError]);

  return (
    <div className="editor-modal-overlay" role="dialog" aria-label="Edit surveillance evidence">
      <div className="editor-modal">
        <div className="editor-modal-header">
          <div className="editor-modal-title-area">
            <h2 className="editor-modal-title">EDIT SURVEILLANCE</h2>
            <p className="editor-modal-subtitle">
              Mark anything your crew needs to know.
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
          {/* Sidebar with field tool hints */}
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
              Use the editor tools to annotate this surveillance photograph.
            </div>
          </div>

          {/* The actual Unlayer Image Editor */}
          <div className="editor-container">
            {!editorLoaded && (
              <div className="editor-loading">
                <Crosshair size={24} className="loading-icon-spin" />
                <span>Loading surveillance editor...</span>
              </div>
            )}
            <ImageEditor
              ref={editorRef}
              image={evidence.image}
              options={{
                theme: 'dark',
                features: {
                  imageEditor: {
                    tools: {
                      crop: false,
                      resize: false,
                      draw: true,
                      text: true,
                      shapes: true,
                      stickers: false,
                      frame: false,
                      filter: true,
                    },
                  },
                },
              }}
              onSave={handleSave}
              onCancel={onCancel}
              onLoad={() => setEditorLoaded(true)}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
