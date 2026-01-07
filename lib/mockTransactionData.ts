/**
 * Mock Transaction Data
 * Professional transaction data with proper TypeScript types
 */

export interface Transaction {
  id: string;
  type: 'escrow_release' | 'escrow_deposit' | 'wallet_deposit' | 'wallet_withdrawal' | 'commission_collected' | 'refund_to_wallet' | 'partial_refund';
  category: 'campaign_payment' | 'wallet_ops' | 'commission' | 'refund';
  status: 'completed' | 'pending' | 'processing' | 'failed';
  amount: number;
  commission: number;
  netAmount: number;
  currency: string;
  from: TransactionParty;
  to: TransactionParty;
  campaign: Campaign | null;
  transferRef?: string;
  paymentMethod?: string;
  createdAt: string;
  completedAt?: string;
  description: string;
  failureReason?: string;
  relatedDispute?: string;
}

export interface TransactionParty {
  id: string | null;
  name: string;
  type: 'business' | 'influencer' | 'external' | 'escrow' | 'platform' | 'bank_account';
  handle?: string;
}

export interface Campaign {
  id: string;
  name: string;
}

export interface TransactionStats {
  totalVolume: number;
  todayVolume: number;
  pendingAmount: number;
  monthlyRevenue: number;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2026-000147',
    type: 'escrow_release',
    category: 'campaign_payment',
    status: 'completed',
    amount: 15000,
    commission: 900,
    netAmount: 14100,
    currency: 'SAR',
    from: { id: 'BUS-5678', name: 'TechStart Inc', type: 'business' },
    to: { id: 'INF-1234', name: 'Noura Al-Rashid', handle: '@noura_style', type: 'influencer' },
    campaign: { id: 'CMP-2026-089', name: 'Ramadan Collection 2026' },
    transferRef: 'JISOR-2891-001',
    createdAt: '2026-01-07T10:30:00',
    completedAt: '2026-01-07T10:32:00',
    description: 'Content approved - payment released to influencer',
  },
  {
    id: 'TXN-2026-000146',
    type: 'wallet_deposit',
    category: 'wallet_ops',
    status: 'completed',
    amount: 50000,
    commission: 0,
    netAmount: 50000,
    currency: 'SAR',
    from: { id: null, name: 'Bank Transfer', type: 'external' },
    to: { id: 'BUS-5678', name: 'TechStart Inc', type: 'business' },
    campaign: null,
    transferRef: 'BNK-REF-445566',
    paymentMethod: 'bank_transfer',
    createdAt: '2026-01-07T09:15:00',
    completedAt: '2026-01-07T09:15:00',
    description: 'Wallet top-up via bank transfer',
  },
  {
    id: 'TXN-2026-000145',
    type: 'escrow_deposit',
    category: 'campaign_payment',
    status: 'completed',
    amount: 45000,
    commission: 0,
    netAmount: 45000,
    currency: 'SAR',
    from: { id: 'BUS-7890', name: 'Luxury Brands SA', type: 'business' },
    to: { id: null, name: 'Campaign Escrow', type: 'escrow' },
    campaign: { id: 'CMP-2026-091', name: 'Spring Fashion Launch' },
    createdAt: '2026-01-07T08:45:00',
    completedAt: '2026-01-07T08:45:00',
    description: 'Funds reserved for campaign',
  },
  {
    id: 'TXN-2026-000144',
    type: 'commission_collected',
    category: 'commission',
    status: 'completed',
    amount: 1350,
    commission: 0,
    netAmount: 1350,
    currency: 'SAR',
    from: { id: 'BUS-6789', name: 'Gulf Retail LLC', type: 'business' },
    to: { id: null, name: 'JISOR Platform', type: 'platform' },
    campaign: { id: 'CMP-2026-085', name: 'Winter Sale Campaign' },
    createdAt: '2026-01-06T16:20:00',
    completedAt: '2026-01-06T16:20:00',
    description: 'Platform commission (3% from business)',
  },
  {
    id: 'TXN-2026-000143',
    type: 'escrow_release',
    category: 'campaign_payment',
    status: 'completed',
    amount: 22500,
    commission: 1350,
    netAmount: 21150,
    currency: 'SAR',
    from: { id: 'BUS-6789', name: 'Gulf Retail LLC', type: 'business' },
    to: { id: 'INF-2345', name: 'Ahmed Al-Farsi', handle: '@ahmed_lifestyle', type: 'influencer' },
    campaign: { id: 'CMP-2026-085', name: 'Winter Sale Campaign' },
    transferRef: 'JISOR-2890-001',
    createdAt: '2026-01-06T16:18:00',
    completedAt: '2026-01-06T16:20:00',
    description: 'Content approved - payment released to influencer',
  },
  {
    id: 'TXN-2026-000142',
    type: 'wallet_withdrawal',
    category: 'wallet_ops',
    status: 'completed',
    amount: 25000,
    commission: 0,
    netAmount: 25000,
    currency: 'SAR',
    from: { id: 'BUS-7890', name: 'Luxury Brands SA', type: 'business' },
    to: { id: null, name: 'SA55 1000 **** **** 5432', type: 'bank_account' },
    campaign: null,
    transferRef: 'WTH-2026-0089',
    paymentMethod: 'bank_transfer',
    createdAt: '2026-01-06T14:30:00',
    completedAt: '2026-01-06T15:45:00',
    description: 'Withdrawal to business bank account',
  },
  {
    id: 'TXN-2026-000141',
    type: 'refund_to_wallet',
    category: 'refund',
    status: 'completed',
    amount: 18000,
    commission: 0,
    netAmount: 18000,
    currency: 'SAR',
    from: { id: null, name: 'Campaign Escrow', type: 'escrow' },
    to: { id: 'BUS-5678', name: 'TechStart Inc', type: 'business' },
    campaign: { id: 'CMP-2026-082', name: 'Cancelled Tech Review' },
    createdAt: '2026-01-06T11:00:00',
    completedAt: '2026-01-06T11:00:00',
    description: 'Campaign cancelled - escrow returned to wallet',
    relatedDispute: 'DSP-2026-012',
  },
  {
    id: 'TXN-2026-000140',
    type: 'escrow_release',
    category: 'campaign_payment',
    status: 'pending',
    amount: 8500,
    commission: 510,
    netAmount: 7990,
    currency: 'SAR',
    from: { id: 'BUS-5678', name: 'TechStart Inc', type: 'business' },
    to: { id: 'INF-3456', name: 'Sara Al-Mutairi', handle: '@sara_tech', type: 'influencer' },
    campaign: { id: 'CMP-2026-089', name: 'Ramadan Collection 2026' },
    createdAt: '2026-01-07T11:00:00',
    description: 'Content approved - awaiting bank transfer',
  },
  {
    id: 'TXN-2026-000139',
    type: 'escrow_release',
    category: 'campaign_payment',
    status: 'failed',
    amount: 12000,
    commission: 720,
    netAmount: 11280,
    currency: 'SAR',
    from: { id: 'BUS-6789', name: 'Gulf Retail LLC', type: 'business' },
    to: { id: 'INF-4567', name: 'Khalid Al-Dosari', handle: '@khalid_reviews', type: 'influencer' },
    campaign: { id: 'CMP-2026-085', name: 'Winter Sale Campaign' },
    createdAt: '2026-01-05T09:30:00',
    description: 'Transfer failed - invalid IBAN',
    failureReason: 'Invalid IBAN format',
  },
  {
    id: 'TXN-2026-000138',
    type: 'partial_refund',
    category: 'refund',
    status: 'completed',
    amount: 5000,
    commission: 0,
    netAmount: 5000,
    currency: 'SAR',
    from: { id: null, name: 'Campaign Escrow', type: 'escrow' },
    to: { id: 'BUS-7890', name: 'Luxury Brands SA', type: 'business' },
    campaign: { id: 'CMP-2026-078', name: 'Holiday Special' },
    createdAt: '2026-01-04T14:00:00',
    completedAt: '2026-01-04T14:00:00',
    description: 'Partial refund - dispute resolution (50%)',
    relatedDispute: 'DSP-2026-008',
  },
];

export const transactionStats: TransactionStats = {
  totalVolume: 2450000,
  todayVolume: 125000,
  pendingAmount: 45500,
  monthlyRevenue: 185000,
};
