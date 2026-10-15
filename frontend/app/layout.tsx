import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContinuumAI — AI that remembers. Agents that continue.',
  description:
    'Graph-powered memory and coordination layer for multi-agent AI workflows, built for the WeMakeDevs × FalkorDB Hackathon (Track 2).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg text-text antialiased selection:bg-accent selection:text-bg">
        {children}
      </body>
    </html>
  );
}
