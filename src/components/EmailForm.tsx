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

        <div className="mb-6 flex justify-center overflow-x-auto">
          <iframe src="https://www.fuzz.net/embed" width="480" height="150" style={{ border: '1px solid #EEE', background: 'white' }} frameBorder="0" scrolling="no"></iframe>
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