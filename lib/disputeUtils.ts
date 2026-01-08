/**
 * Dispute Utility Functions
 * Helper functions for dispute management
 */

import type { Dispute, DisputeStatus, DisputeCategory, ContractRequirement } from '@/types';

/**
 * Calculate how many days a dispute has been open
 */
export function calculateDaysOpen(openedAt: string): number {
  const opened = new Date(openedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - opened.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate hours remaining until deadline
 */
export function calculateHoursRemaining(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return Math.max(0, diffHours);
}

/**
 * Check if a dispute is urgent (< 48 hours remaining)
 */
export function isUrgent(dispute: Dispute): boolean {
  return dispute.hoursRemaining < 48 && dispute.status !== 'resolved';
}

/**
 * Calculate percentage of contract requirements met
 */
export function requirementsMet(requirements: ContractRequirement[]): number {
  if (!requirements || requirements.length === 0) return 0;
  const met = requirements.filter(r => r.met).length;
  return Math.round((met / requirements.length) * 100);
}

/**
 * Format deadline display with urgency indicator
 */
export function formatDeadline(deadline: string, hoursRemaining: number): string {
  if (hoursRemaining < 0) return 'Overdue';
  if (hoursRemaining === 0) return 'Due now';
  if (hoursRemaining < 24) return `${hoursRemaining}h left`;

  const days = Math.floor(hoursRemaining / 24);
  const hours = hoursRemaining % 24;

  if (days === 0) return `${hours}h left`;
  if (hours === 0) return `${days}d left`;
  return `${days}d ${hours}h left`;
}

/**
 * Format time ago (e.g., "2 hours ago", "3 days ago")
 */
export function formatTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}w ago`;
  }

  const months = Math.floor(diffDays / 30);
  return `${months}mo ago`;
}

/**
 * Get status configuration (color, label, icon)
 */
export function getStatusConfig(status: DisputeStatus): {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
} {
  const configs = {
    new: {
      label: 'New',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      borderColor: 'border-rose-200',
    },
    evidence: {
      label: 'Awaiting Evidence',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
    },
    review: {
      label: 'Under Review',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    resolved: {
      label: 'Resolved',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
    },
    escalated: {
      label: 'Escalated',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
    },
  };

  return configs[status] || configs.new;
}

/**
 * Get category display label
 */
export function getCategoryLabel(category: DisputeCategory): string {
  const labels = {
    content_specs: 'Content Specifications',
    payment_issue: 'Payment Issue',
    deadline_missed: 'Deadline Missed',
    contract_breach: 'Contract Breach',
    quality_concern: 'Quality Concern',
    other: 'Other',
  };

  return labels[category] || category;
}

/**
 * Get priority color
 */
export function getPriorityColor(priority: string): string {
  const colors = {
    low: 'slate',
    medium: 'blue',
    high: 'amber',
    critical: 'rose',
  };

  return colors[priority as keyof typeof colors] || 'slate';
}

/**
 * Calculate resolution split amounts
 */
export function calculateResolutionSplit(
  totalAmount: number,
  percentage: number
): {
  influencer: number;
  business: number;
} {
  const influencerAmount = Math.round((totalAmount * percentage) / 100);
  const businessAmount = totalAmount - influencerAmount;

  return {
    influencer: influencerAmount,
    business: businessAmount,
  };
}

/**
 * Sort disputes by urgency (critical + hours remaining)
 */
export function sortByUrgency(disputes: Dispute[]): Dispute[] {
  return [...disputes].sort((a, b) => {
    // First, sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 4;
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 4;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // Then sort by hours remaining
    return a.hoursRemaining - b.hoursRemaining;
  });
}

/**
 * Get urgent disputes (critical priority or < 48h remaining)
 */
export function getUrgentDisputes(disputes: Dispute[]): Dispute[] {
  return disputes
    .filter(d => d.status !== 'resolved' && (d.priority === 'critical' || d.hoursRemaining < 48))
    .sort((a, b) => a.hoursRemaining - b.hoursRemaining)
    .slice(0, 2); // Return top 2 most urgent
}

/**
 * Get stats from dispute list
 */
export function getDisputeStats(disputes: Dispute[]): {
  totalOpen: number;
  awaitingEvidence: number;
  decisionDue: number;
  valueAtStake: number;
} {
  const openDisputes = disputes.filter(d => d.status !== 'resolved');

  return {
    totalOpen: openDisputes.length,
    awaitingEvidence: disputes.filter(d => d.status === 'evidence').length,
    decisionDue: disputes.filter(d => d.hoursRemaining < 72 && d.status !== 'resolved').length,
    valueAtStake: openDisputes.reduce((sum, d) => sum + d.amountInDispute, 0),
  };
}
