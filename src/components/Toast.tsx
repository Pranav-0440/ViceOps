import React, { useEffect, useState } from 'react';
import { ToastMessage } from '../types';
import { X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`toast toast-${toast.type} ${visible ? 'toast-visible' : ''}`}
      role="alert"
    >
      <span className="toast-message">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => onRemove(toast.id)}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
