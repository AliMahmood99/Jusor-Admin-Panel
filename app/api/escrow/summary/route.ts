/**
 * Escrow Summary API Route
 * GET /api/escrow/summary - Get escrow statistics and summary
 */

import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import type { EscrowSummary } from '@/lib/types/escrow.types';
import { getEscrowSummary } from '@/lib/data';

export async function GET() {
  try {
    const summary = getEscrowSummary();

    const response: ApiResponse<EscrowSummary> = {
      success: true,
      data: summary,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch escrow summary',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
