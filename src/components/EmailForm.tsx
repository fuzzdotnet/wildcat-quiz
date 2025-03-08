'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WildcatResult } from '@/types/quiz';
import { trackFBEvent } from '@/lib/analytics';

interface EmailFormProps {
  onSubmit: (email: string, newsletterOptIn: boolean) => void;
  onSkip: () => void;
  result: WildcatResult;
}

export default function EmailForm({ onSubmit, onSkip, result }: EmailFormProps) {
  const [embedLoaded, setEmbedLoaded] = useState(true);
  const [embedError, setEmbedError] = useState(false);

  // Check if the embed is loading properly
  useEffect(() => {
    // Set a timeout to check if the embed has loaded
    const timer = setTimeout(() => {
      // If we haven't detected a load after 3 seconds, show fallback
      const iframe = document.querySelector('iframe');
      if (iframe) {
        try {
          // Try to access iframe content - if it fails, it might be due to CORS
          // This is just a heuristic and may not be reliable
          if (!iframe.contentWindow) {
            setEmbedError(true);
          }
        } catch (e) {
          // If we get an error, the iframe might not be loading properly
          setEmbedError(true);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetResults = () => {
    // Track the view event with Facebook Pixel
    trackFBEvent('ViewContent', {
      content_name: 'Quiz Results',
      content_category: 'Wildcat Quiz',
      value: result.type,
    });

    // Call onSubmit with empty email and false for newsletterOptIn
    // since we're not collecting emails directly anymore
    onSubmit('', false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-serif text-primary-800 mb-4 text-center">
          Your Wildcat Match Is Ready!
        </h2>
        
        <p className="text-primary-600 mb-6 text-center">
          But before we reveal your wildlife twin, consider joining FUZZ's conservation newsletter.
        </p>

        {!embedError ? (
          <div className="mb-6 flex justify-center">
            <iframe 
              src="https://fuzz.substack.com/embed" 
              width="100%" 
              height="150" 
              style={{ border: '1px solid #EEE', background: 'white', maxWidth: '480px' }} 
              frameBorder="0" 
              scrolling="no"
              title="FUZZ Newsletter Signup"
              className="mx-auto"
              onError={() => setEmbedError(true)}
            />
          </div>
        ) : (
          <div className="mb-6 text-center">
            <p className="text-primary-700 mb-2">
              Join FUZZ's newsletter for wildlife adventures from the field!
            </p>
            <a 
              href="https://fuzz.substack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 underline hover:text-primary-800"
            >
              Subscribe on Substack
            </a>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleGetResults}
            className="btn-primary w-full py-4 text-lg font-medium"
          >
            Get My Results
          </button>
        </div>
      </div>
    </motion.div>
  );
} 