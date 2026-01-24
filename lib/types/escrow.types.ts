/**
 * Escrow Types
 * All types related to escrow transactions
 */

export type EscrowStatus = 'held' | 'pending_release' | 'pending_refund' | 'released' | 'refunded';
export type PaymentMethod = 'card' | 'bank_transfer';
export type RefundReason =
  | 'contract_expired'
  | 'cancelled_before_signing'
  | 'cancelled_by_business'
  | 'cancelled_by_influencer'
  | 'dispute_resolved';

export interface EscrowTransaction {
  id: string;
  campaignId: string;
  campaignName: string;
  businessId: string;
  businessName: string;
  businessLogo?: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  influencerAvatar?: string;
  influencerIBAN: string;
  influencerBank: string;
  amount: number;                    // Campaign budget (what influencer will receive - 3%)
  commission: number;                // 3% platform commission
  vat: number;                       // 15% VAT on commission
  totalPaid: number;                 // Total paid by business (amount + commission + vat)
  gatewayFee: number;
  netAmount: number;                 // Amount influencer receives (amount - commission)
  status: EscrowStatus;
  paymentMethod: PaymentMethod;
  cardLast4?: string;
  cardBrand?: string;
  sourceIBAN?: string;
  sourceBankName?: string;
  bankReference?: string;
  paymentReference: string;
  createdAt: string;
  approvedAt?: string;
  completedAt?: string;
  lastUpdated: string;
  refundReason?: RefundReason;
  refundReasonText?: string;
  daysWaiting?: number;
  notes?: string;
  processedBy?: string;
}

export interface EscrowAuditLog {
  id: string;
  escrowId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  bankReference?: string;
  notes?: string;
  previousStatus: EscrowStatus;
  newStatus: EscrowStatus;
}

export interface EscrowFilters {
  status?: EscrowStatus | 'all';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface EscrowSummary {
  totalHeld: number;
  pendingReleases: number;
  pendingReleasesCount: number;
  pendingRefunds: number;
  pendingRefundsCount: number;
  platformRevenue: number;
  actionRequired: number;
}

export interface TransferRequest {
  bankReference: string;
  notes?: string;
}

export interface RefundRequest {
  bankReference: string;
  notes?: string;
}
