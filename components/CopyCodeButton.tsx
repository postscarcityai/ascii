'use client';

import React, { useState } from 'react';
import styles from './CopyCodeButton.module.css';

interface CopyCodeButtonProps {
  onCopy: () => void;
}

export const CopyCodeButton: React.FC<CopyCodeButtonProps> = ({ onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${copied ? styles.copied : ''}`}
      onClick={handleClick}
      aria-label="Copy ASCII code"
    >
      <span className={styles.icon}>{copied ? '>' : '[]'}</span>
      <span className={styles.label}>{copied ? 'Copied!' : 'Copy Code'}</span>
    </button>
  );
};
