'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AboutButton.module.css';

export const AboutButton: React.FC = () => {
  return (
    <Link href="/about" className={styles.button} aria-label="About ASCII">
      <span className={styles.icon}>?</span>
      <span className={styles.label}>About</span>
    </Link>
  );
};
