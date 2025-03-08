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
        
        <div className="text-primary-600 mb-6">
          <p className="mb-4 text-center">
            Before discovering your wildlife twin, why not join the FUZZ family? Our free newsletter delivers fascinating conservation stories, stunning wildlife photography, and adventures from the field straight to your inbox a few times a week.
          </p>
          
          <p className="font-medium mb-2">What to expect:</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Incredible wildlife encounters from the world's wildest places</li>
            <li>Conservation success stories you won't hear elsewhere</li>
            <li>Beautiful photography from remote wilderness areas</li>
            <li>A community that helps fund real conservation projects</li>
          </ul>
          
          <p className="text-sm italic text-center">
            No pressure - the personality quiz works either way, and we promise never to spam you. Just thoughtful stories about animals and the people working to protect them.
          </p>
        </div>

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