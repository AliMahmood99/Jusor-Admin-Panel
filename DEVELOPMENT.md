# Development Guide

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Adding New Features](#adding-new-features)
- [Code Standards](#code-standards)
- [API Integration](#api-integration)

## 🏗️ Project Overview

This is a professional Next.js admin panel built with:
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks (useState, useEffect)

## 🎯 Architecture

### Component Structure

```
components/
├── common/           # Shared, reusable components
├── layout/           # Layout components (Sidebar, Header)
└── dashboard/        # Page-specific components
```

**Rules**:
- ✅ Keep components small and focused
- ✅ Use TypeScript for all components
- ✅ Extract reusable logic to custom hooks
- ✅ Store static data in `lib/constants.ts`

### File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `UserCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `index.ts` in `types/` folder
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `API_ENDPOINTS`)

## 🚀 Adding New Features

### 1. Adding a New Page

```typescript
// 1. Create the page component
// app/users/page.tsx
'use client';

import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function UsersPage() {
  return (
    <div className="flex h-screen">
      <Sidebar active="users" setActive={() => {}} />
      <div className="flex-1">
        <DashboardHeader />
        {/* Your content here */}
      </div>
    </div>
  );
}
```

### 2. Adding a New Component

```typescript
// 1. Define types in types/index.ts
export interface UserCardProps {
  name: string;
  email: string;
  role: string;
}

// 2. Create the component
// components/common/UserCard.tsx
import type { UserCardProps } from '@/types';

export default function UserCard({ name, email, role }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3>{name}</h3>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
}

// 3. Use the component
import UserCard from '@/components/common/UserCard';

<UserCard name="Ahmed" email="ahmed@example.com" role="Admin" />
```

### 3. Adding New Icons

```typescript
// components/common/Icons.tsx
export const Icons = {
  // ... existing icons
  newIcon: (props: IconProps) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="..." />
    </svg>
  ),
};

// Usage
import { Icons } from '@/components/common/Icons';
<Icons.newIcon className="w-5 h-5" />
```

### 4. Adding Constants

```typescript
// lib/constants.ts
export const NEW_FEATURE_DATA = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];
```

## 📐 Code Standards

### TypeScript

```typescript
// ✅ Good - Explicit types
interface Props {
  title: string;
  count: number;
  onUpdate: (id: string) => void;
}

function MyComponent({ title, count, onUpdate }: Props) {
  // ...
}

// ❌ Bad - No types
function MyComponent({ title, count, onUpdate }) {
  // ...
}
```

### Component Structure

```typescript
/**
 * Component Description
 * Brief explanation of what this component does
 */

'use client'; // Only if using client-side features

import React from 'react';
import type { ComponentProps } from '@/types';

export default function MyComponent({ prop1, prop2 }: ComponentProps) {
  // 1. State
  const [state, setState] = useState(initialValue);

  // 2. Effects
  useEffect(() => {
    // ...
  }, []);

  // 3. Handlers
  const handleClick = () => {
    // ...
  };

  // 4. Render
  return (
    <div>
      {/* Content */}
    </div>
  );
}
```

### Tailwind CSS

```typescript
// ✅ Good - Organized classes
<div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">

// ❌ Bad - Random order
<div className="bg-white transition-shadow flex shadow-sm p-4 rounded-lg items-center hover:shadow-md justify-between">

// ✅ Good - Conditional classes
<button className={`px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
```

## 🔌 API Integration

### Setting Up API Client

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
};
```

### Creating Custom Hooks

```typescript
// hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { User } from '@/types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.get<User[]>('/users')
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
}

// Usage in component
function UsersPage() {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
```

### API Endpoints Constants

```typescript
// lib/constants.ts
export const API_ENDPOINTS = {
  USERS: '/users',
  CAMPAIGNS: '/campaigns',
  TRANSACTIONS: '/transactions',
  ANALYTICS: '/analytics',
} as const;
```

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build test
npm run build

# Development server
npm run dev
```

## 🎨 Styling Guidelines

### Color Palette

```typescript
// Primary colors (from Tailwind)
- Blue: bg-blue-500, text-blue-600
- Emerald: bg-emerald-500, text-emerald-600
- Rose: bg-rose-500, text-rose-600
- Amber: bg-amber-500, text-amber-600
- Violet: bg-violet-500, text-violet-600

// Neutral colors
- Gray: bg-gray-50 to bg-gray-900
- Slate: bg-slate-50 to bg-slate-900 (for dark UI like sidebar)
```

### Spacing

```typescript
// Use consistent spacing
- gap-2, gap-2.5, gap-3, gap-4 (between items)
- p-2, p-3, p-4, p-5 (padding)
- mb-2, mb-3, mb-4 (margins)
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Use meaningful component and variable names
4. Add comments for complex logic
5. Test your changes before committing

---

Happy coding! 🚀
