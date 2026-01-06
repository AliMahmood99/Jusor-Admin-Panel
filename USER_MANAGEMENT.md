# User Management System

## 📊 Overview

Professional user management system for the JUSOR admin panel. Allows admins to view, manage, and take actions on both influencers and businesses.

## ✨ Features

### 1. Users List Page (`/users`)
- **Stats Dashboard**: 4 KPI cards showing key metrics
  - Total Users
  - Influencers Count (with verified count)
  - Businesses Count (with verified count)
  - Pending Review Count (with SLA)
- **Advanced Filtering**:
  - Type filter (All Users, Influencers, Businesses)
  - Status filter (All, Verified, Pending, Suspended)
  - Real-time search by name, email, ID, or handle
- **Professional Table**:
  - User info with avatar and name
  - User type badge (Influencer/Business)
  - Category and location
  - Followers (influencers) or Total Spent (businesses)
  - Campaign counts with active indicator
  - Status badge
  - Star rating with review count
  - Quick action button

### 2. User Detail View
- **Comprehensive Header**:
  - User avatar and name
  - Status badge
  - ID and verification numbers
  - Action buttons (Send Message, Edit, More options)

- **Quick Info Bar**:
  - **For Influencers**:
    - Total Followers
    - Engagement Rate
    - Total Earnings
    - Pending Balance
    - Dispute Rate
  - **For Businesses**:
    - Total Spent
    - Current Escrow
    - Avg Campaign Budget
    - Total Campaigns
    - Dispute Rate

- **Tabbed Content**:
  - **Overview**: Contact info, verification status, ratings
  - **Social Accounts** (influencers only): Platform-wise follower breakdown
  - **Campaigns**: Campaign history and stats
  - **Financial**: Earnings/spending breakdown and transaction history
  - **Activity Log**: Recent user activities

- **Action Sidebar**:
  - Status-based quick actions:
    - Pending: Approve/Reject
    - Verified: Suspend/Ban
    - Suspended: Reinstate/Upgrade to Ban
  - Send Notification
  - Override Verification
  - View in App
  - Admin Notes textarea

## 📁 File Structure

```
app/
└── users/
    └── page.tsx                    # Main users page (list + detail view)

components/
└── users/
    ├── UserStatusBadge.tsx         # Status badge component
    └── UserRoleBadge.tsx           # Type badge component

lib/
└── constants.ts                    # MOCK_USERS and MOCK_USER_ACTIVITY

types/
└── index.ts                        # User types (User, UserStatus, UserActivity, SocialFollowers)
```

## 🎨 Components

### UserStatusBadge
```tsx
<UserStatusBadge status="verified" />
```
Shows color-coded status with icons:
- Verified (green with shield check)
- Pending (amber with clock)
- Suspended (red with ban icon)
- Banned (gray with shield X)

### UserRoleBadge
```tsx
<UserRoleBadge type="influencer" />
```
Shows user type:
- Influencer (violet with user icon)
- Business (blue with building icon)

## 📊 Data Types

### User
```typescript
interface User {
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
```

### SocialFollowers
```typescript
interface SocialFollowers {
  instagram?: number;
  tiktok?: number;
  youtube?: number;
  snapchat?: number;
  twitter?: number;
}
```

### UserActivity
```typescript
interface UserActivity {
  id: number;
  action: 'login' | 'campaign_accepted' | 'content_submitted' | 'withdrawal' | 'profile_updated' | string;
  timestamp: string;
  details: string;
  ip: string;
}
```

## 🔗 Backend Integration

### Expected API Endpoints

```typescript
// Get all users
GET /api/users?type=influencer&status=verified&search=noura

// Get specific user
GET /api/users/:id

// Approve user
POST /api/users/:id/approve

// Reject user
POST /api/users/:id/reject
{
  reason: 'Incomplete verification documents'
}

// Suspend user
POST /api/users/:id/suspend
{
  reason: 'Multiple contract violations',
  duration: 30 // days
}

// Reinstate user
POST /api/users/:id/reinstate

// Ban user
POST /api/users/:id/ban
{
  reason: 'Fraudulent activities',
  permanent: true
}

// Send notification
POST /api/users/:id/notifications
{
  type: 'warning' | 'info' | 'success',
  message: 'Your account has been...'
}

// Override verification
POST /api/users/:id/verification/override
{
  field: 'nafath' | 'iban' | 'wathiq',
  status: true,
  adminNote: 'Manual verification completed'
}
```

## 🎯 Usage Flow

1. **Admin opens `/users`**
   - Sees all users in a table
   - Can filter by type (influencers/businesses) and status
   - Can search by name, email, ID, or handle

2. **Admin clicks on user row**
   - Navigates to user detail view
   - Sees comprehensive user information in tabs

3. **Admin reviews user details**
   - Switches between tabs (Overview, Social, Campaigns, Financial, Activity)
   - Reviews verification status, ratings, and stats

4. **Admin takes action**
   - Uses quick action buttons in sidebar based on user status:
     - Approve/Reject pending users
     - Suspend/Ban verified users
     - Reinstate suspended users
   - Sends notifications or adds admin notes

## 🚀 Current Implementation

### Mock Data
The system currently uses mock data with **8 sample users**:

**Influencers** (4):
- INF-1234: Noura Al-Rashid (Verified, Fashion & Lifestyle)
- INF-2345: Ahmed Al-Farsi (Verified, Tech & Gaming)
- INF-3456: Fatima Al-Saud (Pending, Beauty & Skincare)
- INF-4567: Khalid Al-Mutairi (Suspended, Food & Travel)

**Businesses** (4):
- BUS-5678: TechStart Inc. (Verified, Technology)
- BUS-6789: Gulf Retail LLC (Verified, Retail & E-commerce)
- BUS-7890: Luxury Brands SA (Verified, Luxury & Fashion)
- BUS-8901: Fresh Bites Cafe (Pending, Food & Beverage)

### Navigation
- Click on "Users" in sidebar → navigates to `/users`
- Click on any user row → shows detail view
- Click back button → returns to users list

## 🚀 Next Steps

- [ ] Connect to real backend API
- [ ] Implement user detail tabs with real data
- [ ] Add pagination for large user lists
- [ ] Add bulk actions (approve/suspend multiple users)
- [ ] Add export functionality (CSV/Excel)
- [ ] Add advanced filters (join date range, earnings range, etc.)
- [ ] Implement real-time status updates
- [ ] Add user activity timeline
- [ ] Create user analytics dashboard
- [ ] Add user comparison feature

## 💡 Tips

- Use `router.push('/users')` for navigation
- All colors follow Tailwind config
- Mock data in `lib/constants.ts`
- TypeScript types in `types/index.ts`
- Components are fully reusable
- Status-based conditional rendering for action buttons

---

Built with ❤️ for JUSOR Platform
