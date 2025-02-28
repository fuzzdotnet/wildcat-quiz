import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

// Valid wildcat results
const VALID_RESULTS = [
  'manul',
  'iberian-lynx',
  'clouded-leopard',
  'flat-headed-cat',
  'andean-mountain-cat',
  'fishing-cat'
] as const;

type WildcatType = typeof VALID_RESULTS[number];

// Rate limiting configuration
const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  max: 3 // limit each IP to 3 requests per windowMs
};

const rateLimiter = new LRUCache({
  max: 500, // Maximum number of IP addresses to track
  ttl: rateLimit.windowMs, // Time to live for each entry
});

function getIP(request: Request) {
  const xff = request.headers.get('x-forwarded-for');
  return xff ? xff.split(',')[0] : '127.0.0.1';
}

function isRateLimited(ip: string): boolean {
  const tokenCount = rateLimiter.get(ip) as number || 0;
  
  if (tokenCount >= rateLimit.max) {
    return true;
  }

  rateLimiter.set(ip, tokenCount + 1);
  return false;
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 254); // RFC 5321
}

function validateResult(result: unknown): result is WildcatType {
  return typeof result === 'string' && VALID_RESULTS.includes(result as WildcatType);
}

export async function POST(request: Request) {
  try {
    const ip = getIP(request);

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate and sanitize email
    const email = sanitizeEmail(body.email);
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate newsletterOptIn
    const newsletterOptIn = Boolean(body.newsletterOptIn);

    // Validate result
    if (!validateResult(body.result)) {
      return NextResponse.json(
        { error: 'Invalid quiz result' },
        { status: 400 }
      );
    }
    const result = body.result;

    // Edge Config API endpoint
    const edgeConfigId = process.env.EDGE_CONFIG_ID;
    const edgeConfigToken = process.env.EDGE_CONFIG_TOKEN;
    
    if (!edgeConfigId || !edgeConfigToken) {
      throw new Error('Edge Config credentials not configured');
    }

    // Get current subscribers
    const getResponse = await fetch(
      `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
      {
        headers: {
          Authorization: `Bearer ${edgeConfigToken}`,
        },
      }
    );

    if (!getResponse.ok) {
      throw new Error('Failed to fetch subscribers');
    }

    const data = await getResponse.json();
    const subscribers = data.find((item: any) => item.key === 'subscribers')?.value || [];

    // Check if email already exists
    const existingSubscriberIndex = subscribers.findIndex((sub: any) => sub.email === email);
    
    const updatedSubscribers = [...subscribers];
    const now = new Date().toISOString();

    if (existingSubscriberIndex >= 0) {
      // Update existing subscriber
      updatedSubscribers[existingSubscriberIndex] = {
        ...updatedSubscribers[existingSubscriberIndex],
        newsletterOptIn,
        result,
        updatedAt: now,
      };
    } else {
      // Add new subscriber
      updatedSubscribers.push({
        email,
        newsletterOptIn,
        result,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Update subscribers list
    const updateResponse = await fetch(
      `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${edgeConfigToken}`,
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'upsert',
              key: 'subscribers',
              value: updatedSubscribers,
            },
          ],
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error('Failed to update subscribers');
    }

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
} 