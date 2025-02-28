'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WildcatResult } from '@/types/quiz';

interface EmailFormProps {
  onSubmit: (email: string, newsletterOptIn: boolean) => void;
  onSkip: () => void;
  result: WildcatResult;
}

export default function EmailForm({ onSubmit, onSkip, result }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newsletterOptIn,
          result: result.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      onSubmit(email, newsletterOptIn);
    } catch (err) {
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
          Enter your email to reveal which endangered wildcat shares your personality and get updates about conservation efforts.
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
                <strong>Join FUZZ!</strong> Hey! I'm Dan Fletcher, and I send stories about amazing animals and their protectors straight from the field to your inbox. Join me for wild adventures, surprising animal facts, and conservation wins from around the globe. Always free, never spammy, just genuine nature stories three times a week.
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