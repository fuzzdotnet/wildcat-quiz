'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WildcatResult } from '@/types/quiz';
import { trackFBEvent } from '@/lib/analytics';

interface EmailFormProps {
  onSubmit: (email: string, newsletterOptIn: boolean) => void;
  onSkip: () => void;
  result: WildcatResult;
}

export default function EmailForm({ onSubmit, onSkip, result }: EmailFormProps) {
  const [embedError, setEmbedError] = useState(false);

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

        <div className="mb-6 flex flex-col items-center">
          <iframe 
            src="https://www.fuzz.net/embed" 
            width="480" 
            height="320" 
            style={{ border: '1px solid #EEE', background: 'white' }} 
            frameBorder="0" 
            scrolling="no"
            title="FUZZ Newsletter Signup"
            allow="clipboard-write"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          />
          <p className="mt-2 text-sm text-primary-600">
            If the form doesn't appear, you can also <a 
              href="https://www.fuzz.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary-800"
            >subscribe here</a>.
          </p>
        </div>

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