'use client';

import React, { useRef, useEffect } from 'react';
import { Particle } from '../lib/particleTypes';
import { theme } from '../lib/theme';

interface ASCIIRendererProps {
  particles: Particle[];
  width: number;
  height: number;
}

export const ASCIIRenderer: React.FC<ASCIIRendererProps> = ({
  particles,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas with transparent background
      ctx.fillStyle = theme.colors.background;
      ctx.fillRect(0, 0, width, height);

      // Draw particles with trails
      particles.forEach((particle) => {
        if (particle.opacity < 0.05) return;

        // Helper to convert hex color to rgba
        const hexToRgba = (hex: string, alpha: number): string => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        // Draw trail first (fading effect)
        particle.trail.forEach((trailPoint, index) => {
          const trailOpacity = (index / particle.trail.length) * particle.opacity * 0.3;
          ctx.fillStyle = hexToRgba(particle.color, trailOpacity);
          ctx.font = `${12 * particle.size}px 'Courier New', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.char, trailPoint.x, trailPoint.y);
        });

        // Draw main particle with glow effect
        const glowOpacity = particle.opacity * 0.3;
        
        // Outer glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = hexToRgba(particle.color, glowOpacity);
        
        // Main particle
        ctx.fillStyle = hexToRgba(particle.color, particle.opacity);
        ctx.font = `${14 * particle.size}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.char, particle.x, particle.y);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles, width, height]);

  return (
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
      }}
    />
  );
};

