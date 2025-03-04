import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// Simple API key authentication
const API_KEY = process.env.ADMIN_API_KEY || 'default-dev-key';
const PAGE_SIZE = 50; // Number of subscribers per page

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

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || String(PAGE_SIZE))));
    const offset = (page - 1) * limit;

    // List all subscriber blobs
    const { blobs } = await list({ prefix: 'subscribers/' });
    
    // Sort blobs by date (newest first)
    const sortedBlobs = blobs.sort((a, b) => {
      const dateA = new Date(a.uploadedAt).getTime();
      const dateB = new Date(b.uploadedAt).getTime();
      return dateB - dateA;
    });

    // Get only the blobs for the current page
    const pageBlobs = sortedBlobs.slice(offset, offset + limit);
    
    // Fetch content for the current page only
    const subscribersPromises = pageBlobs.map(async (blob) => {
      try {
        const response = await fetch(blob.url);
        if (!response.ok) {
          console.error(`Failed to fetch blob: ${blob.url}`);
          return null;
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching blob ${blob.url}:`, error);
        return null;
      }
    });

    // Wait for current page promises to resolve
    const subscribers = (await Promise.all(subscribersPromises)).filter(Boolean);

    return NextResponse.json({ 
      subscribers,
      pagination: {
        total: blobs.length,
        page,
        limit,
        totalPages: Math.ceil(blobs.length / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 