'use client';

import { motion } from 'framer-motion';
import { WildcatResult } from '@/types/quiz';
import { trackFBEvent } from '@/lib/analytics';

interface EmailFormProps {
  onSubmit: (email: string, newsletterOptIn: boolean) => void;
  onSkip: () => void;
  result: WildcatResult;
}

export default function EmailForm({ onSubmit, onSkip, result }: EmailFormProps) {
  const handleGetResults = () => {
    // Track the view event with Facebook Pixel
    trackFBEvent('ViewContent', {
      content_name: 'Quiz Results',
      content_category: 'Wildcat Quiz',
      value: result.type,
    });

    // Call onSubmit with empty email and false for newsletterOptIn
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

        <div className="mb-6 text-center">
          <div className="p-4 border border-primary-100 bg-primary-50 rounded-lg">
            <p className="text-primary-800 font-medium mb-2">
              Join FUZZ's Newsletter
            </p>
            <p className="text-primary-600 text-sm mb-4">
              Get wildlife adventures from the field delivered straight to your inbox.
            </p>
            <a 
              href="https://www.fuzz.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
            >
              Subscribe to FUZZ
            </a>
          </div>
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