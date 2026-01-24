/**
 * Mock Data for User Management
 * Contains activity logs, campaigns, and transactions for users
 */

import type {
  UserActivity,
  UserCampaignInfluencer,
  UserCampaignBusiness,
  InfluencerTransaction,
  BusinessTransaction
} from '@/types';

// ============================================
// ACTIVITY LOGS
// ============================================

export const MOCK_INFLUENCER_ACTIVITY_LOG: UserActivity[] = [
  { id: 1, action: 'content_approved', timestamp: '2026-01-06T16:00:00', details: 'Content approved for "Ramadan Collection" campaign', campaign: 'CMP-2891', icon: 'checkCircle', color: 'emerald' },
  { id: 2, action: 'payment_received', timestamp: '2026-01-06T16:05:00', details: 'Payment received: SAR 14,550 (after 3% commission)', amount: 14550, icon: 'dollarSign', color: 'emerald' },
  { id: 3, action: 'content_submitted', timestamp: '2026-01-05T14:20:00', details: 'Submitted content for "Ramadan Collection"', campaign: 'CMP-2891', icon: 'image', color: 'blue' },
  { id: 4, action: 'contract_signed', timestamp: '2026-01-04T10:30:00', details: 'Signed contract for "Tech Review Series"', campaign: 'CMP-2845', icon: 'fileCheck', color: 'emerald' },
  { id: 5, action: 'campaign_accepted', timestamp: '2026-01-03T09:15:00', details: 'Accepted invitation for "Tech Review Series"', campaign: 'CMP-2845', icon: 'check', color: 'blue' },
  { id: 6, action: 'revision_requested', timestamp: '2026-01-02T11:00:00', details: 'Business requested revision for "Summer Promo"', campaign: 'CMP-2790', icon: 'edit', color: 'amber' },
  { id: 7, action: 'withdrawal', timestamp: '2026-01-01T14:30:00', details: 'Withdrew SAR 25,000 to IBAN ending ***7519', amount: 25000, icon: 'wallet', color: 'violet' },
  { id: 8, action: 'dispute_opened', timestamp: '2025-12-28T10:00:00', details: 'Dispute opened for "Winter Campaign"', campaign: 'CMP-2756', disputeId: 'DSP-445', icon: 'alertCircle', color: 'rose' },
  { id: 9, action: 'dispute_resolved', timestamp: '2025-12-30T15:00:00', details: 'Dispute resolved - 75% payment released', campaign: 'CMP-2756', disputeId: 'DSP-445', icon: 'checkCircle', color: 'emerald' },
  { id: 10, action: 'verification_approved', timestamp: '2025-10-18T09:00:00', details: 'Account verification approved', icon: 'shieldCheck', color: 'emerald' },
];

export const MOCK_BUSINESS_ACTIVITY_LOG: UserActivity[] = [
  { id: 1, action: 'campaign_created', timestamp: '2026-01-06T10:00:00', details: 'Created new campaign "Ramadan Collection"', campaign: 'CMP-2891', icon: 'megaphone', color: 'blue' },
  { id: 2, action: 'payment_escrowed', timestamp: '2026-01-06T10:30:00', details: 'Escrowed SAR 120,000 for campaign', campaign: 'CMP-2891', amount: 120000, icon: 'dollarSign', color: 'amber' },
  { id: 3, action: 'influencer_invited', timestamp: '2026-01-06T11:00:00', details: 'Invited 5 influencers to campaign', campaign: 'CMP-2891', icon: 'users', color: 'blue' },
  { id: 4, action: 'content_approved', timestamp: '2026-01-05T14:00:00', details: 'Approved content from @noura_style', campaign: 'CMP-2891', influencer: 'Noura Al-Rashid', icon: 'checkCircle', color: 'emerald' },
  { id: 5, action: 'revision_requested', timestamp: '2026-01-04T16:30:00', details: 'Requested revision from @ahmed_tech', campaign: 'CMP-2891', influencer: 'Ahmed Al-Farsi', icon: 'edit', color: 'amber' },
  { id: 6, action: 'dispute_opened', timestamp: '2026-01-03T09:00:00', details: 'Opened dispute against @khalid_reviews', campaign: 'CMP-2845', disputeId: 'DSP-446', icon: 'alertCircle', color: 'rose' },
  { id: 7, action: 'campaign_completed', timestamp: '2025-12-28T18:00:00', details: 'Campaign completed successfully', campaign: 'CMP-2790', icon: 'checkCircle', color: 'emerald' },
  { id: 8, action: 'refund_received', timestamp: '2025-12-25T12:00:00', details: 'Received refund SAR 8,500 from cancelled influencer', amount: 8500, icon: 'dollarSign', color: 'emerald' },
  { id: 9, action: 'verification_approved', timestamp: '2025-07-05T09:00:00', details: 'Business verification approved via Wathiq', icon: 'shieldCheck', color: 'emerald' },
];

// ============================================
// USER REVIEWS
// ============================================

export interface UserReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  reviewerType: 'business' | 'influencer';
  rating: number;
  comment: string;
  campaignId?: string;
  campaignName?: string;
  timestamp: string;
  helpful?: number;
}

// ============================================
// ADMIN NOTES
// ============================================

export interface AdminNote {
  id: string;
  userId: string;
  adminName: string;
  noteType: 'general' | 'verification' | 'payment' | 'content' | 'warning';
  content: string;
  timestamp: string;
  attachments?: string[];
}

export const MOCK_ADMIN_NOTES: AdminNote[] = [
  {
    id: 'NOTE-001',
    userId: 'INF-1234',
    adminName: 'Ali Mahmood',
    noteType: 'verification',
    content: 'User verification completed successfully. All documents are valid and match Nafath records.',
    timestamp: '2026-01-20T14:30:00'
  },
  {
    id: 'NOTE-002',
    userId: 'INF-1234',
    adminName: 'Sarah Ahmed',
    noteType: 'general',
    content: 'User contacted support regarding payment delay. Issue resolved and payment processed.',
    timestamp: '2026-01-15T10:15:00'
  },
  {
    id: 'NOTE-003',
    userId: 'INF-1234',
    adminName: 'Admin',
    noteType: 'warning',
    content: 'Reminder: User has pending dispute resolution for campaign CMP-2756. Follow up required.',
    timestamp: '2025-12-30T16:45:00'
  }
];

export const MOCK_USER_REVIEWS: UserReview[] = [
  {
    id: 'REV-001',
    reviewerId: 'USR-3891',
    reviewerName: 'Fashion House KSA',
    reviewerType: 'business',
    rating: 5,
    comment: 'Exceptional work! Noura delivered high-quality content that exceeded our expectations. Her professionalism and creativity made this campaign a huge success. Highly recommended!',
    campaignId: 'CMP-2891',
    campaignName: 'Ramadan Collection Launch',
    timestamp: '2025-12-15T14:30:00',
    helpful: 12
  },
  {
    id: 'REV-002',
    reviewerId: 'USR-4562',
    reviewerName: 'Gulf Retail LLC',
    reviewerType: 'business',
    rating: 5,
    comment: 'Outstanding collaboration! The content was delivered on time and matched our brand perfectly. Will definitely work with her again.',
    campaignId: 'CMP-2790',
    campaignName: 'Summer Fashion Promo',
    timestamp: '2025-11-28T16:20:00',
    helpful: 8
  },
  {
    id: 'REV-003',
    reviewerId: 'USR-2341',
    reviewerName: 'TechStart Inc.',
    reviewerType: 'business',
    rating: 4,
    comment: 'Great experience overall. The influencer was responsive and professional. Minor delay in delivery but the quality was worth the wait.',
    campaignId: 'CMP-2845',
    campaignName: 'Tech Review Series',
    timestamp: '2025-11-10T10:15:00',
    helpful: 5
  },
  {
    id: 'REV-004',
    reviewerId: 'USR-5671',
    reviewerName: 'Beauty Trends Arabia',
    reviewerType: 'business',
    rating: 5,
    comment: 'Absolutely loved working with this influencer! Very creative and understood our brand vision instantly. The engagement on the posts was amazing!',
    campaignId: 'CMP-2756',
    campaignName: 'Beauty Product Launch',
    timestamp: '2025-10-22T13:45:00',
    helpful: 15
  },
  {
    id: 'REV-005',
    reviewerId: 'USR-8923',
    reviewerName: 'Lifestyle Co.',
    reviewerType: 'business',
    rating: 4,
    comment: 'Professional and reliable. Good communication throughout the campaign. Would work together again.',
    campaignId: 'CMP-2689',
    campaignName: 'Lifestyle Campaign',
    timestamp: '2025-10-05T11:30:00',
    helpful: 6
  },
  {
    id: 'REV-006',
    reviewerId: 'USR-7234',
    reviewerName: 'Saudi Fashion Hub',
    reviewerType: 'business',
    rating: 5,
    comment: 'Top-tier influencer! Her audience engagement is incredible and the ROI was beyond our expectations. Already planning our next campaign together.',
    campaignId: 'CMP-2534',
    campaignName: 'Winter Collection',
    timestamp: '2025-09-18T15:00:00',
    helpful: 9
  },
  {
    id: 'REV-007',
    reviewerId: 'USR-6189',
    reviewerName: 'Digital Marketing Pro',
    reviewerType: 'business',
    rating: 3,
    comment: 'Good work but there were some communication gaps. Content quality was good once delivered. Could improve response time.',
    campaignId: 'CMP-2412',
    campaignName: 'Brand Awareness',
    timestamp: '2025-08-30T09:20:00',
    helpful: 3
  },
  {
    id: 'REV-008',
    reviewerId: 'USR-9456',
    reviewerName: 'Elegant Boutique',
    reviewerType: 'business',
    rating: 5,
    comment: 'Amazing collaboration! The creativity and attention to detail were impressive. Our sales increased significantly after her posts. Thank you!',
    campaignId: 'CMP-2301',
    campaignName: 'New Store Opening',
    timestamp: '2025-08-12T17:10:00',
    helpful: 11
  }
];

// ============================================
// USER CAMPAIGNS
// ============================================

export const MOCK_INFLUENCER_CAMPAIGNS: UserCampaignInfluencer[] = [
  { id: 'CMP-2891', name: 'Ramadan Collection Launch', business: 'Fashion House KSA', type: 'hybrid', status: 'active', payment: 15000, paymentStatus: 'in_escrow', startDate: '2026-01-01', endDate: '2026-01-31', contentStatus: 'creating' },
  { id: 'CMP-2845', name: 'Tech Review Series', business: 'TechStart Inc.', type: 'invite', status: 'active', payment: 18000, paymentStatus: 'in_escrow', startDate: '2025-12-15', endDate: '2026-01-15', contentStatus: 'awaiting_signature' },
  { id: 'CMP-2790', name: 'Summer Fashion Promo', business: 'Gulf Retail LLC', type: 'public', status: 'completed', payment: 12000, paymentStatus: 'released', startDate: '2025-11-01', endDate: '2025-11-30', contentStatus: 'approved', completedAt: '2025-11-28' },
  { id: 'CMP-2756', name: 'Winter Beauty Campaign', business: 'Beauty Plus', type: 'invite', status: 'completed', payment: 20000, paymentStatus: 'released', startDate: '2025-10-01', endDate: '2025-10-31', contentStatus: 'approved', completedAt: '2025-10-25' },
  { id: 'CMP-2701', name: 'Eid Special Collection', business: 'Luxury Brands SA', type: 'hybrid', status: 'completed', payment: 25000, paymentStatus: 'released', startDate: '2025-09-01', endDate: '2025-09-15', contentStatus: 'approved', completedAt: '2025-09-12' },
  { id: 'CMP-2650', name: 'Back to School', business: 'Education World', type: 'public', status: 'completed', payment: 8000, paymentStatus: 'released', startDate: '2025-08-15', endDate: '2025-08-31', contentStatus: 'disputed', disputeId: 'DSP-445', completedAt: '2025-12-30' },
];

export const MOCK_BUSINESS_CAMPAIGNS: UserCampaignBusiness[] = [
  { id: 'CMP-2891', name: 'Ramadan Collection Launch', type: 'hybrid', status: 'active', budget: 120000, spent: 45000, influencers: 6, completedInfluencers: 2, startDate: '2026-01-01', endDate: '2026-01-31' },
  { id: 'CMP-2845', name: 'Tech Review Series', type: 'invite', status: 'active', budget: 45000, spent: 15000, influencers: 3, completedInfluencers: 1, startDate: '2025-12-15', endDate: '2026-01-15' },
  { id: 'CMP-2790', name: 'Summer Collection Preview', type: 'public', status: 'completed', budget: 80000, spent: 80000, influencers: 5, completedInfluencers: 5, startDate: '2025-11-01', endDate: '2025-11-30', completedAt: '2025-11-28' },
  { id: 'CMP-2756', name: 'Brand Awareness Q4', type: 'hybrid', status: 'completed', budget: 150000, spent: 142500, influencers: 8, completedInfluencers: 8, startDate: '2025-10-01', endDate: '2025-10-31', completedAt: '2025-10-30' },
  { id: 'CMP-2701', name: 'National Day Special', type: 'invite', status: 'cancelled', budget: 60000, spent: 0, influencers: 0, completedInfluencers: 0, startDate: '2025-09-20', endDate: '2025-09-25', cancelledAt: '2025-09-18', cancelReason: 'Strategy change' },
];

// ============================================
// TRANSACTIONS
// ============================================

export const MOCK_INFLUENCER_TRANSACTIONS: InfluencerTransaction[] = [
  { id: 'TXN-5001', type: 'paid', amount: 14550, grossAmount: 15000, commission: 450, description: 'Payment for "Ramadan Collection"', campaign: 'CMP-2891', business: 'Fashion House KSA', date: '2026-01-06', status: 'completed', transferRef: 'JISOR-2891-001' },
  { id: 'TXN-4998', type: 'pending_approval', amount: 17460, grossAmount: 18000, commission: 540, description: 'Awaiting business approval', campaign: 'CMP-2845', business: 'TechStart Inc.', date: '2026-01-05', status: 'pending' },
  { id: 'TXN-4890', type: 'paid', amount: 11640, grossAmount: 12000, commission: 360, description: 'Payment for "Summer Fashion"', campaign: 'CMP-2790', business: 'Gulf Retail LLC', date: '2025-11-28', status: 'completed', transferRef: 'JISOR-2790-003' },
  { id: 'TXN-4756', type: 'paid', amount: 19400, grossAmount: 20000, commission: 600, description: 'Payment for "Winter Beauty"', campaign: 'CMP-2756', business: 'Beauty Plus', date: '2025-10-25', status: 'completed', transferRef: 'JISOR-2756-002' },
  { id: 'TXN-4701', type: 'paid', amount: 24250, grossAmount: 25000, commission: 750, description: 'Payment for "Eid Special"', campaign: 'CMP-2701', business: 'Luxury Brands SA', date: '2025-09-12', status: 'completed', transferRef: 'JISOR-2701-001' },
  { id: 'TXN-4650', type: 'held', amount: 0, grossAmount: 8000, description: 'Payment held - Under dispute', campaign: 'CMP-2650', business: 'Education World', disputeId: 'DSP-445', date: '2025-08-31', status: 'held' },
  { id: 'TXN-4651', type: 'dispute_resolved', amount: 6000, grossAmount: 8000, commission: 0, description: 'Dispute resolved - 75% released', campaign: 'CMP-2650', business: 'Education World', disputeId: 'DSP-445', date: '2025-12-30', status: 'completed', transferRef: 'JISOR-DSP-445' },
  { id: 'TXN-4600', type: 'pending_content', amount: 14550, grossAmount: 15000, commission: 450, description: 'Content submitted - Awaiting review', campaign: 'CMP-2891', business: 'Fashion House KSA', date: '2026-01-04', status: 'pending' },
];

export const MOCK_BUSINESS_TRANSACTIONS: BusinessTransaction[] = [
  { id: 'TXN-6010', type: 'wallet_deposit', amount: 200000, description: 'Added funds to wallet', paymentMethod: 'Bank Transfer', date: '2026-01-05', status: 'completed', reference: 'DEP-2026-001' },
  { id: 'TXN-6001', type: 'escrow_deposit', amount: -120000, description: 'Campaign budget reserved', campaign: 'CMP-2891', campaignName: 'Ramadan Collection', date: '2026-01-06', status: 'held' },
  { id: 'TXN-6002', type: 'payment_released', amount: -15450, netToInfluencer: 14987, commission: 463, description: 'Payment to influencer', campaign: 'CMP-2891', influencer: '@noura_style', influencerName: 'Noura Al-Rashid', date: '2026-01-06', status: 'completed' },
  { id: 'TXN-5998', type: 'escrow_deposit', amount: -45000, description: 'Campaign budget reserved', campaign: 'CMP-2845', campaignName: 'Tech Review Series', date: '2025-12-15', status: 'held' },
  { id: 'TXN-5950', type: 'wallet_deposit', amount: 100000, description: 'Added funds to wallet', paymentMethod: 'Credit Card', date: '2025-12-10', status: 'completed', reference: 'DEP-2025-045' },
  { id: 'TXN-5890', type: 'payment_released', amount: -80000, netToInfluencer: 77600, commission: 2400, description: 'All payments released', campaign: 'CMP-2790', campaignName: 'Summer Collection', date: '2025-11-28', status: 'completed' },
  { id: 'TXN-5800', type: 'wallet_withdrawal', amount: -50000, description: 'Withdrawn to bank account', iban: 'SA12 ****5678', date: '2025-11-20', status: 'completed', reference: 'WTH-2025-012' },
  { id: 'TXN-5756', type: 'refund', amount: 8500, description: 'Influencer cancelled - Refund to wallet', campaign: 'CMP-2756', influencer: '@khalid_reviews', date: '2025-12-25', status: 'completed' },
  { id: 'TXN-5701', type: 'refund', amount: 60000, description: 'Campaign cancelled - Full refund', campaign: 'CMP-2701', campaignName: 'National Day Special', date: '2025-09-18', status: 'completed' },
];
