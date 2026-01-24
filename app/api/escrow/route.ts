/**
 * Escrow API Routes
 * GET /api/escrow - List all escrow transactions with filters
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import type { EscrowTransaction, EscrowFilters } from '@/lib/types/escrow.types';
import { ESCROW_TRANSACTIONS_DB } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse filters
    const filters: EscrowFilters = {
      status: (searchParams.get('status') as EscrowFilters['status']) || 'all',
      search: searchParams.get('search') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    };

    // Filter transactions
    let transactions = [...ESCROW_TRANSACTIONS_DB];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      transactions = transactions.filter(t => t.status === filters.status);
    }

    // Filter by search (campaign name, business name, influencer name, or transaction ID)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      transactions = transactions.filter(t =>
        t.id.toLowerCase().includes(searchLower) ||
        t.campaignName.toLowerCase().includes(searchLower) ||
        t.businessName.toLowerCase().includes(searchLower) ||
        t.influencerName.toLowerCase().includes(searchLower) ||
        t.influencerUsername.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      transactions = transactions.filter(t => new Date(t.createdAt) >= fromDate);
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      transactions = transactions.filter(t => new Date(t.createdAt) <= toDate);
    }

    // Sort by created date (newest first)
    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const response: ApiResponse<EscrowTransaction[]> = {
      success: true,
      data: transactions,
      meta: {
        total: transactions.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch escrow transactions',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
