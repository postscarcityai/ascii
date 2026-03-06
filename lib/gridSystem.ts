/**
 * Grid-based ASCII visualizer with falling character effect
 * Characters stay in fixed positions, creating illusion of motion through updates
 */

export interface GridCell {
  char: string;
  opacity: number;
  brightness: number; // 0-1 for intensity variation
  age: number; // How long this character has been displayed
}

export interface FallingStream {
  columnIndex: number;
  speed: number; // pixels per frame
  position: number; // Current position in column (in pixels)
  length: number; // Length of the stream
  chars: string[]; // Characters in this stream
  active: boolean;
}

export const createGrid = (
  width: number,
  height: number,
  charWidth: number = 8,
  charHeight: number = 16
): GridCell[][] => {
  const cols = Math.floor(width / charWidth);
  const rows = Math.floor(height / charHeight);
  
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({
      char: ' ',
      opacity: 0,
      brightness: 0,
      age: 0,
    }))
  );
};

export const getCharacterSet = (): string => {
  // Pure ASCII characters for data visualization - focus on alphanumeric and symbols
  return '0123456789ABCDEF0123456789abcdef0123456789ABCDEF!@#$%&*+-=[]{}|;:,.<>?/~`';
};

export const getRandomChar = (): string => {
  const chars = getCharacterSet();
  return chars[Math.floor(Math.random() * chars.length)];
};

