/**
 * Centralized Escrow Data
 * All escrow transactions with proper relationships to users and campaigns
 */

import type { EscrowTransaction, EscrowAuditLog, EscrowSummary } from '@/lib/types/escrow.types';
import { getUserById } from './users.data';
import { getCampaignById } from './campaigns.data';

/**
 * Helper function to calculate days waiting
 */
const calculateDaysWaiting = (dateString: string): number => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Calculate financial breakdown for escrow
 * Influencer receives the FULL amount, commission is ADDED on top
 *
 * Formula:
 * - netToInfluencer = agreed amount (e.g., 15000)
 * - commission = netToInfluencer ÷ 97 × 3
 * - vat = commission × 0.15
 * - totalPaid = netToInfluencer + commission + vat
 */
const calculateEscrowFinancials = (netToInfluencer: number) => {
  const commission = Math.round((netToInfluencer / 97 * 3) * 100) / 100;
  const vat = Math.round(commission * 0.15 * 100) / 100;
  const totalPaid = Math.round((netToInfluencer + commission + vat) * 100) / 100;

  return {
    amount: netToInfluencer,      // What influencer receives
    commission,                   // 3% platform commission
    vat,                          // 15% VAT on commission
    totalPaid,                    // What business pays
    netAmount: netToInfluencer,   // Same as amount (influencer gets this)
    gatewayFee: 0,                // No gateway fee in new model
  };
};

/**
 * Master Escrow Transactions Database
 * All escrow transactions with proper data relationships
 */
export const ESCROW_TRANSACTIONS_DB: EscrowTransaction[] = [
  {
    id: 'ESC-2026-001',
    campaignId: 'CMP-2026-089',
    campaignName: 'Ramadan Collection 2026',
    businessId: 'BUS-5678',
    businessName: 'Fashion House KSA',
    businessLogo: 'FH',
    influencerId: 'INF-1234',
    influencerName: 'Noura Al-Rashid',
    influencerUsername: '@noura_style',
    influencerAvatar: 'NR',
    influencerIBAN: 'SA44 2000 0001 2345 6789 1234',
    influencerBank: 'Al Rajhi Bank',
    ...calculateEscrowFinancials(15000), // Influencer receives 15,000 SAR
    status: 'pending_release',
    paymentMethod: 'card',
    cardLast4: '4532',
    cardBrand: 'Visa',
    paymentReference: 'PAY-2026-4532-001',
    createdAt: '2026-01-20T10:00:00',
    approvedAt: '2026-01-22T14:30:00',
    lastUpdated: '2026-01-22T14:30:00',
    daysWaiting: calculateDaysWaiting('2026-01-22T14:30:00'),
  },
  {
    id: 'ESC-2026-002',
    campaignId: 'CMP-2026-085',
    campaignName: 'Winter Sale Campaign',
    businessId: 'BUS-6789',
    businessName: 'Gulf Retail LLC',
    businessLogo: 'GR',
    influencerId: 'INF-2345',
    influencerName: 'Ahmed Al-Farsi',
    influencerUsername: '@ahmed_lifestyle',
    influencerAvatar: 'AF',
    influencerIBAN: 'SA03 8000 0000 6080 1016 7519',
    influencerBank: 'Saudi National Bank',
    ...calculateEscrowFinancials(25000), // Influencer receives 25,000 SAR
    status: 'pending_release',
    paymentMethod: 'bank_transfer',
    sourceIBAN: 'SA92 0500 0680 6080 1234 5678',
    sourceBankName: 'Alinma Bank',
    paymentReference: 'PAY-2026-BNK-002',
    createdAt: '2026-01-18T09:15:00',
    approvedAt: '2026-01-21T16:45:00',
    lastUpdated: '2026-01-21T16:45:00',
    daysWaiting: calculateDaysWaiting('2026-01-21T16:45:00'),
  },
  {
    id: 'ESC-2026-003',
    campaignId: 'CMP-2026-078',
    campaignName: 'Tech Product Launch',
    businessId: 'BUS-3456',
    businessName: 'TechStart Inc',
    businessLogo: 'TS',
    influencerId: 'INF-3456',
    influencerName: 'Sara Al-Mansour',
    influencerUsername: '@sara_tech',
    influencerAvatar: 'SM',
    influencerIBAN: 'SA15 8000 0000 6331 1234 5678',
    influencerBank: 'Riyad Bank',
    ...calculateEscrowFinancials(12000), // Influencer would receive 12,000 SAR
    status: 'pending_refund',
    paymentMethod: 'card',
    cardLast4: '8765',
    cardBrand: 'Mastercard',
    paymentReference: 'PAY-2026-8765-003',
    createdAt: '2026-01-15T11:20:00',
    lastUpdated: '2026-01-17T10:00:00',
    refundReason: 'contract_expired',
    refundReasonText: 'Influencer did not sign contract within 48 hours',
    daysWaiting: calculateDaysWaiting('2026-01-17T10:00:00'),
  },
  {
    id: 'ESC-2026-004',
    campaignId: 'CMP-2026-092',
    campaignName: 'Beauty Products Review',
    businessId: 'BUS-8901',
    businessName: 'Beauty Co',
    businessLogo: 'BC',
    influencerId: 'INF-4567',
    influencerName: 'Layla Al-Zahrani',
    influencerUsername: '@layla_beauty',
    influencerAvatar: 'LZ',
    influencerIBAN: 'SA71 0500 0000 0000 6789 1234',
    influencerBank: 'Al Rajhi Bank',
    ...calculateEscrowFinancials(8000), // Influencer receives 8,000 SAR
    status: 'held',
    paymentMethod: 'bank_transfer',
    sourceIBAN: 'SA44 2000 0001 1234 5678 9012',
    sourceBankName: 'Saudi National Bank',
    paymentReference: 'PAY-2026-BNK-004',
    createdAt: '2026-01-23T13:45:00',
    lastUpdated: '2026-01-23T13:45:00',
  },
  {
    id: 'ESC-2026-005',
    campaignId: 'CMP-2026-075',
    campaignName: 'Restaurant Opening Event',
    businessId: 'BUS-9012',
    businessName: 'Gourmet Restaurants',
    businessLogo: 'GR',
    influencerId: 'INF-5678',
    influencerName: 'Khalid Al-Otaibi',
    influencerUsername: '@khalid_food',
    influencerAvatar: 'KO',
    influencerIBAN: 'SA92 0500 0680 6080 9876 5432',
    influencerBank: 'Alinma Bank',
    ...calculateEscrowFinancials(20000), // Influencer received 20,000 SAR
    status: 'released',
    paymentMethod: 'card',
    cardLast4: '2468',
    cardBrand: 'Mada',
    paymentReference: 'PAY-2026-2468-005',
    bankReference: 'TRF-2026-001234',
    createdAt: '2026-01-10T08:30:00',
    approvedAt: '2026-01-12T15:20:00',
    completedAt: '2026-01-13T10:15:00',
    lastUpdated: '2026-01-13T10:15:00',
    processedBy: 'Ahmed Al-Qahtani',
    notes: 'Transferred successfully via bank transfer',
  },
  {
    id: 'ESC-2026-006',
    campaignId: 'CMP-2026-068',
    campaignName: 'Fashion Week Coverage',
    businessId: 'BUS-4321',
    businessName: 'Elite Fashion',
    businessLogo: 'EF',
    influencerId: 'INF-6789',
    influencerName: 'Maha Al-Dosari',
    influencerUsername: '@maha_fashion',
    influencerAvatar: 'MD',
    influencerIBAN: 'SA03 8000 0000 6080 2468 1357',
    influencerBank: 'Saudi National Bank',
    ...calculateEscrowFinancials(30000), // Influencer received 30,000 SAR
    status: 'released',
    paymentMethod: 'bank_transfer',
    sourceIBAN: 'SA15 8000 0000 6331 9876 5432',
    sourceBankName: 'Riyad Bank',
    paymentReference: 'PAY-2026-BNK-006',
    bankReference: 'TRF-2026-001567',
    createdAt: '2026-01-08T14:00:00',
    approvedAt: '2026-01-11T09:30:00',
    completedAt: '2026-01-12T11:45:00',
    lastUpdated: '2026-01-12T11:45:00',
    processedBy: 'Ahmed Al-Qahtani',
    notes: 'Processed via bank transfer',
  },
  {
    id: 'ESC-2026-007',
    campaignId: 'CMP-2026-055',
    campaignName: 'Fitness App Promotion',
    businessId: 'BUS-5432',
    businessName: 'HealthTech Solutions',
    businessLogo: 'HT',
    influencerId: 'INF-7890',
    influencerName: 'Fahad Al-Shamrani',
    influencerUsername: '@fahad_fitness',
    influencerAvatar: 'FS',
    influencerIBAN: 'SA44 2000 0001 3579 2468 1357',
    influencerBank: 'Al Rajhi Bank',
    ...calculateEscrowFinancials(10000), // Influencer would receive 10,000 SAR
    status: 'refunded',
    paymentMethod: 'card',
    cardLast4: '9876',
    cardBrand: 'Visa',
    paymentReference: 'PAY-2026-9876-007',
    bankReference: 'REF-2026-002345',
    createdAt: '2026-01-05T10:00:00',
    completedAt: '2026-01-07T14:30:00',
    lastUpdated: '2026-01-07T14:30:00',
    refundReason: 'cancelled_by_business',
    refundReasonText: 'Business cancelled campaign after contract signing - 50% refunded',
    processedBy: 'Ahmed Al-Qahtani',
    notes: 'Partial refund (50%) processed to original payment method',
  },
  {
    id: 'ESC-2026-008',
    campaignId: 'CMP-2026-095',
    campaignName: 'Eid Collection Launch',
    businessId: 'BUS-9876',
    businessName: 'Luxury Boutique',
    businessLogo: 'LB',
    influencerId: 'INF-8901',
    influencerName: 'Reem Al-Saud',
    influencerUsername: '@reem_luxury',
    influencerAvatar: 'RS',
    influencerIBAN: 'SA71 0500 0000 0000 1357 2468',
    influencerBank: 'Alinma Bank',
    ...calculateEscrowFinancials(50000), // Influencer receives 50,000 SAR
    status: 'pending_release',
    paymentMethod: 'bank_transfer',
    sourceIBAN: 'SA92 0500 0680 6080 3579 1234',
    sourceBankName: 'Saudi National Bank',
    paymentReference: 'PAY-2026-BNK-008',
    createdAt: '2026-01-19T12:00:00',
    approvedAt: '2026-01-23T10:15:00',
    lastUpdated: '2026-01-23T10:15:00',
    daysWaiting: calculateDaysWaiting('2026-01-23T10:15:00'),
  },
  {
    id: 'ESC-2026-009',
    campaignId: 'CMP-2026-082',
    campaignName: 'Gaming Event Coverage',
    businessId: 'BUS-6543',
    businessName: 'Gaming Arena',
    businessLogo: 'GA',
    influencerId: 'INF-9012',
    influencerName: 'Omar Al-Ghamdi',
    influencerUsername: '@omar_gaming',
    influencerAvatar: 'OG',
    influencerIBAN: 'SA03 8000 0000 6080 4567 8901',
    influencerBank: 'Riyad Bank',
    ...calculateEscrowFinancials(18000), // Influencer would receive 18,000 SAR
    status: 'pending_refund',
    paymentMethod: 'card',
    cardLast4: '1357',
    cardBrand: 'Mada',
    paymentReference: 'PAY-2026-1357-009',
    createdAt: '2026-01-16T15:30:00',
    lastUpdated: '2026-01-19T09:00:00',
    refundReason: 'dispute_resolved',
    refundReasonText: 'Dispute resolved in favor of business - full refund',
    daysWaiting: calculateDaysWaiting('2026-01-19T09:00:00'),
  },
  {
    id: 'ESC-2026-010',
    campaignId: 'CMP-2026-101',
    campaignName: 'New Store Opening',
    businessId: 'BUS-7654',
    businessName: 'Retail Plus',
    businessLogo: 'RP',
    influencerId: 'INF-1357',
    influencerName: 'Nora Al-Harbi',
    influencerUsername: '@nora_shopping',
    influencerAvatar: 'NH',
    influencerIBAN: 'SA44 2000 0001 5678 9012 3456',
    influencerBank: 'Al Rajhi Bank',
    ...calculateEscrowFinancials(22000), // Influencer receives 22,000 SAR
    status: 'held',
    paymentMethod: 'bank_transfer',
    sourceIBAN: 'SA15 8000 0000 6331 2468 9012',
    sourceBankName: 'Riyad Bank',
    paymentReference: 'PAY-2026-BNK-010',
    createdAt: '2026-01-24T09:00:00',
    lastUpdated: '2026-01-24T09:00:00',
  },
];

/**
 * Escrow Audit Logs Database
 */
export const ESCROW_AUDIT_LOGS_DB: EscrowAuditLog[] = [
  {
    id: 'LOG-001',
    escrowId: 'ESC-2026-005',
    action: 'Marked as Released',
    performedBy: 'Ahmed Al-Qahtani',
    timestamp: '2026-01-13T10:15:00',
    bankReference: 'TRF-2026-001234',
    notes: 'Transferred successfully via bank transfer',
    previousStatus: 'pending_release',
    newStatus: 'released',
  },
  {
    id: 'LOG-002',
    escrowId: 'ESC-2026-006',
    action: 'Marked as Released',
    performedBy: 'Ahmed Al-Qahtani',
    timestamp: '2026-01-12T11:45:00',
    bankReference: 'TRF-2026-001567',
    notes: 'Processed via bank transfer',
    previousStatus: 'pending_release',
    newStatus: 'released',
  },
  {
    id: 'LOG-003',
    escrowId: 'ESC-2026-007',
    action: 'Marked as Refunded',
    performedBy: 'Ahmed Al-Qahtani',
    timestamp: '2026-01-07T14:30:00',
    bankReference: 'REF-2026-002345',
    notes: 'Partial refund (50%) processed to original payment method',
    previousStatus: 'pending_refund',
    newStatus: 'refunded',
  },
];

/**
 * Calculate escrow summary statistics
 */
export const getEscrowSummary = (): EscrowSummary => {
  const transactions = ESCROW_TRANSACTIONS_DB;

  const totalHeld = transactions
    .filter(t => ['held', 'pending_release', 'pending_refund'].includes(t.status))
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingReleases = transactions
    .filter(t => t.status === 'pending_release')
    .reduce((sum, t) => sum + t.netAmount, 0);

  const pendingReleasesCount = transactions
    .filter(t => t.status === 'pending_release')
    .length;

  const pendingRefunds = transactions
    .filter(t => t.status === 'pending_refund')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingRefundsCount = transactions
    .filter(t => t.status === 'pending_refund')
    .length;

  const platformRevenue = transactions
    .filter(t => t.status === 'released')
    .reduce((sum, t) => sum + t.commission, 0);

  const actionRequired = pendingReleasesCount + pendingRefundsCount;

  return {
    totalHeld,
    pendingReleases,
    pendingReleasesCount,
    pendingRefunds,
    pendingRefundsCount,
    platformRevenue,
    actionRequired,
  };
};

/**
 * Get transactions by status
 */
export const getTransactionsByStatus = (status: EscrowTransaction['status']) => {
  return ESCROW_TRANSACTIONS_DB.filter(t => t.status === status);
};

/**
 * Get pending releases (for Finance Team queue)
 */
export const getPendingReleases = () => {
  return ESCROW_TRANSACTIONS_DB
    .filter(t => t.status === 'pending_release')
    .sort((a, b) => (b.daysWaiting || 0) - (a.daysWaiting || 0)); // Sort by longest waiting first
};

/**
 * Get pending refunds (for Finance Team queue)
 */
export const getPendingRefunds = () => {
  return ESCROW_TRANSACTIONS_DB
    .filter(t => t.status === 'pending_refund')
    .sort((a, b) => (b.daysWaiting || 0) - (a.daysWaiting || 0)); // Sort by longest waiting first
};

/**
 * Get escrow transaction by ID
 */
export const getEscrowById = (id: string): EscrowTransaction | undefined => {
  return ESCROW_TRANSACTIONS_DB.find(t => t.id === id);
};

/**
 * Get audit logs for escrow transaction
 */
export const getAuditLogsByEscrowId = (escrowId: string): EscrowAuditLog[] => {
  return ESCROW_AUDIT_LOGS_DB.filter(log => log.escrowId === escrowId);
};
