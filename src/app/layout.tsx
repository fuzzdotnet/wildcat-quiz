import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google';
import { QuizProvider } from '@/context/QuizContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Discover Your Wildcat Match',
  description: 'Find out which endangered wildcat species shares your traits in this personality-matching quiz',
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
}

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