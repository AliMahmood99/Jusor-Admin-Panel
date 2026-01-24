/**
 * Users API Routes
 * GET /api/users - List all users with filters
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import { USERS_DB, User } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse filters
    const type = searchParams.get('type') as 'business' | 'influencer' | null;
    const search = searchParams.get('search');
    const verified = searchParams.get('verified');

    // Filter users
    let users = [...USERS_DB];

    // Filter by type
    if (type) {
      users = users.filter(u => u.type === type);
    }

    // Filter by search (name, handle, email)
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(searchLower) ||
        u.handle?.toLowerCase().includes(searchLower) ||
        u.email?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by verified status (influencers only)
    if (verified !== null) {
      const isVerified = verified === 'true';
      users = users.filter(u => u.verified === isVerified);
    }

    // Sort by name
    users.sort((a, b) => a.name.localeCompare(b.name));

    const response: ApiResponse<User[]> = {
      success: true,
      data: users,
      meta: {
        total: users.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch users',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
