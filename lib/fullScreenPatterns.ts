/**
 * Full-screen ASCII patterns for retro CRT display
 */

export const createGrid = (
  cols: number,
  rows: number
): string[][] => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(' ')
  );
};

export const generateTiledPattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const tileSize = 8;
  const pulse = Math.sin(frame * 0.02);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tileX = Math.floor(col / tileSize);
      const tileY = Math.floor(row / tileSize);
      const localX = col % tileSize;
      const localY = row % tileSize;
      
      // Create a checkerboard-like pattern that pulses
      const isEven = (tileX + tileY) % 2 === 0;
      const dist = Math.sqrt(Math.pow(localX - tileSize/2, 2) + Math.pow(localY - tileSize/2, 2));
      const maxDist = tileSize / 2;
      
      if (dist < maxDist * (0.3 + pulse * 0.2)) {
        const charIndex = Math.floor((dist / maxDist) * 4);
        const chars = ['█', '▓', '▒', '░'];
        grid[row][col] = chars[charIndex] || '·';
      } else if (isEven && dist < maxDist * 0.8) {
        grid[row][col] = '·';
      }
    }
  }
  
  return grid;
};

export const generateGridPattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const spacing = 6;
  const offset = Math.floor(frame * 0.5) % spacing;
  
  // Horizontal lines
  for (let row = offset; row < rows; row += spacing) {
    for (let col = 0; col < cols; col++) {
      grid[row][col] = '─';
    }
  }
  
  // Vertical lines
  for (let col = offset; col < cols; col += spacing) {
    for (let row = 0; row < rows; row++) {
      if (grid[row][col] === ' ') {
        grid[row][col] = '│';
      } else {
        grid[row][col] = '┼';
      }
    }
  }
  
  return grid;
};

export const generateWaveField = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const frequency = 0.15;
  const amplitude = 3;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Multiple overlapping waves
      const wave1 = Math.sin((col * frequency) + (frame * 0.05));
      const wave2 = Math.sin((row * frequency) + (frame * 0.05));
      const wave3 = Math.sin(((col + row) * frequency * 0.7) + (frame * 0.05));
      
      const combined = (wave1 + wave2 + wave3) / 3;
      const intensity = (combined + 1) / 2; // Normalize to 0-1
      
      if (intensity > 0.3) {
        const charIndex = Math.floor(intensity * 4);
        const chars = ['░', '▒', '▓', '█'];
        grid[row][col] = chars[charIndex] || '·';
      }
    }
  }
  
  return grid;
};

export const generateMoirePattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const centerX = cols / 2;
  const centerY = rows / 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dx = col - centerX;
      const dy = row - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Create concentric circles with rotation
      const angle1 = Math.atan2(dy, dx) + (frame * 0.01);
      const angle2 = Math.atan2(dy, dx) - (frame * 0.01);
      
      const radius1 = dist * 0.1 + Math.sin(angle1 * 5) * 2;
      const radius2 = dist * 0.1 + Math.cos(angle2 * 5) * 2;
      
      const pattern = Math.sin(radius1) * Math.cos(radius2);
      const intensity = (pattern + 1) / 2;
      
      if (intensity > 0.4) {
        const charIndex = Math.floor(intensity * 3);
        const chars = ['▒', '▓', '█'];
        grid[row][col] = chars[charIndex] || '·';
      }
    }
  }
  
  return grid;
};

export const generateScatterPattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const density = 0.5; // Higher density for all-over pattern
  const cellSize = 2; // Smaller cells for tinier particles
  
  // Create upward-flowing pattern - subtract from row to make it flow UP
  const verticalSpeed = frame * 0.2; // Slower, calmer movement
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate upward flow by subtracting verticalSpeed from row
      const upwardRow = row - verticalSpeed;
      
      // Create a consistent hash-based pattern that flows upward
      const baseHash = ((col * 73) + Math.floor(upwardRow / cellSize) * 97) % 100;
      const intensity = (baseHash / 100);
      
      // Add very subtle horizontal variation for consistency
      const horizontalVariation = Math.sin((col * 0.08) + (frame * 0.015)) * 0.08;
      const finalIntensity = intensity + horizontalVariation;
      
      if (finalIntensity > density) {
        // Tinier particles - use lighter characters
        const charIndex = Math.floor((finalIntensity - density) / (1 - density) * 4);
        const chars = ['·', '░', '▒', '▓']; // Starting with tiny dot
        grid[row][col] = chars[charIndex] || ' ';
      }
    }
  }
  
  return grid;
};

export const generateScanlinePattern = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const lineHeight = 3;
  const speed = frame * 0.5;
  
  for (let row = 0; row < rows; row++) {
    const lineIndex = Math.floor(row / lineHeight);
    const phase = (lineIndex + speed) % 4;
    
    for (let col = 0; col < cols; col++) {
      const pattern = Math.sin((col * 0.2) + phase) > 0.5;
      if (pattern) {
        const intensity = (Math.sin((col * 0.2) + phase) + 1) / 2;
        const charIndex = Math.floor(intensity * 3);
        const chars = ['░', '▒', '▓'];
        grid[row][col] = chars[charIndex];
      }
    }
  }
  
  return grid;
};

