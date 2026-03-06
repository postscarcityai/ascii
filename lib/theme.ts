/**
 * ASCII theme - PostScarcity AI
 * Clean, transparent, light aesthetic with configurable accent colors
 */

export const theme = {
  colors: {
    // Light blue-green accent colors
    primary: '#5fb3b3',      // Light blue-green
    secondary: '#6bcccc',   // Lighter blue-green
    accent: '#4a9fa0',      // Deeper blue-green
    
    // Background (white/light)
    background: '#ffffff',
    backgroundGlow: 'rgba(95, 179, 179, 0.05)',
    
    // Character colors (light theme)
    char: {
      bright: '#5fb3b3',
      medium: '#6bcccc',
      dim: '#4a9fa0',
      faint: '#8fd3d3',
    },
    
    // Glow effects
    glow: {
      intense: 'rgba(95, 179, 179, 0.6)',
      medium: 'rgba(95, 179, 179, 0.3)',
      subtle: 'rgba(95, 179, 179, 0.1)',
    },
    
    // Scan line effect (subtle for light theme)
    scanline: 'rgba(95, 179, 179, 0.1)',
    
    // UI colors
    ui: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '#5fb3b3',
      text: '#2c5f5f',
      hover: '#6bcccc',
    },
  },
  
  // Animation timing
  animation: {
    pulse: {
      duration: 3000,
      easing: 'ease-in-out',
    },
  },
  
  // Character set for retro feel
  characters: {
    // Block characters and geometric shapes
    blocks: '█▓▒░▄▀▐▌',
    // Lines and borders
    lines: '─│┼├┤┬┴┌┐└┘',
    // Dots and patterns
    dots: '·•○●',
    // Symbols
    symbols: '*+=×÷±',
  },
} as const;

export type Theme = typeof theme;
