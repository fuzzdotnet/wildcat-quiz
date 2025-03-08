import '@/styles/globals.css'
import { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google';
import { QuizProvider } from '@/context/QuizContext';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FacebookPixel from '@/components/FacebookPixel';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Which Rare Wildcat Is Your Secret Twin?',
  description: 'Take this quiz to discover which rare wildcat shares your personality and learn how to help protect these amazing animals',
  metadataBase: new URL('http://catquiz.fuzz.net'),
  openGraph: {
    type: 'website',
    url: 'http://catquiz.fuzz.net',
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
  other: {
    'fb:app_id': '1234567890123456'
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
    <html lang="en" className="h-full">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; frame-src 'self' https://www.fuzz.net; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.facebook.com;"
        />
        <GoogleAnalytics />
        <FacebookPixel />
      </head>
      <body className={`${inter.variable} ${merriweather.variable} font-sans min-h-full flex flex-col`}>
        <QuizProvider>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
} 