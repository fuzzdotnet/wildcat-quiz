'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmailFormProps {
  onSubmit: (email: string, newsletterOptIn: boolean) => void;
  onSkip: () => void;
}

export default function EmailForm({ onSubmit, onSkip }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    onSubmit(email, newsletterOptIn);
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
              />
            </div>
            <div className="ml-3">
              <label htmlFor="newsletter" className="text-sm text-primary-700">
                Yes, I'd like to receive FUZZ's newsletter featuring wildlife conservation stories, amazing animal facts, and ways to help endangered species. (2-3 emails per week)
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
            >
              Get My Results & Updates
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="btn-secondary flex-1"
            >
              Skip & See Results
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 