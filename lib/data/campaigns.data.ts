/**
 * Centralized Campaign Data
 * Master list of all campaigns in the system
 */

import { getUserById } from './users.data';

export interface Campaign {
  id: string;
  name: string;
  type: 'invite' | 'public' | 'hybrid';
  status: 'active' | 'completed' | 'cancelled' | 'draft';
  businessId: string;
  businessName: string;
  budget: number;
  spent: number;
  influencersCount: number;
  completedInfluencers: number;
  startDate: string;
  endDate: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  description?: string;
  category?: string;
}

/**
 * Master Campaign Database
 * All campaigns referenced across the system
 */
export const CAMPAIGNS_DB: Campaign[] = [
  {
    id: 'CMP-2026-089',
    name: 'Ramadan Collection 2026',
    type: 'hybrid',
    status: 'active',
    businessId: 'BUS-5678',
    businessName: 'Fashion House KSA',
    budget: 120000,
    spent: 45000,
    influencersCount: 6,
    completedInfluencers: 2,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    description: 'Promote our exclusive Ramadan fashion collection',
    category: 'Fashion',
  },
  {
    id: 'CMP-2026-091',
    name: 'Spring Fashion Launch',
    type: 'public',
    status: 'active',
    businessId: 'BUS-7890',
    businessName: 'Luxury Brands SA',
    budget: 45000,
    spent: 0,
    influencersCount: 0,
    completedInfluencers: 0,
    startDate: '2026-01-15',
    endDate: '2026-02-15',
    description: 'Launch of Spring 2026 fashion line',
    category: 'Fashion',
  },
  {
    id: 'CMP-2026-085',
    name: 'Winter Sale Campaign',
    type: 'public',
    status: 'active',
    businessId: 'BUS-6789',
    businessName: 'Gulf Retail LLC',
    budget: 80000,
    spent: 45000,
    influencersCount: 4,
    completedInfluencers: 2,
    startDate: '2025-12-20',
    endDate: '2026-01-25',
    description: 'Winter clearance sale promotion',
    category: 'Retail',
  },
  {
    id: 'CMP-2026-101',
    name: 'New Store Opening',
    type: 'invite',
    status: 'active',
    businessId: 'BUS-7654',
    businessName: 'Retail Plus',
    budget: 50000,
    spent: 22000,
    influencersCount: 3,
    completedInfluencers: 0,
    startDate: '2026-01-20',
    endDate: '2026-02-05',
    description: 'Grand opening of new store location',
    category: 'Retail',
  },
  {
    id: 'CMP-2026-095',
    name: 'Eid Collection Launch',
    type: 'hybrid',
    status: 'active',
    businessId: 'BUS-9876',
    businessName: 'Luxury Boutique',
    budget: 150000,
    spent: 50000,
    influencersCount: 5,
    completedInfluencers: 1,
    startDate: '2026-01-18',
    endDate: '2026-02-18',
    description: 'Exclusive Eid fashion collection',
    category: 'Fashion',
  },
  {
    id: 'CMP-2026-078',
    name: 'Tech Product Launch',
    type: 'invite',
    status: 'completed',
    businessId: 'BUS-3456',
    businessName: 'TechStart Inc',
    budget: 35000,
    spent: 12000,
    influencersCount: 2,
    completedInfluencers: 1,
    startDate: '2026-01-10',
    endDate: '2026-01-20',
    completedAt: '2026-01-19',
    description: 'Launch of new tech product',
    category: 'Technology',
  },
  {
    id: 'CMP-2026-092',
    name: 'Beauty Products Review',
    type: 'public',
    status: 'active',
    businessId: 'BUS-8901',
    businessName: 'Beauty Co',
    budget: 25000,
    spent: 8000,
    influencersCount: 2,
    completedInfluencers: 0,
    startDate: '2026-01-22',
    endDate: '2026-02-10',
    description: 'Product review campaign for new beauty line',
    category: 'Beauty',
  },
  {
    id: 'CMP-2026-075',
    name: 'Restaurant Opening Event',
    type: 'invite',
    status: 'completed',
    businessId: 'BUS-9012',
    businessName: 'Gourmet Restaurants',
    budget: 30000,
    spent: 20000,
    influencersCount: 2,
    completedInfluencers: 2,
    startDate: '2026-01-08',
    endDate: '2026-01-15',
    completedAt: '2026-01-13',
    description: 'Restaurant grand opening event coverage',
    category: 'Food & Beverage',
  },
  {
    id: 'CMP-2026-068',
    name: 'Fashion Week Coverage',
    type: 'invite',
    status: 'completed',
    businessId: 'BUS-4321',
    businessName: 'Elite Fashion',
    budget: 60000,
    spent: 30000,
    influencersCount: 2,
    completedInfluencers: 2,
    startDate: '2026-01-05',
    endDate: '2026-01-12',
    completedAt: '2026-01-12',
    description: 'Fashion week event coverage',
    category: 'Fashion',
  },
  {
    id: 'CMP-2026-055',
    name: 'Fitness App Promotion',
    type: 'public',
    status: 'cancelled',
    businessId: 'BUS-5432',
    businessName: 'HealthTech Solutions',
    budget: 20000,
    spent: 0,
    influencersCount: 0,
    completedInfluencers: 0,
    startDate: '2026-01-01',
    endDate: '2026-01-15',
    cancelledAt: '2026-01-07',
    cancelReason: 'Business cancelled campaign after contract signing - 50% refunded',
    description: 'Fitness app launch and promotion',
    category: 'Health & Fitness',
  },
  {
    id: 'CMP-2026-082',
    name: 'Gaming Event Coverage',
    type: 'invite',
    status: 'cancelled',
    businessId: 'BUS-6543',
    businessName: 'Gaming Arena',
    budget: 40000,
    spent: 18000,
    influencersCount: 2,
    completedInfluencers: 0,
    startDate: '2026-01-12',
    endDate: '2026-01-20',
    cancelledAt: '2026-01-19',
    cancelReason: 'Dispute resolved in favor of business - full refund',
    description: 'Gaming tournament event coverage',
    category: 'Gaming',
  },
  {
    id: 'CMP-2891',
    name: 'Ramadan Collection Launch',
    type: 'hybrid',
    status: 'active',
    businessId: 'BUS-5678',
    businessName: 'Fashion House KSA',
    budget: 120000,
    spent: 45000,
    influencersCount: 6,
    completedInfluencers: 2,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    description: 'Ramadan special collection promotion',
    category: 'Fashion',
  },
  {
    id: 'CMP-2845',
    name: 'Tech Review Series',
    type: 'invite',
    status: 'active',
    businessId: 'BUS-3456',
    businessName: 'TechStart Inc',
    budget: 45000,
    spent: 15000,
    influencersCount: 3,
    completedInfluencers: 1,
    startDate: '2025-12-15',
    endDate: '2026-01-15',
    description: 'Technology product review series',
    category: 'Technology',
  },
  {
    id: 'CMP-2790',
    name: 'Summer Fashion Promo',
    type: 'public',
    status: 'completed',
    businessId: 'BUS-6789',
    businessName: 'Gulf Retail LLC',
    budget: 80000,
    spent: 80000,
    influencersCount: 5,
    completedInfluencers: 5,
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    completedAt: '2025-11-28',
    description: 'Summer fashion promotion campaign',
    category: 'Fashion',
  },
  {
    id: 'CMP-2756',
    name: 'Winter Beauty Campaign',
    type: 'invite',
    status: 'completed',
    businessId: 'BUS-8901',
    businessName: 'Beauty Co',
    budget: 150000,
    spent: 142500,
    influencersCount: 8,
    completedInfluencers: 8,
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    completedAt: '2025-10-30',
    description: 'Winter beauty products campaign',
    category: 'Beauty',
  },
  {
    id: 'CMP-2698',
    name: 'Summer Collection 2026',
    type: 'hybrid',
    status: 'completed',
    businessId: 'BUS-5678',
    businessName: 'Fashion House KSA',
    budget: 90000,
    spent: 90000,
    influencersCount: 4,
    completedInfluencers: 4,
    startDate: '2025-12-15',
    endDate: '2026-01-05',
    completedAt: '2026-01-03',
    description: 'Summer collection preview',
    category: 'Fashion',
  },
];

/**
 * Helper functions to query campaigns
 */
export const getCampaignById = (id: string): Campaign | undefined => {
  return CAMPAIGNS_DB.find(c => c.id === id);
};

export const getCampaignsByBusiness = (businessId: string): Campaign[] => {
  return CAMPAIGNS_DB.filter(c => c.businessId === businessId);
};

export const getCampaignsByStatus = (status: Campaign['status']): Campaign[] => {
  return CAMPAIGNS_DB.filter(c => c.status === status);
};

export const getActiveCampaigns = (): Campaign[] => {
  return getCampaignsByStatus('active');
};
