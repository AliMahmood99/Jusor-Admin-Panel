/**
 * Campaigns Oversight Module
 * Complete campaign management with list and detail views
 */

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';

// ============================================
// ICONS
// ============================================
const Icons = {
  // Navigation & UI
  arrowLeft: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>,
  search: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  refresh: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>,
  x: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  chevronRight: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>,

  // Status & Alerts
  check: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>,
  checkCircle: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10-3-3"/></svg>,
  alertCircle: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
  alertTriangle: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  info: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,

  // Time & Calendar
  clock: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  clockPlus: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6"/><path d="M16 14h-4"/><path d="M19 2v4"/><path d="M17 4h4"/></svg>,
  timer: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>,
  calendar: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,

  // People & Business
  users: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  building: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,

  // Finance
  dollarSign: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  wallet: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  trendingUp: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>,

  // Content & Files
  edit: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  penLine: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>,
  fileText: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>,
  fileCheck: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>,
  image: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  video: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>,

  // Campaign & Activity
  megaphone: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  activity: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,

  // Security & Access
  lock: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  unlock: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
  globe: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  scale: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  externalLink: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="m10 14 11-11"/></svg>,

  // Social Platforms
  instagram: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>,
  youtube: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
  tiktok: (p: any) => <svg {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatCurrency = (amount: number) => `SAR ${amount.toLocaleString()}`;

const getTypeConfig = (type: string) => ({
  public: { label: 'Public', bg: 'bg-blue-50', text: 'text-blue-600', icon: 'globe' },
  invite: { label: 'Invite Only', bg: 'bg-violet-50', text: 'text-violet-600', icon: 'lock' },
  hybrid: { label: 'Hybrid', bg: 'bg-amber-50', text: 'text-amber-600', icon: 'unlock' },
} as any)[type];

const getStatusConfig = (status: string) => ({
  active: { label: 'Active', bg: 'bg-emerald-500', text: 'text-white' },
  completed: { label: 'Completed', bg: 'bg-slate-500', text: 'text-white' },
  cancelled: { label: 'Cancelled', bg: 'bg-slate-400', text: 'text-white' },
} as any)[status];

const getInfluencerStatusConfig = (status: string) => ({
  applied: { label: 'Applied', bg: 'bg-slate-100', text: 'text-slate-600', step: 1 },
  invited: { label: 'Invited', bg: 'bg-slate-100', text: 'text-slate-600', step: 1 },
  accepted: { label: 'Accepted', bg: 'bg-blue-100', text: 'text-blue-700', step: 2 },
  rejected: { label: 'Rejected', bg: 'bg-slate-100', text: 'text-slate-500', step: -1 },
  awaiting_signature: { label: 'Awaiting Signature', bg: 'bg-amber-100', text: 'text-amber-700', step: 3 },
  signature_expired: { label: 'Signature Expired', bg: 'bg-rose-100', text: 'text-rose-600', step: -1 },
  signed: { label: 'Signed', bg: 'bg-emerald-100', text: 'text-emerald-700', step: 4 },
  creating_content: { label: 'Creating Content', bg: 'bg-blue-100', text: 'text-blue-700', step: 5 },
  content_submitted: { label: 'Content Submitted', bg: 'bg-amber-100', text: 'text-amber-700', step: 6 },
  content_revision: { label: 'Revision Requested', bg: 'bg-orange-100', text: 'text-orange-700', step: 5.5 },
  content_approved: { label: 'Content Approved', bg: 'bg-emerald-100', text: 'text-emerald-700', step: 7 },
  completed: { label: 'Completed', bg: 'bg-emerald-100', text: 'text-emerald-700', step: 8 },
  disputed: { label: 'Disputed', bg: 'bg-rose-100', text: 'text-rose-600', step: -2 },
} as any)[status] || { label: status, bg: 'bg-slate-100', text: 'text-slate-600', step: 0 };

const getPlatformIcon = (platform: string) => (Icons as any)[platform] || Icons.globe;

const getIssues = (campaign: any) => {
  const issues: any[] = [];
  campaign.influencers?.forEach((inf: any) => {
    if (inf.status === 'disputed') {
      issues.push({ type: 'dispute', severity: 'high', influencer: inf, message: `Dispute: ${inf.name}` });
    }
    if (inf.isOverdue) {
      issues.push({ type: 'overdue', severity: 'medium', influencer: inf, message: `Overdue: ${inf.name} (${inf.daysOverdue} days late)` });
    }
    if (inf.status === 'content_submitted' && inf.hoursUntilAutoApprove && inf.hoursUntilAutoApprove < 12) {
      issues.push({ type: 'pending_review', severity: 'low', influencer: inf, message: `Pending ${inf.hoursUntilAutoApprove}h: ${inf.name}` });
    }
    if (inf.status === 'awaiting_signature' && inf.hoursRemaining && inf.hoursRemaining < 24) {
      issues.push({ type: 'signature_pending', severity: 'medium', influencer: inf, message: `Signature ${inf.hoursRemaining}h: ${inf.name}` });
    }
  });
  return issues.sort((a, b) => {
    const severityOrder: any = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
};

// ============================================
// MOCK DATA
// ============================================
const mockCampaigns = [
  {
    id: 'CMP-2891',
    name: 'Winter Collection Launch',
    business: { id: 'BUS-7890', name: 'Luxury Brands SA', avatar: 'LB', verified: true },
    type: 'public',
    category: 'Fashion & Lifestyle',
    status: 'active',
    budget: 85000,
    escrowTotal: 70000,
    releasedTotal: 15000,
    createdAt: '2025-12-15',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    contentDeadline: '2026-01-20',
    description: 'Promote our exclusive Winter 2026 collection.',
    influencerSlots: 6,
    influencers: [
      { id: 'INF-001', name: 'Noura Al-Rashid', handle: '@noura_style', avatar: 'NR', followers: 125000, platform: 'instagram', status: 'completed', source: 'invited', payment: 15000, escrowStatus: 'released', contentApprovedAt: '2026-01-04' },
      { id: 'INF-002', name: 'Ahmed Al-Farsi', handle: '@ahmed_tech', avatar: 'AF', followers: 89000, platform: 'instagram', status: 'disputed', source: 'applied', disputeId: 'DSP-445', payment: 18000, escrowStatus: 'held', disputeReason: 'Business rejected content claiming it doesn\'t match brief' },
      { id: 'INF-003', name: 'Sara Al-Otaibi', handle: '@sara.lifestyle', avatar: 'SO', followers: 156000, platform: 'tiktok', status: 'creating_content', source: 'invited', payment: 17000, escrowStatus: 'held', contentDeadline: '2026-01-03', isOverdue: true, daysOverdue: 4 },
      { id: 'INF-004', name: 'Omar Al-Dosari', handle: '@omar_adventures', avatar: 'OD', followers: 210000, platform: 'instagram', status: 'content_submitted', source: 'applied', payment: 20000, escrowStatus: 'held', contentSubmittedAt: '2026-01-06', hoursUntilAutoApprove: 36 },
      { id: 'INF-005', name: 'Layla Hassan', handle: '@layla.beauty', avatar: 'LH', followers: 78000, platform: 'instagram', status: 'awaiting_signature', source: 'applied', payment: 15000, escrowStatus: 'pending', hoursRemaining: 18 },
      { id: 'INF-006', name: 'Reem Al-Harbi', handle: '@reem_fashion', avatar: 'RH', followers: 92000, platform: 'tiktok', status: 'content_revision', source: 'invited', revisionRound: 1, payment: 16000, escrowStatus: 'held', revisionDeadline: '2026-01-08', revisionFeedback: 'Please add product close-up shots and mention the discount code' },
    ],
  },
  {
    id: 'CMP-2845',
    name: 'Tech Product Review Series',
    business: { id: 'BUS-5678', name: 'TechStart Inc.', avatar: 'TS', verified: true },
    type: 'invite',
    category: 'Technology',
    status: 'active',
    budget: 45000,
    escrowTotal: 45000,
    releasedTotal: 15000,
    createdAt: '2025-12-01',
    startDate: '2025-12-15',
    endDate: '2026-01-15',
    contentDeadline: '2026-01-10',
    description: 'Review our new tech products.',
    influencerSlots: 3,
    influencers: [
      { id: 'INF-101', name: 'Khalid Al-Mutairi', handle: '@khalid_tech', avatar: 'KM', followers: 95000, platform: 'youtube', status: 'completed', source: 'invited', payment: 15000, escrowStatus: 'released', contentApprovedAt: '2025-12-20' },
      { id: 'INF-102', name: 'Fatima Al-Saud', handle: '@fatima.reviews', avatar: 'FS', followers: 110000, platform: 'instagram', status: 'creating_content', source: 'invited', payment: 15000, escrowStatus: 'held' },
      { id: 'INF-103', name: 'Yusuf Al-Harbi', handle: '@yusuf_tech', avatar: 'YH', followers: 88000, platform: 'youtube', status: 'creating_content', source: 'invited', payment: 15000, escrowStatus: 'held' },
    ],
  },
  {
    id: 'CMP-2790',
    name: 'Ramadan Food Campaign',
    business: { id: 'BUS-8901', name: 'Fresh Bites Cafe', avatar: 'FB', verified: false },
    type: 'hybrid',
    category: 'Food & Beverage',
    status: 'completed',
    budget: 32000,
    escrowTotal: 0,
    releasedTotal: 32000,
    createdAt: '2025-02-15',
    startDate: '2025-03-01',
    endDate: '2025-04-01',
    contentDeadline: '2025-03-25',
    description: 'Promote Ramadan special menu.',
    influencerSlots: 4,
    influencers: [
      { id: 'INF-201', name: 'Saleh Al-Qahtani', handle: '@saleh_food', avatar: 'SQ', followers: 72000, platform: 'instagram', status: 'completed', source: 'applied', payment: 8000, escrowStatus: 'released', contentApprovedAt: '2025-03-20' },
      { id: 'INF-202', name: 'Mona Al-Rashid', handle: '@mona.eats', avatar: 'MR', followers: 65000, platform: 'tiktok', status: 'completed', source: 'invited', payment: 8000, escrowStatus: 'released', contentApprovedAt: '2025-03-22' },
      { id: 'INF-203', name: 'Yusuf Al-Harbi', handle: '@yusuf_foodie', avatar: 'YH', followers: 58000, platform: 'instagram', status: 'completed', source: 'applied', payment: 8000, escrowStatus: 'released', contentApprovedAt: '2025-03-24' },
      { id: 'INF-204', name: 'Hana Al-Dosari', handle: '@hana.kitchen', avatar: 'HD', followers: 70000, platform: 'tiktok', status: 'completed', source: 'invited', payment: 8000, escrowStatus: 'released', contentApprovedAt: '2025-03-23' },
    ],
  },
  {
    id: 'CMP-2756',
    name: 'Summer Collection Preview',
    business: { id: 'BUS-6789', name: 'Gulf Retail LLC', avatar: 'GR', verified: true },
    type: 'public',
    category: 'Retail & E-commerce',
    status: 'cancelled',
    budget: 60000,
    escrowTotal: 0,
    releasedTotal: 0,
    createdAt: '2025-11-01',
    startDate: '2025-11-15',
    endDate: '2025-12-15',
    description: 'Preview summer collection.',
    influencerSlots: 6,
    influencers: [],
  },
];

const mockActivityLog = [
  { id: 1, type: 'payment_released', influencer: 'Noura Al-Rashid', amount: 14550, timestamp: '2026-01-04T16:00:00', icon: 'dollarSign', color: 'emerald' },
  { id: 2, type: 'content_approved', influencer: 'Noura Al-Rashid', timestamp: '2026-01-04T15:45:00', icon: 'checkCircle', color: 'emerald' },
  { id: 3, type: 'dispute_opened', influencer: 'Ahmed Al-Farsi', disputeId: 'DSP-445', timestamp: '2026-01-05T10:30:00', icon: 'alertCircle', color: 'rose' },
  { id: 4, type: 'content_submitted', influencer: 'Omar Al-Dosari', timestamp: '2026-01-06T09:15:00', icon: 'image', color: 'blue' },
  { id: 5, type: 'revision_requested', influencer: 'Reem Al-Harbi', round: 1, timestamp: '2026-01-05T14:20:00', icon: 'edit', color: 'amber' },
  { id: 6, type: 'contract_signed', influencer: 'Layla Hassan', timestamp: '2026-01-06T11:00:00', icon: 'fileCheck', color: 'emerald' },
  { id: 7, type: 'campaign_started', timestamp: '2026-01-01T00:00:00', icon: 'megaphone', color: 'blue' },
];

const mockAdminNotes = [
  { id: 1, text: 'Extended deadline for Sara - client requested due to shipping delays', author: 'Ahmed Q.', timestamp: '2026-01-05T10:30:00' },
  { id: 2, text: 'Dispute escalated - awaiting business response', author: 'Sara M.', timestamp: '2026-01-05T14:00:00' },
];

// ============================================
// STATUS FLOW COMPONENT
// ============================================
const StatusFlow = ({ influencer }: { influencer: any }) => {
  const steps = [
    { key: 'applied', label: 'Applied' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'signed', label: 'Signed' },
    { key: 'creating', label: 'Creating' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'done', label: 'Done' },
  ];

  const getStepStatus = (stepKey: string) => {
    const statusMap: any = {
      applied: ['applied', 'invited', 'accepted', 'rejected', 'awaiting_signature', 'signature_expired', 'signed', 'creating_content', 'content_revision', 'content_submitted', 'content_approved', 'completed', 'disputed'],
      accepted: ['accepted', 'awaiting_signature', 'signature_expired', 'signed', 'creating_content', 'content_revision', 'content_submitted', 'content_approved', 'completed', 'disputed'],
      signed: ['signed', 'creating_content', 'content_revision', 'content_submitted', 'content_approved', 'completed', 'disputed'],
      creating: ['creating_content', 'content_revision', 'content_submitted', 'content_approved', 'completed'],
      submitted: ['content_submitted', 'content_approved', 'completed'],
      done: ['completed'],
    };

    if (statusMap[stepKey]?.includes(influencer.status)) {
      if (stepKey === 'creating' && ['creating_content', 'content_revision'].includes(influencer.status)) return 'current';
      if (stepKey === 'submitted' && influencer.status === 'content_submitted') return 'current';
      if (stepKey === 'done' && influencer.status === 'completed') return 'completed';
      return 'completed';
    }
    return 'pending';
  };

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const status = getStepStatus(step.key);
        return (
          <React.Fragment key={step.key}>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${
              status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
              status === 'current' ? 'bg-blue-100 text-blue-700' :
              'bg-slate-100 text-slate-400'
            }`}>
              {status === 'completed' && <Icons.check className="w-3 h-3" />}
              {status === 'current' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <Icons.chevronRight className={`w-3 h-3 ${status === 'completed' ? 'text-emerald-400' : 'text-slate-300'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ============================================
// INFLUENCER CARD COMPONENT
// ============================================
const InfluencerCard = ({ influencer, onExtend, onMarkDelivered }: any) => {
  const PlatformIcon = getPlatformIcon(influencer.platform);

  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      influencer.status === 'disputed' ? 'border-rose-300 bg-rose-50/50' :
      influencer.isOverdue ? 'border-amber-300 bg-amber-50/50' :
      'border-slate-200 bg-white hover:border-slate-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg ${
            influencer.status === 'disputed' ? 'bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-500/25' :
            influencer.status === 'completed' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/25' :
            'bg-gradient-to-br from-violet-500 to-violet-600 shadow-violet-500/25'
          }`}>
            {influencer.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">{influencer.name}</p>
              {influencer.source && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  influencer.source === 'invited' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {influencer.source === 'invited' ? 'Invited' : 'Applied'}
                </span>
              )}
              {influencer.status === 'disputed' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white animate-pulse">DISPUTED</span>
              )}
              {influencer.isOverdue && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">{influencer.daysOverdue}d OVERDUE</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{influencer.handle}</span>
              <span>•</span>
              <PlatformIcon className="w-3.5 h-3.5" />
              <span>{(influencer.followers / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">{formatCurrency(influencer.payment)}</p>
          <p className={`text-xs ${
            influencer.escrowStatus === 'released' ? 'text-emerald-600' :
            influencer.escrowStatus === 'held' ? 'text-amber-600' : 'text-slate-500'
          }`}>
            {influencer.escrowStatus === 'released' ? '✓ Released' :
             influencer.escrowStatus === 'held' ? '🔒 In Escrow' : 'Pending'}
          </p>
        </div>
      </div>

      {/* Status Flow */}
      <div className="mb-4">
        <StatusFlow influencer={influencer} />
      </div>

      {/* Details & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {influencer.status === 'awaiting_signature' && (
            <span className="flex items-center gap-1">
              <Icons.timer className="w-3.5 h-3.5 text-amber-500" />
              {influencer.hoursRemaining}h remaining to sign
            </span>
          )}
          {influencer.status === 'creating_content' && (
            <>
              <span className="flex items-center gap-1">
                <Icons.calendar className="w-3.5 h-3.5" />
                Deadline: {influencer.contentDeadline ? new Date(influencer.contentDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
              </span>
              {influencer.daysRemaining && <span className="text-emerald-600">{influencer.daysRemaining} days left</span>}
            </>
          )}
          {influencer.status === 'content_revision' && (
            <>
              <span className="flex items-center gap-1 text-orange-600">
                <Icons.edit className="w-3.5 h-3.5" />
                Revision {influencer.revisionRound}/2
              </span>
              <span>Due: {new Date(influencer.revisionDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </>
          )}
          {influencer.status === 'content_submitted' && (
            <span className="flex items-center gap-1">
              <Icons.clock className="w-3.5 h-3.5 text-amber-500" />
              Auto-approve in {influencer.hoursUntilAutoApprove}h
            </span>
          )}
          {influencer.status === 'completed' && (
            <span className="flex items-center gap-1 text-emerald-600">
              <Icons.checkCircle className="w-3.5 h-3.5" />
              Completed {influencer.contentApprovedAt ? new Date(influencer.contentApprovedAt).toLocaleDateString() : ''}
            </span>
          )}
          {influencer.status === 'disputed' && (
            <span className="flex items-center gap-1 text-rose-600">
              <Icons.alertCircle className="w-3.5 h-3.5" />
              {influencer.disputeId}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {influencer.status === 'awaiting_signature' && (
            <button onClick={() => onExtend(influencer)} className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5">
              <Icons.clockPlus className="w-3.5 h-3.5" />
              Extend +24h
            </button>
          )}
          {['creating_content', 'content_revision'].includes(influencer.status) && (
            <button onClick={() => onExtend(influencer)} className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5">
              <Icons.clockPlus className="w-3.5 h-3.5" />
              Extend Deadline
            </button>
          )}
          {influencer.status === 'content_submitted' && (
            <button onClick={() => onMarkDelivered(influencer)} className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-medium text-white flex items-center gap-1.5 shadow-lg shadow-emerald-600/25">
              <Icons.checkCircle className="w-3.5 h-3.5" />
              Mark Delivered
            </button>
          )}
          {influencer.status === 'disputed' && (
            <button className="h-8 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-medium text-white flex items-center gap-1.5 shadow-lg shadow-rose-600/25">
              <Icons.scale className="w-3.5 h-3.5" />
              View Dispute
            </button>
          )}
          <button className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            View Profile
          </button>
        </div>
      </div>

      {/* Revision Feedback */}
      {influencer.status === 'content_revision' && influencer.revisionFeedback && (
        <div className="mt-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
          <p className="text-xs font-medium text-orange-700 mb-1">Business Feedback:</p>
          <p className="text-xs text-orange-600">{influencer.revisionFeedback}</p>
        </div>
      )}

      {/* Dispute Reason */}
      {influencer.status === 'disputed' && influencer.disputeReason && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-100">
          <p className="text-xs font-medium text-rose-700 mb-1">Dispute Reason:</p>
          <p className="text-xs text-rose-600">{influencer.disputeReason}</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// CAMPAIGNS LIST VIEW
// ============================================
const CampaignsListView = ({ campaigns, onSelectCampaign, filters, setFilters }: any) => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c: any) => c.status === 'active').length;
  const completedCampaigns = campaigns.filter((c: any) => c.status === 'completed').length;
  const campaignsWithIssues = campaigns.filter((c: any) => getIssues(c).length > 0);

  const filteredCampaigns = campaigns.filter((c: any) => {
    if (filters.status !== 'all' && c.status !== filters.status) return false;
    if (filters.type !== 'all' && c.type !== filters.type) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.business.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Campaign Oversight</h1>
          <p className="text-sm text-slate-500">Monitor and manage all platform campaigns</p>
        </div>
        <button className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-600 transition-colors">
          <Icons.refresh className="w-4 h-4" />
          Refresh
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Campaigns', value: totalCampaigns, icon: 'megaphone', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
            { label: 'Active', value: activeCampaigns, icon: 'activity', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
            { label: 'Completed', value: completedCampaigns, icon: 'checkCircle', bgColor: 'bg-slate-100', textColor: 'text-slate-600' },
            { label: 'Need Attention', value: campaignsWithIssues.length, icon: 'alertTriangle', bgColor: 'bg-rose-100', textColor: 'text-rose-600', highlight: campaignsWithIssues.length > 0 },
          ].map((stat, i) => {
            const Icon = (Icons as any)[stat.icon];
            return (
              <div key={i} className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-lg cursor-pointer ${stat.highlight ? 'border-rose-200 bg-rose-50/50' : 'border-slate-200'}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <p className={`text-2xl font-bold ${stat.highlight ? 'text-rose-600' : 'text-slate-900'}`}>{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Needs Attention Section */}
        {campaignsWithIssues.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Icons.alertTriangle className="w-5 h-5 text-rose-500" />
              <h2 className="text-sm font-semibold text-slate-900">NEEDS ATTENTION ({campaignsWithIssues.length})</h2>
            </div>
            <div className="bg-white rounded-2xl border border-rose-200 divide-y divide-rose-100 overflow-hidden">
              {campaignsWithIssues.map((campaign: any) => {
                const issues = getIssues(campaign);
                return (
                  <div
                    key={campaign.id}
                    className="px-5 py-4 flex items-center gap-4 hover:bg-rose-50/50 cursor-pointer transition-colors"
                    onClick={() => onSelectCampaign(campaign)}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${issues[0].severity === 'high' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{campaign.name}</p>
                      <p className="text-xs text-slate-500">{campaign.business.name}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {issues.slice(0, 2).map((issue: any, i: number) => (
                        <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                          issue.severity === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {issue.type === 'dispute' && '🔴 '}
                          {issue.type === 'overdue' && '🟡 '}
                          {issue.message}
                        </span>
                      ))}
                      {issues.length > 2 && (
                        <span className="text-xs text-slate-500">+{issues.length - 2} more</span>
                      )}
                    </div>
                    <Icons.chevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Campaigns Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              {['all', 'active', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilters({ ...filters, status })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.status === status ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="h-10 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="public">Public</option>
                <option value="invite">Invite Only</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <div className="relative">
                <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-64 h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Campaign</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Business</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Budget</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Progress</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Issues</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((campaign: any) => {
                const typeConfig = getTypeConfig(campaign.type);
                const statusConfig = getStatusConfig(campaign.status);
                const TypeIcon = (Icons as any)[typeConfig.icon];
                const issues = getIssues(campaign);
                const completedInfluencers = campaign.influencers?.filter((i: any) => i.status === 'completed').length || 0;
                const totalInfluencers = campaign.influencers?.length || 0;

                return (
                  <tr
                    key={campaign.id}
                    className="hover:bg-slate-50 cursor-pointer group"
                    onClick={() => onSelectCampaign(campaign)}
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{campaign.name}</p>
                      <p className="text-xs text-slate-500">{campaign.id} • {campaign.category}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow-lg shadow-blue-500/20">
                          {campaign.business.avatar}
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">{campaign.business.name}</p>
                          {campaign.business.verified && (
                            <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                              <Icons.checkCircle className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
                        <TypeIcon className="w-3 h-3" />
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">{formatCurrency(campaign.budget)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600">{completedInfluencers}/{totalInfluencers} done</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${campaign.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            style={{ width: totalInfluencers ? `${(completedInfluencers / totalInfluencers) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {issues.length > 0 ? (
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          issues.some((i: any) => i.severity === 'high') ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredCampaigns.length === 0 && (
            <div className="py-12 text-center">
              <Icons.megaphone className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No campaigns found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// CAMPAIGN DETAIL VIEW
// ============================================
const CampaignDetailView = ({ campaign, onBack }: any) => {
  const [activeTab, setActiveTab] = useState('influencers');
  const [showExtendModal, setShowExtendModal] = useState<any>(null);
  const [showDeliveredModal, setShowDeliveredModal] = useState<any>(null);
  const [newNote, setNewNote] = useState('');
  const [adminNotes, setAdminNotes] = useState(mockAdminNotes);

  const statusConfig = getStatusConfig(campaign.status);
  const typeConfig = getTypeConfig(campaign.type);
  const issues = getIssues(campaign);

  // Group influencers by status
  const groupedInfluencers = {
    awaiting_signature: campaign.influencers?.filter((i: any) => i.status === 'awaiting_signature') || [],
    creating_content: campaign.influencers?.filter((i: any) => ['creating_content', 'content_revision'].includes(i.status)) || [],
    pending_review: campaign.influencers?.filter((i: any) => i.status === 'content_submitted') || [],
    completed: campaign.influencers?.filter((i: any) => i.status === 'completed') || [],
    disputed: campaign.influencers?.filter((i: any) => i.status === 'disputed') || [],
  };

  const tabs = [
    { id: 'influencers', label: 'Influencers', count: campaign.influencers?.length },
    { id: 'content', label: 'Content' },
    { id: 'financial', label: 'Financial' },
    { id: 'activity', label: 'Activity' },
  ];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setAdminNotes([
      { id: Date.now(), text: newNote, author: 'Ahmed Q.', timestamp: new Date().toISOString() },
      ...adminNotes,
    ]);
    setNewNote('');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shrink-0">
        <div className="h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
              <Icons.arrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-900">{campaign.name}</h1>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-sm text-slate-500">{campaign.id} • {campaign.business.name} • {campaign.category}</p>
            </div>
          </div>
        </div>

        {/* Issues Alert */}
        {issues.length > 0 && (
          <div className="px-6 pb-4">
            <div className={`p-4 rounded-xl border ${
              issues.some((i: any) => i.severity === 'high') ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Icons.alertTriangle className={`w-4 h-4 ${issues.some((i: any) => i.severity === 'high') ? 'text-rose-600' : 'text-amber-600'}`} />
                <span className={`text-sm font-semibold ${issues.some((i: any) => i.severity === 'high') ? 'text-rose-700' : 'text-amber-700'}`}>
                  {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'} Need Attention
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {issues.map((issue: any, i: number) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    issue.severity === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {issue.type === 'dispute' && <Icons.alertCircle className="w-3.5 h-3.5" />}
                    {issue.type === 'overdue' && <Icons.clock className="w-3.5 h-3.5" />}
                    {issue.type === 'pending_review' && <Icons.timer className="w-3.5 h-3.5" />}
                    {issue.type === 'signature_pending' && <Icons.fileText className="w-3.5 h-3.5" />}
                    <span>{issue.message}</span>
                    {issue.type === 'dispute' && <button className="ml-1 underline">Go to Dispute →</button>}
                    {(issue.type === 'overdue' || issue.type === 'signature_pending') && (
                      <button onClick={() => setShowExtendModal(issue.influencer)} className="ml-1 underline">Extend</button>
                    )}
                    {issue.type === 'pending_review' && (
                      <button onClick={() => setShowDeliveredModal(issue.influencer)} className="ml-1 underline">Mark Delivered</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="px-6 pb-4">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between divide-x divide-slate-200">
              {[
                { label: 'Budget', value: formatCurrency(campaign.budget), icon: 'wallet', bgColor: 'bg-slate-200', textColor: 'text-slate-900', iconColor: 'text-slate-600' },
                { label: 'In Escrow', value: formatCurrency(campaign.escrowTotal), icon: 'lock', bgColor: 'bg-amber-100', textColor: 'text-amber-600', iconColor: 'text-amber-600' },
                { label: 'Released', value: formatCurrency(campaign.releasedTotal), icon: 'checkCircle', bgColor: 'bg-emerald-100', textColor: 'text-emerald-600', iconColor: 'text-emerald-600' },
                { label: 'Influencers', value: `${groupedInfluencers.completed.length}/${campaign.influencers?.length || 0} done`, icon: 'users', bgColor: 'bg-blue-100', textColor: 'text-blue-600', iconColor: 'text-blue-600' },
                { label: 'Period', value: `${new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, icon: 'calendar', bgColor: 'bg-violet-100', textColor: 'text-violet-600', iconColor: 'text-violet-600' },
              ].map((stat, i) => {
                const Icon = (Icons as any)[stat.icon];
                return (
                  <div key={i} className="flex-1 flex items-center justify-center gap-3 px-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${stat.textColor}`}>{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`min-w-[22px] h-5 px-1.5 rounded-lg text-xs font-semibold flex items-center justify-center ${
                    activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Influencers Tab */}
          {activeTab === 'influencers' && (
            <div className="space-y-6">
              {groupedInfluencers.disputed.length > 0 && (
                <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <h3 className="text-sm font-semibold text-rose-700">DISPUTED ({groupedInfluencers.disputed.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {groupedInfluencers.disputed.map((inf: any) => (
                      <InfluencerCard key={inf.id} influencer={inf} onExtend={setShowExtendModal} onMarkDelivered={setShowDeliveredModal} />
                    ))}
                  </div>
                </div>
              )}

              {groupedInfluencers.awaiting_signature.length > 0 && (
                <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="text-sm font-semibold text-amber-700">AWAITING SIGNATURE ({groupedInfluencers.awaiting_signature.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {groupedInfluencers.awaiting_signature.map((inf: any) => (
                      <InfluencerCard key={inf.id} influencer={inf} onExtend={setShowExtendModal} onMarkDelivered={setShowDeliveredModal} />
                    ))}
                  </div>
                </div>
              )}

              {groupedInfluencers.creating_content.length > 0 && (
                <div className="bg-blue-50/30 rounded-2xl border border-blue-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h3 className="text-sm font-semibold text-blue-700">CREATING CONTENT ({groupedInfluencers.creating_content.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {groupedInfluencers.creating_content.map((inf: any) => (
                      <InfluencerCard key={inf.id} influencer={inf} onExtend={setShowExtendModal} onMarkDelivered={setShowDeliveredModal} />
                    ))}
                  </div>
                </div>
              )}

              {groupedInfluencers.pending_review.length > 0 && (
                <div className="bg-orange-50/50 rounded-2xl border border-orange-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <h3 className="text-sm font-semibold text-orange-700">PENDING BUSINESS REVIEW ({groupedInfluencers.pending_review.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {groupedInfluencers.pending_review.map((inf: any) => (
                      <InfluencerCard key={inf.id} influencer={inf} onExtend={setShowExtendModal} onMarkDelivered={setShowDeliveredModal} />
                    ))}
                  </div>
                </div>
              )}

              {groupedInfluencers.completed.length > 0 && (
                <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="text-sm font-semibold text-emerald-700">COMPLETED ({groupedInfluencers.completed.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {groupedInfluencers.completed.map((inf: any) => (
                      <InfluencerCard key={inf.id} influencer={inf} onExtend={setShowExtendModal} onMarkDelivered={setShowDeliveredModal} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3">
                <Icons.info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">View Only:</span> Content approval is managed by the Business.
                  If no response within 48h, content is auto-approved.
                </p>
              </div>

              {groupedInfluencers.pending_review.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    PENDING REVIEW ({groupedInfluencers.pending_review.length})
                  </h3>
                  <div className="space-y-3">
                    {groupedInfluencers.pending_review.map((inf: any) => (
                      <div key={inf.id} className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl bg-slate-200 flex items-center justify-center">
                            <Icons.video className="w-8 h-8 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-slate-900">{inf.name}</p>
                              <span className="text-xs text-slate-500">• Instagram Reel</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">
                              Submitted {inf.contentSubmittedAt ? new Date(inf.contentSubmittedAt).toLocaleString() : ''}
                            </p>

                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                                  <Icons.timer className="w-3.5 h-3.5" />
                                  Auto-approve in {inf.hoursUntilAutoApprove}h
                                </span>
                                <span className="text-xs text-slate-500">Business hasn't reviewed</span>
                              </div>
                              <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${((48 - inf.hoursUntilAutoApprove) / 48) * 100}%` }} />
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white flex items-center gap-1.5">
                                <Icons.externalLink className="w-3.5 h-3.5" />
                                View Content
                              </button>
                              <button onClick={() => setShowDeliveredModal(inf)} className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-medium text-white flex items-center gap-1.5">
                                <Icons.checkCircle className="w-3.5 h-3.5" />
                                Mark as Delivered
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {groupedInfluencers.completed.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    APPROVED ({groupedInfluencers.completed.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {groupedInfluencers.completed.map((inf: any) => (
                      <div key={inf.id} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                        <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Icons.checkCircle className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{inf.name}</p>
                          <p className="text-xs text-emerald-600">Approved {inf.contentApprovedAt ? new Date(inf.contentApprovedAt).toLocaleDateString() : ''}</p>
                        </div>
                        <button className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">View</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-semibold text-slate-900">Budget Allocation</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-slate-900">{formatCurrency(campaign.budget)}</span>
                      <span className="text-sm text-slate-500">Total Budget</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${(campaign.releasedTotal / campaign.budget) * 100}%` }} />
                      <div className="h-full bg-amber-500" style={{ width: `${(campaign.escrowTotal / campaign.budget) * 100}%` }} />
                    </div>
                    <div className="flex items-center gap-6 mt-3">
                      <span className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded bg-emerald-500" />
                        Released: {formatCurrency(campaign.releasedTotal)} ({Math.round((campaign.releasedTotal / campaign.budget) * 100)}%)
                      </span>
                      <span className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded bg-amber-500" />
                        In Escrow: {formatCurrency(campaign.escrowTotal)} ({Math.round((campaign.escrowTotal / campaign.budget) * 100)}%)
                      </span>
                      <span className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded bg-slate-200" />
                        Available: {formatCurrency(campaign.budget - campaign.releasedTotal - campaign.escrowTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <Icons.checkCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-emerald-600">{formatCurrency(campaign.releasedTotal)}</p>
                      <p className="text-xs text-slate-600 mt-1">Released</p>
                    </div>
                    <div className="text-center p-5 rounded-2xl bg-amber-50 border border-amber-100">
                      <Icons.lock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-amber-600">{formatCurrency(campaign.escrowTotal)}</p>
                      <p className="text-xs text-slate-600 mt-1">In Escrow</p>
                    </div>
                    <div className="text-center p-5 rounded-2xl bg-violet-50 border border-violet-100">
                      <Icons.trendingUp className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                      <p className="text-xl font-bold text-violet-600">{formatCurrency(campaign.budget * 0.06)}</p>
                      <p className="text-xs text-slate-600 mt-1">Platform Fee (6%)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-semibold text-slate-900">Payment Breakdown</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Per-influencer payment status and commission details</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-3">Influencer</th>
                      <th className="text-right text-xs font-semibold text-slate-500 uppercase px-5 py-3">Amount</th>
                      <th className="text-right text-xs font-semibold text-slate-500 uppercase px-5 py-3">Commission (3%)</th>
                      <th className="text-right text-xs font-semibold text-slate-500 uppercase px-5 py-3">Net Payout</th>
                      <th className="text-right text-xs font-semibold text-slate-500 uppercase px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {campaign.influencers?.map((inf: any) => {
                      const commission = inf.payment * 0.03;
                      const netPayout = inf.payment - commission;
                      return (
                        <tr key={inf.id} className="hover:bg-slate-50">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-semibold text-violet-600">{inf.avatar}</div>
                              <span className="text-sm font-medium text-slate-900">{inf.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right text-sm text-slate-900">{formatCurrency(inf.payment)}</td>
                          <td className="px-5 py-4 text-right text-sm text-slate-500">-{formatCurrency(commission)}</td>
                          <td className="px-5 py-4 text-right text-sm font-semibold text-slate-900">{formatCurrency(netPayout)}</td>
                          <td className="px-5 py-4 text-right">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              inf.escrowStatus === 'released' ? 'bg-emerald-100 text-emerald-700' :
                              inf.escrowStatus === 'held' ? 'bg-amber-100 text-amber-700' :
                              inf.status === 'disputed' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {inf.escrowStatus === 'released' ? '✓ Released' :
                               inf.escrowStatus === 'held' ? '🔒 In Escrow' :
                               inf.status === 'disputed' ? '⚠️ Disputed' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Activity Log</h3>
                  <p className="text-xs text-slate-500 mt-0.5">All campaign events and actions</p>
                </div>
                <select className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                  <option>All Events</option>
                  <option>Payments</option>
                  <option>Content</option>
                  <option>Contracts</option>
                  <option>Disputes</option>
                </select>
              </div>
              <div className="divide-y divide-slate-100">
                {mockActivityLog.map((activity) => {
                  const Icon = (Icons as any)[activity.icon];
                  return (
                    <div key={activity.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.color === 'emerald' ? 'bg-emerald-50' :
                        activity.color === 'rose' ? 'bg-rose-50' :
                        activity.color === 'amber' ? 'bg-amber-50' : 'bg-blue-50'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          activity.color === 'emerald' ? 'text-emerald-600' :
                          activity.color === 'rose' ? 'text-rose-600' :
                          activity.color === 'amber' ? 'text-amber-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          {activity.type === 'payment_released' && <>Payment of <span className="font-semibold">{formatCurrency(activity.amount || 0)}</span> released to <span className="font-semibold">{activity.influencer}</span></>}
                          {activity.type === 'content_approved' && <>Content from <span className="font-semibold">{activity.influencer}</span> was approved</>}
                          {activity.type === 'dispute_opened' && <>Dispute <span className="font-semibold">{activity.disputeId}</span> opened for <span className="font-semibold">{activity.influencer}</span></>}
                          {activity.type === 'content_submitted' && <><span className="font-semibold">{activity.influencer}</span> submitted content</>}
                          {activity.type === 'revision_requested' && <>Revision round {activity.round} requested for <span className="font-semibold">{activity.influencer}</span></>}
                          {activity.type === 'contract_signed' && <><span className="font-semibold">{activity.influencer}</span> signed the contract</>}
                          {activity.type === 'campaign_started' && <>Campaign started</>}
                        </p>
                        <p className="text-xs text-slate-400">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto shrink-0">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Icons.penLine className="w-4 h-4 text-slate-400" />
              Admin Notes
            </h3>
            <div className="mb-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full h-20 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleAddNote} disabled={!newNote.trim()} className="mt-2 w-full h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors">
                Save Note
              </button>
            </div>
            {adminNotes.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {adminNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-700 mb-2">{note.text}</p>
                    <p className="text-[10px] text-slate-400">{note.author} • {new Date(note.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Icons.info className="w-4 h-4 text-slate-400" />
              Campaign Info
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100">
              {[
                { label: 'Created', value: new Date(campaign.createdAt).toLocaleDateString() },
                { label: 'Started', value: new Date(campaign.startDate).toLocaleDateString() },
                { label: 'Ends', value: new Date(campaign.endDate).toLocaleDateString() },
                { label: 'Content Deadline', value: new Date(campaign.contentDeadline).toLocaleDateString() },
                { label: 'Type', value: typeConfig.label },
                { label: 'Category', value: campaign.category },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className="text-xs font-medium text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Icons.building className="w-4 h-4 text-slate-400" />
              Business
            </h3>
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-500/20">
                  {campaign.business.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{campaign.business.name}</p>
                  {campaign.business.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <Icons.checkCircle className="w-3.5 h-3.5" /> Verified Business
                    </span>
                  )}
                </div>
              </div>
              <button className="w-full h-10 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <Icons.externalLink className="w-4 h-4" />
                View Business Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extend Deadline Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowExtendModal(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icons.clockPlus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Extend Deadline</h2>
                    <p className="text-white/80 text-sm">{showExtendModal.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowExtendModal(null)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
                  <Icons.x className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {showExtendModal.status === 'awaiting_signature' ? (
                <div className="mb-6">
                  <p className="text-sm text-slate-600 mb-4">Current deadline: <span className="font-semibold">{showExtendModal.hoursRemaining}h remaining</span></p>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-sm text-blue-700">This will extend the signature deadline by <span className="font-semibold">24 hours</span>.</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-sm text-slate-600 mb-2">Current deadline: <span className="font-semibold">{showExtendModal.contentDeadline ? new Date(showExtendModal.contentDeadline).toLocaleDateString() : 'N/A'}</span></p>
                  <p className="text-sm text-slate-600 mb-4">Campaign ends: <span className="font-semibold">{new Date(campaign.endDate).toLocaleDateString()}</span></p>
                  <label className="block text-sm font-medium text-slate-700 mb-2">New Deadline</label>
                  <input type="date" className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm" max={campaign.endDate} />
                </div>
              )}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Reason (required)</label>
                <textarea placeholder="Why are you extending this deadline?" className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowExtendModal(null)} className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50">Cancel</button>
                <button className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-600/25">Extend Deadline</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Delivered Modal */}
      {showDeliveredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDeliveredModal(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icons.checkCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Mark as Delivered</h2>
                    <p className="text-white/80 text-sm">{showDeliveredModal.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowDeliveredModal(null)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
                  <Icons.x className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
                <div className="flex items-start gap-3">
                  <Icons.alertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-700 mb-1">Override Business Review</p>
                    <p className="text-xs text-amber-600">This will approve the content and release <span className="font-semibold">{formatCurrency(showDeliveredModal.payment * 0.97)}</span> to the influencer.</p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 mb-3">
                  <span className="text-sm text-slate-600">Content submitted</span>
                  <span className="text-sm font-medium text-slate-900">{showDeliveredModal.contentSubmittedAt ? new Date(showDeliveredModal.contentSubmittedAt).toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-600">Auto-approve in</span>
                  <span className="text-sm font-medium text-amber-600">{showDeliveredModal.hoursUntilAutoApprove}h</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Reason for override (required)</label>
                <textarea placeholder="Why are you overriding the business review?" className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowDeliveredModal(null)} className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50">Cancel</button>
                <button className="flex-1 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-600/25">Confirm & Release Payment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function CampaignsPage() {
  const [activePage, setActivePage] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [filters, setFilters] = useState({ status: 'all', type: 'all', search: '' });

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Main Content */}
      {selectedCampaign ? (
        <CampaignDetailView
          campaign={selectedCampaign}
          onBack={() => setSelectedCampaign(null)}
        />
      ) : (
        <CampaignsListView
          campaigns={mockCampaigns}
          onSelectCampaign={setSelectedCampaign}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}
