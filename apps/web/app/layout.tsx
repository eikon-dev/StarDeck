import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Manrope } from 'next/font/google';
import '../src/app/globals.css';
import { cn } from '@/shared/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'StarDeck',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
        manrope.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
