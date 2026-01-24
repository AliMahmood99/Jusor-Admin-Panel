/**
 * Campaigns API Routes
 * GET /api/campaigns - List all campaigns with filters
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import { CAMPAIGNS_DB, Campaign } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse filters
    const status = searchParams.get('status') as Campaign['status'] | 'all' | null;
    const type = searchParams.get('type') as Campaign['type'] | null;
    const businessId = searchParams.get('businessId');
    const search = searchParams.get('search');

    // Filter campaigns
    let campaigns = [...CAMPAIGNS_DB];

    // Filter by status
    if (status && status !== 'all') {
      campaigns = campaigns.filter(c => c.status === status);
    }

    // Filter by type
    if (type) {
      campaigns = campaigns.filter(c => c.type === type);
    }

    // Filter by business
    if (businessId) {
      campaigns = campaigns.filter(c => c.businessId === businessId);
    }

    // Filter by search (name, business name)
    if (search) {
      const searchLower = search.toLowerCase();
      campaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchLower) ||
        c.businessName.toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower)
      );
    }

    // Sort by start date (newest first)
    campaigns.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    const response: ApiResponse<Campaign[]> = {
      success: true,
      data: campaigns,
      meta: {
        total: campaigns.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch campaigns',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
