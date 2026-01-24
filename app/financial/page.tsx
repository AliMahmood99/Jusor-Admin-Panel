/**
 * Financial Management Page
 * Complete financial management module with transactions list, detail view, and revenue reports
 */

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import AdminDropdown from '@/components/layout/AdminDropdown';
import { Icons, IconProps } from '@/components/common/Icons';

// ============================================
// TYPES
// ============================================

type TransactionType = 'escrow_release' | 'escrow_deposit' | 'wallet_deposit' | 'wallet_withdrawal' | 'commission_collected' | 'refund_to_wallet' | 'partial_refund';
type TransactionStatus = 'completed' | 'pending' | 'processing' | 'failed';
type ChartMetric = 'revenue' | 'commissions' | 'transactions';
type TimePeriod = 'daily' | 'weekly' | 'monthly';

interface TransactionTypeConfig {
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  bgColor: string;
  textColor: string;
  iconBg: string;
}

interface StatusConfig {
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  bgColor: string;
  textColor: string;
}

type TransactionCategory = 'campaign_payment' | 'wallet_ops' | 'commission' | 'refund';
type PartyType = 'business' | 'influencer' | 'external' | 'escrow' | 'platform' | 'bank_account';

interface TransactionParty {
  id: string | null;
  name: string;
  type: PartyType;
  handle?: string;
}

interface TransactionCampaign {
  id: string;
  name: string;
}

interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  status: TransactionStatus;
  amount: number;
  commission: number;
  netAmount: number;
  currency: string;
  from: TransactionParty;
  to: TransactionParty;
  campaign: TransactionCampaign | null;
  transferRef?: string;
  paymentMethod?: string;
  createdAt: string;
  completedAt?: string;
  description: string;
  relatedDispute?: string;
  failureReason?: string;
}

interface FilterState {
  search: string;
  category: TransactionCategory | 'all';
  status: TransactionStatus | 'all';
  dateFrom: string;
  dateTo: string;
}

interface PeriodDataItem {
  label: string;
  revenue: number;
  commissions: number;
  transactions: number;
}

interface PeriodData {
  data: PeriodDataItem[];
  prevData?: PeriodDataItem[];
}

interface BreakdownSegment {
  label: string;
  value: number;
  color: string;
  amount?: number;
}

interface RevenueDataItem {
  label: string;
  revenue: number;
  transactions: number;
  volume: number;
  commissions?: number;
}

interface RevenueTimePeriod {
  totalRevenue: number;
  prevRevenue: number;
  totalTransactions: number;
  totalVolume: number;
  data: RevenueDataItem[];
  prevData?: RevenueDataItem[];
}

interface ColorClasses {
  bg: string;
  text: string;
  border?: string;
  iconBg?: string;
}

interface TransactionFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

interface TransactionsListProps {
  onSelectTransaction: (transaction: Transaction) => void;
  onNavigateToReports: () => void;
}

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

interface RevenueReportsProps {
  onBack: () => void;
}

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Transaction Type Configuration
const getTransactionTypeConfig = (type: string): TransactionTypeConfig => {
  const config: Record<string, TransactionTypeConfig> = {
    escrow_release: {
      label: 'Escrow Release',
      icon: Icons.arrowUpRight,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
    },
    escrow_deposit: {
      label: 'Escrow Deposit',
      icon: Icons.arrowDownLeft,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
    },
    wallet_deposit: {
      label: 'Wallet Deposit',
      icon: Icons.wallet,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    wallet_withdrawal: {
      label: 'Wallet Withdrawal',
      icon: Icons.banknote,
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-600',
      iconBg: 'bg-slate-200',
    },
    commission_collected: {
      label: 'Commission',
      icon: Icons.percent,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
    },
    refund_to_wallet: {
      label: 'Refund',
      icon: Icons.arrowLeftRight,
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
    },
    partial_refund: {
      label: 'Partial Refund',
      icon: Icons.arrowLeftRight,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
    },
  };
  return config[type] || { label: type, icon: Icons.dollarSign, bgColor: 'bg-slate-50', textColor: 'text-slate-600', iconBg: 'bg-slate-100' };
};

// Status Configuration
const getStatusConfig = (status: string): StatusConfig => {
  const config: Record<string, StatusConfig> = {
    completed: {
      label: 'Completed',
      icon: Icons.checkCircle,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    pending: {
      label: 'Pending',
      icon: Icons.clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    processing: {
      label: 'Processing',
      icon: Icons.clock,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    failed: {
      label: 'Failed',
      icon: Icons.xCircle,
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
    },
  };
  return config[status] || { label: status, icon: Icons.alertCircle, bgColor: 'bg-slate-50', textColor: 'text-slate-600' };
};

// ============================================
// MOCK DATA
// ============================================
const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2026-000147',
    type: 'escrow_release' as const,
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

// Summary stats
const summaryStats = {
  totalVolume: 2450000,
  todayVolume: 125000,
  pendingAmount: 45500,
  monthlyRevenue: 185000,
};

// Period-based Revenue Data
const periodData: Record<string, RevenueTimePeriod> = {
  week: {
    totalRevenue: 42500,
    prevRevenue: 38200,
    totalTransactions: 89,
    totalVolume: 708000,
    data: [
      { label: 'Mon', revenue: 5200, transactions: 11, volume: 87000 },
      { label: 'Tue', revenue: 6100, transactions: 13, volume: 102000 },
      { label: 'Wed', revenue: 5800, transactions: 12, volume: 97000 },
      { label: 'Thu', revenue: 7200, transactions: 15, volume: 120000 },
      { label: 'Fri', revenue: 6500, transactions: 14, volume: 108000 },
      { label: 'Sat', revenue: 5900, transactions: 12, volume: 98000 },
      { label: 'Sun', revenue: 5800, transactions: 12, volume: 96000 },
    ],
    prevData: [
      { label: 'Mon', revenue: 4800, transactions: 10, volume: 80000 },
      { label: 'Tue', revenue: 5500, transactions: 11, volume: 92000 },
      { label: 'Wed', revenue: 5200, transactions: 11, volume: 87000 },
      { label: 'Thu', revenue: 6800, transactions: 14, volume: 113000 },
      { label: 'Fri', revenue: 6100, transactions: 13, volume: 102000 },
      { label: 'Sat', revenue: 5100, transactions: 11, volume: 85000 },
      { label: 'Sun', revenue: 4700, transactions: 10, volume: 78000 },
    ],
  },
  month: {
    totalRevenue: 185000,
    prevRevenue: 156000,
    totalTransactions: 412,
    totalVolume: 3080000,
    data: [
      { label: 'Week 1', revenue: 42000, transactions: 95, volume: 700000 },
      { label: 'Week 2', revenue: 48000, transactions: 108, volume: 800000 },
      { label: 'Week 3', revenue: 45000, transactions: 102, volume: 750000 },
      { label: 'Week 4', revenue: 50000, transactions: 107, volume: 830000 },
    ],
    prevData: [
      { label: 'Week 1', revenue: 35000, transactions: 82, volume: 583000 },
      { label: 'Week 2', revenue: 41000, transactions: 94, volume: 683000 },
      { label: 'Week 3', revenue: 38000, transactions: 88, volume: 633000 },
      { label: 'Week 4', revenue: 42000, transactions: 95, volume: 700000 },
    ],
  },
  quarter: {
    totalRevenue: 520000,
    prevRevenue: 425000,
    totalTransactions: 1156,
    totalVolume: 8670000,
    data: [
      { label: 'Oct', revenue: 156000, transactions: 356, volume: 2600000 },
      { label: 'Nov', revenue: 178000, transactions: 398, volume: 2970000 },
      { label: 'Dec', revenue: 186000, transactions: 402, volume: 3100000 },
    ],
    prevData: [
      { label: 'Jul', revenue: 132000, transactions: 312, volume: 2200000 },
      { label: 'Aug', revenue: 142000, transactions: 328, volume: 2370000 },
      { label: 'Sep', revenue: 151000, transactions: 345, volume: 2520000 },
    ],
  },
  year: {
    totalRevenue: 2150000,
    prevRevenue: 1780000,
    totalTransactions: 4820,
    totalVolume: 35800000,
    data: [
      { label: 'Jan', revenue: 145000, transactions: 328, volume: 2420000 },
      { label: 'Feb', revenue: 152000, transactions: 345, volume: 2530000 },
      { label: 'Mar', revenue: 168000, transactions: 378, volume: 2800000 },
      { label: 'Apr', revenue: 175000, transactions: 392, volume: 2920000 },
      { label: 'May', revenue: 182000, transactions: 405, volume: 3030000 },
      { label: 'Jun', revenue: 178000, transactions: 398, volume: 2970000 },
      { label: 'Jul', revenue: 185000, transactions: 412, volume: 3080000 },
      { label: 'Aug', revenue: 192000, transactions: 425, volume: 3200000 },
      { label: 'Sep', revenue: 188000, transactions: 418, volume: 3130000 },
      { label: 'Oct', revenue: 195000, transactions: 432, volume: 3250000 },
      { label: 'Nov', revenue: 198000, transactions: 438, volume: 3300000 },
      { label: 'Dec', revenue: 192000, transactions: 449, volume: 3170000 },
    ],
    prevData: [
      { label: 'Jan', revenue: 125000, transactions: 290, volume: 2080000 },
      { label: 'Feb', revenue: 132000, transactions: 305, volume: 2200000 },
      { label: 'Mar', revenue: 145000, transactions: 332, volume: 2420000 },
      { label: 'Apr', revenue: 152000, transactions: 348, volume: 2530000 },
      { label: 'May', revenue: 158000, transactions: 360, volume: 2630000 },
      { label: 'Jun', revenue: 155000, transactions: 355, volume: 2580000 },
      { label: 'Jul', revenue: 162000, transactions: 368, volume: 2700000 },
      { label: 'Aug', revenue: 168000, transactions: 382, volume: 2800000 },
      { label: 'Sep', revenue: 165000, transactions: 375, volume: 2750000 },
      { label: 'Oct', revenue: 172000, transactions: 390, volume: 2870000 },
      { label: 'Nov', revenue: 175000, transactions: 395, volume: 2920000 },
      { label: 'Dec', revenue: 171000, transactions: 388, volume: 2850000 },
    ],
  },
};

// Breakdown data by different views
const breakdownData: Record<string, BreakdownSegment[]> = {
  source: [
    { label: 'Business Commission', value: 52, color: '#3B82F6', amount: 96200 },
    { label: 'Influencer Commission', value: 48, color: '#10B981', amount: 88800 },
  ],
  category: [
    { label: 'Fashion', value: 35, color: '#EC4899', amount: 64750 },
    { label: 'Tech', value: 25, color: '#3B82F6', amount: 46250 },
    { label: 'Food', value: 20, color: '#F59E0B', amount: 37000 },
    { label: 'Beauty', value: 12, color: '#8B5CF6', amount: 22200 },
    { label: 'Other', value: 8, color: '#64748B', amount: 14800 },
  ],
};

// Top campaigns data
const topCampaigns = [
  { name: 'Ramadan Collection 2026', business: 'Luxury Brands SA', revenue: 12500, percent: 6.8 },
  { name: 'Tech Product Launch', business: 'TechStart Inc', revenue: 9800, percent: 5.3 },
  { name: 'Winter Fashion Week', business: 'Gulf Retail LLC', revenue: 8200, percent: 4.4 },
  { name: 'Food Festival Promo', business: 'Fresh Bites Cafe', revenue: 6500, percent: 3.5 },
  { name: 'Beauty Awards 2026', business: 'Glow Cosmetics', revenue: 5800, percent: 3.1 },
];

// ============================================
// STATS CARDS COMPONENT
// ============================================
const StatsCards = () => {
  const stats = [
    {
      label: 'Total Volume (MTD)',
      value: `SAR ${formatCurrency(summaryStats.totalVolume)}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: Icons.dollarSign,
      color: 'blue',
    },
    {
      label: "Today's Volume",
      value: `SAR ${formatCurrency(summaryStats.todayVolume)}`,
      change: '+8.2%',
      changeType: 'positive',
      icon: Icons.trendingUp,
      color: 'emerald',
    },
    {
      label: 'Pending Transactions',
      value: `SAR ${formatCurrency(summaryStats.pendingAmount)}`,
      count: '12 txns',
      icon: Icons.clock,
      color: 'amber',
    },
    {
      label: 'Platform Revenue (MTD)',
      value: `SAR ${formatCurrency(summaryStats.monthlyRevenue)}`,
      change: '+18.4%',
      changeType: 'positive',
      icon: Icons.receipt,
      color: 'purple',
    },
  ];

  const colorClasses: Record<string, ColorClasses> = {
    blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', text: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', text: 'text-amber-600' },
    purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', text: 'text-purple-600' },
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const colors = colorClasses[stat.color];
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              {stat.change && (
                <span className={`text-xs font-medium flex items-center gap-1 ${stat.changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.changeType === 'positive' ? <Icons.trendingUp className="w-3 h-3" /> : <Icons.trendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              )}
              {(stat as any).count && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  {(stat as any).count}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// FILTERS COMPONENT
// ============================================
const TransactionFilters = ({ filters, setFilters }: TransactionFiltersProps) => {
  const categories: { id: TransactionCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Transactions' },
    { id: 'campaign_payment', label: 'Campaign Payments' },
    { id: 'commission', label: 'Commissions' },
    { id: 'refund', label: 'Refunds' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.id })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.category === cat.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Side Filters */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-64 h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as TransactionStatus | 'all' })}
            className="h-10 px-4 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Date Range */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200">
            <Icons.calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="text-sm text-slate-600 border-none focus:outline-none w-28"
            />
            <span className="text-slate-400">→</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="text-sm text-slate-600 border-none focus:outline-none w-28"
            />
          </div>

          {/* Export */}
          <button className="h-10 px-4 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <Icons.download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TRANSACTIONS TABLE COMPONENT
// ============================================
const TransactionsTable = ({ transactions, onSelectTransaction }: TransactionsTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 w-12">#</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Transaction ID</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Type</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">From → To</th>
            <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Amount</th>
            <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Commission</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Date</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
            <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 w-16">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((txn: Transaction, index: number) => {
            const typeConfig = getTransactionTypeConfig(txn.type);
            const statusConfig = getStatusConfig(txn.status);

            return (
              <tr
                key={txn.id}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onSelectTransaction(txn)}
              >
                {/* Row Number */}
                <td className="px-4 py-4">
                  <span className="text-xs font-medium text-slate-400">{index + 1}</span>
                </td>

                {/* Transaction ID */}
                <td className="px-4 py-4">
                  <p className="text-sm font-mono font-medium text-slate-900">{txn.id}</p>
                  {txn.campaign && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Icons.megaphone className="w-3 h-3" />
                      {txn.campaign.name}
                    </p>
                  )}
                </td>

                {/* Type */}
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                    <typeConfig.icon className="w-3.5 h-3.5" />
                    {typeConfig.label}
                  </span>
                </td>

                {/* From → To */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {txn.from.type === 'business' ? (
                        <Icons.building className="w-4 h-4 text-blue-500" />
                      ) : txn.from.type === 'influencer' ? (
                        <Icons.user className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Icons.banknote className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-700 max-w-[100px] truncate">{txn.from.name}</span>
                    </div>
                    <Icons.arrowRight className="w-4 h-4 text-slate-300" />
                    <div className="flex items-center gap-1.5">
                      {txn.to.type === 'business' ? (
                        <Icons.building className="w-4 h-4 text-blue-500" />
                      ) : txn.to.type === 'influencer' ? (
                        <Icons.user className="w-4 h-4 text-purple-500" />
                      ) : txn.to.type === 'escrow' ? (
                        <Icons.wallet className="w-4 h-4 text-amber-500" />
                      ) : txn.to.type === 'platform' ? (
                        <Icons.receipt className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Icons.creditCard className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-700 max-w-[100px] truncate">{txn.to.name}</span>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-4 text-right">
                  <p className="text-sm font-semibold text-slate-900">SAR {formatCurrency(txn.amount)}</p>
                  {txn.netAmount !== txn.amount && (
                    <p className="text-xs text-emerald-600">Net: SAR {formatCurrency(txn.netAmount)}</p>
                  )}
                </td>

                {/* Commission */}
                <td className="px-4 py-4 text-right">
                  {txn.commission > 0 ? (
                    <p className="text-sm text-purple-600 font-medium">
                      SAR {formatCurrency(txn.commission)}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">-</p>
                  )}
                </td>

                {/* Date */}
                <td className="px-4 py-4">
                  <p className="text-sm text-slate-900">{formatDate(txn.createdAt)}</p>
                  <p className="text-xs text-slate-500">{formatTime(txn.createdAt)}</p>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                    <statusConfig.icon className="w-3.5 h-3.5" />
                    {statusConfig.label}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTransaction(txn);
                    }}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Icons.eye className="w-4 h-4 text-slate-500" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">1-{transactions.length}</span> of <span className="font-medium text-slate-700">147</span> transactions
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors disabled:opacity-50" disabled>
            <Icons.arrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">2</button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">3</button>
          <span className="text-slate-400">...</span>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">15</button>
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors">
            <Icons.arrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TRANSACTIONS LIST COMPONENT
// ============================================
const TransactionsList = ({ onSelectTransaction, onNavigateToReports }: TransactionsListProps) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    status: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((txn) => {
    // Exclude wallet operations - they belong in Wallet Operations tab only
    if (txn.type === 'wallet_deposit' || txn.type === 'wallet_withdrawal') return false;

    if (filters.category !== 'all' && txn.category !== filters.category) return false;
    if (filters.status !== 'all' && txn.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesId = txn.id.toLowerCase().includes(searchLower);
      const matchesFrom = txn.from.name.toLowerCase().includes(searchLower);
      const matchesTo = txn.to.name.toLowerCase().includes(searchLower);
      const matchesCampaign = txn.campaign?.name.toLowerCase().includes(searchLower);
      if (!matchesId && !matchesFrom && !matchesTo && !matchesCampaign) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Financial Management</h1>
          <p className="text-sm text-gray-500">Monitor all platform transactions and revenue</p>
        </div>
        <div className="flex items-center gap-3">
          {onNavigateToReports && (
            <button
              onClick={onNavigateToReports}
              className="h-9 px-4 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 flex items-center gap-2 transition-colors"
            >
              <Icons.pieChart className="w-4 h-4" />
              Reports
            </button>
          )}
          <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-600 flex items-center gap-2 transition-colors">
            <Icons.refresh className="w-4 h-4" />
            Refresh
          </button>
          <div className="w-px h-8 bg-gray-200" />
          <AdminDropdown />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <StatsCards />
        <TransactionFilters filters={filters} setFilters={setFilters} />
        <TransactionsTable
          transactions={filteredTransactions}
          onSelectTransaction={onSelectTransaction}
        />
      </div>
    </div>
  );
};

// ============================================
// TRANSACTION DETAIL COMPONENT
// ============================================
const TransactionDetail = ({ transaction, onBack }: any) => {
  const typeConfig = getTransactionTypeConfig(transaction.type);
  const statusConfig = getStatusConfig(transaction.status);
  const [adminNote, setAdminNote] = useState('');
  const [copied, setCopied] = useState(false);

  // Timeline events
  const timeline = [
    {
      time: transaction.completedAt || transaction.createdAt,
      event: transaction.status === 'completed' ? 'Transaction completed successfully' :
             transaction.status === 'pending' ? 'Awaiting processing' : 'Transaction failed',
      type: transaction.status,
    },
    ...(transaction.transferRef ? [{
      time: transaction.createdAt,
      event: `Transfer reference generated: ${transaction.transferRef}`,
      type: 'info',
    }] : []),
    {
      time: new Date(new Date(transaction.createdAt).getTime() - 60000).toISOString(),
      event: transaction.description,
      type: 'action',
    },
    ...(transaction.campaign ? [{
      time: new Date(new Date(transaction.createdAt).getTime() - 3600000).toISOString(),
      event: `Related campaign: ${transaction.campaign.name}`,
      type: 'info',
    }] : []),
  ];

  // Copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <Icons.arrowLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900 font-mono">{transaction.id}</h1>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  <statusConfig.icon className="w-4 h-4" />
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-slate-500 mt-1">{transaction.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Icons.printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Icons.download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={() => handleCopy(transaction.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <Icons.copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy ID'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="col-span-2 space-y-6">
            {/* Transaction Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Transaction Summary</h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeConfig.iconBg}`}>
                      <typeConfig.icon className={`w-6 h-6 ${typeConfig.textColor}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Type</p>
                      <p className={`font-semibold ${typeConfig.textColor}`}>{typeConfig.label}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Gross Amount</span>
                      <span className="font-semibold text-slate-900">SAR {formatCurrency(transaction.amount)}</span>
                    </div>
                    {transaction.commission > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Platform Fee (6%)</span>
                        <span className="font-medium text-purple-600">- SAR {formatCurrency(transaction.commission)}</span>
                      </div>
                    )}
                    <div className="border-t-2 border-slate-200 pt-3 flex justify-between">
                      <span className="text-slate-700 font-medium">Net Amount</span>
                      <span className="font-bold text-xl text-emerald-600">SAR {formatCurrency(transaction.netAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {transaction.campaign && (
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-blue-600 mb-1">Campaign</p>
                      <button className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold">
                        {transaction.campaign.name}
                        <Icons.externalLink className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-blue-500 mt-1">{transaction.campaign.id}</p>
                    </div>
                  )}
                  {transaction.transferRef && (
                    <div>
                      <p className="text-sm text-slate-500 mb-2">Transfer Reference</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-slate-100 px-4 py-2.5 rounded-xl text-sm font-mono text-slate-700">
                          {transaction.transferRef}
                        </code>
                        <button
                          onClick={() => handleCopy(transaction.transferRef)}
                          className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                          <Icons.copy className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  )}
                  {transaction.paymentMethod && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Payment Method</p>
                      <p className="font-medium text-slate-900 capitalize">{transaction.paymentMethod.replace('_', ' ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Parties Involved */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Parties Involved</h2>

              <div className="flex items-center gap-6">
                {/* From */}
                <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">From</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${
                      transaction.from.type === 'business' ? 'bg-blue-500 text-white' :
                      transaction.from.type === 'influencer' ? 'bg-purple-500 text-white' :
                      'bg-slate-300 text-slate-600'
                    }`}>
                      {transaction.from.type === 'business' ? <Icons.building className="w-7 h-7" /> :
                       transaction.from.type === 'influencer' ? <Icons.user className="w-7 h-7" /> :
                       <Icons.banknote className="w-7 h-7" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">{transaction.from.name}</p>
                      <p className="text-sm text-slate-500 capitalize">{transaction.from.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  {transaction.from.id && (
                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm">
                      View Profile <Icons.externalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Icons.arrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* To */}
                <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">To</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${
                      transaction.to.type === 'business' ? 'bg-blue-500 text-white' :
                      transaction.to.type === 'influencer' ? 'bg-purple-500 text-white' :
                      transaction.to.type === 'escrow' ? 'bg-amber-500 text-white' :
                      transaction.to.type === 'platform' ? 'bg-emerald-500 text-white' :
                      'bg-slate-300 text-slate-600'
                    }`}>
                      {transaction.to.type === 'business' ? <Icons.building className="w-7 h-7" /> :
                       transaction.to.type === 'influencer' ? <Icons.user className="w-7 h-7" /> :
                       transaction.to.type === 'escrow' ? <Icons.wallet className="w-7 h-7" /> :
                       transaction.to.type === 'platform' ? <Icons.receipt className="w-7 h-7" /> :
                       <Icons.creditCard className="w-7 h-7" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-lg">{transaction.to.name}</p>
                      <p className="text-sm text-slate-500 capitalize">{transaction.to.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  {transaction.to.id && (
                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm">
                      View Profile <Icons.externalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h2>

              <div className="space-y-1">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        item.type === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                        item.type === 'pending' ? 'bg-amber-500 border-amber-500' :
                        item.type === 'failed' ? 'bg-rose-500 border-rose-500' :
                        'bg-white border-slate-300'
                      }`} />
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-medium text-slate-900">{item.event}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatDateTime(item.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Admin Notes</h2>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add internal note for audit trail..."
                className="w-full h-28 px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-slate-400">Notes are internal and not visible to users</p>
                <button
                  disabled={!adminNote.trim()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Icons.send className="w-4 h-4" />
                  Save Note
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Info</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                    <statusConfig.icon className="w-4 h-4" />
                    {statusConfig.label}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Created</p>
                  <p className="text-sm font-medium text-slate-900">{formatDateTime(transaction.createdAt)}</p>
                </div>

                {transaction.completedAt && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Completed</p>
                    <p className="text-sm font-medium text-emerald-600">{formatDateTime(transaction.completedAt)}</p>
                  </div>
                )}

                {transaction.failureReason && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Failure Reason</p>
                    <p className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{transaction.failureReason}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Related Links</h3>

              <div className="space-y-2">
                {transaction.campaign && (
                  <button className="w-full text-left p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700 group-hover:text-blue-800">View Campaign</p>
                        <p className="text-xs text-blue-500">{transaction.campaign.id}</p>
                      </div>
                      <Icons.externalLink className="w-4 h-4 text-blue-400" />
                    </div>
                  </button>
                )}
                {transaction.from.id && (
                  <button className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">View {transaction.from.type === 'business' ? 'Business' : 'Influencer'}</p>
                        <p className="text-xs text-slate-500">{transaction.from.id}</p>
                      </div>
                      <Icons.externalLink className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                )}
                {transaction.to.id && (
                  <button className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">View {transaction.to.type === 'business' ? 'Business' : 'Influencer'}</p>
                        <p className="text-xs text-slate-500">{transaction.to.id}</p>
                      </div>
                      <Icons.externalLink className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                )}
                {transaction.relatedDispute && (
                  <button className="w-full text-left p-4 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-rose-700">View Related Dispute</p>
                        <p className="text-xs text-rose-500">{transaction.relatedDispute}</p>
                      </div>
                      <Icons.externalLink className="w-4 h-4 text-rose-400" />
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Documents</h3>

              {transaction.status === 'completed' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <Icons.fileText className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-700">Transfer Receipt</span>
                        <p className="text-xs text-slate-400">PDF • 45 KB</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icons.download className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Icons.fileText className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-700">Bank Confirmation</span>
                        <p className="text-xs text-slate-400">PDF • 32 KB</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icons.download className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icons.fileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No documents available</p>
                  <p className="text-xs text-slate-400 mt-1">Documents will appear after completion</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {transaction.status === 'pending' && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                <h3 className="text-sm font-semibold text-amber-800 mb-3">Pending Actions</h3>
                <div className="space-y-2">
                  <button className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                    <Icons.checkCircle className="w-4 h-4" />
                    Retry Transfer
                  </button>
                  <button className="w-full py-3 rounded-xl bg-white border border-amber-300 text-amber-700 text-sm font-medium hover:bg-amber-50 transition-colors">
                    Cancel Transaction
                  </button>
                </div>
              </div>
            )}

            {transaction.status === 'failed' && (
              <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6">
                <h3 className="text-sm font-semibold text-rose-800 mb-3">Failed Transaction</h3>
                <p className="text-sm text-rose-600 mb-4">This transaction failed and requires attention.</p>
                <div className="space-y-2">
                  <button className="w-full py-3 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                    <Icons.arrowLeftRight className="w-4 h-4" />
                    Retry with New IBAN
                  </button>
                  <button className="w-full py-3 rounded-xl bg-white border border-rose-300 text-rose-700 text-sm font-medium hover:bg-rose-50 transition-colors">
                    Refund to Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// REVENUE REPORTS COMPONENT
// ============================================
const RevenueReports = ({ onBack }: any) => {
  // State
  const [period, setPeriod] = useState('month');
  const [compareMode, setCompareMode] = useState(false);
  const [chartMetric, setChartMetric] = useState('revenue');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [breakdownView, setBreakdownView] = useState('source');
  const [dateRange, setDateRange] = useState({ from: '2025-10-01', to: '2026-01-31' });

  // Get current period data
  const currentData = periodData[period];
  const currentBreakdown = breakdownData[breakdownView];

  // Calculate max value for chart scaling
  const getMaxValue = () => {
    const values = currentData.data.map((d: any) => d[chartMetric]);
    if (compareMode && currentData.prevData) {
      values.push(...currentData.prevData.map((d: any) => d[chartMetric]));
    }
    return Math.max(...values);
  };

  // Get comparison value for a data point
  const getComparisonValue = (currentValue: number, index: number): number | null => {
    if (!compareMode || !currentData.prevData || !currentData.prevData[index]) return null;
    const prevItem = currentData.prevData[index];
    const value = chartMetric === 'revenue' ? prevItem.revenue :
                  chartMetric === 'commissions' ? (prevItem.commissions || 0) :
                  prevItem.transactions;
    return value;
  };

  // Handle bar click for drill-down
  const handleBarClick = (item: any, index: number) => {
    setSelectedMonth(selectedMonth === index ? null : index);
  };

  // Handle export
  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}...`);
    setShowExportMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <Icons.arrowLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-900">Revenue & Commission Reports</h1>
              <p className="text-sm text-slate-500 mt-0.5">Platform earnings analytics and insights</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white">
              <Icons.calendar className="w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="text-sm text-slate-600 border-none focus:outline-none w-28"
              />
              <span className="text-slate-400">→</span>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="text-sm text-slate-600 border-none focus:outline-none w-28"
              />
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              {['week', 'month', 'quarter', 'year'].map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setSelectedMonth(null); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    period === p
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            {/* Compare Toggle */}
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                compareMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Compare
            </button>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <Icons.download className="w-4 h-4" />
                Export
                <Icons.arrowDown className="w-3 h-3" />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-100"
                  >
                    <Icons.fileText className="w-4 h-4 text-rose-500" />
                    Export as PDF
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-100"
                  >
                    <Icons.fileText className="w-4 h-4 text-emerald-500" />
                    Export as Excel
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Icons.fileText className="w-4 h-4 text-blue-500" />
                    Export as CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Summary Cards - Interactive */}
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              label: `Total Revenue (${period === 'week' ? 'WTD' : period === 'month' ? 'MTD' : period === 'quarter' ? 'QTD' : 'YTD'})`,
              value: currentData.totalRevenue,
              prevValue: currentData.prevRevenue,
              icon: Icons.dollarSign,
              color: 'emerald',
              format: 'currency',
            },
            {
              label: 'Total Transactions',
              value: currentData.totalTransactions,
              prevValue: Math.round(currentData.totalTransactions * 0.85),
              icon: Icons.receipt,
              color: 'blue',
              format: 'number',
            },
            {
              label: 'Avg Commission',
              value: Math.round(currentData.totalRevenue / currentData.totalTransactions),
              prevValue: Math.round(currentData.prevRevenue / (currentData.totalTransactions * 0.85)),
              icon: Icons.percent,
              color: 'purple',
              format: 'currency',
            },
            {
              label: 'Total Volume',
              value: currentData.totalVolume,
              prevValue: Math.round(currentData.totalVolume * 0.82),
              icon: Icons.barChart,
              color: 'amber',
              format: 'currency',
            },
          ].map((stat, index) => {
            const growth = ((stat.value - stat.prevValue) / stat.prevValue * 100).toFixed(1);
            const isPositive = Number(growth) >= 0;

            const colorClasses: any = {
              emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
              blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
              purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
              amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
            };

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[stat.color].bg} group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-5 h-5 ${colorClasses[stat.color].text}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isPositive ? <Icons.trendingUp className="w-3 h-3" /> : <Icons.trendingDown className="w-3 h-3" />}
                    {isPositive ? '+' : ''}{growth}%
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.format === 'currency' ? `SAR ${formatCurrency(stat.value)}` : formatCurrency(stat.value)}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
                {compareMode && (
                  <p className="text-xs text-slate-400 mt-1">
                    vs {stat.format === 'currency' ? `SAR ${formatCurrency(stat.prevValue)}` : formatCurrency(stat.prevValue)} prev
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Performance Chart - Interactive */}
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Performance Over Time</h2>
                <p className="text-sm text-slate-500 mt-0.5">Track revenue and transaction trends</p>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'revenue', label: 'Revenue', icon: 'dollarSign' },
                  { id: 'transactions', label: 'Transactions', icon: 'receipt' },
                ].map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setChartMetric(metric.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      chartMetric === metric.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Bar Chart */}
            <div className="relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-slate-100" />
                <div className="border-b border-slate-100" />
                <div className="border-b border-slate-100" />
                <div className="border-b border-slate-100" />
              </div>

              <div className="h-64 flex items-end justify-between gap-4 relative z-10">
                {currentData.data.map((item: any, index: number) => {
                  const maxValue = getMaxValue();
                  const value = chartMetric === 'revenue' ? item.revenue : item.transactions;
                  const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                  const isHovered = hoveredBar === index;

                  return (
                    <div
                      key={item.label}
                      className="flex-1 flex flex-col items-center cursor-pointer group"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-xl text-xs whitespace-nowrap z-20 shadow-xl">
                          <p className="font-semibold text-sm mb-2">{item.label}</p>
                          <div className="space-y-1">
                            <p className="flex justify-between gap-4">
                              <span className="text-slate-400">Revenue:</span>
                              <span className="font-medium">SAR {formatCurrency(item.revenue)}</span>
                            </p>
                            <p className="flex justify-between gap-4">
                              <span className="text-slate-400">Transactions:</span>
                              <span className="font-medium">{item.transactions}</span>
                            </p>
                          </div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900" />
                        </div>
                      )}

                      {/* Bar */}
                      <div className="w-full flex justify-center" style={{ height: '180px' }}>
                        <div className="relative flex items-end h-full">
                          <div
                            className={`w-10 rounded-t-xl transition-all duration-300 ${
                              isHovered
                                ? 'bg-gradient-to-t from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30'
                                : 'bg-gradient-to-t from-blue-500 to-blue-400'
                            }`}
                            style={{ height: `${Math.max(height * 1.8, 4)}px` }}
                          />
                        </div>
                      </div>

                      {/* Label */}
                      <p className={`text-xs mt-3 transition-colors ${isHovered ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>
                        {item.label}
                      </p>

                      {/* Value */}
                      <p className={`text-sm font-semibold mt-1 ${isHovered ? 'text-blue-600' : 'text-slate-700'}`}>
                        {chartMetric === 'transactions'
                          ? item.transactions
                          : `${(item.revenue / 1000).toFixed(0)}K`
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Revenue Breakdown - Interactive Donut */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Breakdown</h2>

            {/* Breakdown Type Selector */}
            <div className="flex items-center gap-1 mb-6 bg-slate-100 rounded-lg p-1">
              {[
                { id: 'source', label: 'Source' },
                { id: 'category', label: 'Category' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setBreakdownView(type.id); setHoveredSegment(null); }}
                  className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                    breakdownView === type.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Interactive Donut Chart */}
            <div className="flex justify-center mb-6">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {currentBreakdown.map((segment: any, index: number) => {
                    const prevTotal = currentBreakdown.slice(0, index).reduce((sum: number, s: any) => sum + s.value, 0);
                    const isHovered = hoveredSegment === index;

                    return (
                      <circle
                        key={segment.label}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth={isHovered ? "26" : "22"}
                        strokeDasharray={`${segment.value * 3.77} ${(100 - segment.value) * 3.77}`}
                        strokeDashoffset={`${-prevTotal * 3.77}`}
                        className="transition-all duration-300 cursor-pointer"
                        style={{
                          filter: isHovered ? 'brightness(1.1)' : 'none',
                          opacity: hoveredSegment !== null && !isHovered ? 0.4 : 1
                        }}
                        onMouseEnter={() => setHoveredSegment(index)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {hoveredSegment !== null ? (
                      <>
                        <p className="text-2xl font-bold text-slate-900">{currentBreakdown[hoveredSegment].value}%</p>
                        <p className="text-xs text-slate-500 max-w-[80px] truncate">{currentBreakdown[hoveredSegment].label}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-bold text-slate-900">SAR</p>
                        <p className="text-sm text-slate-500">{formatCurrency(Math.round(currentData.totalRevenue / 1000))}K</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend with amounts */}
            <div className="space-y-2">
              {currentBreakdown.map((segment: any, index: number) => (
                <div
                  key={segment.label}
                  className={`flex items-center justify-between p-2.5 rounded-lg transition-all cursor-pointer ${
                    hoveredSegment === index ? 'bg-slate-100 scale-[1.02]' : 'hover:bg-slate-50'
                  }`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full transition-transform"
                      style={{
                        backgroundColor: segment.color,
                        transform: hoveredSegment === index ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                    <span className="text-sm text-slate-700">{segment.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">{segment.value}%</span>
                    <span className="text-xs text-slate-500 ml-2">SAR {formatCurrency(segment.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Campaigns */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Top Campaigns by Revenue</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</button>
            </div>

            <div className="space-y-3">
              {topCampaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-amber-100 text-amber-600' :
                      index === 1 ? 'bg-slate-200 text-slate-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{campaign.name}</p>
                      <p className="text-xs text-slate-500">{campaign.business}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">SAR {formatCurrency(campaign.revenue)}</p>
                    <p className="text-xs text-slate-500">{campaign.percent}% of total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Period Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Period Comparison</h2>

            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase pb-3">Period</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase pb-3">Revenue</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase pb-3">Txns</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase pb-3">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentData.data.slice(0, 6).map((item: any, index: number) => {
                  const prevValue = currentData.prevData?.[index]?.revenue || item.revenue * 0.85;
                  const growth = ((item.revenue - prevValue) / prevValue * 100).toFixed(1);
                  const isPositive = Number(growth) >= 0;

                  return (
                    <tr key={index} className="hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="py-3 text-sm font-medium text-slate-900">{item.label}</td>
                      <td className="py-3 text-sm text-right text-slate-700">SAR {formatCurrency(item.revenue)}</td>
                      <td className="py-3 text-sm text-right text-slate-700">{item.transactions}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isPositive ? <Icons.trendingUp className="w-3 h-3" /> : <Icons.trendingDown className="w-3 h-3" />}
                          {isPositive ? '+' : ''}{growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200">
                  <td className="py-3 text-sm font-bold text-slate-900">Total</td>
                  <td className="py-3 text-sm text-right font-bold text-slate-900">SAR {formatCurrency(currentData.totalRevenue)}</td>
                  <td className="py-3 text-sm text-right font-bold text-slate-900">{currentData.totalTransactions}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <Icons.trendingUp className="w-3 h-3" />
                      +{((currentData.totalRevenue - currentData.prevRevenue) / currentData.prevRevenue * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function FinancialPage() {
  const [activeNav, setActiveNav] = useState('financial');
  const [view, setView] = useState<'list' | 'detail' | 'reports'>('list');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const handleSelectTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedTransaction(null);
  };

  const handleNavigateToReports = () => {
    setView('reports');
  };

  const handleBackFromReports = () => {
    setView('list');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar active={activeNav} setActive={setActiveNav} />

      {/* Main Content */}
      {view === 'list' && (
        <TransactionsList
          onSelectTransaction={handleSelectTransaction}
          onNavigateToReports={handleNavigateToReports}
        />
      )}

      {view === 'detail' && selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onBack={handleBack}
        />
      )}

      {view === 'reports' && (
        <RevenueReports
          onBack={handleBackFromReports}
        />
      )}
    </div>
  );
}
