# JUSOR Admin Panel - System Design Document

**Version:** 1.0
**Last Updated:** January 2026
**Status:** Living Document

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Data Layer](#4-data-layer)
5. [API Layer](#5-api-layer)
6. [Component Architecture](#6-component-architecture)
7. [State Management](#7-state-management)
8. [Security & Authentication](#8-security--authentication)
9. [Integration Points](#9-integration-points)
10. [Deployment](#10-deployment)

---

## 1. System Overview

### 1.1 Purpose

The JUSOR Admin Panel is a **Next.js 16.1-based web application** that serves as the operational hub for platform administrators to manage the JUSOR influencer marketing marketplace.

### 1.2 Core Responsibilities

```
Admin Panel Core Functions:
├── User Management
│   ├── Influencer verification (Nafath ID validation)
│   ├── Business verification (Wathiq CR/FL validation)
│   ├── Account suspension/ban
│   └── Profile oversight
│
├── Campaign Oversight
│   ├── Monitor campaign lifecycle
│   ├── Extend deadlines (business delays)
│   ├── Override business review (48h auto-approve)
│   └── Handle campaign issues
│
├── Financial Operations
│   ├── Escrow monitoring (SAR 234K+ active)
│   ├── Payout processing (manual approval)
│   ├── Refund management
│   ├── Transaction tracking
│   └── Revenue reporting
│
├── Dispute Resolution
│   ├── Review evidence from both parties
│   ├── Make binding decisions (100%/Split/0%)
│   ├── Handle appeals (5-day window)
│   └── Track resolution metrics
│
├── Platform Monitoring
│   ├── Dashboard KPIs (GMV, commissions, escrow)
│   ├── Real-time alerts (disputes, SLA breaches)
│   ├── User growth tracking
│   └── System health monitoring
│
└── Compliance & Reporting
    ├── ZATCA e-invoice records
    ├── Audit logs (who did what, when)
    ├── Export data (CSV/Excel)
    └── Government reporting
```

### 1.3 User Types

| Role | Access Level | Responsibilities |
|------|--------------|------------------|
| **Super Admin** | Full access | Platform configuration, user management, all operations |
| **Verification Agent** | Users module | Process verification queue (Nafath, Wathiq) |
| **Finance Admin** | Financial module | Escrow monitoring, payout processing, refunds |
| **Dispute Manager** | Disputes module | Evidence review, decision-making, appeals |
| **Support Agent** | Read-only + Chat | User assistance, campaign extensions, issue escalation |

---

## 2. Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL (Next.js 16.1)              │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  PRESENTATION LAYER                                    │ │
│  │  ├── Pages (App Router)                               │ │
│  │  ├── Components (Reusable UI)                         │ │
│  │  ├── Layouts (Sidebar + AdminDropdown)               │ │
│  │  └── Common (Icons, StatusBadge, etc.)               │ │
│  └───────────────────────────────────────────────────────┘ │
│                              ↕                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  STATE & HOOKS LAYER                                   │ │
│  │  ├── Custom Hooks (useEscrow, useCampaigns, etc.)    │ │
│  │  ├── React State (useState, useEffect)               │ │
│  │  └── URL State (useRouter, searchParams)             │ │
│  └───────────────────────────────────────────────────────┘ │
│                              ↕                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  API ROUTES (Next.js App Router)                      │ │
│  │  ├── /api/escrow                                      │ │
│  │  ├── /api/users                                       │ │
│  │  ├── /api/campaigns                                   │ │
│  │  ├── /api/disputes                                    │ │
│  │  └── /api/transactions                                │ │
│  └───────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────┘
                               ↕
        ┌──────────────────────────────────────┐
        │    DATA LAYER (Centralized)          │
        │                                      │
        │  /lib/data/                         │
        │  ├── users.data.ts                  │
        │  ├── campaigns.data.ts              │
        │  ├── escrow.data.ts                 │
        │  ├── disputes.data.ts               │
        │  └── transactions.data.ts           │
        └──────────────────────────────────────┘
                       ↕
        ┌──────────────────────────────────────┐
        │   BACKEND API (Laravel - Future)     │
        │   Real database, Authentication      │
        └──────────────────────────────────────┘
```

### 2.2 Directory Structure

```
/jusor-admin
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with Sidebar
│   ├── page.tsx                 # Dashboard (/)
│   ├── login/                   # Authentication
│   ├── users/                   # User management
│   │   ├── page.tsx            # List view
│   │   └── [id]/page.tsx       # Detail view
│   ├── campaigns/               # Campaign oversight
│   ├── disputes/                # Dispute resolution
│   ├── escrow/                  # Escrow monitoring
│   ├── transactions/            # Transaction history
│   ├── payouts/                 # Payout processing
│   ├── financial/               # Financial management
│   └── wallet/                  # Wallet operations
│
├── components/                   # Reusable UI components
│   ├── common/                  # Shared components
│   │   ├── Icons.tsx           # SVG icon system
│   │   ├── StatusBadge.tsx     # Color-coded status chips
│   │   ├── MetricCard.tsx      # Dashboard KPI cards
│   │   └── LoadingSkeleton.tsx # Loading states
│   ├── layout/                  # Layout components
│   │   ├── Sidebar.tsx         # Main navigation
│   │   └── AdminDropdown.tsx   # Admin user menu
│   ├── transactions/            # Transaction-specific
│   ├── campaigns/               # Campaign-specific
│   ├── disputes/                # Dispute-specific
│   └── dashboard/               # Dashboard-specific
│
├── lib/                         # Business logic & utilities
│   ├── data/                   # Centralized data (Phase 1: Mock)
│   │   ├── index.ts           # Central export
│   │   ├── users.data.ts      # 25+ users (businesses + influencers)
│   │   ├── campaigns.data.ts  # 16 campaigns with relationships
│   │   ├── escrow.data.ts     # 10 escrow transactions + audit logs
│   │   ├── disputes.data.ts   # Disputes with evidence
│   │   └── transactions.data.ts
│   │
│   ├── types/                  # TypeScript definitions
│   │   ├── index.ts           # Central export
│   │   ├── api.types.ts       # API response types
│   │   ├── escrow.types.ts    # Escrow domain types
│   │   └── user.types.ts      # User domain types
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── index.ts           # Central export
│   │   ├── useEscrow.ts       # Escrow data fetching
│   │   ├── useCampaigns.ts    # Campaign data fetching
│   │   └── useUsers.ts        # User data fetching
│   │
│   ├── constants.ts            # App constants (sidebar config, statuses)
│   └── utils.ts                # Utility functions
│
├── types/                       # Global TypeScript types
│   └── index.ts                # 540+ lines of type definitions
│
├── public/                      # Static assets
│
├── .next/                       # Next.js build output
│
└── tailwind.config.ts          # Tailwind CSS configuration
```

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | Next.js | 16.1.1 | React framework with App Router |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Styling** | Tailwind CSS | 3.4.19 | Utility-first CSS framework |
| **Build Tool** | Turbopack | Built-in | Fast bundler (Next.js 16+) |
| **Icons** | Custom SVG | - | Hand-crafted icon system |
| **State** | React Hooks | 19.x | useState, useEffect, useMemo |
| **Routing** | App Router | Next.js 16 | File-based routing |
| **Fonts** | Next/Font | - | Google Fonts optimization |

### 3.2 Development Tools

```typescript
{
  "dependencies": {
    "next": "16.1.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.19",
    "typescript": "^5"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.1"
  }
}
```

### 3.3 Backend Integration (Future)

```
Current: Mock data in /lib/data/
Future: Laravel API integration

API Endpoints (to be implemented):
├── Authentication
│   └── POST /api/auth/login
│
├── Users
│   ├── GET /api/users
│   ├── GET /api/users/:id
│   ├── PATCH /api/users/:id (verify/suspend/ban)
│   └── GET /api/users/:id/activity
│
├── Campaigns
│   ├── GET /api/campaigns
│   ├── GET /api/campaigns/:id
│   ├── PATCH /api/campaigns/:id/extend-deadline
│   └── GET /api/campaigns/:id/influencers
│
├── Escrow
│   ├── GET /api/escrow
│   ├── GET /api/escrow/summary
│   ├── GET /api/escrow/:id
│   └── PATCH /api/escrow/:id (release/refund)
│
├── Disputes
│   ├── GET /api/disputes
│   ├── GET /api/disputes/:id
│   ├── POST /api/disputes/:id/decision
│   └── POST /api/disputes/:id/appeal
│
└── Transactions
    ├── GET /api/transactions
    └── GET /api/transactions/:id
```

---

## 4. Data Layer

### 4.1 Centralized Data Architecture

**Philosophy:** Single source of truth for all mock data with proper relationships.

```typescript
// /lib/data/index.ts - Central Export
export * from './users.data';
export * from './campaigns.data';
export * from './escrow.data';
export * from './disputes.data';
export * from './transactions.data';
```

### 4.2 Data Entities & Relationships

```
USERS_DB (25+ users)
├── Businesses (11 companies)
│   ├── id: 'BUS-XXXX'
│   ├── type: 'business'
│   ├── name, cr, rating, totalCampaigns
│   └── email, phone, businessType
│
└── Influencers (14 creators)
    ├── id: 'INF-XXXX'
    ├── type: 'influencer'
    ├── name, handle, avatar
    ├── platform, followers, verified
    └── iban, bankName

                    ↓ References

CAMPAIGNS_DB (16 campaigns)
├── id: 'CMP-XXXX'
├── name, type (invite/public/hybrid)
├── status (active/completed/cancelled)
├── businessId → USERS_DB
├── budget, spent, influencersCount
└── startDate, endDate, completedAt

                    ↓ References

ESCROW_TRANSACTIONS_DB (10 transactions)
├── id: 'ESC-2026-XXX'
├── campaignId → CAMPAIGNS_DB
├── businessId → USERS_DB
├── influencerId → USERS_DB
├── amount, commission (3%), gatewayFee
├── status (held/pending_release/released/refunded)
├── paymentMethod (card/bank_transfer)
├── createdAt, approvedAt, completedAt
└── daysWaiting (calculated)

                    ↓ Audit Trail

ESCROW_AUDIT_LOGS_DB
├── id: 'LOG-XXX'
├── escrowId → ESCROW_TRANSACTIONS_DB
├── action, performedBy (admin name)
├── previousStatus → newStatus
├── bankReference, notes
└── timestamp
```

### 4.3 Type Definitions

```typescript
// /lib/types/escrow.types.ts

export type EscrowStatus =
  | 'held'                 // Payment in escrow, content not submitted
  | 'pending_release'      // Content approved, awaiting transfer
  | 'pending_refund'       // Refund requested, awaiting processing
  | 'released'             // Payment sent to influencer
  | 'refunded';            // Payment returned to business

export type PaymentMethod =
  | 'card'                 // Credit/debit card
  | 'bank_transfer';       // Direct bank transfer

export type RefundReason =
  | 'contract_expired'          // Influencer didn't sign in time
  | 'cancelled_before_signing'  // Campaign cancelled early
  | 'cancelled_by_business'     // Business cancelled mid-campaign
  | 'cancelled_by_influencer'   // Influencer withdrew
  | 'dispute_resolved';         // Dispute outcome = refund

export interface EscrowTransaction {
  id: string;                    // 'ESC-2026-001'

  // Campaign info
  campaignId: string;            // → CAMPAIGNS_DB
  campaignName: string;

  // Parties
  businessId: string;            // → USERS_DB
  businessName: string;
  businessLogo?: string;

  influencerId: string;          // → USERS_DB
  influencerName: string;
  influencerUsername: string;    // '@handle'
  influencerAvatar?: string;
  influencerIBAN: string;        // 'SA44 2000 ...'
  influencerBank: string;        // 'Al Rajhi Bank'

  // Financial
  amount: number;                // Gross amount (SAR)
  commission: number;            // 3% platform fee
  gatewayFee: number;           // ~0.5% payment gateway
  netAmount: number;             // What influencer receives

  // Status
  status: EscrowStatus;

  // Payment details
  paymentMethod: PaymentMethod;
  cardLast4?: string;           // If card payment
  cardBrand?: string;           // 'Visa', 'Mastercard', 'Mada'
  sourceIBAN?: string;          // If bank transfer
  sourceBankName?: string;
  bankReference?: string;       // Bank confirmation number
  paymentReference: string;     // Internal reference

  // Timeline
  createdAt: string;            // When escrow created
  approvedAt?: string;          // When content approved
  completedAt?: string;         // When payment released
  lastUpdated: string;

  // Refund info
  refundReason?: RefundReason;
  refundReasonText?: string;    // Human-readable reason

  // Metrics
  daysWaiting?: number;         // Auto-calculated

  // Admin
  notes?: string;               // Admin notes
  processedBy?: string;         // Admin who processed
}
```

---

## 5. API Layer

### 5.1 API Routes (Next.js App Router)

All API routes follow REST conventions and return standardized responses.

#### 5.1.1 Standard Response Format

```typescript
// /lib/types/api.types.ts

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: ApiMeta;
}

export interface ApiMeta {
  total: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, any>;
}
```

#### 5.1.2 Escrow API Routes

**GET /api/escrow**
```typescript
// List all escrow transactions with filters

Query Parameters:
- status?: 'held' | 'pending_release' | 'pending_refund' | 'released' | 'refunded' | 'all'
- search?: string (campaign name, business, influencer)
- dateFrom?: string (ISO date)
- dateTo?: string (ISO date)

Response:
{
  "success": true,
  "data": EscrowTransaction[],
  "meta": {
    "total": 10
  }
}
```

**GET /api/escrow/summary**
```typescript
// Get escrow statistics

Response:
{
  "success": true,
  "data": {
    "totalHeld": 234500,              // SAR in active escrow
    "pendingReleases": 150000,        // SAR awaiting transfer
    "pendingReleasesCount": 3,
    "pendingRefunds": 30000,          // SAR to be refunded
    "pendingRefundsCount": 2,
    "platformRevenue": 2400,          // Commission earned
    "actionRequired": 5               // Total pending actions
  }
}
```

**GET /api/escrow/[id]**
```typescript
// Get single transaction with audit logs

Response:
{
  "success": true,
  "data": {
    "transaction": EscrowTransaction,
    "auditLogs": EscrowAuditLog[]
  }
}
```

**PATCH /api/escrow/[id]**
```typescript
// Mark as transferred or refunded

Request Body:
{
  "action": "transfer" | "refund",
  "data": {
    "bankReference": string,  // Required
    "notes"?: string
  }
}

Response:
{
  "success": true,
  "message": "Transaction marked as transferred successfully",
  "data": EscrowTransaction (updated)
}
```

#### 5.1.3 Users API Routes

**GET /api/users**
```typescript
Query Parameters:
- type?: 'business' | 'influencer'
- search?: string
- verified?: 'true' | 'false'

Response:
{
  "success": true,
  "data": User[],
  "meta": { "total": 25 }
}
```

**GET /api/users/[id]**
```typescript
Response:
{
  "success": true,
  "data": User
}
```

#### 5.1.4 Campaigns API Routes

**GET /api/campaigns**
```typescript
Query Parameters:
- status?: 'active' | 'completed' | 'cancelled' | 'all'
- type?: 'invite' | 'public' | 'hybrid'
- businessId?: string
- search?: string

Response:
{
  "success": true,
  "data": Campaign[],
  "meta": { "total": 16 }
}
```

**GET /api/campaigns/[id]**
```typescript
Response:
{
  "success": true,
  "data": Campaign
}
```

### 5.2 Custom Hooks for Data Fetching

```typescript
// /lib/hooks/useEscrow.ts

/**
 * Hook to fetch escrow transactions with filters
 */
export function useEscrowTransactions(filters?: EscrowFilters) {
  const [data, setData] = useState<EscrowTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query params
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);
        // ... more filters

        const response = await fetch(`/api/escrow?${params.toString()}`);
        const result: ApiResponse<EscrowTransaction[]> = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.status, filters?.search, filters?.dateFrom, filters?.dateTo]);

  return { data, loading, error };
}

/**
 * Hook to fetch escrow summary
 */
export function useEscrowSummary() {
  const [data, setData] = useState<EscrowSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/escrow/summary');
        const result: ApiResponse<EscrowSummary> = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch summary');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for updating escrow (mark as transferred/refunded)
 */
export function useUpdateEscrow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markAsTransferred = async (
    id: string,
    bankReference: string,
    notes?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/escrow/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'transfer',
          data: { bankReference, notes },
        }),
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        setError(result.error || 'Failed to mark as transferred');
        return false;
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const markAsRefunded = async (
    id: string,
    bankReference: string,
    notes?: string
  ): Promise<boolean> => {
    // Similar implementation
  };

  return { markAsTransferred, markAsRefunded, loading, error };
}
```

---

## 6. Component Architecture

### 6.1 Component Hierarchy

```
App Layout (app/layout.tsx)
└── RootLayout
    ├── Sidebar (fixed left)
    ├── Main Content Area
    │   ├── Header (page title + AdminDropdown)
    │   └── Page Content
    │       ├── Dashboard (/app/page.tsx)
    │       ├── Users (/app/users/page.tsx)
    │       ├── Campaigns (/app/campaigns/page.tsx)
    │       ├── Disputes (/app/disputes/page.tsx)
    │       ├── Escrow (/app/escrow/page.tsx)
    │       ├── Transactions (/app/transactions/page.tsx)
    │       ├── Payouts (/app/payouts/page.tsx)
    │       ├── Financial (/app/financial/page.tsx)
    │       └── Wallet (/app/wallet/page.tsx)
    └── [Modals/Overlays]
```

### 6.2 Common Components

```typescript
// /components/common/StatusBadge.tsx

interface StatusBadgeProps {
  status: string;
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

// Usage:
<StatusBadge status="pending_release" variant="warning" />
<StatusBadge status="completed" variant="success" />
```

```typescript
// /components/common/MetricCard.tsx

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;        // Percentage change
  icon: React.ReactNode;
  bgColor: string;        // Tailwind gradient
  iconBgColor: string;
}

// Usage:
<MetricCard
  title="Total Held"
  value="SAR 234,500"
  icon={<Icons.wallet />}
  bgColor="from-blue-50 to-blue-100/50"
  iconBgColor="bg-blue-500"
/>
```

```typescript
// /components/common/Icons.tsx

export const Icons = {
  // Navigation
  dashboard: (props) => <svg>...</svg>,
  users: (props) => <svg>...</svg>,
  campaigns: (props) => <svg>...</svg>,

  // Actions
  edit: (props) => <svg>...</svg>,
  trash: (props) => <svg>...</svg>,
  check: (props) => <svg>...</svg>,
  close: (props) => <svg>...</svg>,

  // Status
  pending: (props) => <svg>...</svg>,
  success: (props) => <svg>...</svg>,
  error: (props) => <svg>...</svg>,

  // Financial
  wallet: (props) => <svg>...</svg>,
  dollarSign: (props) => <svg>...</svg>,
  receipt: (props) => <svg>...</svg>,

  // Social
  instagram: (props) => <svg>...</svg>,
  tiktok: (props) => <svg>...</svg>,
  youtube: (props) => <svg>...</svg>,
};
```

### 6.3 Layout Components

**Sidebar Component**
```typescript
// /components/layout/Sidebar.tsx

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

interface SidebarItem {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  count?: number;          // Notification badge
  color?: string;          // Badge color
}

const sections: SidebarSection[] = [
  {
    label: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'campaigns', label: 'Campaigns', icon: 'megaphone' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { id: 'disputes', label: 'Disputes', icon: 'scale', count: 8, color: 'bg-rose-500' },
      { id: 'transactions', label: 'Transactions', icon: 'arrowRightLeft' },
    ],
  },
  {
    label: 'FINANCIAL',
    items: [
      { id: 'financial', label: 'Financial Management', icon: 'receipt' },
      { id: 'escrow', label: 'Escrow Monitoring', icon: 'shield', count: 5, color: 'bg-violet-500' },
      { id: 'wallet', label: 'Wallet Operations', icon: 'wallet' },
      { id: 'payouts', label: 'Payouts', icon: 'dollarSign', count: 5, color: 'bg-emerald-500' },
    ],
  },
];

// Active route detection
const router = useRouter();
const pathname = usePathname();

const isActive = (id: string) => {
  const routes = {
    dashboard: '/',
    users: '/users',
    campaigns: '/campaigns',
    disputes: '/disputes',
    // ... etc
  };
  return pathname === routes[id];
};
```

**AdminDropdown Component**
```typescript
// /components/layout/AdminDropdown.tsx

const AdminDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-semibold">AM</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl">
          <div className="p-4 border-b">
            <p className="font-semibold">Ali Mahmood</p>
            <p className="text-sm text-slate-500">Super Admin</p>
          </div>
          <div className="p-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-50">
              <Icons.user />
              <span>My Profile</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-50">
              <Icons.settings />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-50 text-rose-600">
              <Icons.logOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 7. State Management

### 7.1 State Strategy

**Current Implementation:** Local state with React Hooks

```typescript
// Page-level state management pattern

const EscrowPage = () => {
  // 1. Filter state (controlled by user)
  const [filters, setFilters] = useState<EscrowFilters>({
    status: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  // 2. Tab state (controlled by user)
  const [activeTab, setActiveTab] = useState<TabView>('action_required');

  // 3. Data fetching (custom hook)
  const { data: summary, loading: summaryLoading } = useEscrowSummary();
  const { data: transactions, loading: transLoading } = useEscrowTransactions(filters);

  // 4. Derived state (useMemo for performance)
  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (activeTab === 'action_required') {
      result = result.filter(t =>
        t.status === 'pending_release' || t.status === 'pending_refund'
      );
    } else if (activeTab === 'completed') {
      result = result.filter(t =>
        t.status === 'released' || t.status === 'refunded'
      );
    }

    return result;
  }, [transactions, activeTab]);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TransactionsTable data={filteredTransactions} loading={transLoading} />
    </div>
  );
};
```

### 7.2 Future State Management

**Recommended for scaling:** Zustand or Context API

```typescript
// Future: Global state with Zustand

import create from 'zustand';

interface AdminState {
  // Auth
  user: AdminUser | null;
  setUser: (user: AdminUser) => void;

  // Filters (persisted across navigation)
  escrowFilters: EscrowFilters;
  setEscrowFilters: (filters: EscrowFilters) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;

  // UI
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const useAdminStore = create<AdminState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  escrowFilters: { status: 'all', search: '', dateFrom: '', dateTo: '' },
  setEscrowFilters: (filters) => set({ escrowFilters: filters }),

  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
```

---

## 8. Security & Authentication

### 8.1 Current Implementation

**⚠️ CRITICAL: Demo credentials (must be replaced)**

```typescript
// app/login/page.tsx

// TEMPORARY - For development only
if (email === 'admin@jusor.com' && password === 'admin123') {
  router.push('/');
}

// ❌ Issues:
// - Hardcoded credentials in client-side code
// - No real authentication
// - No session management
// - No protected routes
```

### 8.2 Required Implementation

**Authentication Flow (NextAuth.js recommended):**

```typescript
// auth.config.ts

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Call Laravel backend API
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) return null;

        const user = await response.json();
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
```

**Protected Routes Middleware:**

```typescript
// middleware.ts

import { auth } from './auth.config';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname.startsWith('/login');

  if (!isLoggedIn && !isOnLoginPage) {
    return Response.redirect(new URL('/login', req.url));
  }

  if (isLoggedIn && isOnLoginPage) {
    return Response.redirect(new URL('/', req.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

**Role-Based Access Control:**

```typescript
// lib/permissions.ts

type AdminRole = 'super_admin' | 'verification_agent' | 'finance_admin' | 'dispute_manager' | 'support_agent';

const permissions = {
  super_admin: ['*'], // All permissions

  verification_agent: [
    'users.view',
    'users.verify',
    'users.suspend',
  ],

  finance_admin: [
    'escrow.view',
    'escrow.release',
    'escrow.refund',
    'payouts.view',
    'payouts.process',
    'transactions.view',
  ],

  dispute_manager: [
    'disputes.view',
    'disputes.decide',
    'disputes.appeal',
  ],

  support_agent: [
    'campaigns.view',
    'campaigns.extend',
    'users.view',
    'chat.access',
  ],
};

export const can = (role: AdminRole, permission: string): boolean => {
  const rolePerms = permissions[role];
  return rolePerms.includes('*') || rolePerms.includes(permission);
};

// Usage in components:
const { data: session } = useSession();
const canReleasePayment = can(session.user.role, 'escrow.release');

{canReleasePayment && (
  <button onClick={handleRelease}>Release Payment</button>
)}
```

---

## 9. Integration Points

### 9.1 Future Backend API Integration

**Environment Variables:**

```env
# .env.local

# API Configuration
NEXT_PUBLIC_API_URL=https://api.jusor.sa
API_TIMEOUT=30000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# External Services
PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=eu

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

**API Client:**

```typescript
// lib/api-client.ts

import { getSession } from 'next-auth/react';

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL!;
    this.timeout = Number(process.env.API_TIMEOUT) || 30000;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const session = await getSession();
    return {
      'Content-Type': 'application/json',
      'Authorization': session ? `Bearer ${session.accessToken}` : '',
    };
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    const headers = await this.getHeaders();

    const response = await fetch(`${this.baseUrl}${endpoint}${query}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(this.timeout),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const headers = await this.getHeaders();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    // Similar to POST
  }

  async delete<T>(endpoint: string): Promise<T> {
    // Similar to GET
  }
}

export const apiClient = new ApiClient();

// Usage:
const escrowData = await apiClient.get<ApiResponse<EscrowTransaction[]>>('/escrow');
```

### 9.2 Real-time Updates (Pusher/Laravel Echo)

```typescript
// lib/echo-client.ts

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  forceTLS: true,
  auth: {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  },
});

// Listen to events
echo.channel('admin-panel')
  .listen('NewDispute', (event) => {
    // Show notification
    toast.error(`New dispute: ${event.dispute.title}`);
    // Refresh disputes list
    mutate('/api/disputes');
  })
  .listen('PaymentReleased', (event) => {
    toast.success(`Payment released: ${event.transaction.id}`);
    mutate('/api/escrow');
  });
```

---

## 10. Deployment

### 10.1 Build Configuration

```json
// package.json

{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### 10.2 Production Deployment

**Vercel (Recommended):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

**Environment Variables (Vercel Dashboard):**
```
NEXT_PUBLIC_API_URL=https://api.jusor.sa
NEXTAUTH_URL=https://admin.jusor.sa
NEXTAUTH_SECRET=***
```

**Alternative: Docker**

```dockerfile
# Dockerfile

FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 10.3 Performance Optimizations

```typescript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack in dev
  experimental: {
    turbo: true,
  },

  // Image optimization
  images: {
    domains: ['api.jusor.sa', 'cdn.jusor.sa'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Output standalone for Docker
  output: 'standalone',
};

module.exports = nextConfig;
```

---

## 11. Testing Strategy (Future)

### 11.1 Unit Tests (Jest + React Testing Library)

```typescript
// __tests__/components/StatusBadge.test.tsx

import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/common/StatusBadge';

describe('StatusBadge', () => {
  it('renders with correct status text', () => {
    render(<StatusBadge status="pending_release" variant="warning" />);
    expect(screen.getByText('pending_release')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    const { container } = render(<StatusBadge status="completed" variant="success" />);
    expect(container.firstChild).toHaveClass('bg-emerald-100');
  });
});
```

### 11.2 E2E Tests (Playwright)

```typescript
// e2e/escrow.spec.ts

import { test, expect } from '@playwright/test';

test('Admin can view escrow transactions', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'admin@jusor.com');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Navigate to Escrow
  await page.click('a[href="/escrow"]');

  // Verify page loaded
  await expect(page.locator('h1')).toContainText('Escrow Monitoring');

  // Verify transactions table
  await expect(page.locator('table')).toBeVisible();
  await expect(page.locator('tbody tr')).toHaveCount(10);
});

test('Admin can release payment', async ({ page }) => {
  // ... similar flow
  await page.click('[data-testid="release-payment-btn"]');
  await page.fill('input[name="bankReference"]', 'TRF-2026-12345');
  await page.click('button:has-text("Confirm")');

  // Verify success
  await expect(page.locator('.toast-success')).toBeVisible();
});
```

---

## 12. Monitoring & Logging (Future)

### 12.1 Error Tracking (Sentry)

```typescript
// sentry.client.config.ts

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### 12.2 Analytics

```typescript
// lib/analytics.ts

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Send to analytics platform (Mixpanel, Amplitude, etc.)
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track(eventName, properties);
  }
};

// Usage:
trackEvent('Escrow Payment Released', {
  transactionId: 'ESC-2026-001',
  amount: 15000,
  currency: 'SAR',
});
```

---

## Document Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Jan 2026 | Initial system design document | JUSOR Team |

---

**End of System Design Document**
