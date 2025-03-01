'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Subscriber {
  email: string;
  newsletterOptIn: boolean;
  result: string;
  createdAt: string;
  updatedAt: string;
}

type SortField = 'email' | 'newsletterOptIn' | 'result' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const router = useRouter();

  const sortSubscribers = (data: Subscriber[]) => {
    return [...data].sort((a, b) => {
      if (sortField === 'createdAt') {
        return sortDirection === 'desc'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError(null);

      const storedApiKey = localStorage.getItem('adminApiKey') || apiKey;
      if (!storedApiKey) {
        setError('API key is required');
        setLoading(false);
        return;
      }

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
      setSubscribers(sortSubscribers(data.subscribers));
    } catch (err) {
      setError('Failed to fetch subscribers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedApiKey = localStorage.getItem('adminApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      fetchSubscribers();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSubscribers(sortSubscribers(subscribers));
  }, [sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'desc' ? (
      <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
    );
  };

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
                      <th 
                        className="p-2 text-left border-b cursor-pointer hover:bg-primary-200"
                        onClick={() => handleSort('email')}
                      >
                        Email <SortIcon field="email" />
                      </th>
                      <th 
                        className="p-2 text-left border-b cursor-pointer hover:bg-primary-200"
                        onClick={() => handleSort('newsletterOptIn')}
                      >
                        Newsletter <SortIcon field="newsletterOptIn" />
                      </th>
                      <th 
                        className="p-2 text-left border-b cursor-pointer hover:bg-primary-200"
                        onClick={() => handleSort('result')}
                      >
                        Result <SortIcon field="result" />
                      </th>
                      <th 
                        className="p-2 text-left border-b cursor-pointer hover:bg-primary-200"
                        onClick={() => handleSort('createdAt')}
                      >
                        Created <SortIcon field="createdAt" />
                      </th>
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
                          {new Date(subscriber.createdAt).toISOString().replace('T', ' ').slice(0, 19) + ' UTC'}
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