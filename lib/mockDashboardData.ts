/**
 * Mock Dashboard Data
 * Realistic data for dashboard testing
 */

import type { Alert } from '@/components/dashboard/AlertItem';
import type { Activity } from '@/components/dashboard/ActivityItem';

export const mockDashboardData = {
  // Key Metrics
  metrics: {
    totalVolume: 4850000,
    volumeChange: 12.5,
    commissionEarned: 291000,
    commissionChange: 8.3,
    activeEscrow: 1250000,
    escrowChange: -5.2,
    activeCampaigns: 47,
    campaignsChange: 15,
  },

  // Pending Actions
  pendingActions: {
    verifications: { count: 23, urgent: 5, avgWait: '1.5 days' },
    disputes: { count: 8, urgent: 3, avgWait: '2.1 days' },
    withdrawals: { count: 12, total: 185000, avgWait: '4 hours' },
    contentReview: { count: 15, urgent: 2, avgWait: '6 hours' },
  },

  // Today's Activity
  todayActivity: {
    newUsers: { influencers: 8, businesses: 3 },
    campaignsStarted: 5,
    campaignsCompleted: 3,
    paymentsReleased: { count: 12, amount: 234500 },
    disputesResolved: 2,
  },

  // Alerts
  alerts: [
    {
      id: 1,
      type: 'overdue' as const,
      severity: 'high' as const,
      title: '3 campaigns with overdue deliverables',
      description: 'Content deadline passed 48+ hours ago',
      action: 'Review Campaigns',
      link: '/campaigns?filter=overdue',
    },
    {
      id: 2,
      type: 'dispute' as const,
      severity: 'high' as const,
      title: 'High-value dispute needs resolution',
      description: 'DSP-892 - SAR 45,000 in escrow, waiting 3 days',
      action: 'Handle Dispute',
      link: '/disputes/DSP-892',
    },
    {
      id: 3,
      type: 'expiring' as const,
      severity: 'medium' as const,
      title: '7 contracts expiring in 24 hours',
      description: "Influencers haven't signed yet",
      action: 'View Contracts',
      link: '/campaigns?filter=expiring',
    },
    {
      id: 4,
      type: 'risk' as const,
      severity: 'medium' as const,
      title: '2 users flagged for high dispute rate',
      description: 'Dispute rate exceeded 15% threshold',
      action: 'Review Users',
      link: '/users?filter=flagged',
    },
  ] as Alert[],

  // Recent Activity Feed
  recentActivity: [
    {
      id: 1,
      type: 'verification_approved' as const,
      user: 'Noura Al-Rashid',
      userType: 'influencer',
      time: '5 min ago',
      admin: 'Ahmed',
    },
    {
      id: 2,
      type: 'payment_released' as const,
      campaign: 'Ramadan Collection',
      amount: 15000,
      influencer: '@sara_beauty',
      time: '12 min ago',
    },
    {
      id: 3,
      type: 'dispute_opened' as const,
      campaign: 'Tech Review',
      disputeId: 'DSP-901',
      amount: 8000,
      time: '25 min ago',
    },
    {
      id: 4,
      type: 'campaign_started' as const,
      campaign: 'Summer Fashion 2026',
      business: 'Gulf Retail',
      budget: 120000,
      time: '32 min ago',
    },
    {
      id: 5,
      type: 'withdrawal_processed' as const,
      user: 'Mohammed Tech',
      amount: 25000,
      time: '45 min ago',
      admin: 'Sara',
    },
    {
      id: 6,
      type: 'content_approved' as const,
      campaign: 'Beauty Launch',
      influencer: '@beauty_queen',
      time: '1 hour ago',
    },
    {
      id: 7,
      type: 'user_registered' as const,
      user: 'Fresh Cafe KSA',
      userType: 'business',
      time: '1.5 hours ago',
    },
    {
      id: 8,
      type: 'dispute_resolved' as const,
      disputeId: 'DSP-889',
      resolution: 'Split 70/30',
      time: '2 hours ago',
      admin: 'Ahmed',
    },
  ] as Activity[],

  // Top Performers
  topPerformers: {
    influencers: [
      {
        name: 'Noura Al-Rashid',
        handle: '@noura_style',
        campaigns: 24,
        earnings: 285000,
        rating: 4.8,
      },
      {
        name: 'Ahmed Tech',
        handle: '@ahmed_tech',
        campaigns: 18,
        earnings: 198000,
        rating: 4.6,
      },
      {
        name: 'Sara Beauty',
        handle: '@sara_beauty',
        campaigns: 15,
        earnings: 165000,
        rating: 4.9,
      },
    ],
    businesses: [
      {
        name: 'Luxury Brands SA',
        campaigns: 28,
        spent: 1250000,
        rating: 4.8,
      },
      {
        name: 'TechStart Inc.',
        campaigns: 12,
        spent: 450000,
        rating: 4.6,
      },
      {
        name: 'Gulf Retail LLC',
        campaigns: 8,
        spent: 320000,
        rating: 4.7,
      },
    ],
  },
};
