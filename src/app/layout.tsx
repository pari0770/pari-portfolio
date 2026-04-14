import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/Cursor';
import DetailOverlay from '@/components/DetailOverlay';
import { ActiveProjectProvider } from '@/context/ActiveProjectContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Parinishtha',
  description: 'Portfolio — Product Designer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body
        style={{
          height: '100%',
          fontFamily: inter.style.fontFamily,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <ActiveProjectProvider>
          <Cursor />
          <DetailOverlay />
          {children}
        </ActiveProjectProvider>
      </body>
    </html>
  );
}
