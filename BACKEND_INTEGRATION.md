# Backend Integration Guide

## 📋 Overview

This guide explains how to integrate the JUSOR Admin Panel with your backend API.

## 🔧 Setup

### 1. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.jusor.com/v1
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### 2. Create API Client

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = API_URL || '';
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    };
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
```

## 📡 API Endpoints

### Expected Backend Endpoints

```typescript
// lib/endpoints.ts
export const ENDPOINTS = {
  // Dashboard
  DASHBOARD_STATS: '/admin/dashboard/stats',
  DASHBOARD_REVENUE: '/admin/dashboard/revenue',
  DASHBOARD_ACTIVITIES: '/admin/dashboard/activities',

  // Users
  USERS_LIST: '/admin/users',
  USERS_DETAIL: (id: string) => `/admin/users/${id}`,
  USERS_CREATE: '/admin/users',
  USERS_UPDATE: (id: string) => `/admin/users/${id}`,
  USERS_DELETE: (id: string) => `/admin/users/${id}`,

  // Verification
  VERIFICATION_REQUESTS: '/admin/verification/requests',
  VERIFICATION_APPROVE: (id: string) => `/admin/verification/${id}/approve`,
  VERIFICATION_REJECT: (id: string) => `/admin/verification/${id}/reject`,

  // Campaigns
  CAMPAIGNS_LIST: '/admin/campaigns',
  CAMPAIGNS_DETAIL: (id: string) => `/admin/campaigns/${id}`,
  CAMPAIGNS_UPDATE: (id: string) => `/admin/campaigns/${id}`,

  // Transactions
  TRANSACTIONS_LIST: '/admin/transactions',
  TRANSACTIONS_DETAIL: (id: string) => `/admin/transactions/${id}`,

  // Withdrawals
  WITHDRAWALS_LIST: '/admin/withdrawals',
  WITHDRAWALS_APPROVE: (id: string) => `/admin/withdrawals/${id}/approve`,
  WITHDRAWALS_REJECT: (id: string) => `/admin/withdrawals/${id}/reject`,

  // Disputes
  DISPUTES_LIST: '/admin/disputes',
  DISPUTES_DETAIL: (id: string) => `/admin/disputes/${id}`,
  DISPUTES_RESOLVE: (id: string) => `/admin/disputes/${id}/resolve`,

  // Reports
  REPORTS_REVENUE: '/admin/reports/revenue',
  REPORTS_USERS: '/admin/reports/users',
  REPORTS_CAMPAIGNS: '/admin/reports/campaigns',

  // System
  SYSTEM_HEALTH: '/admin/system/health',
  SYSTEM_LOGS: '/admin/system/logs',
} as const;
```

## 🔄 Data Fetching Patterns

### Using React Hooks

```typescript
// hooks/useDashboardStats.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { ENDPOINTS } from '@/lib/endpoints';

interface DashboardStats {
  totalUsers: number;
  activeCampaigns: number;
  escrowBalance: number;
  pendingPayouts: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.get<DashboardStats>(ENDPOINTS.DASHBOARD_STATS);
        setStats(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchStats();
  };

  return { stats, loading, error, refetch };
}
```

### Usage in Components

```typescript
// app/page.tsx
'use client';

import { useDashboardStats } from '@/hooks/useDashboardStats';
import KPICard from '@/components/common/KPICard';

export default function DashboardPage() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-4">
      <KPICard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon="users"
        iconBg="bg-blue-500"
      />
      {/* More cards... */}
    </div>
  );
}
```

## 📊 Expected API Response Formats

### Dashboard Stats

```typescript
// GET /admin/dashboard/stats
{
  "totalUsers": 2270,
  "totalInfluencers": 1847,
  "totalBusinesses": 423,
  "activeCampaigns": 47,
  "escrowBalance": 234500,
  "pendingPayouts": 89200,
  "userGrowth": "+6.8%",
  "campaignGrowth": "+12.3%"
}
```

### Users List

```typescript
// GET /admin/users?page=1&limit=10&type=influencer
{
  "data": [
    {
      "id": "user_123",
      "name": "Ahmed Al-Farsi",
      "email": "ahmed@example.com",
      "type": "influencer",
      "verified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "stats": {
        "campaigns": 8,
        "earnings": 98500
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1847,
    "totalPages": 185
  }
}
```

### Verification Requests

```typescript
// GET /admin/verification/requests
{
  "data": [
    {
      "id": "ver_123",
      "userId": "user_123",
      "userName": "Noura Al-Rashid",
      "type": "identity",
      "status": "pending",
      "documents": [
        {
          "type": "national_id",
          "url": "https://cdn.jusor.com/docs/123.pdf"
        }
      ],
      "submittedAt": "2024-01-06T10:30:00Z"
    }
  ],
  "total": 23
}
```

### Activities

```typescript
// GET /admin/dashboard/activities?limit=10
{
  "data": [
    {
      "id": "act_123",
      "type": "verification",
      "userId": "user_123",
      "userName": "Noura Al-Rashid",
      "action": "submitted verification documents",
      "timestamp": "2024-01-06T14:30:00Z"
    }
  ]
}
```

## 🔐 Authentication

### JWT Token

```typescript
// lib/auth.ts
export async function login(email: string, password: string) {
  const response = await api.post<{ token: string }>('/auth/login', {
    email,
    password,
  });

  // Store token
  localStorage.setItem('token', response.token);

  return response;
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}

// Update API client to use token
// lib/api.ts
private getHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}
```

## 🚀 Integration Steps

### Step 1: Update Constants

Replace mock data in `lib/constants.ts` with API calls:

```typescript
// Before (mock data)
export const PENDING_ACTIONS = [
  { label: 'Verification Requests', count: 23, ... },
];

// After (from API)
// Remove from constants, fetch from API using hooks
```

### Step 2: Create Hooks

```typescript
// hooks/usePendingActions.ts
export function usePendingActions() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    api.get('/admin/pending-actions').then(setActions);
  }, []);

  return actions;
}
```

### Step 3: Update Components

```typescript
// components/dashboard/PendingActionsCard.tsx
import { usePendingActions } from '@/hooks/usePendingActions';

export default function PendingActionsCard() {
  const { actions, loading } = usePendingActions();

  if (loading) return <Skeleton />;

  return (
    // Render actions from API
  );
}
```

## 📝 Best Practices

1. **Error Handling**: Always handle errors gracefully
2. **Loading States**: Show loading indicators
3. **Caching**: Consider using React Query for caching
4. **Type Safety**: Define proper TypeScript interfaces
5. **Environment Variables**: Never commit API keys

## 🔄 Real-time Updates

### Using WebSockets

```typescript
// lib/websocket.ts
export function useWebSocket(url: string) {
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle real-time updates
    };

    return () => ws.close();
  }, [url]);
}
```

## 📦 Recommended Libraries

- **React Query**: Data fetching and caching
- **SWR**: Alternative to React Query
- **Zod**: Runtime type validation
- **Axios**: Alternative to fetch

---

For questions, contact the backend team.
