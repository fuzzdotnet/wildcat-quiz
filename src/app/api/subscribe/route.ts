import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';
import { put } from '@vercel/blob';

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

interface Subscriber {
  email: string;
  newsletterOptIn: boolean;
  result: WildcatType;
  createdAt: string;
  updatedAt: string;
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
    console.log('Request body:', body);
    
    // Validate and sanitize email
    const email = sanitizeEmail(body.email);
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.error('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate newsletterOptIn
    const newsletterOptIn = Boolean(body.newsletterOptIn);

    // Validate result
    if (!validateResult(body.result)) {
      console.error('Invalid quiz result:', body.result);
      return NextResponse.json(
        { error: 'Invalid quiz result' },
        { status: 400 }
      );
    }
    const result = body.result;

    // Create a unique filename for this batch of subscribers
    // We'll use a timestamp-based approach for simplicity
    const now = new Date();
    const timestamp = now.toISOString();
    const blobName = `subscribers/subscriber-${email.replace(/[^a-z0-9]/gi, '-')}-${now.getTime()}.json`;

    // Create the subscriber object
    const subscriber: Subscriber = {
      email,
      newsletterOptIn,
      result,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Store the subscriber data in Vercel Blob Storage
    const { url } = await put(blobName, JSON.stringify(subscriber), {
      contentType: 'application/json',
      access: 'public', // Make it public so we can access it
    });

    console.log(`Subscriber data stored at: ${url}`);

    // Also store in a manifest file to keep track of all subscribers
    // In a production app, you might want to implement a more sophisticated
    // approach to manage the manifest file, especially for concurrent writes
    
    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save subscription' },
      { status: 500 }
    );
  }
} 