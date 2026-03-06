'use client';

import React, { useState } from 'react';
import { COLOR_PALETTE, PaletteColor } from '../lib/colorPalette';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  selectedIndices: number[];
  onColorsChange: (indices: number[]) => void;
}

const MAX_SELECTIONS = 3;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedIndices,
  onColorsChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getSelectionOrder = (index: number): number => {
    const pos = selectedIndices.indexOf(index);
    return pos === -1 ? -1 : pos + 1;
  };

  const handleSwatchClick = (index: number) => {
    const existing = selectedIndices.indexOf(index);

    if (existing !== -1) {
      onColorsChange(selectedIndices.filter((i) => i !== index));
      return;
    }

    if (selectedIndices.length < MAX_SELECTIONS) {
      onColorsChange([...selectedIndices, index]);
    } else {
      onColorsChange([...selectedIndices.slice(1), index]);
    }
  };

  const previewColors = selectedIndices.map((i) => COLOR_PALETTE[i]);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setExpanded((prev) => !prev)}
        aria-label={expanded ? 'Collapse color picker' : 'Expand color picker'}
      >
        <span className={styles.toggleLabel}>Colors</span>
        <span className={styles.previewDots}>
          {previewColors.map((c: PaletteColor, i: number) => (
            <span
              key={i}
              className={styles.previewDot}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </span>
        <span className={styles.chevron}>{expanded ? '▾' : '▴'}</span>
      </button>

      {expanded && (
        <div className={styles.panel}>
          <div className={styles.grid}>
            {COLOR_PALETTE.map((color, index) => {
              const order = getSelectionOrder(index);
              return (
                <button
                  key={color.name}
                  type="button"
                  className={`${styles.swatch} ${order > 0 ? styles.selected : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleSwatchClick(index)}
                  title={color.name}
                  aria-label={`${color.name}${order > 0 ? ` (selected ${order})` : ''}`}
                >
                  {order > 0 && <span className={styles.badge}>{order}</span>}
                </button>
              );
            })}
          </div>
          <div className={styles.hint}>
            Pick up to 3 colors to theme the animations
          </div>
        </div>
      )}
    </div>
  );
};
