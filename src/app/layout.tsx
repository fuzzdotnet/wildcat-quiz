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
  title: 'Which Rare Wildcat Is Your Secret Twin?',
  description: 'Take this quiz to discover which rare wildcat shares your personality and learn how to help protect these amazing animals',
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    title: 'Which Rare Wildcat Is Your Secret Twin? 🐱',
    description: 'Discover your wildcat personality match and join the mission to protect these incredible endangered species. Take the quiz now!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rare Wildcat Quiz - Find Your Secret Twin'
      }
    ],
    locale: 'en_US',
    siteName: 'Wildcat Quiz'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Which Rare Wildcat Is Your Secret Twin? 🐱',
    description: 'Discover your wildcat personality match and join the mission to protect these incredible endangered species. Take the quiz now!',
    images: ['/og-image.jpg'],
    creator: '@fuzzdotnet'
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' }
    ],
  },
  manifest: '/manifest.json'
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