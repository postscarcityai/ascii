/**
 * Data Stream Generator
 * Creates flowing data stream patterns for ASCII visualizations
 */

import { ParticleStream, Particle } from './particleTypes';

export interface StreamConfig {
  count: number;
  intensity: number;
  speed: number;
  color?: string;
}

export const generateDataStreams = (
  width: number,
  height: number
): ParticleStream[] => {
  const streams: ParticleStream[] = [];
  
  // Vertical streams (flowing down)
  for (let i = 0; i < 3; i++) {
    streams.push({
      id: `vertical-${i}`,
      particles: [],
      direction: 'down',
      intensity: 0.3 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 0.5,
      color: undefined, // Use default theme colors
    });
  }
  
  // Upward streams (counter-flow)
  for (let i = 0; i < 2; i++) {
    streams.push({
      id: `vertical-up-${i}`,
      particles: [],
      direction: 'up',
      intensity: 0.2 + Math.random() * 0.2,
      speed: 0.3 + Math.random() * 0.4,
      color: undefined,
    });
  }
  
  // Diagonal streams (flowing data)
  for (let i = 0; i < 2; i++) {
    streams.push({
      id: `diagonal-${i}`,
      particles: [],
      direction: 'diagonal',
      intensity: 0.25 + Math.random() * 0.25,
      speed: 0.4 + Math.random() * 0.6,
      color: undefined,
    });
  }
  
  // Horizontal streams (left to right)
  for (let i = 0; i < 2; i++) {
    streams.push({
      id: `horizontal-${i}`,
      particles: [],
      direction: 'right',
      intensity: 0.2 + Math.random() * 0.2,
      speed: 0.3 + Math.random() * 0.4,
      color: undefined,
    });
  }
  
  return streams;
};

export const spawnParticlesForStream = (
  stream: ParticleStream,
  width: number,
  height: number,
  frameCount: number
): void => {
  const spawnRate = 60 / (stream.intensity * 10 + 1); // particles per second
  const shouldSpawn = frameCount % Math.floor(spawnRate) === 0;
  
  if (!shouldSpawn) return;
  
  const spawnCount = Math.floor(stream.intensity * 3);
  
  for (let i = 0; i < spawnCount; i++) {
    const spawnX = Math.random() * width;
    const spawnY = Math.random() * height;
    
    // Adjust spawn position based on direction for better flow
    let x = spawnX;
    let y = spawnY;
    
    switch (stream.direction) {
      case 'down':
        y = -20; // Start above screen
        x = Math.random() * width;
        break;
      case 'up':
        y = height + 20; // Start below screen
        x = Math.random() * width;
        break;
      case 'right':
        x = -20; // Start left of screen
        y = Math.random() * height;
        break;
      case 'left':
        x = width + 20; // Start right of screen
        y = Math.random() * height;
        break;
      case 'diagonal':
        // Random edge position
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) {
          x = Math.random() * width;
          y = -20;
        } else if (edge === 1) {
          x = width + 20;
          y = Math.random() * height;
        } else if (edge === 2) {
          x = Math.random() * width;
          y = height + 20;
        } else {
          x = -20;
          y = Math.random() * height;
        }
        break;
    }
    
    // Store spawn position for later initialization
    // We'll create a marker object that ParticleSystem will recognize
    stream.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      char: '',
      opacity: 0,
      targetOpacity: 0,
      size: 1,
      color: '',
      trail: [],
      maxTrailLength: 0,
      age: 0,
      maxAge: 0,
      pulsePhase: 0,
    } as Particle);
  }
};

/**
 * Creates subtle pulse wave patterns (heartbeat-like rhythm)
 */
export const createPulseWave = (
  centerX: number,
  centerY: number,
  time: number,
  amplitude: number = 50
): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  const waveLength = 100;
  const segments = 20;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = centerX + Math.sin(t * Math.PI * 2) * amplitude;
    const y = centerY + Math.cos(t * Math.PI * 2) * amplitude * 
      (1 + Math.sin(time * 0.01) * 0.3);
    points.push({ x, y });
  }
  
  return points;
};

