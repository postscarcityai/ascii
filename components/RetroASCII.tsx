'use client';

import React, { useRef, useEffect, useState } from 'react';
import { generateCascade, generateDotField, generateVoice1, generateVoice2, generateVoice3, generateVoice4, generateVoice5, generateDotField2, generateDigitalFog, generateDigitalFog2, generateDigitalFog3, generateSoftWaves, generateGentleRipple, generateLightCloud, generateGentleMist, generateSubtleStream, generateLightDrift, generateLogo, generateWaveDepth, generateRadialWaveField, generateInterferenceWaves, generateDataGridFlow, generateCircuitBoard, generateElectricPulse, generateCurrentFlow, generateNeuralNetwork } from '../lib/lightPatterns';
import { useAudio } from '../lib/useAudio';
import { theme } from '../lib/theme';
import { PaletteColor } from '../lib/colorPalette';
import { PatternPicker } from './PatternPicker';

interface RetroASCIIProps {
  width: number;
  height: number;
  colors: PaletteColor[];
  gridRef?: React.MutableRefObject<string[][] | null>;
  patternIndexRef?: React.MutableRefObject<number>;
}

export const PATTERN_NAMES = [
  'Cascade',
  'Voice 1',
  'Voice 2',
  'Voice 3',
  'Voice 4',
  'Voice 5',
  'Dot Field',
  'Dot Field 2',
  'Digital Fog',
  'Digital Fog 2',
  'Digital Fog 3',
  'Soft Waves',
  'Gentle Ripple',
  'Light Cloud',
  'Gentle Mist',
  'Subtle Stream',
  'Light Drift',
  'Logo',
  'Wave Depth',
  'Radial Wave Field',
  'Interference Waves',
  'Starry Night',
  'Quasar Field',
  'Nebula Drift',
  'Cosmic Dust',
  'Stellar Nursery',
];

function resolveColor(
  brightness: number,
  colors: PaletteColor[]
): { r: number; g: number; b: number } {
  if (colors.length === 0) return { r: 95, g: 179, b: 179 };
  if (colors.length === 1) return colors[0].rgb;

  if (colors.length === 2) {
    return brightness > 0.55 ? colors[0].rgb : colors[1].rgb;
  }

  if (brightness > 0.65) return colors[0].rgb;
  if (brightness > 0.4) return colors[1].rgb;
  return colors[2].rgb;
}

export const RetroASCII: React.FC<RetroASCIIProps> = ({ width, height, colors, gridRef, patternIndexRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [selectedPattern, setSelectedPattern] = useState<number>(0);
  const selectedPatternRef = useRef<number>(0);
  const colorsRef = useRef<PaletteColor[]>(colors);

  const isVoicePatternSelected = selectedPattern >= 1 && selectedPattern <= 5;
  const { audioData, isAccessGranted, error } = useAudio(isVoicePatternSelected);

  const audioDataRef = useRef(audioData);
  useEffect(() => {
    audioDataRef.current = audioData;
  }, [audioData]);

  useEffect(() => {
    selectedPatternRef.current = selectedPattern;
    if (patternIndexRef) patternIndexRef.current = selectedPattern;
  }, [selectedPattern, patternIndexRef]);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  const CHAR_WIDTH = 6;
  const CHAR_HEIGHT = 10;
  const COLS = Math.floor(width / CHAR_WIDTH);
  const ROWS = Math.floor(height / CHAR_HEIGHT);

  useEffect(() => {
    if (width === 0 || height === 0 || COLS === 0 || ROWS === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 16.67;
      lastTimeRef.current = currentTime;
      frameRef.current += deltaTime;

      ctx.fillStyle = theme.colors.background;
      ctx.fillRect(0, 0, width, height);

      const currentPattern = selectedPatternRef.current;
      let combined: string[][];

      switch (currentPattern) {
        case 0:  combined = generateCascade(COLS, ROWS, frameRef.current); break;
        case 1:  combined = generateVoice1(COLS, ROWS, frameRef.current, audioDataRef.current); break;
        case 2:  combined = generateVoice2(COLS, ROWS, frameRef.current, audioDataRef.current); break;
        case 3:  combined = generateVoice3(COLS, ROWS, frameRef.current, audioDataRef.current); break;
        case 4:  combined = generateVoice4(COLS, ROWS, frameRef.current, audioDataRef.current); break;
        case 5:  combined = generateVoice5(COLS, ROWS, frameRef.current, audioDataRef.current); break;
        case 6:  combined = generateDotField(COLS, ROWS, frameRef.current); break;
        case 7:  combined = generateDotField2(COLS, ROWS, frameRef.current); break;
        case 8:  combined = generateDigitalFog(COLS, ROWS, frameRef.current); break;
        case 9:  combined = generateDigitalFog2(COLS, ROWS, frameRef.current); break;
        case 10: combined = generateDigitalFog3(COLS, ROWS, frameRef.current); break;
        case 11: combined = generateSoftWaves(COLS, ROWS, frameRef.current); break;
        case 12: combined = generateGentleRipple(COLS, ROWS, frameRef.current); break;
        case 13: combined = generateLightCloud(COLS, ROWS, frameRef.current); break;
        case 14: combined = generateGentleMist(COLS, ROWS, frameRef.current); break;
        case 15: combined = generateSubtleStream(COLS, ROWS, frameRef.current); break;
        case 16: combined = generateLightDrift(COLS, ROWS, frameRef.current); break;
        case 17: combined = generateLogo(COLS, ROWS, frameRef.current); break;
        case 18: combined = generateWaveDepth(COLS, ROWS, frameRef.current); break;
        case 19: combined = generateRadialWaveField(COLS, ROWS, frameRef.current); break;
        case 20: combined = generateInterferenceWaves(COLS, ROWS, frameRef.current); break;
        case 21: combined = generateDataGridFlow(COLS, ROWS, frameRef.current); break;
        case 22: combined = generateCircuitBoard(COLS, ROWS, frameRef.current); break;
        case 23: combined = generateElectricPulse(COLS, ROWS, frameRef.current); break;
        case 24: combined = generateCurrentFlow(COLS, ROWS, frameRef.current); break;
        case 25: combined = generateNeuralNetwork(COLS, ROWS, frameRef.current); break;
        default: combined = generateCascade(COLS, ROWS, frameRef.current);
      }

      if (gridRef) gridRef.current = combined;

      ctx.font = `${CHAR_HEIGHT}px 'Courier New', 'Courier', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.save();

      const pulse = 0.85 + Math.sin(frameRef.current * 0.01) * 0.15;
      const activeColors = colorsRef.current;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const char = combined[row][col];
          if (char === ' ') continue;

          const x = col * CHAR_WIDTH + CHAR_WIDTH / 2;
          const y = row * CHAR_HEIGHT + CHAR_HEIGHT / 2;

          let brightness = 0.6;
          if (char === '█') brightness = 0.15;
          else if (char === '▓') brightness = 0.25;
          else if (char === '▒') brightness = 0.35;
          else if (char === '░') brightness = 0.55;
          else if (char === '·') brightness = 0.45;
          else if (char === '•') brightness = 0.52;
          else if (char === '◦') brightness = 0.55;
          else if (char === '○') brightness = 0.58;
          else if (char === '●') brightness = 0.65;
          else if (char === '*') brightness = 0.72;
          else if (char === '+') brightness = 0.75;
          else if (char === '×') brightness = 0.78;
          else brightness = 0.58;

          if (char === '█' || char === '▓' || char === '▒') {
            brightness *= (0.9 + pulse * 0.1);
          } else {
            brightness *= pulse;
          }
          brightness = Math.max(0.1, brightness);

          const { r, g, b } = resolveColor(brightness, activeColors);
          const alpha = brightness;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

          if (brightness > 0.6) {
            ctx.shadowBlur = Math.max(1, brightness * 3);
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`;
          } else if (brightness > 0.5) {
            ctx.shadowBlur = brightness * 2;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
          } else {
            ctx.shadowBlur = brightness * 1;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`;
          }

          ctx.fillText(char, x, y);
        }
      }

      ctx.restore();

      const primaryC = activeColors[0]?.rgb ?? { r: 95, g: 179, b: 179 };
      ctx.fillStyle = `rgba(${primaryC.r}, ${primaryC.g}, ${primaryC.b}, 0.1)`;
      const scanLineY = Math.floor((frameRef.current * 2) % CHAR_HEIGHT);
      ctx.fillRect(0, scanLineY, width, 1);
      ctx.fillRect(0, scanLineY + CHAR_HEIGHT, width, 1);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [width, height, COLS, ROWS]);

  return (
    <>
      {isVoicePatternSelected && error && (
        <div className="toast toast--error">
          Oops, we need your mic for this one! {error}
        </div>
      )}
      {isVoicePatternSelected && !isAccessGranted && !error && (
        <div className="toast toast--info">
          Tuning into your frequency...
        </div>
      )}
      <PatternPicker
        selectedPattern={selectedPattern}
        onPatternChange={setSelectedPattern}
        patterns={PATTERN_NAMES}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          imageRendering: 'pixelated',
          pointerEvents: 'none',
        }}
      />
    </>
  );
};
