'use client';

import React, { useRef, useEffect, useState } from 'react';
import { GridCell, createGrid, getRandomChar } from '../lib/gridSystem';
import { theme } from '../lib/theme';

interface ASCIIGridProps {
  width: number;
  height: number;
}

export const ASCIIGrid: React.FC<ASCIIGridProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<GridCell[][]>([]);
  const streamRefsRef = useRef<Array<{ column: number; head: number; speed: number; length: number }>>([]);
  const lastTimeRef = useRef<number>(0);
  
  const CHAR_WIDTH = 10;
  const CHAR_HEIGHT = 18;
  const COLS = Math.floor(width / CHAR_WIDTH);
  const ROWS = Math.floor(height / CHAR_HEIGHT);

  // Initialize grid
  useEffect(() => {
    if (width === 0 || height === 0) return;
    
    gridRef.current = createGrid(width, height, CHAR_WIDTH, CHAR_HEIGHT);
    
    // Initialize streams - multiple interweaving streams
    streamRefsRef.current = [];
    const streamCount = Math.floor(COLS * 0.4); // 40% of columns have streams
    
    // Create interweaving pattern - alternate columns for better visual effect
    const usedColumns = new Set<number>();
    
    for (let i = 0; i < streamCount; i++) {
      let column: number;
      let attempts = 0;
      
      // Try to find a column that's not adjacent to another stream
      do {
        column = Math.floor(Math.random() * COLS);
        attempts++;
      } while (usedColumns.has(column) && attempts < 50);
      
      usedColumns.add(column);
      
      const speed = 0.8 + Math.random() * 1.2;
      const length = 15 + Math.floor(Math.random() * 25);
      const head = -length - Math.floor(Math.random() * ROWS * 2); // Start above screen
      
      streamRefsRef.current.push({ column, head, speed, length });
    }
  }, [width, height, COLS, ROWS]);

  // Animation loop
  useEffect(() => {
    if (width === 0 || height === 0 || COLS === 0 || ROWS === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16.67, 2);
      lastTimeRef.current = currentTime;

      // Update streams
      streamRefsRef.current.forEach((stream) => {
        stream.head += stream.speed * deltaTime;
        
        // Reset stream when it goes off screen
        if (stream.head > ROWS + stream.length) {
          stream.head = -stream.length - Math.floor(Math.random() * ROWS * 1.5);
          stream.speed = 0.8 + Math.random() * 1.2;
          stream.length = 15 + Math.floor(Math.random() * 25); // Vary length
        }
      });

      // Update grid cells
      const grid = gridRef.current;
      
      // Fade out grid cells gradually
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cell = grid[row][col];
          if (cell.age > 0) {
            // Only fade if cell hasn't been updated recently
            cell.opacity *= 0.92; // Faster fade for smoother effect
            cell.brightness *= 0.92;
          }
          cell.age += deltaTime;
        }
      }

      // Update streams
      streamRefsRef.current.forEach((stream) => {
        const column = stream.column;
        
        // Update cells in this stream
        for (let i = 0; i < stream.length; i++) {
          const rowIndex = Math.floor(stream.head + i);
          
          if (rowIndex >= 0 && rowIndex < ROWS && column >= 0 && column < COLS) {
            const cell = grid[rowIndex][column];
            
            // Calculate brightness based on position in stream
            const positionInStream = i / stream.length;
            const brightness = 1 - positionInStream; // Head is brightest
            
            cell.char = getRandomChar();
            cell.opacity = Math.min(1, brightness + 0.3);
            cell.brightness = brightness;
            cell.age = 0;
          }
        }
      });

      // Render grid
      ctx.fillStyle = theme.colors.background;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${CHAR_HEIGHT}px 'Courier New', 'Courier', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cell = grid[row][col];
          
          if (cell.opacity < 0.05) continue;

          const x = col * CHAR_WIDTH + CHAR_WIDTH / 2;
          const y = row * CHAR_HEIGHT + CHAR_HEIGHT / 2;

          // Calculate color based on brightness
          const intensity = cell.brightness;
          const alpha = cell.opacity;
          
          // Interweaving colors - alternate between green and cyan based on column
          const colorIndex = Math.floor(col / 3) % 2;
          const baseColor = colorIndex === 0
            ? theme.colors.char.bright 
            : theme.colors.char.medium;

          const r = parseInt(baseColor.slice(1, 3), 16);
          const g = parseInt(baseColor.slice(3, 5), 16);
          const b = parseInt(baseColor.slice(5, 7), 16);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * intensity})`;
          
          // Add glow effect for brighter characters
          if (cell.brightness > 0.7) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * intensity * 0.5})`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(cell.char, x, y);
          ctx.shadowBlur = 0;
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [width, height, COLS, ROWS]);

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

