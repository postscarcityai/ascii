/**
 * Letter mask utilities for Logo pattern
 */

// Simple 5x7 pixel font for block letters (scaled 2x for display)
const LETTER_HEIGHT = 7;
const LETTER_WIDTH = 5;
const LETTER_SPACING = 1; // Space between letters
const SCALE = 2; // Scale factor for 2x size

// Define letter shapes as bitmaps (5x7 grid)
const LETTERS: Record<string, boolean[][]> = {
  'H': [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
  ],
  'E': [
    [true, true, true, true, true],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, true],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, true],
  ],
  'A': [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
  ],
  'L': [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, true],
  ],
  'T': [
    [true, true, true, true, true],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
  ],
  'C': [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  'O': [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  'D': [
    [true, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, false],
  ],
  'S': [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, false],
    [false, true, true, true, false],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  'I': [
    [true, true, true, true, true],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [true, true, true, true, true],
  ],
  '3': [
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [true, true, true, true, true],
  ],
  '6': [
    [false, true, true, true, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  '0': [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
};

export const checkLetterMask = (
  col: number,
  row: number,
  cols: number,
  rows: number,
  text: string
): number => {
  // Scale up dimensions for 2x size
  const scaledLetterWidth = (LETTER_WIDTH + LETTER_SPACING) * SCALE;
  const scaledLetterHeight = LETTER_HEIGHT * SCALE;
  const totalWidth = text.length * scaledLetterWidth;
  const startX = (cols - totalWidth) / 2;
  const startY = (rows - scaledLetterHeight) / 2;
  
  // Check if position is within text bounds
  const relativeX = col - startX;
  const relativeY = row - startY;
  
  // Scale down coordinates to match bitmap size (divide by SCALE)
  const scaledRelativeY = relativeY / SCALE;
  const scaledRelativeYInt = Math.floor(scaledRelativeY);
  if (scaledRelativeYInt < 0 || scaledRelativeYInt >= LETTER_HEIGHT) {
    return 0; // Outside vertical bounds
  }
  
  // Find which letter this position corresponds to
  const letterIndex = Math.floor(relativeX / scaledLetterWidth);
  if (letterIndex < 0 || letterIndex >= text.length) {
    return 0; // Outside horizontal bounds
  }
  
  const letter = text[letterIndex];
  const letterBitmap = LETTERS[letter];
  
  if (!letterBitmap) {
    return 0; // Unknown letter
  }
  
  // Get position within the letter (scaled down)
  const letterLocalX = (relativeX - (letterIndex * scaledLetterWidth)) / SCALE;
  const letterLocalXInt = Math.floor(letterLocalX);
  if (letterLocalXInt < 0 || letterLocalXInt >= LETTER_WIDTH) {
    return 0; // In spacing between letters
  }
  
  // Ensure we have valid indices and the row exists
  if (!letterBitmap[scaledRelativeYInt] || letterBitmap[scaledRelativeYInt][letterLocalXInt] === undefined) {
    return 0; // Invalid index or missing data
  }
  
  // Check if this pixel is part of the letter
  const isLetterPixel = letterBitmap[scaledRelativeYInt][letterLocalXInt];
  
  if (isLetterPixel) {
    // Calculate mask strength - stronger in center of letter strokes
    // Use original coordinates for smoother gradient
    const distFromEdgeX = Math.min(letterLocalXInt, LETTER_WIDTH - 1 - letterLocalXInt);
    const distFromEdgeY = Math.min(scaledRelativeYInt, LETTER_HEIGHT - 1 - scaledRelativeYInt);
    const distFromEdge = Math.min(distFromEdgeX, distFromEdgeY);
    
    // Stronger mask strength for pixels closer to center of strokes
    return Math.max(0.5, 1 - (distFromEdge / 2));
  }
  
  return 0;
};

