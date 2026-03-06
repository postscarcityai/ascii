'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Particle, ParticleStream, createParticle, updateParticle, isParticleAlive } from '../lib/particleTypes';
import { generateDataStreams, spawnParticlesForStream } from '../lib/dataStreamGenerator';
import { ASCIIRenderer } from './ASCIIRenderer';

interface ParticleSystemProps {
  width: number;
  height: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ width, height }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const streamsRef = useRef<ParticleStream[]>([]);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  // Initialize streams
  useEffect(() => {
    streamsRef.current = generateDataStreams(width, height);
  }, [width, height]);

  // Main animation loop
  useEffect(() => {
    if (width === 0 || height === 0) return;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16.67, 2);
      lastTimeRef.current = currentTime;

      frameCountRef.current += 1;

      // Spawn new particles for each stream
      streamsRef.current.forEach((stream) => {
        spawnParticlesForStream(stream, width, height, frameCountRef.current);
        
        // Initialize newly spawned particles (those with empty char are uninitialized)
        stream.particles = stream.particles.map((particle) => {
          if (particle.char === '' && particle.age === 0) {
            const initialized = createParticle(
              particle.x,
              particle.y,
              stream.direction,
              stream.speed
            );
            initialized.color = stream.color || initialized.color;
            return initialized;
          }
          return particle;
        });
      });

      // Update all particles
      setParticles(() => {
        const allParticles: Particle[] = [];

        streamsRef.current.forEach((stream) => {
          const updatedStreamParticles: Particle[] = [];
          
          stream.particles.forEach((particle) => {
            const updated = updateParticle(particle, width, height, deltaTime);
            if (isParticleAlive(updated)) {
              updatedStreamParticles.push(updated);
              allParticles.push(updated);
            }
          });
          
          stream.particles = updatedStreamParticles;
        });

        return allParticles.slice(0, 2000);
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return <ASCIIRenderer particles={particles} width={width} height={height} />;
};

