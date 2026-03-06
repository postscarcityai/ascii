'use client';

import React, { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  detail?: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  detail,
  visible,
  onDismiss,
  duration = 4000,
}) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [visible, onDismiss, duration]);

  if (!visible) return null;

  return (
    <div className={styles.toast} onClick={onDismiss} role="status">
      <div className={styles.message}>{message}</div>
      {detail && <div className={styles.detail}>{detail}</div>}
    </div>
  );
};
