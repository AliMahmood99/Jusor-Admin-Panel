/**
 * Mock Dispute Data
 * Complete dispute data with messages, evidence, and requirements
 */

import type { Dispute } from '@/types';

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'DSP-1247',
    title: 'Content doesn\'t meet specifications',
    description: 'The delivered content does not include the required hashtags and product mentions as specified in the contract.',
    reason: 'The delivered content does not include the required hashtags and product mentions as specified in the contract. Additionally, the video quality appears to be below the agreed 4K standard.',
    response: 'I completed all deliverables as per contract. The hashtags were included in the caption, and the video was shot in 4K. I have uploaded the original files as evidence.',

    // Campaign & Parties
    campaign: { id: 'CMP-2891', name: 'Tech Product Launch', type: 'Invite Only' },
    influencer: {
      id: 'INF-1234',
      name: 'Noura Al-Rashid',
      type: 'influencer',
      handle: '@noura_style',
      rating: 4.8,
      campaigns: 24,
      avatar: 'NR'
    },
    business: {
      id: 'BUS-5678',
      name: 'TechStart Inc.',
      type: 'business',
      cr: '1010567890',
      rating: 4.6,
      campaigns: 12
    },

    // Status & Priority
    status: 'new',
    priority: 'high',
    category: 'content_specs',
    categoryLabel: 'Content doesn\'t meet specifications',

    // Time Tracking
    openedAt: '2026-01-05T10:30:00',
    deadline: '2026-01-13T23:59:59',
    daysOpen: 4,
    hoursRemaining: 96,
    updatedAt: '2026-01-05T10:30:00',

    // Assignment
    assignedAdmin: 'Ahmed Al-Qahtani',

    // Communication & Evidence
    messages: [
      {
        id: 'MSG-001',
        userId: 'BUS-5678',
        userName: 'TechStart Inc.',
        userType: 'business',
        message: 'The content does not meet our specifications. Please review the attached brief.',
        timestamp: '2026-01-05T10:35:00',
      },
      {
        id: 'MSG-002',
        userId: 'INF-1234',
        userName: 'Noura Al-Rashid',
        userType: 'influencer',
        message: 'I followed the brief exactly. The hashtags are in the caption.',
        timestamp: '2026-01-05T14:18:00',
      },
      {
        id: 'MSG-003',
        userId: 'BUS-5678',
        userName: 'TechStart Inc.',
        userType: 'business',
        message: 'We don\'t see the required #TechStartSA hashtag in your post. Can you please check again?',
        timestamp: '2026-01-06T09:22:00',
      },
      {
        id: 'MSG-004',
        userId: 'INF-1234',
        userName: 'Noura Al-Rashid',
        userType: 'influencer',
        message: 'I\'ve uploaded screenshots showing the hashtag was included. Please see the evidence section.',
        timestamp: '2026-01-06T15:45:00',
      }
    ],
    evidence: [
      {
        id: 'EVD-001',
        type: 'screenshot',
        url: '/evidence/dsp-1247-screenshot-1.png',
        fileName: 'Posted_Content_Screenshot.png',
        fileSize: '2.4 MB',
        uploadedBy: 'INF-1234',
        uploadedAt: '2026-01-05T14:20:00',
        description: 'Screenshot of the posted content with hashtags visible'
      },
      {
        id: 'EVD-002',
        type: 'pdf',
        url: '/evidence/dsp-1247-report.pdf',
        fileName: 'Engagement_Report.pdf',
        fileSize: '856 KB',
        uploadedBy: 'INF-1234',
        uploadedAt: '2026-01-05T14:25:00',
        description: 'Post engagement analytics report'
      },
      {
        id: 'EVD-003',
        type: 'video',
        url: '/evidence/dsp-1247-video.mp4',
        fileName: 'Original_4K_Recording.mp4',
        fileSize: '124 MB',
        uploadedBy: 'INF-1234',
        uploadedAt: '2026-01-06T10:15:00',
        description: 'Original 4K video file as recorded'
      },
      {
        id: 'EVD-004',
        type: 'pdf',
        url: '/evidence/dsp-1247-contract.pdf',
        fileName: 'Original_Contract.pdf',
        fileSize: '1.2 MB',
        uploadedBy: 'BUS-5678',
        uploadedAt: '2026-01-05T11:00:00',
        description: 'Signed campaign contract with specifications'
      },
      {
        id: 'EVD-005',
        type: 'image',
        url: '/evidence/dsp-1247-brief.png',
        fileName: 'Content_Brief.png',
        fileSize: '890 KB',
        uploadedBy: 'BUS-5678',
        uploadedAt: '2026-01-05T11:05:00',
        description: 'Original content brief provided to influencer'
      }
    ],

    // Financial
    amountInDispute: 45000,

    // Contract Requirements
    requirements: [
      { label: '4K Video quality', met: true },
      { label: 'Product clearly visible', met: true },
      { label: 'Use #TechStartSA hashtag', met: false },
      { label: 'Tag @techstart_sa', met: false },
      { label: 'Post for 14 days minimum', met: true },
    ],

    // Legacy fields
    type: 'content',
    createdAt: '2026-01-05T10:30:00',
    initiator: { id: 'BUS-5678', name: 'TechStart Inc.', type: 'business' },
    respondent: { id: 'INF-1234', name: 'Noura Al-Rashid', type: 'influencer', avatar: 'NR' },
    campaignId: 'CMP-2891',
    campaignName: 'Tech Product Launch',
  },
  {
    id: 'DSP-1245',
    title: 'Payment not received after approval',
    description: 'I completed the campaign and my content was approved on Dec 28. The payment should have been released within 48 hours.',
    reason: 'I completed the campaign and my content was approved on Dec 28. The payment should have been released within 48 hours but I still haven\'t received anything. It\'s been 6 days now.',
    response: 'We processed the payment on Dec 30. Attaching the receipt. The issue might be with the bank.',

    // Campaign & Parties
    campaign: { id: 'CMP-2698', name: 'Summer Collection 2026', type: 'Hybrid' },
    influencer: {
      id: 'INF-3456',
      name: 'Fatima Al-Saud',
      type: 'influencer',
      handle: '@fatima_fashion',
      rating: 4.9,
      campaigns: 45,
      avatar: 'FS'
    },
    business: {
      id: 'BUS-7890',
      name: 'Fashion House KSA',
      type: 'business',
      cr: '3030987654',
      rating: 4.4,
      campaigns: 22
    },

    // Status & Priority
    status: 'review',
    priority: 'high',
    category: 'payment_issue',
    categoryLabel: 'Payment not received after approval',

    // Time Tracking
    openedAt: '2026-01-03T09:15:00',
    deadline: '2026-01-10T23:59:59',
    daysOpen: 6,
    hoursRemaining: 24,
    updatedAt: '2026-01-05T14:20:00',

    // Assignment
    assignedAdmin: 'Ahmed Al-Qahtani',

    // Communication & Evidence
    messages: [
      {
        id: 'MSG-011',
        userId: 'INF-3456',
        userName: 'Fatima Al-Saud',
        userType: 'influencer',
        message: 'I haven\'t received payment yet. It has been 6 days since approval.',
        timestamp: '2026-01-03T09:15:00',
      },
      {
        id: 'MSG-012',
        userId: 'BUS-7890',
        userName: 'Fashion House KSA',
        userType: 'business',
        message: 'We processed the payment on Dec 30. Please check with your bank.',
        timestamp: '2026-01-03T15:30:00',
      }
    ],
    evidence: [
      {
        id: 'EVD-011',
        type: 'screenshot',
        url: '/evidence/dsp-1245-bank.png',
        fileName: 'Bank_Statement.png',
        fileSize: '1.8 MB',
        uploadedBy: 'INF-3456',
        uploadedAt: '2026-01-03T10:00:00',
        description: 'Bank statement showing no payment received'
      },
      {
        id: 'EVD-012',
        type: 'screenshot',
        url: '/evidence/dsp-1245-approval.png',
        fileName: 'Campaign_Approval.png',
        fileSize: '945 KB',
        uploadedBy: 'INF-3456',
        uploadedAt: '2026-01-03T10:05:00',
        description: 'Screenshot of campaign approval notification'
      },
      {
        id: 'EVD-013',
        type: 'pdf',
        url: '/evidence/dsp-1245-receipt.pdf',
        fileName: 'Payment_Receipt.pdf',
        fileSize: '567 KB',
        uploadedBy: 'BUS-7890',
        uploadedAt: '2026-01-03T15:35:00',
        description: 'Payment processing receipt from our system'
      }
    ],

    // Financial
    amountInDispute: 28000,

    // Legacy fields
    type: 'payment',
    createdAt: '2026-01-03T09:15:00',
    initiator: { id: 'INF-3456', name: 'Fatima Al-Saud', type: 'influencer', avatar: 'FS' },
    respondent: { id: 'BUS-7890', name: 'Fashion House KSA', type: 'business' },
    campaignId: 'CMP-2698',
    campaignName: 'Summer Collection 2026',
  },
  {
    id: 'DSP-1246',
    title: 'Post deleted prematurely',
    description: 'The influencer deleted the sponsored post after only 5 days. The contract clearly states the post must remain live for at least 30 days.',
    reason: 'The influencer deleted the sponsored post after only 5 days. The contract clearly states the post must remain live for at least 30 days.',

    // Campaign & Parties
    campaign: { id: 'CMP-2756', name: 'Ramadan Special', type: 'Public' },
    influencer: {
      id: 'INF-2345',
      name: 'Ahmed Al-Farsi',
      type: 'influencer',
      handle: '@ahmed_lifestyle',
      rating: 4.5,
      campaigns: 18,
      avatar: 'AF'
    },
    business: {
      id: 'BUS-6789',
      name: 'Gulf Retail LLC',
      type: 'business',
      cr: '2020123456',
      rating: 4.7,
      campaigns: 8
    },

    // Status & Priority
    status: 'evidence',
    priority: 'medium',
    category: 'contract_breach',
    categoryLabel: 'Post deleted prematurely',

    // Time Tracking
    openedAt: '2026-01-04T14:20:00',
    deadline: '2026-01-12T23:59:59',
    daysOpen: 5,
    hoursRemaining: 72,
    updatedAt: '2026-01-04T14:20:00',

    // Assignment
    assignedAdmin: 'Sara Al-Otaibi',

    // Communication & Evidence
    messages: [
      {
        id: 'MSG-021',
        userId: 'BUS-6789',
        userName: 'Gulf Retail LLC',
        userType: 'business',
        message: 'The post was deleted after only 5 days. The contract requires it to stay up for 30 days.',
        timestamp: '2026-01-04T14:20:00',
      }
    ],
    evidence: [
      {
        id: 'EVD-021',
        type: 'pdf',
        url: '/evidence/dsp-1246-contract.pdf',
        fileName: 'Campaign_Contract.pdf',
        fileSize: '1.5 MB',
        uploadedBy: 'BUS-6789',
        uploadedAt: '2026-01-04T14:25:00',
        description: 'Contract showing 30-day post duration requirement'
      }
    ],

    // Financial
    amountInDispute: 32000,

    // Legacy fields
    type: 'contract',
    createdAt: '2026-01-04T14:20:00',
    initiator: { id: 'BUS-6789', name: 'Gulf Retail LLC', type: 'business' },
    respondent: { id: 'INF-2345', name: 'Ahmed Al-Farsi', type: 'influencer', avatar: 'AF' },
    campaignId: 'CMP-2756',
    campaignName: 'Ramadan Special',
  },
  {
    id: 'DSP-1244',
    title: 'Quality below expectations',
    description: 'Video quality is lower than expected and some product features were not mentioned.',
    reason: 'Video quality is lower than expected and some product features were not mentioned.',
    response: 'I followed the brief and highlighted the main features.',

    // Campaign & Parties
    campaign: { id: 'CMP-2645', name: 'New Year Promo', type: 'Public' },
    influencer: {
      id: 'INF-4567',
      name: 'Khalid Al-Mutairi',
      type: 'influencer',
      handle: '@khalid_reviews',
      rating: 4.3,
      campaigns: 12,
      avatar: 'KM'
    },
    business: {
      id: 'BUS-8901',
      name: 'Electronics Plus',
      type: 'business',
      cr: '4040654321',
      rating: 4.5,
      campaigns: 15
    },

    // Status & Priority
    status: 'resolved',
    priority: 'low',
    category: 'quality_concern',
    categoryLabel: 'Quality below expectations',

    // Time Tracking
    openedAt: '2026-01-01T11:30:00',
    deadline: '2026-01-08T23:59:59',
    daysOpen: 8,
    hoursRemaining: 0,
    updatedAt: '2026-01-04T16:00:00',
    resolvedAt: '2026-01-04T16:00:00',

    // Assignment
    assignedAdmin: 'Ahmed Al-Qahtani',

    // Communication & Evidence
    messages: [],
    evidence: [
      {
        id: 'EVD-031',
        type: 'video',
        url: '/evidence/dsp-1244-content.mp4',
        fileName: 'Delivered_Content.mp4',
        fileSize: '45 MB',
        uploadedBy: 'INF-4567',
        uploadedAt: '2026-01-02T09:00:00',
        description: 'The video content delivered for review'
      },
      {
        id: 'EVD-032',
        type: 'pdf',
        url: '/evidence/dsp-1244-brief.pdf',
        fileName: 'Content_Brief.pdf',
        fileSize: '780 KB',
        uploadedBy: 'BUS-8901',
        uploadedAt: '2026-01-02T10:30:00',
        description: 'Original brief with feature requirements'
      }
    ],

    // Financial
    amountInDispute: 15000,

    // Contract Requirements
    requirements: [
      { label: 'Mention 5 product features', met: false },
      { label: 'Include unboxing sequence', met: true },
      { label: 'Show product in use', met: true },
      { label: '1080p minimum quality', met: true },
    ],

    // Resolution
    resolution: {
      type: 'split',
      percentage: 70,
      influencer: 10500,
      business: 4500,
      reasoning: 'Partial deliverables met. Split payment 70/30 in favor of influencer.',
      decidedAt: '2026-01-04T16:00:00',
      decidedBy: 'Ahmed Al-Qahtani'
    },

    // Legacy fields
    type: 'content',
    createdAt: '2026-01-01T11:30:00',
    initiator: { id: 'BUS-8901', name: 'Electronics Plus', type: 'business' },
    respondent: { id: 'INF-4567', name: 'Khalid Al-Mutairi', type: 'influencer', avatar: 'KM' },
    campaignId: 'CMP-2645',
    campaignName: 'New Year Promo',
    resolutionNote: 'Partial deliverables met. Split payment 70/30 in favor of influencer.',
  },
  {
    id: 'DSP-1243',
    title: 'Exclusivity violation',
    description: 'The influencer promoted a competing brand on the same day as our campaign launch, violating the 30-day exclusivity clause.',
    reason: 'The influencer promoted a competing brand on the same day as our campaign launch, violating the 30-day exclusivity clause.',
    response: 'The competing brand post was scheduled before I signed the exclusivity agreement.',

    // Campaign & Parties
    campaign: { id: 'CMP-2590', name: 'Premium Brand Launch', type: 'Invite Only' },
    influencer: {
      id: 'INF-5678',
      name: 'Layla Al-Harbi',
      type: 'influencer',
      handle: '@layla_luxury',
      rating: 4.7,
      campaigns: 38,
      avatar: 'LH'
    },
    business: {
      id: 'BUS-9012',
      name: 'Luxury Brands SA',
      type: 'business',
      cr: '5050112233',
      rating: 4.8,
      campaigns: 28
    },

    // Status & Priority
    status: 'escalated',
    priority: 'critical',
    category: 'contract_breach',
    categoryLabel: 'Exclusivity violation',

    // Time Tracking
    openedAt: '2025-12-28T08:00:00',
    deadline: '2026-01-15T23:59:59',
    daysOpen: 12,
    hoursRemaining: 168,
    updatedAt: '2026-01-05T09:00:00',

    // Assignment
    assignedAdmin: 'Mohammad Al-Dosari',

    // Communication & Evidence
    messages: [
      {
        id: 'MSG-041',
        userId: 'BUS-9012',
        userName: 'Luxury Brands SA',
        userType: 'business',
        message: 'We have evidence of exclusivity violation. Please review the attached screenshots.',
        timestamp: '2025-12-28T08:15:00',
      },
      {
        id: 'MSG-042',
        userId: 'INF-5678',
        userName: 'Layla Al-Harbi',
        userType: 'influencer',
        message: 'That post was scheduled before our exclusivity agreement was signed.',
        timestamp: '2025-12-28T14:30:00',
      },
      {
        id: 'MSG-043',
        userId: 'BUS-9012',
        userName: 'Luxury Brands SA',
        userType: 'business',
        message: 'The agreement was signed on Dec 20. The competing post went live on Dec 28.',
        timestamp: '2025-12-29T10:00:00',
      }
    ],
    evidence: [
      {
        id: 'EVD-041',
        type: 'screenshot',
        url: '/evidence/dsp-1243-competing-post.png',
        fileName: 'Competing_Brand_Post.png',
        fileSize: '3.2 MB',
        uploadedBy: 'BUS-9012',
        uploadedAt: '2025-12-28T08:20:00',
        description: 'Screenshot of influencer promoting competing brand'
      },
      {
        id: 'EVD-042',
        type: 'pdf',
        url: '/evidence/dsp-1243-contract.pdf',
        fileName: 'Exclusivity_Contract.pdf',
        fileSize: '2.1 MB',
        uploadedBy: 'BUS-9012',
        uploadedAt: '2025-12-28T08:25:00',
        description: 'Signed contract with 30-day exclusivity clause'
      },
      {
        id: 'EVD-043',
        type: 'screenshot',
        url: '/evidence/dsp-1243-schedule.png',
        fileName: 'Post_Schedule_Screenshot.png',
        fileSize: '1.4 MB',
        uploadedBy: 'INF-5678',
        uploadedAt: '2025-12-28T15:00:00',
        description: 'Screenshot showing post was scheduled before contract'
      }
    ],

    // Financial
    amountInDispute: 75000,

    // Legacy fields
    type: 'contract',
    createdAt: '2025-12-28T08:00:00',
    initiator: { id: 'BUS-9012', name: 'Luxury Brands SA', type: 'business' },
    respondent: { id: 'INF-5678', name: 'Layla Al-Harbi', type: 'influencer', avatar: 'LH' },
    campaignId: 'CMP-2590',
    campaignName: 'Premium Brand Launch',
  },
];
