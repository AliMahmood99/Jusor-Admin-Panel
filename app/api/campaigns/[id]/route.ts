/**
 * Campaign Detail API Route
 * GET /api/campaigns/[id] - Get single campaign by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import { getCampaignById } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = getCampaignById(id);

    if (!campaign) {
      const response: ApiResponse = {
        success: false,
        error: 'Campaign not found',
        message: `Campaign with ID ${id} does not exist`,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse = {
      success: true,
      data: campaign,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch campaign',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
