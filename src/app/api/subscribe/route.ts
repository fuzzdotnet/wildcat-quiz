import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { WildcatType, validateResult } from '@/types/quiz';

// Rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute
const requestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestTimestamps.get(ip) || [];
  
  // Remove timestamps older than the window
  const recentTimestamps = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentTimestamps.length >= MAX_REQUESTS) {
    return true;
  }
  
  recentTimestamps.push(now);
  requestTimestamps.set(ip, recentTimestamps);
  return false;
}

function getIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return 'unknown';
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 254); // RFC 5321
}

interface Subscriber {
  email: string;
  newsletterOptIn: boolean;
  result: WildcatType;
  createdAt: string;
  updatedAt: string;
}

async function syncToBeehiiv(email: string, result: WildcatType) {
  try {
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;

    if (!publicationId || !apiKey) {
      console.error('Missing Beehiiv configuration');
      return false;
    }

    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'CatQuiz',
        utm_medium: 'organic',
        utm_campaign: 'wildcat_quiz',
        custom_fields: [
          {
            name: 'Wildcat Result',
            value: result
          }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Beehiiv API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error syncing to Beehiiv:', error);
    return false;
  }
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
      access: 'public',
    });

    console.log(`Subscriber data stored at: ${url}`);

    // Sync to Beehiiv if newsletter opt-in is true
    let beehiivSync = false;
    if (newsletterOptIn) {
      beehiivSync = await syncToBeehiiv(email, result);
    }

    return NextResponse.json(
      { 
        message: 'Subscription successful',
        beehiivSync
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 