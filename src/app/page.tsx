'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { trackFBEvent } from '@/lib/analytics';

export default function Home() {
  const router = useRouter();

  const handleStartQuiz = () => {
    // Track quiz start event
    trackFBEvent('StartQuiz', {
      content_name: 'Wildcat Quiz',
      content_category: 'Quiz Start',
    });
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-800 mb-6">
              Which Rare Wildcat Is Your Secret Twin?
            </h1>
            
            <p className="text-lg md:text-xl text-primary-600 mb-8">
              Take this quick quiz to discover your wildcat twin and learn how to protect these amazing cats.
            </p>

            <button 
              onClick={handleStartQuiz}
              className="btn-primary inline-flex items-center text-lg mb-8"
            >
              Find My Wildcat Twin
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/landing/hero.jpg"
                alt="Majestic wildcat looking into the distance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>

            <p className="text-primary-700 mb-12">
              The world's wildcats face unprecedented threats, from habitat loss to poaching. By discovering which rare feline shares your personality traits, you'll forge a personal connection with conservation efforts. Take just 2 minutes to find your wildcat twin and discover how you can make a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 