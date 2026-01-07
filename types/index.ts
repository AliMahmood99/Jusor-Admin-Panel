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

export interface SocialFollowers {
  instagram?: number;
  tiktok?: number;
  youtube?: number;
  snapchat?: number;
  twitter?: number;
}

// Campaign Management Types
export type CampaignType = 'public' | 'invite' | 'hybrid';
export type CampaignMainStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type CampaignCategory = 'Fashion & Lifestyle' | 'Technology' | 'Food & Beverage' | 'Retail & E-commerce' | 'Health & Fitness' | 'Travel & Tourism' | 'Beauty & Cosmetics' | 'Gaming & Entertainment' | 'Education' | 'Real Estate' | 'Other';

export type InfluencerCampaignStatus =
  | 'applied'
  | 'invited'
  | 'accepted'
  | 'rejected'
  | 'awaiting_signature'
  | 'signature_expired'
  | 'signed'
  | 'creating_content'
  | 'content_submitted'
  | 'content_revision'
  | 'content_approved'
  | 'completed'
  | 'disputed';

export type EscrowStatus = 'pending' | 'held' | 'released';
export type DeliverablePlatform = 'instagram' | 'tiktok' | 'youtube' | 'snapchat' | 'twitter';
export type DeliverableType = 'Story' | 'Reel' | 'Post' | 'Video' | 'Carousel';

export interface CampaignBusiness {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface CampaignDeliverable {
  platform: DeliverablePlatform;
  type: DeliverableType;
  count: number;
}

export interface CampaignInfluencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  platform: DeliverablePlatform;
  status: InfluencerCampaignStatus;
  payment: number;
  escrowStatus: EscrowStatus;

  // Timeline
  appliedAt?: string;
  acceptedAt?: string;
  signedAt?: string;
  contentDeadline?: string;
  contentSubmittedAt?: string;
  contentApprovedAt?: string;
  paymentReleasedAt?: string;

  // Signature
  signatureDeadline?: string;
  hoursRemaining?: number;

  // Content Creation
  daysRemaining?: number;
  isOverdue?: boolean;
  daysOverdue?: number;

  // Review
  reviewDeadline?: string;
  hoursUntilAutoApprove?: number;

  // Revision
  revisionRound?: number;
  revisionRequestedAt?: string;
  revisionDeadline?: string;
  revisionFeedback?: string;

  // Dispute
  disputeId?: string;
  disputeReason?: string;
}

export interface Campaign {
  id: string;
  name: string;
  business: CampaignBusiness;
  type: CampaignType;
  category: CampaignCategory;
  status: CampaignMainStatus;

  // Budget & Finance
  budget: number;
  escrowTotal: number;
  releasedTotal: number;

  // Dates
  createdAt: string;
  startDate: string;
  endDate: string;
  contentDeadline: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;

  // Details
  description: string;
  objectives: string[];
  deliverables: CampaignDeliverable[];

  // Influencers
  influencerSlots: number;
  influencers?: CampaignInfluencer[];
}

export interface CampaignActivity {
  id: number;
  type: 'campaign_started' | 'payment_released' | 'content_approved' | 'content_submitted' | 'dispute_opened' | 'revision_requested' | 'contract_signed' | string;
  influencer?: string;
  amount?: number;
  disputeId?: string;
  round?: number;
  timestamp: string;
  icon: string;
  color: string;
}

export interface CampaignAdminNote {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

// ============================================
// USER MANAGEMENT TYPES
// ============================================

export type UserType = 'influencer' | 'business';
export type UserStatus = 'verified' | 'pending' | 'suspended' | 'banned';
export type CampaignContentStatus = 'awaiting_signature' | 'creating' | 'submitted' | 'approved' | 'disputed';
export type PaymentStatus = 'in_escrow' | 'released' | 'held';

// Base User Interface
export interface BaseUser {
  id: string;
  type: UserType;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  avatar: string;
  category: string;
  location: string;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  rating: number;
  reviewCount: number;
  totalCampaigns: number;
  completedCampaigns: number;
  activeCampaigns: number;
  disputeRate: number;
  verificationDate: string | null;
}

// Influencer-specific interface
export interface InfluencerUser extends BaseUser {
  type: 'influencer';
  handle: string;
  mawthooqId: string;
  falNumber: string | null;
  iban: string | null;
  ibanVerified: boolean;
  followers: {
    instagram?: number;
    tiktok?: number;
    youtube?: number;
    twitter?: number;
    snapchat?: number;
  };
  engagementRate: number;
  totalEarnings: number;
  pendingBalance: number;
  withdrawnAmount?: number;
  heldAmount?: number;
  nafathVerified: boolean;
  suspensionReason?: string;
  suspendedAt?: string;
}

// Business-specific interface
export interface BusinessUser extends BaseUser {
  type: 'business';
  crNumber: string | null;
  flNumber: string | null;
  wathiqVerified: boolean;
  walletBalance: number;
  totalSpent: number;
  currentEscrow: number;
  avgCampaignBudget: number;
  contactPerson: string;
  contactRole: string;
}

// Union type for User
export type User = InfluencerUser | BusinessUser;

// Activity Log
export interface UserActivity {
  id: number;
  action: string;
  timestamp: string;
  details: string;
  campaign?: string;
  campaignName?: string;
  business?: string;
  influencer?: string;
  influencerName?: string;
  disputeId?: string;
  amount?: number;
  icon: string;
  color: string;
}

// User Campaign (for Influencer)
export interface UserCampaignInfluencer {
  id: string;
  name: string;
  business: string;
  type: CampaignType;
  status: CampaignMainStatus;
  payment: number;
  paymentStatus: PaymentStatus;
  startDate: string;
  endDate: string;
  contentStatus: CampaignContentStatus;
  completedAt?: string;
  disputeId?: string;
}

// User Campaign (for Business)
export interface UserCampaignBusiness {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignMainStatus;
  budget: number;
  spent: number;
  influencers: number;
  completedInfluencers: number;
  startDate: string;
  endDate: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

// Transaction types
export type InfluencerTransactionType = 'paid' | 'pending_approval' | 'pending_content' | 'in_review' | 'held' | 'dispute_resolved';
export type BusinessTransactionType = 'wallet_deposit' | 'wallet_withdrawal' | 'escrow_deposit' | 'payment_released' | 'refund';
export type TransactionStatus = 'completed' | 'pending' | 'held';

// Influencer Transaction
export interface InfluencerTransaction {
  id: string;
  type: InfluencerTransactionType;
  amount: number;
  grossAmount?: number;
  commission?: number;
  description: string;
  campaign?: string;
  business?: string;
  disputeId?: string;
  date: string;
  status: TransactionStatus;
  transferRef?: string;
}

// Business Transaction
export interface BusinessTransaction {
  id: string;
  type: BusinessTransactionType;
  amount: number;
  netToInfluencer?: number;
  commission?: number;
  description: string;
  campaign?: string;
  campaignName?: string;
  influencer?: string;
  influencerName?: string;
  paymentMethod?: string;
  iban?: string;
  date: string;
  status: TransactionStatus;
  reference?: string;
}
