# ASCII

Audio-reactive ASCII visualizer and art generator. Built with Next.js.

ASCII turns your browser into a full-screen canvas of generative text art. Pick a pattern, choose your colors, and watch it move. Voice-reactive patterns respond to your microphone in real time.

## Features

- **26 generative patterns** -- cascading code, wave fields, dot grids, neural networks, cosmic dust, and more
- **Audio-reactive modes** -- 5 voice patterns that respond to microphone input
- **32-color palette** -- pick up to 3 colors to theme the animations across brightness tiers
- **Copy Code** -- snapshot any frame as ASCII text and paste it into your AI agent of choice
- **Zero dependencies beyond Next.js** -- no animation libraries, no canvas frameworks, pure math and `requestAnimationFrame`

## Getting Started

```bash
git clone https://github.com/postscarcityai/ascii.git
cd ascii
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

Every pattern is a generator function that returns a 2D grid of characters. The canvas renderer maps each character to a brightness value, then applies the user's selected color palette across three tiers:

| Tier | Brightness | Role |
|------|-----------|------|
| Color 1 | > 0.65 | Brightest characters |
| Color 2 | 0.4 - 0.65 | Mid-range characters |
| Color 3 | < 0.4 | Dim characters and glow |

If fewer than 3 colors are selected, the available colors distribute across all tiers automatically.

## Project Structure

```
app/
  layout.tsx          Root layout and metadata
  page.tsx            Main page -- manages color state, renders visualizer
  about/
    page.tsx          About page
components/
  RetroASCII.tsx      Canvas renderer and pattern switch
  PatternPicker.tsx   Bottom bar for selecting patterns
  ColorPicker.tsx     Color palette UI (32 swatches, max 3)
  CopyCodeButton.tsx  Top-right button to copy current frame
  Toast.tsx           Auto-dismissing notification
lib/
  lightPatterns.ts    All 26 pattern generator functions
  colorPalette.ts     32 named colors with hex and RGB values
  letterMask.ts       Bitmap font for the Logo pattern
  theme.ts            Base theme tokens
  useAudio.ts         Microphone access hook for voice patterns
```

## Color Palette

32 colors organized in 8 groups: reds, oranges, yellows, greens, teals, blues, purples, and neutrals. The selected colors update CSS custom properties globally, keeping the UI chrome in sync with the animation.

## Copy Code

The **Copy Code** button in the top-right snapshots the current ASCII frame as plain text, packages it with the pattern name and color info, and copies it to your clipboard. Paste it into any AI agent to recreate, remix, or build on the animation.

## Tech

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18
- TypeScript
- Canvas API
- Web Audio API (microphone input)

## License

[MIT](LICENSE)
