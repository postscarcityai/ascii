/**
 * Particle type definitions and utilities
 */

import { theme } from './theme';

export interface Particle {
  x: number;
  y: number;
  vx: number;           // velocity x
  vy: number;           // velocity y
  char: string;         // ASCII character to display
  opacity: number;      // current opacity (0-1)
  targetOpacity: number; // target opacity
  size: number;         // font size multiplier
  color: string;        // color hex
  trail: { x: number; y: number }[];      // trail positions for flowing effect
  maxTrailLength: number;
  age: number;          // age in frames
  maxAge: number;       // lifetime in frames
  pulsePhase: number;   // for pulsing animation
}

export interface ParticleStream {
  id: string;
  particles: Particle[];
  direction: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  intensity: number;    // 0-1, controls particle density
  speed: number;        // base speed multiplier
  color?: string;
}

export const createParticle = (
  x: number,
  y: number,
  direction: ParticleStream['direction'],
  speed: number = 1
): Particle => {
  const angle = getDirectionAngle(direction);
  const velocity = speed * (0.5 + Math.random() * 0.5);
  
  const chars = theme.characters.blocks + theme.characters.symbols;
  const char = chars[Math.floor(Math.random() * chars.length)];
  
  const colors = [
    theme.colors.char.bright,
    theme.colors.char.medium,
    theme.colors.char.dim,
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return {
    x,
    y,
    vx: Math.cos(angle) * velocity,
    vy: Math.sin(angle) * velocity,
    char,
    opacity: 0,
    targetOpacity: 0.3 + Math.random() * 0.7,
    size: 0.8 + Math.random() * 0.4,
    color,
    trail: [],
    maxTrailLength: 5 + Math.floor(Math.random() * 10),
    age: 0,
    maxAge: 300 + Math.floor(Math.random() * 600),
    pulsePhase: Math.random() * Math.PI * 2,
  };
};

function getDirectionAngle(direction: ParticleStream['direction']): number {
  switch (direction) {
    case 'up':
      return -Math.PI / 2;
    case 'down':
      return Math.PI / 2;
    case 'left':
      return Math.PI;
    case 'right':
      return 0;
    case 'diagonal':
      return (Math.PI / 4) + (Math.random() * Math.PI / 2);
    default:
      return Math.random() * Math.PI * 2;
  }
}

export const updateParticle = (
  particle: Particle,
  width: number,
  height: number,
  deltaTime: number
): Particle => {
  // Update position
  particle.x += particle.vx * deltaTime;
  particle.y += particle.vy * deltaTime;
  
  // Update age
  particle.age += deltaTime;
  
  // Update pulse phase for subtle animation
  particle.pulsePhase += deltaTime * 0.02;
  
  // Update opacity with smooth interpolation
  const opacitySpeed = 0.05;
  particle.opacity += (particle.targetOpacity - particle.opacity) * opacitySpeed;
  
  // Add pulse effect
  const pulseAmount = Math.sin(particle.pulsePhase) * 0.1;
  particle.opacity += pulseAmount;
  particle.opacity = Math.max(0, Math.min(1, particle.opacity));
  
  // Update trail
  particle.trail.push({ x: particle.x, y: particle.y });
  if (particle.trail.length > particle.maxTrailLength) {
    particle.trail.shift();
  }
  
  // Wrap around screen edges
  if (particle.x < 0) particle.x = width;
  if (particle.x > width) particle.x = 0;
  if (particle.y < 0) particle.y = height;
  if (particle.y > height) particle.y = 0;
  
  return particle;
};

export const isParticleAlive = (particle: Particle): boolean => {
  return particle.age < particle.maxAge && particle.opacity > 0.05;
};

