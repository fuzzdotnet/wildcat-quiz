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
  const [email, setEmail] = useState('');
  const [newsletterOptIn] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    console.log('Submitting form with:', { email, newsletterOptIn, result: result.type });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newsletterOptIn: true,
          result: result.type,
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Track the signup event with Facebook Pixel
      trackFBEvent('Lead', {
        content_name: 'Quiz Results',
        content_category: 'Wildcat Quiz',
        value: result.type,
      });

      onSubmit(email, true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
      setIsSubmitting(false);
    }
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
          Enter your e-mail to discover your wildcat twin and join wildlife adventures from the field.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input-field"
              aria-label="Email address"
              disabled={isSubmitting}
              required
            />
            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={true}
                className="h-4 w-4 rounded border-gray-300 text-gray-400 cursor-not-allowed"
                disabled={true}
              />
            </div>
            <div className="ml-3">
              <div className="text-sm text-primary-700">
                <strong>Join FUZZ!</strong> I'm Dan Fletcher, reporting from the world's wildest places. I track rare cats across Mongolia's frozen steppe, document conservation victories in Africa's protected parks, and share stories of animal resilience you won't find elsewhere. Always free, never spammy, just genuine adventures and surprising animal stories in your inbox three times a week.
              </div>
            </div>
          </div>

          <div className="text-xs text-primary-500 mb-6 text-center">
            We respect your privacy. Your email is safe with us and will never be shared or sold. You can unsubscribe anytime.
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="btn-primary w-full py-4 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Get My Results'}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="text-gray-500 hover:text-gray-700 text-sm"
              disabled={isSubmitting}
            >
              (Skip the newsletter & just see results, thanks)
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 