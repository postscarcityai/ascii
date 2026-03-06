/**
 * Retro ASCII art patterns for 80s monitor aesthetic
 */

export interface ASCIIPattern {
  width: number;
  height: number;
  data: string[][];
  animationFrame: number;
}

export const createGrid = (
  cols: number,
  rows: number
): string[][] => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(' ')
  );
};

export const generateWavePattern = (
  cols: number,
  rows: number,
  frame: number,
  amplitude: number = 10
): string[][] => {
  const grid = createGrid(cols, rows);
  const centerY = rows / 2;
  const frequency = 0.1;
  
  for (let x = 0; x < cols; x++) {
    const y = centerY + Math.sin((x * frequency) + (frame * 0.05)) * amplitude;
    const yPos = Math.floor(y);
    
    if (yPos >= 0 && yPos < rows) {
      grid[yPos][x] = '─';
    }
    
    // Add harmonics
    for (let i = 1; i <= 3; i++) {
      const harmonicY = centerY + Math.sin((x * frequency * i) + (frame * 0.05 * i)) * (amplitude / i);
      const harmonicYPos = Math.floor(harmonicY);
      if (harmonicYPos >= 0 && harmonicYPos < rows) {
        grid[harmonicYPos][x] = i === 1 ? '·' : ' ';
      }
    }
  }
  
  return grid;
};

export const generateCircularPattern = (
  cols: number,
  rows: number,
  frame: number,
  centerX?: number,
  centerY?: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const cx = centerX ?? cols / 2;
  const cy = centerY ?? rows / 2;
  const radius = 15 + Math.sin(frame * 0.02) * 5;
  
  for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    const xPos = Math.floor(x);
    const yPos = Math.floor(y);
    
    if (xPos >= 0 && xPos < cols && yPos >= 0 && yPos < rows) {
      const charIndex = Math.floor((angle / (Math.PI * 2)) * 8);
      const chars = ['─', '╱', '│', '╲', '─', '╱', '│', '╲'];
      grid[yPos][xPos] = chars[charIndex % chars.length];
    }
  }
  
  return grid;
};

export const generateGeometricPattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const centerX = cols / 2;
  const centerY = rows / 2;
  
  // Draw multiple concentric shapes
  for (let i = 1; i <= 5; i++) {
    const size = 5 + i * 3 + Math.sin(frame * 0.03 + i) * 2;
    
    // Square pattern
    const offset = (frame * 0.1) % (Math.PI * 2);
    for (let j = 0; j < 4; j++) {
      const angle = (Math.PI / 2) * j + offset;
      const startX = centerX + Math.cos(angle) * size;
      const startY = centerY + Math.sin(angle) * size;
      const endX = centerX + Math.cos(angle + Math.PI / 2) * size;
      const endY = centerY + Math.sin(angle + Math.PI / 2) * size;
      
      drawLine(grid, startX, startY, endX, endY, '█');
    }
  }
  
  return grid;
};

export const generateCircuitPattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  
  // Draw circuit-like paths
  const paths = [
    { start: { x: 10, y: 10 }, end: { x: cols - 10, y: 10 }, pulse: frame * 0.05 },
    { start: { x: 10, y: rows - 10 }, end: { x: cols - 10, y: rows - 10 }, pulse: frame * 0.05 + 1 },
    { start: { x: 10, y: 10 }, end: { x: 10, y: rows - 10 }, pulse: frame * 0.05 + 0.5 },
    { start: { x: cols - 10, y: 10 }, end: { x: cols - 10, y: rows - 10 }, pulse: frame * 0.05 + 1.5 },
  ];
  
  paths.forEach((path, index) => {
    const steps = Math.max(Math.abs(path.end.x - path.start.x), Math.abs(path.end.y - path.start.y));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pulse = Math.sin(path.pulse + i * 0.1) > 0 ? '█' : '▓';
      const x = Math.floor(path.start.x + (path.end.x - path.start.x) * t);
      const y = Math.floor(path.start.y + (path.end.y - path.start.y) * t);
      
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        grid[y][x] = pulse;
      }
    }
  });
  
  return grid;
};

function drawLine(
  grid: string[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  char: string
): void {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  
  let x = x1;
  let y = y1;
  
  while (true) {
    const xPos = Math.floor(x);
    const yPos = Math.floor(y);
    
    if (xPos >= 0 && xPos < grid[0].length && yPos >= 0 && yPos < grid.length) {
      grid[yPos][xPos] = char;
    }
    
    if (x === x2 && y === y2) break;
    
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

export const combinePatterns = (
  patterns: string[][][]
): string[][] => {
  if (patterns.length === 0) return createGrid(1, 1);
  
  const cols = patterns[0][0].length;
  const rows = patterns[0].length;
  const result = createGrid(cols, rows);
  
  patterns.forEach((pattern) => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (pattern[y][x] !== ' ') {
          result[y][x] = pattern[y][x];
        }
      }
    }
  });
  
  return result;
};

