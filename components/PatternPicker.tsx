'use client';

import React from 'react';
import styles from './PatternPicker.module.css';

interface PatternPickerProps {
  selectedPattern: number;
  onPatternChange: (patternIndex: number) => void;
  patterns: string[];
}

export const PatternPicker: React.FC<PatternPickerProps> = ({
  selectedPattern,
  onPatternChange,
  patterns,
}) => {
  return (
    <div className={styles.picker}>
      <div className={styles.label}>Pattern:</div>
      <div className={styles.buttons}>
        {patterns.map((pattern, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.button} ${selectedPattern === index ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Pattern button clicked:', index, pattern);
              onPatternChange(index);
            }}
            title={pattern}
          >
            {pattern}
          </button>
        ))}
      </div>
    </div>
  );
};

