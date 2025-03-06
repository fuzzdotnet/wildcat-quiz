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

interface BouncerResponse {
  status: string;
  email: string;
  account: string;
  domain: string;
  role: boolean;
  disposable: boolean;
  free: boolean;
  reason: string | null;
  score?: number;
}

async function validateEmailWithBouncer(email: string): Promise<{ 
  valid: boolean; 
  reason?: string;
  sendToBeehiiv: boolean;
}> {
  try {
    const apiKey = process.env.BOUNCER_API_KEY;
    
    if (!apiKey) {
      console.error('Missing Bouncer API key');
      // If no API key, assume email is valid to avoid blocking users
      return { valid: true, sendToBeehiiv: true };
    }

    console.log(`Validating email with Bouncer: ${email}`);
    
    const response = await fetch(`https://api.usebouncer.com/v1/email/verify?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Bouncer API error: ${response.status} ${response.statusText}`);
      // If API call fails, assume email is valid to avoid blocking users
      return { valid: true, sendToBeehiiv: true };
    }

    const data = await response.json() as BouncerResponse;
    console.log('Bouncer response:', data);

    // Check if email is valid (can receive emails)
    const isValid = data.status === 'deliverable' || data.status === 'risky';
    
    // Determine if we should send to Beehiiv
    // Only send if deliverable and toxicity score is below 60 (or no score available)
    const sendToBeehiiv = data.status === 'deliverable' && (!data.score || data.score < 60);
    
    if (!isValid) {
      return { 
        valid: false, 
        sendToBeehiiv: false,
        reason: `Email validation failed: ${data.reason || data.status}`
      };
    }
    
    if (data.status === 'risky') {
      console.log(`Risky email detected: ${email}. Will show results but skip Beehiiv sync.`);
    }
    
    if (data.score && data.score >= 60) {
      console.log(`High toxicity score (${data.score}) for email: ${email}. Will show results but skip Beehiiv sync.`);
    }
    
    return { 
      valid: true,
      sendToBeehiiv,
      reason: !sendToBeehiiv ? 'Email flagged as risky or high toxicity' : undefined
    };
  } catch (error) {
    console.error('Error validating email with Bouncer:', error);
    // If there's an error, assume email is valid to avoid blocking users
    return { valid: true, sendToBeehiiv: true };
  }
}

async function syncToBeehiiv(email: string, result: WildcatType) {
  try {
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;

    if (!publicationId || !apiKey) {
      console.error('Missing Beehiiv configuration:', { publicationId, hasApiKey: !!apiKey });
      return false;
    }

    console.log('Attempting to sync to Beehiiv:', {
      email,
      result,
      publicationId,
      hasApiKey: !!apiKey
    });

    const requestBody = {
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
    };

    console.log('Beehiiv request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Beehiiv response status:', response.status);
    const responseData = await response.json();
    console.log('Beehiiv response data:', responseData);

    if (!response.ok) {
      console.error('Beehiiv API error:', responseData);
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
    console.log('Received subscription request from IP:', ip);

    // Check rate limit
    if (isRateLimited(ip)) {
      console.log('Rate limit exceeded for IP:', ip);
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

    // Validate email with Bouncer
    const emailValidation = await validateEmailWithBouncer(email);
    if (!emailValidation.valid) {
      console.error('Email validation failed:', emailValidation.reason);
      return NextResponse.json(
        { error: emailValidation.reason || 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate newsletterOptIn
    const newsletterOptIn = Boolean(body.newsletterOptIn);
    console.log('Newsletter opt-in:', newsletterOptIn);

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

    console.log('Storing subscriber data:', subscriber);

    // Store the subscriber data in Vercel Blob Storage
    const { url } = await put(blobName, JSON.stringify(subscriber), {
      contentType: 'application/json',
      access: 'public',
    });

    console.log(`Subscriber data stored at: ${url}`);

    // Sync to Beehiiv if newsletter opt-in is true AND email is safe to send
    let beehiivSync = false;
    if (newsletterOptIn && emailValidation.sendToBeehiiv) {
      console.log('Attempting to sync to Beehiiv...');
      beehiivSync = await syncToBeehiiv(email, result);
      console.log('Beehiiv sync result:', beehiivSync);
    } else if (newsletterOptIn && !emailValidation.sendToBeehiiv) {
      console.log('Skipping Beehiiv sync due to email validation flags:', emailValidation.reason);
    }

    return NextResponse.json(
      { 
        message: 'Subscription successful',
        beehiivSync,
        emailQuality: emailValidation.sendToBeehiiv ? 'good' : 'flagged'
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