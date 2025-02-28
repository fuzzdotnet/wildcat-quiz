import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import { QuizProvider } from '@/context/QuizContext';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Wildcat Personality Quiz | FUZZ',
  description: 'Discover which endangered wildcat matches your personality and learn how you can help protect these amazing animals.',
  openGraph: {
    title: 'Wildcat Personality Quiz | FUZZ',
    description: 'Discover which endangered wildcat matches your personality and learn how you can help protect these amazing animals.',
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
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <QuizProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </QuizProvider>
      </body>
    </html>
  );
} 