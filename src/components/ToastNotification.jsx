import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let toastClass = 'toast-success';
        let iconColor = '#10B981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          toastClass = 'toast-error';
          iconColor = '#EF4444';
        } else if (toast.type === 'info') {
          Icon = Info;
          toastClass = 'toast-info';
          iconColor = '#6C2BD9';
        }

        return (
          <div key={toast.id} className={`toast-item ${toastClass}`}>
            <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '0.88rem' }}>{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              style={{ color: '#A09DAE', padding: '2px', marginLeft: '0.5rem' }}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastNotification;
