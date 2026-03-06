'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function About() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.backLink}>
          &larr; Back to visualizer
        </Link>

        <h1 className={styles.title}>ASCII</h1>
        <p className={styles.subtitle}>by PostScarcity AI</p>

        <section className={styles.section}>
          <h2 className={styles.heading}>What is this?</h2>
          <p>
            ASCII is an audio-reactive visualizer and art generator that runs
            entirely in your browser. It turns a blank page into a full-screen
            canvas of generative text art&mdash;26 patterns built from pure math,
            Unicode characters, and <code>requestAnimationFrame</code>.
          </p>
          <p>
            Pick a pattern. Choose up to three colors. Watch it breathe. The
            voice-reactive modes tap into your microphone and turn sound into
            flowing characters in real time.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Why does it exist?</h2>
          <p>
            PostScarcity AI builds open source tools that remove barriers. Each
            tool does one thing well and is designed to be forked, extended, and
            made your own.
          </p>
          <p>
            ASCII exists because generative art shouldn&rsquo;t require a GPU, a
            shader language, or a creative coding degree. A monospace font and a
            canvas element are enough. The patterns here are starting points&mdash;copy
            the code, paste it into your AI agent, and riff on it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>How it works</h2>
          <p>
            Every animation is a function that takes a grid size and a frame
            number, then returns a 2D array of characters. The renderer maps
            each character to a brightness value and paints it with your selected
            colors across three tiers: bright, mid, and dim. No animation
            libraries. No canvas frameworks. Just math.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Features</h2>
          <ul className={styles.list}>
            <li>26 generative patterns</li>
            <li>5 audio-reactive voice modes</li>
            <li>32-color palette with 3-color theming</li>
            <li>Copy any frame as text for use with AI agents</li>
            <li>Zero runtime dependencies beyond Next.js and React</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Open Source</h2>
          <p>
            ASCII is released under the{' '}
            <a
              href="https://github.com/postscarcityai/ascii/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              MIT License
            </a>
            . Fork it, break it, make it yours.
          </p>
          <p>
            <a
              href="https://github.com/postscarcityai/ascii"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              github.com/postscarcityai/ascii
            </a>
          </p>
        </section>

        <footer className={styles.footer}>
          <p>PostScarcity AI &middot; Unlock Abundance.</p>
        </footer>
      </div>
    </main>
  );
}
