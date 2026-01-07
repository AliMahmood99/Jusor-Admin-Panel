/**
 * Transaction Utility Functions
 * Helper functions for formatting and configuring transaction data
 */

import { Icons } from '@/components/common/Icons';
import type { Transaction } from './mockTransactionData';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export interface TransactionTypeConfig {
  label: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
  iconBg: string;
}

export const getTransactionTypeConfig = (type: Transaction['type']): TransactionTypeConfig => {
  const config: Record<Transaction['type'], TransactionTypeConfig> = {
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
  return config[type];
};

export interface StatusConfig {
  label: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  textColor: string;
}

export const getStatusConfig = (status: Transaction['status']): StatusConfig => {
  const config: Record<Transaction['status'], StatusConfig> = {
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
  return config[status];
};
