export interface PaletteColor {
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
}

export const COLOR_PALETTE: PaletteColor[] = [
  // Reds / Pinks
  { name: 'Crimson',    hex: '#DC143C', rgb: { r: 220, g: 20,  b: 60  } },
  { name: 'Rose',       hex: '#E91E63', rgb: { r: 233, g: 30,  b: 99  } },
  { name: 'Coral',      hex: '#FF6F61', rgb: { r: 255, g: 111, b: 97  } },
  { name: 'Blush',      hex: '#F48FB1', rgb: { r: 244, g: 143, b: 177 } },

  // Oranges / Ambers
  { name: 'Tangerine',  hex: '#FF6D00', rgb: { r: 255, g: 109, b: 0   } },
  { name: 'Amber',      hex: '#FFB300', rgb: { r: 255, g: 179, b: 0   } },
  { name: 'Peach',      hex: '#FFAB91', rgb: { r: 255, g: 171, b: 145 } },
  { name: 'Burnt Sienna', hex: '#E8711A', rgb: { r: 232, g: 113, b: 26  } },

  // Yellows / Golds
  { name: 'Gold',       hex: '#FFD600', rgb: { r: 255, g: 214, b: 0   } },
  { name: 'Sunflower',  hex: '#FDD835', rgb: { r: 253, g: 216, b: 53  } },
  { name: 'Lemon',      hex: '#FFF176', rgb: { r: 255, g: 241, b: 118 } },
  { name: 'Canary',     hex: '#FFEE58', rgb: { r: 255, g: 238, b: 88  } },

  // Greens
  { name: 'Emerald',    hex: '#2E7D32', rgb: { r: 46,  g: 125, b: 50  } },
  { name: 'Jade',       hex: '#00C853', rgb: { r: 0,   g: 200, b: 83  } },
  { name: 'Mint',       hex: '#69F0AE', rgb: { r: 105, g: 240, b: 174 } },
  { name: 'Sage',       hex: '#81C784', rgb: { r: 129, g: 199, b: 132 } },

  // Teals / Cyans
  { name: 'Teal',       hex: '#00897B', rgb: { r: 0,   g: 137, b: 123 } },
  { name: 'Cyan',       hex: '#00BCD4', rgb: { r: 0,   g: 188, b: 212 } },
  { name: 'Aqua',       hex: '#4DD0E1', rgb: { r: 77,  g: 208, b: 225 } },
  { name: 'Turquoise',  hex: '#26C6DA', rgb: { r: 38,  g: 198, b: 218 } },

  // Blues
  { name: 'Cobalt',     hex: '#1565C0', rgb: { r: 21,  g: 101, b: 192 } },
  { name: 'Azure',      hex: '#2979FF', rgb: { r: 41,  g: 121, b: 255 } },
  { name: 'Sky',        hex: '#4FC3F7', rgb: { r: 79,  g: 195, b: 247 } },
  { name: 'Periwinkle', hex: '#7986CB', rgb: { r: 121, g: 134, b: 203 } },

  // Purples / Violets
  { name: 'Indigo',     hex: '#5C6BC0', rgb: { r: 92,  g: 107, b: 192 } },
  { name: 'Violet',     hex: '#7C4DFF', rgb: { r: 124, g: 77,  b: 255 } },
  { name: 'Lavender',   hex: '#B39DDB', rgb: { r: 179, g: 157, b: 219 } },
  { name: 'Amethyst',   hex: '#AB47BC', rgb: { r: 171, g: 71,  b: 188 } },

  // Neutrals / Special
  { name: 'Slate',      hex: '#546E7A', rgb: { r: 84,  g: 110, b: 122 } },
  { name: 'Graphite',   hex: '#37474F', rgb: { r: 55,  g: 71,  b: 79  } },
  { name: 'Silver',     hex: '#90A4AE', rgb: { r: 144, g: 164, b: 174 } },
  { name: 'Obsidian',   hex: '#263238', rgb: { r: 38,  g: 50,  b: 56  } },
];

export const DEFAULT_COLORS: [number, number, number] = [16, 20, 24];
