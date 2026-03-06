import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ASCII | PostScarcity AI',
    template: '%s | ASCII',
  },
  description: 'Audio-reactive ASCII visualizer and art generator',
  authors: [{ name: 'PostScarcity AI', url: 'https://github.com/postscarcityai' }],
  openGraph: {
    title: 'ASCII | PostScarcity AI',
    description: 'Audio-reactive ASCII visualizer and art generator. 26 patterns, 32 colors, zero dependencies.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
