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
                id="newsletter"
                type="checkbox"
                checked={newsletterOptIn}
                onChange={(e) => setNewsletterOptIn(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                disabled={isSubmitting}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="newsletter" className="text-sm text-primary-700">
                Yes, I'd like to join FUZZ's community of wildlife enthusiasts! I'll receive captivating conservation stories from the field, discover fascinating animal facts from remote locations worldwide, and learn about impactful ways to help endangered species. Plus, I'll get first access to FUZZ's exclusive wildlife photography and expedition updates. (2-3 emails per week, always free)
              </label>
            </div>
          </div>

          <div className="text-xs text-primary-500 mb-6">
            We respect your privacy. Your email is safe with us and will never be shared or sold. You can unsubscribe anytime.
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Get My Results & Updates'}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Skip & See Results
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 