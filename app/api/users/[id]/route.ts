/**
 * User Detail API Route
 * GET /api/users/[id] - Get single user by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import { getUserById } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = getUserById(id);

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
        message: `User with ID ${id} does not exist`,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse = {
      success: true,
      data: user,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch user',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
