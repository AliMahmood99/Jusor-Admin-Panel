/**
 * Common Types for JUSOR Admin Panel
 */

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
  color?: string;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: string;
  iconBg: string;
  subtitle?: string;
}

export interface ActivityItem {
  type: string;
  user: string;
  action: string;
  time: string;
  icon: string;
  color: string;
}

export interface CampaignStatus {
  label: string;
  count: number;
  color: string;
  width: string;
}

export interface Performer {
  name: string;
  handle: string;
  earnings: string;
  campaigns: number;
  avatar: string;
}

export interface SystemHealth {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'error';
}

export interface QuickStat {
  label: string;
  value: string;
  icon: string;
  change: string;
  positive: boolean;
}

export interface UserGrowthData {
  total: number;
  new: number;
  growth: string;
}

export interface PendingAction {
  label: string;
  count: number;
  icon: string;
  color: string;
  urgent: boolean;
}

// Dispute Types
export type DisputeStatus = 'open' | 'in_review' | 'resolved' | 'closed';
export type DisputePriority = 'low' | 'medium' | 'high' | 'critical';
export type DisputeType = 'payment' | 'content' | 'communication' | 'contract' | 'other';

export interface DisputeParty {
  id: string;
  name: string;
  type: 'influencer' | 'business';
  avatar?: string;
}

export interface DisputeMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isAdmin?: boolean;
}

export interface DisputeEvidence {
  id: string;
  type: 'image' | 'document' | 'screenshot' | 'video';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

export interface Dispute {
  id: string;
  title: string;
  description: string;
  campaignId: string;
  campaignName: string;
  status: DisputeStatus;
  priority: DisputePriority;
  type: DisputeType;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  initiator: DisputeParty;
  respondent: DisputeParty;
  assignedAdmin?: string;
  messages: DisputeMessage[];
  evidence: DisputeEvidence[];
  amountInDispute?: number;
  resolution?: string;
  resolutionNote?: string;
}

// User Management Types
export type UserRole = 'influencer' | 'business' | 'admin';
export type UserStatus = 'verified' | 'pending' | 'suspended' | 'banned';

export interface SocialFollowers {
  instagram?: number;
  tiktok?: number;
  youtube?: number;
  snapchat?: number;
  twitter?: number;
}

export interface User {
  id: string;
  type: 'influencer' | 'business';
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  avatar: string;
  handle?: string; // For influencers
  category: string;
  location: string;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;

  // Verification - Influencers
  mawthooqId?: string;
  falNumber?: string | null;
  iban?: string | null;
  ibanVerified?: boolean;
  nafathVerified?: boolean;

  // Verification - Businesses
  crNumber?: string | null;
  flNumber?: string | null;
  wathiqVerified?: boolean;
  contactPerson?: string;
  contactRole?: string;

  // Stats
  rating: number;
  reviewCount: number;
  totalCampaigns: number;
  completedCampaigns: number;
  activeCampaigns: number;
  disputeRate: number;
  verificationDate?: string | null;

  // Financial - Influencers
  followers?: SocialFollowers;
  engagementRate?: number;
  totalEarnings?: number;
  pendingBalance?: number;
  withdrawnAmount?: number;

  // Financial - Businesses
  totalSpent?: number;
  currentEscrow?: number;
  avgCampaignBudget?: number;

  // Suspension
  suspensionReason?: string;
  suspendedAt?: string;
}

export interface UserActivity {
  id: number;
  action: 'login' | 'campaign_accepted' | 'content_submitted' | 'withdrawal' | 'profile_updated' | string;
  timestamp: string;
  details: string;
  ip: string;
}
