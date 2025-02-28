import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// Simple API key authentication
const API_KEY = process.env.ADMIN_API_KEY || 'default-dev-key';

export async function GET(request: Request) {
  try {
    // Check for API key
    const authHeader = request.headers.get('Authorization');
    const providedKey = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;
    
    if (!providedKey || providedKey !== API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // List all subscriber blobs
    const { blobs } = await list({ prefix: 'subscribers/' });
    
    // For each blob, we'll need to fetch its content
    const subscribersPromises = blobs.map(async (blob) => {
      const response = await fetch(blob.url);
      if (!response.ok) {
        console.error(`Failed to fetch blob: ${blob.url}`);
        return null;
      }
      return await response.json();
    });

    // Wait for all promises to resolve
    const subscribers = (await Promise.all(subscribersPromises)).filter(Boolean);

    return NextResponse.json({ subscribers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 