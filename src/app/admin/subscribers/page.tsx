'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface Subscriber {
  email: string;
  newsletterOptIn: boolean;
  result: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get API key from localStorage or prompt
      const storedApiKey = localStorage.getItem('adminApiKey') || apiKey;
      if (!storedApiKey) {
        setError('API key is required');
        setLoading(false);
        return;
      }

      // Save API key to localStorage
      if (apiKey && apiKey !== localStorage.getItem('adminApiKey')) {
        localStorage.setItem('adminApiKey', apiKey);
      }

      const response = await fetch('/api/admin/subscribers', {
        headers: {
          Authorization: `Bearer ${storedApiKey}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid API key');
          localStorage.removeItem('adminApiKey');
        } else {
          setError(`Error: ${response.status} ${response.statusText}`);
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      setSubscribers(data.subscribers);
    } catch (err) {
      setError('Failed to fetch subscribers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for stored API key
    const storedApiKey = localStorage.getItem('adminApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      fetchSubscribers();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gradient-to-b from-primary-50 to-primary-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif text-primary-800 mb-6">
            Email Subscribers
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-4 mb-6">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key"
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <button
                onClick={fetchSubscribers}
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                Fetch Subscribers
              </button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : subscribers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-100">
                      <th className="p-2 text-left border-b">Email</th>
                      <th className="p-2 text-left border-b">Newsletter</th>
                      <th className="p-2 text-left border-b">Result</th>
                      <th className="p-2 text-left border-b">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-2 border-b">{subscriber.email}</td>
                        <td className="p-2 border-b">
                          {subscriber.newsletterOptIn ? 'Yes' : 'No'}
                        </td>
                        <td className="p-2 border-b">{subscriber.result}</td>
                        <td className="p-2 border-b">
                          {new Date(subscriber.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {apiKey ? 'No subscribers found' : 'Enter API key to view subscribers'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 