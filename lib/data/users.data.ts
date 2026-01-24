/**
 * Centralized User Data
 * Master list of all users (businesses and influencers) in the system
 */

export interface User {
  id: string;
  type: 'business' | 'influencer';
  name: string;
  handle?: string; // For influencers
  avatar?: string;
  email?: string;
  phone?: string;
  rating?: number;
  totalCampaigns?: number;
  // Business specific
  cr?: string;
  businessType?: string;
  // Influencer specific
  platform?: 'instagram' | 'tiktok' | 'snapchat' | 'youtube' | 'twitter';
  followers?: string;
  verified?: boolean;
  iban?: string;
  bankName?: string;
}

/**
 * Master User Database
 * All users referenced across the system
 */
export const USERS_DB: User[] = [
  // ============ BUSINESSES ============
  {
    id: 'BUS-5678',
    type: 'business',
    name: 'Fashion House KSA',
    cr: '1010445566',
    rating: 4.8,
    totalCampaigns: 28,
    email: 'contact@fashionhouse.sa',
    phone: '+966501234567',
    businessType: 'Fashion & Retail',
  },
  {
    id: 'BUS-7890',
    type: 'business',
    name: 'Luxury Brands SA',
    cr: '3030987654',
    rating: 4.8,
    totalCampaigns: 22,
    email: 'info@luxurybrands.sa',
    phone: '+966502345678',
    businessType: 'Luxury Retail',
  },
  {
    id: 'BUS-3456',
    type: 'business',
    name: 'TechStart Inc',
    cr: '2020567890',
    rating: 4.6,
    totalCampaigns: 12,
    email: 'hello@techstart.com',
    phone: '+966503456789',
    businessType: 'Technology',
  },
  {
    id: 'BUS-8901',
    type: 'business',
    name: 'Beauty Co',
    cr: '4040654321',
    rating: 4.5,
    totalCampaigns: 15,
    email: 'support@beautyco.sa',
    phone: '+966504567890',
    businessType: 'Beauty & Cosmetics',
  },
  {
    id: 'BUS-6789',
    type: 'business',
    name: 'Gulf Retail LLC',
    cr: '2020123456',
    rating: 4.7,
    totalCampaigns: 8,
    email: 'info@gulfretail.com',
    phone: '+966505678901',
    businessType: 'Retail',
  },
  {
    id: 'BUS-4321',
    type: 'business',
    name: 'Elite Fashion',
    cr: '5050223344',
    rating: 4.6,
    totalCampaigns: 18,
    email: 'contact@elitefashion.sa',
    phone: '+966506789012',
    businessType: 'Fashion',
  },
  {
    id: 'BUS-5432',
    type: 'business',
    name: 'HealthTech Solutions',
    cr: '6060334455',
    rating: 4.4,
    totalCampaigns: 9,
    email: 'hello@healthtech.sa',
    phone: '+966507890123',
    businessType: 'Healthcare Technology',
  },
  {
    id: 'BUS-9876',
    type: 'business',
    name: 'Luxury Boutique',
    cr: '7070445566',
    rating: 4.9,
    totalCampaigns: 15,
    email: 'info@luxuryboutique.sa',
    phone: '+966508901234',
    businessType: 'Fashion & Luxury',
  },
  {
    id: 'BUS-6543',
    type: 'business',
    name: 'Gaming Arena',
    cr: '8080556677',
    rating: 4.5,
    totalCampaigns: 6,
    email: 'support@gamingarena.sa',
    phone: '+966509012345',
    businessType: 'Gaming & Entertainment',
  },
  {
    id: 'BUS-7654',
    type: 'business',
    name: 'Retail Plus',
    cr: '9090667788',
    rating: 4.3,
    totalCampaigns: 11,
    email: 'contact@retailplus.sa',
    phone: '+966501112223',
    businessType: 'Retail',
  },
  {
    id: 'BUS-9012',
    type: 'business',
    name: 'Gourmet Restaurants',
    cr: '1010778899',
    rating: 4.7,
    totalCampaigns: 5,
    email: 'info@gourmetrest.sa',
    phone: '+966502223334',
    businessType: 'Food & Beverage',
  },

  // ============ INFLUENCERS ============
  {
    id: 'INF-1234',
    type: 'influencer',
    name: 'Noura Al-Rashid',
    handle: '@noura_style',
    avatar: 'NR',
    rating: 4.8,
    totalCampaigns: 24,
    platform: 'instagram',
    followers: '125K',
    verified: true,
    email: 'noura@example.com',
    phone: '+966551234567',
    iban: 'SA44 2000 0001 2345 6789 1234',
    bankName: 'Al Rajhi Bank',
  },
  {
    id: 'INF-2345',
    type: 'influencer',
    name: 'Ahmed Al-Farsi',
    handle: '@ahmed_lifestyle',
    avatar: 'AF',
    rating: 4.5,
    totalCampaigns: 18,
    platform: 'tiktok',
    followers: '89K',
    verified: true,
    email: 'ahmed@example.com',
    phone: '+966552345678',
    iban: 'SA03 8000 0000 6080 1016 7519',
    bankName: 'Saudi National Bank',
  },
  {
    id: 'INF-3456',
    type: 'influencer',
    name: 'Sara Al-Mansour',
    handle: '@sara_tech',
    avatar: 'SM',
    rating: 4.6,
    totalCampaigns: 15,
    platform: 'instagram',
    followers: '67K',
    verified: true,
    email: 'sara@example.com',
    phone: '+966553456789',
    iban: 'SA15 8000 0000 6331 1234 5678',
    bankName: 'Riyad Bank',
  },
  {
    id: 'INF-4567',
    type: 'influencer',
    name: 'Layla Al-Zahrani',
    handle: '@layla_beauty',
    avatar: 'LZ',
    rating: 4.9,
    totalCampaigns: 32,
    platform: 'instagram',
    followers: '245K',
    verified: true,
    email: 'layla@example.com',
    phone: '+966554567890',
    iban: 'SA71 0500 0000 0000 6789 1234',
    bankName: 'Al Rajhi Bank',
  },
  {
    id: 'INF-5678',
    type: 'influencer',
    name: 'Khalid Al-Otaibi',
    handle: '@khalid_food',
    avatar: 'KO',
    rating: 4.7,
    totalCampaigns: 21,
    platform: 'snapchat',
    followers: '92K',
    verified: true,
    email: 'khalid@example.com',
    phone: '+966555678901',
    iban: 'SA92 0500 0680 6080 9876 5432',
    bankName: 'Alinma Bank',
  },
  {
    id: 'INF-6789',
    type: 'influencer',
    name: 'Maha Al-Dosari',
    handle: '@maha_fashion',
    avatar: 'MD',
    rating: 4.8,
    totalCampaigns: 27,
    platform: 'instagram',
    followers: '156K',
    verified: true,
    email: 'maha@example.com',
    phone: '+966556789012',
    iban: 'SA03 8000 0000 6080 2468 1357',
    bankName: 'Saudi National Bank',
  },
  {
    id: 'INF-7890',
    type: 'influencer',
    name: 'Fahad Al-Shamrani',
    handle: '@fahad_fitness',
    avatar: 'FS',
    rating: 4.6,
    totalCampaigns: 14,
    platform: 'instagram',
    followers: '178K',
    verified: true,
    email: 'fahad@example.com',
    phone: '+966557890123',
    iban: 'SA44 2000 0001 3579 2468 1357',
    bankName: 'Al Rajhi Bank',
  },
  {
    id: 'INF-8901',
    type: 'influencer',
    name: 'Reem Al-Saud',
    handle: '@reem_luxury',
    avatar: 'RS',
    rating: 4.9,
    totalCampaigns: 19,
    platform: 'instagram',
    followers: '320K',
    verified: true,
    email: 'reem@example.com',
    phone: '+966558901234',
    iban: 'SA71 0500 0000 0000 1357 2468',
    bankName: 'Alinma Bank',
  },
  {
    id: 'INF-9012',
    type: 'influencer',
    name: 'Omar Al-Ghamdi',
    handle: '@omar_gaming',
    avatar: 'OG',
    rating: 4.5,
    totalCampaigns: 11,
    platform: 'youtube',
    followers: '450K',
    verified: true,
    email: 'omar@example.com',
    phone: '+966559012345',
    iban: 'SA03 8000 0000 6080 4567 8901',
    bankName: 'Riyad Bank',
  },
  {
    id: 'INF-1357',
    type: 'influencer',
    name: 'Nora Al-Harbi',
    handle: '@nora_shopping',
    avatar: 'NH',
    rating: 4.4,
    totalCampaigns: 16,
    platform: 'tiktok',
    followers: '134K',
    verified: true,
    email: 'nora@example.com',
    phone: '+966551112223',
    iban: 'SA44 2000 0001 5678 9012 3456',
    bankName: 'Al Rajhi Bank',
  },
  {
    id: 'INF-2468',
    type: 'influencer',
    name: 'Fatima Al-Saud',
    handle: '@fatima_fashion',
    avatar: 'FS',
    rating: 4.9,
    totalCampaigns: 45,
    platform: 'instagram',
    followers: '380K',
    verified: true,
    email: 'fatima@example.com',
    phone: '+966552223334',
    iban: 'SA15 8000 0000 6331 9876 5432',
    bankName: 'Riyad Bank',
  },
  {
    id: 'INF-3579',
    type: 'influencer',
    name: 'Khalid Al-Mutairi',
    handle: '@khalid_reviews',
    avatar: 'KM',
    rating: 4.3,
    totalCampaigns: 12,
    platform: 'youtube',
    followers: '98K',
    verified: true,
    email: 'khalid.m@example.com',
    phone: '+966553334445',
    iban: 'SA92 0500 0680 6080 3579 1234',
    bankName: 'Alinma Bank',
  },
  {
    id: 'INF-4680',
    type: 'influencer',
    name: 'Layla Al-Harbi',
    handle: '@layla_luxury',
    avatar: 'LH',
    rating: 4.7,
    totalCampaigns: 38,
    platform: 'instagram',
    followers: '290K',
    verified: true,
    email: 'layla.h@example.com',
    phone: '+966554445556',
    iban: 'SA71 0500 0000 0000 5678 9012',
    bankName: 'Al Rajhi Bank',
  },
];

/**
 * Helper functions to query users
 */
export const getUserById = (id: string): User | undefined => {
  return USERS_DB.find(u => u.id === id);
};

export const getUsersByType = (type: 'business' | 'influencer'): User[] => {
  return USERS_DB.filter(u => u.type === type);
};

export const getInfluencers = (): User[] => {
  return getUsersByType('influencer');
};

export const getBusinesses = (): User[] => {
  return getUsersByType('business');
};
