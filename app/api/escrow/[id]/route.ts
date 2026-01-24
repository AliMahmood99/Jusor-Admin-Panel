/**
 * Escrow Detail API Route
 * GET /api/escrow/[id] - Get single escrow transaction by ID
 * PATCH /api/escrow/[id] - Update escrow transaction (mark as transferred/refunded)
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api.types';
import type { EscrowTransaction, TransferRequest, RefundRequest } from '@/lib/types/escrow.types';
import { getEscrowById, getAuditLogsByEscrowId } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const transaction = getEscrowById(id);

    if (!transaction) {
      const response: ApiResponse = {
        success: false,
        error: 'Transaction not found',
        message: `Escrow transaction with ID ${id} does not exist`,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Get audit logs for this transaction
    const auditLogs = getAuditLogsByEscrowId(id);

    const response: ApiResponse<{ transaction: EscrowTransaction; auditLogs: any[] }> = {
      success: true,
      data: {
        transaction,
        auditLogs,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch escrow transaction',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const transaction = getEscrowById(id);

    if (!transaction) {
      const response: ApiResponse = {
        success: false,
        error: 'Transaction not found',
        message: `Escrow transaction with ID ${id} does not exist`,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const body = await request.json();
    const action = body.action; // 'transfer' or 'refund'

    if (action === 'transfer') {
      const transferData = body.data as TransferRequest;

      // Validate
      if (!transferData.bankReference) {
        const response: ApiResponse = {
          success: false,
          error: 'Bank reference is required',
        };
        return NextResponse.json(response, { status: 400 });
      }

      // In a real app, this would update the database
      // For mock, we just return success
      const response: ApiResponse = {
        success: true,
        message: 'Transaction marked as transferred successfully',
        data: {
          ...transaction,
          status: 'released',
          bankReference: transferData.bankReference,
          notes: transferData.notes,
          processedBy: 'Admin User',
          completedAt: new Date().toISOString(),
        },
      };

      return NextResponse.json(response);
    }

    if (action === 'refund') {
      const refundData = body.data as RefundRequest;

      // Validate
      if (!refundData.bankReference) {
        const response: ApiResponse = {
          success: false,
          error: 'Bank reference is required',
        };
        return NextResponse.json(response, { status: 400 });
      }

      // In a real app, this would update the database
      const response: ApiResponse = {
        success: true,
        message: 'Transaction marked as refunded successfully',
        data: {
          ...transaction,
          status: 'refunded',
          bankReference: refundData.bankReference,
          notes: refundData.notes,
          processedBy: 'Admin User',
          completedAt: new Date().toISOString(),
        },
      };

      return NextResponse.json(response);
    }

    const response: ApiResponse = {
      success: false,
      error: 'Invalid action',
      message: 'Action must be either "transfer" or "refund"',
    };
    return NextResponse.json(response, { status: 400 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update escrow transaction',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
