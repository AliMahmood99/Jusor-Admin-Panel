# JUSOR Admin Panel - UI/UX System Design

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Visual Design System](#visual-design-system)
3. [Color Palette](#color-palette)
4. [Typography System](#typography-system)
5. [Spacing & Layout System](#spacing--layout-system)
6. [Component Library](#component-library)
7. [Icon System](#icon-system)
8. [Navigation Patterns](#navigation-patterns)
9. [Data Visualization](#data-visualization)
10. [User Flows](#user-flows)
11. [Responsive Design](#responsive-design)
12. [Accessibility](#accessibility)
13. [Dark Mode](#dark-mode)
14. [Animation & Transitions](#animation--transitions)

---

## Design Philosophy

### Core Principles

**1. Clarity Over Decoration**
- Clean, minimal interface that prioritizes information
- No unnecessary visual elements
- Every pixel serves a purpose
- Content-first approach

**2. Efficiency First**
- Quick actions always accessible
- Minimize clicks to complete tasks
- Bulk operations for repetitive tasks
- Keyboard shortcuts for power users

**3. Data-Driven Decisions**
- Visual hierarchy based on data importance
- Clear status indicators
- Scannable tables and lists
- Progressive disclosure of details

**4. Professional & Trustworthy**
- Sophisticated color palette
- Consistent spacing and alignment
- High-quality typography
- Polished interactions

**5. Scalable & Maintainable**
- Reusable component system
- Consistent design tokens
- Clear documentation
- Easy to extend

---

## Visual Design System

### Design Tokens

All design values are tokenized for consistency and maintainability.

```typescript
// Design Tokens Structure
const designTokens = {
  colors: { /* color palette */ },
  typography: { /* font scales */ },
  spacing: { /* spacing scale */ },
  shadows: { /* elevation system */ },
  borders: { /* border styles */ },
  radii: { /* border radius */ },
  transitions: { /* animation timing */ },
  breakpoints: { /* responsive breakpoints */ },
}
```

### Visual Hierarchy Levels

**Level 1: Critical Actions & Alerts**
- Primary buttons
- Critical status badges (failed, disputed)
- High-priority alerts
- Destructive actions (delete, suspend)

**Level 2: Primary Content**
- Page headings
- Key metrics
- Important status information
- Main data tables

**Level 3: Secondary Content**
- Descriptions
- Labels
- Secondary actions
- Metadata

**Level 4: Tertiary Content**
- Helper text
- Timestamps
- Less important metadata
- Disabled states

---

## Color Palette

### Base Colors

```css
/* Primary Colors - Brand Identity */
--color-primary-50: #f0f9ff;   /* Lightest blue - backgrounds */
--color-primary-100: #e0f2fe;  /* Light blue - hover states */
--color-primary-200: #bae6fd;  /* Soft blue */
--color-primary-300: #7dd3fc;  /* Medium blue */
--color-primary-400: #38bdf8;  /* Blue */
--color-primary-500: #0ea5e9;  /* Primary brand blue */
--color-primary-600: #0284c7;  /* Dark blue - primary actions */
--color-primary-700: #0369a1;  /* Darker blue */
--color-primary-800: #075985;  /* Very dark blue */
--color-primary-900: #0c4a6e;  /* Darkest blue */

/* Neutral Colors - UI Elements */
--color-neutral-50: #fafafa;   /* Backgrounds */
--color-neutral-100: #f5f5f5;  /* Subtle backgrounds */
--color-neutral-200: #e5e5e5;  /* Borders */
--color-neutral-300: #d4d4d4;  /* Dividers */
--color-neutral-400: #a3a3a3;  /* Disabled text */
--color-neutral-500: #737373;  /* Secondary text */
--color-neutral-600: #525252;  /* Body text */
--color-neutral-700: #404040;  /* Headings */
--color-neutral-800: #262626;  /* Dark headings */
--color-neutral-900: #171717;  /* Darkest text */

/* Success Colors - Positive Actions */
--color-success-50: #f0fdf4;
--color-success-100: #dcfce7;
--color-success-500: #22c55e;  /* Success actions */
--color-success-600: #16a34a;  /* Success hover */
--color-success-700: #15803d;

/* Warning Colors - Caution */
--color-warning-50: #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-500: #f59e0b;  /* Warning state */
--color-warning-600: #d97706;  /* Warning hover */
--color-warning-700: #b45309;

/* Error Colors - Destructive Actions */
--color-error-50: #fef2f2;
--color-error-100: #fee2e2;
--color-error-500: #ef4444;    /* Error state */
--color-error-600: #dc2626;    /* Error hover */
--color-error-700: #b91c1c;

/* Info Colors - Informational */
--color-info-50: #eff6ff;
--color-info-100: #dbeafe;
--color-info-500: #3b82f6;     /* Info state */
--color-info-600: #2563eb;     /* Info hover */
--color-info-700: #1d4ed8;
```

### Semantic Colors (Application Context)

```css
/* Status Colors - Mapped to Context */
--status-verified: var(--color-success-500);
--status-pending: var(--color-warning-500);
--status-rejected: var(--color-error-500);
--status-suspended: var(--color-neutral-500);

--status-active: var(--color-success-500);
--status-completed: var(--color-success-600);
--status-in-progress: var(--color-info-500);
--status-draft: var(--color-neutral-400);
--status-cancelled: var(--color-error-500);
--status-disputed: var(--color-error-600);

/* Escrow Status Colors */
--escrow-held: var(--color-warning-500);
--escrow-released: var(--color-success-500);
--escrow-refunded: var(--color-error-500);
--escrow-pending: var(--color-info-500);

/* Background Colors */
--bg-primary: #ffffff;
--bg-secondary: var(--color-neutral-50);
--bg-tertiary: var(--color-neutral-100);
--bg-overlay: rgba(0, 0, 0, 0.5);
```

### Color Usage Guidelines

**Do's:**
- ✅ Use primary blue for main actions (Approve, Submit, Save)
- ✅ Use green for success states and positive actions
- ✅ Use yellow for warnings and pending states
- ✅ Use red for errors and destructive actions
- ✅ Use neutral grays for text and borders
- ✅ Maintain sufficient contrast (WCAG AA minimum)

**Don'ts:**
- ❌ Don't use color as the only indicator (support with icons/text)
- ❌ Don't mix too many colors in one view
- ❌ Don't use bright, saturated colors for large areas
- ❌ Don't use red and green as the only differentiators (colorblind users)

---

## Typography System

### Font Families

```css
/* Primary Font - UI Text */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;

/* Monospace Font - Code & Data */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;

/* Arabic Font - RTL Support (if needed) */
--font-arabic: 'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif;
```

### Type Scale

```css
/* Font Sizes - Modular Scale (1.250 - Major Third) */
--text-xs: 0.75rem;      /* 12px - Helper text, labels */
--text-sm: 0.875rem;     /* 14px - Body small, captions */
--text-base: 1rem;       /* 16px - Body text, buttons */
--text-lg: 1.125rem;     /* 18px - Emphasized text */
--text-xl: 1.25rem;      /* 20px - H4 */
--text-2xl: 1.5rem;      /* 24px - H3 */
--text-3xl: 1.875rem;    /* 30px - H2 */
--text-4xl: 2.25rem;     /* 36px - H1 */
--text-5xl: 3rem;        /* 48px - Hero text */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Hierarchy

```tsx
// Heading Styles
const headingStyles = {
  h1: {
    fontSize: 'text-4xl',        // 36px
    fontWeight: 'font-bold',      // 700
    lineHeight: 'leading-tight',  // 1.25
    color: 'text-neutral-900',
    marginBottom: 'mb-6',
  },
  h2: {
    fontSize: 'text-3xl',        // 30px
    fontWeight: 'font-bold',      // 700
    lineHeight: 'leading-tight',  // 1.25
    color: 'text-neutral-900',
    marginBottom: 'mb-4',
  },
  h3: {
    fontSize: 'text-2xl',        // 24px
    fontWeight: 'font-semibold',  // 600
    lineHeight: 'leading-snug',   // 1.375
    color: 'text-neutral-800',
    marginBottom: 'mb-3',
  },
  h4: {
    fontSize: 'text-xl',         // 20px
    fontWeight: 'font-semibold',  // 600
    lineHeight: 'leading-snug',   // 1.375
    color: 'text-neutral-800',
    marginBottom: 'mb-2',
  },
}

// Body Text Styles
const bodyStyles = {
  large: {
    fontSize: 'text-lg',         // 18px
    fontWeight: 'font-normal',    // 400
    lineHeight: 'leading-relaxed', // 1.625
    color: 'text-neutral-700',
  },
  base: {
    fontSize: 'text-base',       // 16px
    fontWeight: 'font-normal',    // 400
    lineHeight: 'leading-normal', // 1.5
    color: 'text-neutral-600',
  },
  small: {
    fontSize: 'text-sm',         // 14px
    fontWeight: 'font-normal',    // 400
    lineHeight: 'leading-normal', // 1.5
    color: 'text-neutral-600',
  },
}

// Utility Text Styles
const utilityStyles = {
  caption: {
    fontSize: 'text-xs',         // 12px
    fontWeight: 'font-normal',    // 400
    lineHeight: 'leading-normal', // 1.5
    color: 'text-neutral-500',
  },
  label: {
    fontSize: 'text-sm',         // 14px
    fontWeight: 'font-medium',    // 500
    lineHeight: 'leading-normal', // 1.5
    color: 'text-neutral-700',
  },
  overline: {
    fontSize: 'text-xs',         // 12px
    fontWeight: 'font-semibold',  // 600
    lineHeight: 'leading-none',   // 1
    letterSpacing: 'tracking-wide', // 0.05em
    textTransform: 'uppercase',
    color: 'text-neutral-500',
  },
}
```

### Typography Usage

**Page Titles:** H1 (text-4xl, font-bold)
```tsx
<h1 className="text-4xl font-bold text-neutral-900 mb-6">
  User Management
</h1>
```

**Section Headings:** H2 (text-3xl, font-bold)
```tsx
<h2 className="text-3xl font-bold text-neutral-900 mb-4">
  Verification Queue
</h2>
```

**Subsection Headings:** H3 (text-2xl, font-semibold)
```tsx
<h3 className="text-2xl font-semibold text-neutral-800 mb-3">
  User Details
</h3>
```

**Card Titles:** H4 (text-xl, font-semibold)
```tsx
<h4 className="text-xl font-semibold text-neutral-800 mb-2">
  Campaign Overview
</h4>
```

**Body Text:** Base (text-base)
```tsx
<p className="text-base text-neutral-600 leading-normal">
  This campaign is currently in progress...
</p>
```

**Labels:** Small, Medium Weight
```tsx
<label className="text-sm font-medium text-neutral-700">
  Email Address
</label>
```

**Helper Text:** XS, Normal Weight
```tsx
<span className="text-xs text-neutral-500">
  Last updated 2 hours ago
</span>
```

---

## Spacing & Layout System

### Spacing Scale

Using a **4px base unit** for consistent spacing:

```css
/* Spacing Scale (4px base) */
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
--space-24: 6rem;       /* 96px */
```

### Layout Grid

**Container Widths:**
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

**Column System:**
- 12-column grid for flexible layouts
- Gutter: 24px (space-6)
- Column gap: 16px (space-4)

### Spacing Usage Guidelines

**Component Internal Spacing:**
- Padding inside buttons: `px-4 py-2` (16px horizontal, 8px vertical)
- Padding inside cards: `p-6` (24px all sides)
- Padding inside large cards: `p-8` (32px all sides)
- Padding in modals: `p-6` or `p-8`

**Component External Spacing:**
- Gap between stacked elements: `space-y-4` (16px)
- Gap between inline elements: `space-x-4` (16px)
- Margin bottom for sections: `mb-8` or `mb-12`

**Page Layout Spacing:**
- Page padding: `p-6` on mobile, `p-8` on desktop
- Section spacing: `mb-12` or `mb-16`
- Content max-width: `max-w-7xl` (1280px)

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;    /* 2px */
--radius-base: 0.25rem;   /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-full: 9999px;    /* Circle/Pill */
```

**Usage:**
- Buttons: `rounded-md` (6px)
- Cards: `rounded-lg` (8px)
- Modals: `rounded-xl` (12px)
- Badges: `rounded-full` (pill shape)
- Input fields: `rounded-md` (6px)

### Shadows (Elevation)

```css
/* Shadow Scale */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**Elevation Layers:**
- **Layer 0 (Base):** No shadow - page background
- **Layer 1 (Cards):** `shadow-sm` - cards, tables
- **Layer 2 (Sticky Elements):** `shadow-base` - sticky headers
- **Layer 3 (Dropdowns):** `shadow-md` - dropdown menus
- **Layer 4 (Modals):** `shadow-lg` - modal dialogs
- **Layer 5 (Tooltips):** `shadow-xl` - tooltips, popovers

---

## Component Library

### 1. Buttons

**Primary Button** - Main actions
```tsx
<button className="
  px-4 py-2
  bg-primary-600 hover:bg-primary-700
  text-white font-medium text-base
  rounded-md shadow-sm
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Approve User
</button>
```

**Secondary Button** - Less important actions
```tsx
<button className="
  px-4 py-2
  bg-white hover:bg-neutral-50
  border border-neutral-300 hover:border-neutral-400
  text-neutral-700 font-medium text-base
  rounded-md shadow-sm
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
">
  View Details
</button>
```

**Destructive Button** - Dangerous actions
```tsx
<button className="
  px-4 py-2
  bg-error-600 hover:bg-error-700
  text-white font-medium text-base
  rounded-md shadow-sm
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2
">
  Suspend Account
</button>
```

**Ghost Button** - Tertiary actions
```tsx
<button className="
  px-4 py-2
  bg-transparent hover:bg-neutral-100
  text-neutral-700 font-medium text-base
  rounded-md
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
">
  Cancel
</button>
```

**Button Sizes:**
```tsx
// Small
<button className="px-3 py-1.5 text-sm">Small</button>

// Base
<button className="px-4 py-2 text-base">Base</button>

// Large
<button className="px-6 py-3 text-lg">Large</button>
```

### 2. Status Badges

```tsx
// Verified (Green)
<span className="
  inline-flex items-center gap-1.5
  px-2.5 py-0.5
  bg-success-100 text-success-700
  text-xs font-medium
  rounded-full
">
  <CheckCircle className="w-3.5 h-3.5" />
  Verified
</span>

// Pending (Yellow)
<span className="
  inline-flex items-center gap-1.5
  px-2.5 py-0.5
  bg-warning-100 text-warning-700
  text-xs font-medium
  rounded-full
">
  <Clock className="w-3.5 h-3.5" />
  Pending
</span>

// Rejected (Red)
<span className="
  inline-flex items-center gap-1.5
  px-2.5 py-0.5
  bg-error-100 text-error-700
  text-xs font-medium
  rounded-full
">
  <XCircle className="w-3.5 h-3.5" />
  Rejected
</span>

// Suspended (Gray)
<span className="
  inline-flex items-center gap-1.5
  px-2.5 py-0.5
  bg-neutral-100 text-neutral-700
  text-xs font-medium
  rounded-full
">
  <Ban className="w-3.5 h-3.5" />
  Suspended
</span>
```

**Badge Variants:**
- **Dot Badge:** Small colored dot + text
- **Icon Badge:** Icon + text
- **Count Badge:** Number only (for notifications)

### 3. Metric Cards

```tsx
<div className="
  bg-white
  border border-neutral-200
  rounded-lg
  p-6
  shadow-sm
  hover:shadow-md
  transition-shadow duration-200
">
  {/* Icon Circle */}
  <div className="
    w-12 h-12
    bg-primary-100
    rounded-full
    flex items-center justify-center
    mb-4
  ">
    <Users className="w-6 h-6 text-primary-600" />
  </div>

  {/* Metric */}
  <div className="text-3xl font-bold text-neutral-900 mb-1">
    1,234
  </div>

  {/* Label */}
  <div className="text-sm text-neutral-600">
    Total Users
  </div>

  {/* Change Indicator (Optional) */}
  <div className="flex items-center gap-1 mt-2 text-sm">
    <TrendingUp className="w-4 h-4 text-success-600" />
    <span className="text-success-600 font-medium">+12%</span>
    <span className="text-neutral-500">from last month</span>
  </div>
</div>
```

### 4. Data Tables

```tsx
<div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
  {/* Table Header with Search & Filters */}
  <div className="p-4 border-b border-neutral-200">
    <div className="flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="
            w-full pl-10 pr-4 py-2
            border border-neutral-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          "
        />
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center gap-2">
        <select className="px-3 py-2 border border-neutral-300 rounded-md">
          <option>All Status</option>
          <option>Verified</option>
          <option>Pending</option>
        </select>

        <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
          Export
        </button>
      </div>
    </div>
  </div>

  {/* Table */}
  <table className="w-full">
    <thead className="bg-neutral-50 border-b border-neutral-200">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Date
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-neutral-200">
      <tr className="hover:bg-neutral-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
              AH
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-900">
                Ahmed Hassan
              </div>
              <div className="text-sm text-neutral-500">
                ahmed@example.com
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2.5 py-0.5 bg-success-100 text-success-700 text-xs font-medium rounded-full">
            Verified
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
          Jan 15, 2026
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            View
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  {/* Pagination */}
  <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
    <div className="text-sm text-neutral-600">
      Showing 1 to 25 of 100 results
    </div>
    <div className="flex items-center gap-2">
      <button className="px-3 py-1 border border-neutral-300 rounded-md hover:bg-neutral-50 disabled:opacity-50" disabled>
        Previous
      </button>
      <button className="px-3 py-1 bg-primary-600 text-white rounded-md">1</button>
      <button className="px-3 py-1 border border-neutral-300 rounded-md hover:bg-neutral-50">2</button>
      <button className="px-3 py-1 border border-neutral-300 rounded-md hover:bg-neutral-50">3</button>
      <button className="px-3 py-1 border border-neutral-300 rounded-md hover:bg-neutral-50">
        Next
      </button>
    </div>
  </div>
</div>
```

### 5. Input Fields

```tsx
{/* Text Input */}
<div className="space-y-1.5">
  <label className="block text-sm font-medium text-neutral-700">
    Email Address
  </label>
  <input
    type="email"
    placeholder="Enter email"
    className="
      w-full px-3 py-2
      border border-neutral-300 rounded-md
      text-base text-neutral-900
      placeholder:text-neutral-400
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
      disabled:bg-neutral-100 disabled:cursor-not-allowed
    "
  />
  <p className="text-xs text-neutral-500">
    We'll never share your email with anyone else.
  </p>
</div>

{/* Input with Icon */}
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
  <input
    type="text"
    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md"
    placeholder="Search..."
  />
</div>

{/* Input with Error */}
<div className="space-y-1.5">
  <label className="block text-sm font-medium text-neutral-700">
    Username
  </label>
  <input
    type="text"
    className="
      w-full px-3 py-2
      border-2 border-error-500 rounded-md
      focus:outline-none focus:ring-2 focus:ring-error-500
    "
  />
  <p className="flex items-center gap-1 text-xs text-error-600">
    <AlertCircle className="w-3.5 h-3.5" />
    Username is already taken
  </p>
</div>
```

### 6. Modals

```tsx
{/* Modal Overlay */}
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

{/* Modal Container */}
<div className="fixed inset-0 flex items-center justify-center p-4 z-50">
  <div className="
    bg-white
    rounded-xl
    shadow-xl
    max-w-2xl
    w-full
    max-h-[90vh]
    overflow-hidden
    flex flex-col
  ">
    {/* Modal Header */}
    <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
      <h3 className="text-xl font-semibold text-neutral-900">
        Confirm Action
      </h3>
      <button className="text-neutral-400 hover:text-neutral-600">
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Modal Body */}
    <div className="px-6 py-4 overflow-y-auto flex-1">
      <p className="text-base text-neutral-600">
        Are you sure you want to proceed with this action?
      </p>
    </div>

    {/* Modal Footer */}
    <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-end gap-3">
      <button className="px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### 7. Alerts / Notifications

```tsx
{/* Success Alert */}
<div className="
  flex items-start gap-3
  p-4
  bg-success-50 border border-success-200
  rounded-lg
">
  <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-medium text-success-900 mb-1">
      User Verified Successfully
    </h4>
    <p className="text-sm text-success-700">
      Ahmed Hassan has been verified and can now access the platform.
    </p>
  </div>
  <button className="text-success-600 hover:text-success-700">
    <X className="w-4 h-4" />
  </button>
</div>

{/* Error Alert */}
<div className="
  flex items-start gap-3
  p-4
  bg-error-50 border border-error-200
  rounded-lg
">
  <AlertCircle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-medium text-error-900 mb-1">
      Payment Failed
    </h4>
    <p className="text-sm text-error-700">
      The payout to influencer #1234 could not be processed.
    </p>
  </div>
</div>

{/* Warning Alert */}
<div className="
  flex items-start gap-3
  p-4
  bg-warning-50 border border-warning-200
  rounded-lg
">
  <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <h4 className="text-sm font-medium text-warning-900 mb-1">
      Verification Backlog
    </h4>
    <p className="text-sm text-warning-700">
      12 users have been waiting for verification for more than 48 hours.
    </p>
  </div>
</div>

{/* Info Alert */}
<div className="
  flex items-start gap-3
  p-4
  bg-info-50 border border-info-200
  rounded-lg
">
  <Info className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
  <div className="flex-1">
    <p className="text-sm text-info-700">
      System maintenance scheduled for tonight at 2 AM.
    </p>
  </div>
</div>
```

### 8. Tabs

```tsx
<div className="border-b border-neutral-200">
  <nav className="flex space-x-8">
    {/* Active Tab */}
    <button className="
      px-1 py-4
      border-b-2 border-primary-600
      text-sm font-medium text-primary-600
    ">
      User Information
    </button>

    {/* Inactive Tab */}
    <button className="
      px-1 py-4
      border-b-2 border-transparent
      text-sm font-medium text-neutral-600
      hover:text-neutral-900 hover:border-neutral-300
      transition-colors
    ">
      Campaigns
    </button>

    <button className="
      px-1 py-4
      border-b-2 border-transparent
      text-sm font-medium text-neutral-600
      hover:text-neutral-900 hover:border-neutral-300
    ">
      Financial
    </button>
  </nav>
</div>
```

### 9. Dropdowns

```tsx
<div className="relative">
  {/* Dropdown Trigger */}
  <button className="
    flex items-center gap-2
    px-4 py-2
    border border-neutral-300 rounded-md
    bg-white
    hover:bg-neutral-50
  ">
    <span>Filter by Status</span>
    <ChevronDown className="w-4 h-4" />
  </button>

  {/* Dropdown Menu */}
  <div className="
    absolute top-full left-0 mt-2
    w-56
    bg-white
    border border-neutral-200
    rounded-lg
    shadow-md
    py-1
    z-10
  ">
    <button className="
      w-full px-4 py-2
      text-left text-sm
      hover:bg-neutral-50
      flex items-center gap-2
    ">
      <Check className="w-4 h-4 text-primary-600" />
      All Status
    </button>
    <button className="
      w-full px-4 py-2
      text-left text-sm
      hover:bg-neutral-50
    ">
      Verified Only
    </button>
    <button className="
      w-full px-4 py-2
      text-left text-sm
      hover:bg-neutral-50
    ">
      Pending Only
    </button>
    <div className="my-1 border-t border-neutral-200" />
    <button className="
      w-full px-4 py-2
      text-left text-sm text-error-600
      hover:bg-error-50
    ">
      Clear Filter
    </button>
  </div>
</div>
```

### 10. Loading States

```tsx
{/* Spinner */}
<div className="inline-block">
  <div className="
    w-8 h-8
    border-4 border-neutral-200 border-t-primary-600
    rounded-full
    animate-spin
  " />
</div>

{/* Skeleton Loader for Cards */}
<div className="bg-white border border-neutral-200 rounded-lg p-6 animate-pulse">
  <div className="w-12 h-12 bg-neutral-200 rounded-full mb-4" />
  <div className="h-8 bg-neutral-200 rounded w-24 mb-2" />
  <div className="h-4 bg-neutral-200 rounded w-32" />
</div>

{/* Skeleton Loader for Table */}
<div className="space-y-3 animate-pulse">
  <div className="h-12 bg-neutral-200 rounded" />
  <div className="h-12 bg-neutral-200 rounded" />
  <div className="h-12 bg-neutral-200 rounded" />
</div>

{/* Loading Overlay */}
<div className="relative">
  {/* Content */}
  <div className="opacity-50 pointer-events-none">
    {/* Your content here */}
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 flex items-center justify-center bg-white/50">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin" />
      <span className="text-sm font-medium text-neutral-600">Loading...</span>
    </div>
  </div>
</div>
```

---

## Icon System

### Icon Library

Using **Lucide React** for consistent, high-quality icons.

```bash
npm install lucide-react
```

### Icon Sizes

```tsx
// Extra Small (12px) - Inline with text
<Icon className="w-3 h-3" />

// Small (16px) - Buttons, badges
<Icon className="w-4 h-4" />

// Base (20px) - Default size
<Icon className="w-5 h-5" />

// Large (24px) - Headers, emphasis
<Icon className="w-6 h-6" />

// Extra Large (32px) - Hero elements
<Icon className="w-8 h-8" />
```

### Common Icons Map

```tsx
import {
  // Navigation
  Home, Users, Briefcase, AlertTriangle, DollarSign,
  CreditCard, Wallet, BarChart3, Menu, X,

  // Actions
  Plus, Edit, Trash2, Eye, EyeOff, Download, Upload,
  Send, Save, Check, ChevronDown, ChevronRight,
  ChevronLeft, ChevronUp, MoreVertical, MoreHorizontal,

  // Status
  CheckCircle, XCircle, AlertCircle, Clock, Info,
  TrendingUp, TrendingDown, Minus, Ban,

  // User & Auth
  User, UserPlus, UserCheck, UserX, LogIn, LogOut,
  Shield, Lock, Unlock, Key,

  // Communication
  Mail, MessageSquare, Bell, BellOff, Phone,

  // Files & Documents
  File, FileText, Folder, Image, Paperclip,

  // Search & Filter
  Search, Filter, SlidersHorizontal,

  // Calendar & Time
  Calendar, CalendarDays, Clock,

  // Finance
  DollarSign, TrendingUp, TrendingDown, Wallet,
  CreditCard, Banknote,

  // Other
  Settings, HelpCircle, ExternalLink, Copy, RefreshCw,
} from 'lucide-react'
```

### Icon Usage Examples

```tsx
// With Text
<button className="flex items-center gap-2">
  <Plus className="w-4 h-4" />
  <span>Add User</span>
</button>

// Icon Button
<button className="p-2 hover:bg-neutral-100 rounded-md">
  <Edit className="w-5 h-5 text-neutral-600" />
</button>

// Colored Icons for Status
<CheckCircle className="w-5 h-5 text-success-600" />
<XCircle className="w-5 h-5 text-error-600" />
<Clock className="w-5 h-5 text-warning-600" />
<Info className="w-5 h-5 text-info-600" />
```

---

## Navigation Patterns

### Sidebar Navigation

**Layout:**
- Fixed sidebar on the left (256px width)
- Collapsible on mobile
- Icons + labels for clarity
- Active state highlighting
- Grouped by category

```tsx
<aside className="w-64 bg-white border-r border-neutral-200 h-screen sticky top-0">
  {/* Logo */}
  <div className="h-16 px-6 flex items-center border-b border-neutral-200">
    <h1 className="text-xl font-bold text-primary-600">JUSOR Admin</h1>
  </div>

  {/* Navigation */}
  <nav className="p-4 space-y-1">
    {/* Active Item */}
    <a href="/dashboard" className="
      flex items-center gap-3
      px-4 py-2.5
      bg-primary-50 text-primary-700
      rounded-lg
      font-medium
    ">
      <Home className="w-5 h-5" />
      Dashboard
    </a>

    {/* Inactive Items */}
    <a href="/users" className="
      flex items-center gap-3
      px-4 py-2.5
      text-neutral-600
      hover:bg-neutral-50
      rounded-lg
      transition-colors
    ">
      <Users className="w-5 h-5" />
      Users
    </a>

    <a href="/campaigns" className="
      flex items-center gap-3
      px-4 py-2.5
      text-neutral-600
      hover:bg-neutral-50
      rounded-lg
    ">
      <Briefcase className="w-5 h-5" />
      Campaigns
    </a>

    {/* With Badge */}
    <a href="/disputes" className="
      flex items-center gap-3
      px-4 py-2.5
      text-neutral-600
      hover:bg-neutral-50
      rounded-lg
    ">
      <AlertTriangle className="w-5 h-5" />
      <span className="flex-1">Disputes</span>
      <span className="px-2 py-0.5 bg-error-100 text-error-700 text-xs font-medium rounded-full">
        3
      </span>
    </a>

    {/* Section Divider */}
    <div className="pt-4 pb-2">
      <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        Financial
      </h3>
    </div>

    <a href="/escrow" className="
      flex items-center gap-3
      px-4 py-2.5
      text-neutral-600
      hover:bg-neutral-50
      rounded-lg
    ">
      <DollarSign className="w-5 h-5" />
      Escrow
    </a>

    <a href="/transactions" className="
      flex items-center gap-3
      px-4 py-2.5
      text-neutral-600
      hover:bg-neutral-50
      rounded-lg
    ">
      <CreditCard className="w-5 h-5" />
      Transactions
    </a>
  </nav>
</aside>
```

### Top Navigation Bar

```tsx
<header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-30">
  {/* Left: Breadcrumbs or Page Title */}
  <div className="flex items-center gap-3 text-sm">
    <a href="/users" className="text-neutral-600 hover:text-neutral-900">Users</a>
    <ChevronRight className="w-4 h-4 text-neutral-400" />
    <span className="text-neutral-900 font-medium">User Details</span>
  </div>

  {/* Right: User Actions */}
  <div className="flex items-center gap-4">
    {/* Notifications */}
    <button className="relative p-2 hover:bg-neutral-100 rounded-md">
      <Bell className="w-5 h-5 text-neutral-600" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full" />
    </button>

    {/* Admin User Dropdown */}
    <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
      <div className="text-right">
        <div className="text-sm font-medium text-neutral-900">Admin User</div>
        <div className="text-xs text-neutral-500">Super Admin</div>
      </div>
      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
        AU
      </div>
    </div>
  </div>
</header>
```

### Breadcrumbs

```tsx
<nav className="flex items-center gap-2 text-sm mb-6">
  <a href="/dashboard" className="text-neutral-600 hover:text-neutral-900">
    Dashboard
  </a>
  <ChevronRight className="w-4 h-4 text-neutral-400" />
  <a href="/users" className="text-neutral-600 hover:text-neutral-900">
    Users
  </a>
  <ChevronRight className="w-4 h-4 text-neutral-400" />
  <span className="text-neutral-900 font-medium">
    Ahmed Hassan
  </span>
</nav>
```

---

## Data Visualization

### Charts Library

Using **Recharts** for React-friendly data visualization.

```bash
npm install recharts
```

### Chart Types

**1. Line Chart - Revenue Over Time**
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={revenueData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
    <XAxis
      dataKey="month"
      stroke="#737373"
      style={{ fontSize: '12px' }}
    />
    <YAxis
      stroke="#737373"
      style={{ fontSize: '12px' }}
    />
    <Tooltip
      contentStyle={{
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
      }}
    />
    <Line
      type="monotone"
      dataKey="revenue"
      stroke="#0ea5e9"
      strokeWidth={2}
      dot={{ fill: '#0ea5e9', r: 4 }}
    />
  </LineChart>
</ResponsiveContainer>
```

**2. Bar Chart - Transaction Volume**
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={transactionData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
    <XAxis dataKey="day" stroke="#737373" />
    <YAxis stroke="#737373" />
    <Tooltip />
    <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

**3. Pie Chart - Escrow Status Distribution**
```tsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={escrowData}
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#0ea5e9"
      dataKey="value"
      label
    >
      {escrowData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
```

### Color Palette for Charts

```tsx
const CHART_COLORS = {
  primary: '#0ea5e9',    // Primary blue
  success: '#22c55e',    // Green
  warning: '#f59e0b',    // Orange
  error: '#ef4444',      // Red
  info: '#3b82f6',       // Blue
  neutral: '#737373',    // Gray
}

// For multi-series charts
const SERIES_COLORS = [
  '#0ea5e9', // Primary
  '#22c55e', // Success
  '#f59e0b', // Warning
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#14b8a6', // Teal
]
```

---

## User Flows

### Flow 1: User Verification Process

```
┌─────────────────────────────────────────────────────────────┐
│ ADMIN: Verification Queue Page                              │
│                                                              │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ [Search] [Filter: All] [Sort: Oldest First]  [25▼] │    │
│ └─────────────────────────────────────────────────────┘    │
│                                                              │
│ Table:                                                       │
│ Name           | Type       | Status  | Waiting | Actions   │
│ Ahmed Hassan   | Influencer | Pending | 1d 3h   | [Review]  │ ← Click
│ Sara Ali       | Business   | Pending | 2d 5h   | [Review]  │
│ ...                                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ MODAL: Review User - Ahmed Hassan                           │
│                                                              │
│ [User Info Tab] [Verification Tab] [Documents Tab]          │
│                                                              │
│ Nafath Verification: ✅ Verified                            │
│ - Name: Ahmed Hassan                                        │
│ - National ID: ********1234                                 │
│ - Age: 28 ✓                                                 │
│ - Nationality: Saudi ✓                                      │
│                                                              │
│ Social Media Accounts:                                      │
│ ├─ Instagram: @ahmedhassan (125K followers) ✅              │
│ ├─ Twitter: @ahmed_h (45K followers) ✅                     │
│ └─ TikTok: @ahmedhassanvlogs (200K followers) ✅            │
│                                                              │
│ Portfolio: 8 samples uploaded                               │
│ [View Portfolio →]                                          │
│                                                              │
│ Admin Decision:                                             │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ [✅ Approve] [❌ Reject] [⏸️ Request More Info]     │    │
│ └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↓ Click Approve
┌─────────────────────────────────────────────────────────────┐
│ SUCCESS NOTIFICATION                                         │
│ ✅ Ahmed Hassan has been verified successfully             │
│    User can now access the platform.                        │
└─────────────────────────────────────────────────────────────┘
```

### Flow 2: Dispute Resolution

```
┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD: Alerts                                            │
│ ⚠️ 3 New Disputes Requiring Review                          │
│ [View Disputes →]                                           │ ← Click
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ DISPUTES PAGE                                                │
│ Status: [New ●] [Under Review] [Resolved]                   │
│                                                              │
│ Dispute #D-1234                                             │
│ Campaign: Summer Fashion Campaign                           │
│ Filed by: Business (Fashion Brand Co.)                      │
│ Claim: Content not posted                                   │
│ Amount: 10,000 SAR                                          │
│ Opened: 2 days ago                                          │
│ [Review Dispute →]                                          │ ← Click
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ DISPUTE DETAILS PAGE                                         │
│                                                              │
│ [Overview] [Business Evidence] [Influencer Evidence]        │
│                                                              │
│ Business Claim:                                             │
│ "Influencer did not post content by deadline (Jan 15).      │
│  We request full refund."                                   │
│                                                              │
│ Evidence:                                                   │
│ - Screenshot of campaign requirements                       │
│ - Communication logs showing deadline reminder              │
│ - Proof that no content was posted on influencer account    │
│                                                              │
│ [View Influencer Evidence →]                                │ ← Switch tab
│                                                              │
│ Influencer Response:                                        │
│ "I posted the content on Jan 14, but deleted it after      │
│  business provided incorrect product information."          │
│                                                              │
│ Evidence:                                                   │
│ - Screenshot of original post (before deletion)             │
│ - Communication showing business error                      │
│ - Timeline of events                                        │
│                                                              │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ ADMIN DECISION PANEL                                 │    │
│ │                                                       │    │
│ │ Decision:                                            │    │
│ │ ● Full Refund to Business                           │    │
│ │ ○ Full Payment to Influencer                        │    │
│ │ ○ Partial Split (specify below)                     │    │
│ │                                                       │    │
│ │ Rationale (required):                                │    │
│ │ ┌─────────────────────────────────────────────────┐ │    │
│ │ │ After reviewing evidence from both parties,     │ │    │
│ │ │ the influencer did post content before deadline │ │    │
│ │ │ but deleted it due to incorrect product info... │ │    │
│ │ └─────────────────────────────────────────────────┘ │    │
│ │                                                       │    │
│ │ [Make Decision]                                      │    │
│ └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↓ Click Make Decision
┌─────────────────────────────────────────────────────────────┐
│ CONFIRMATION MODAL                                           │
│ ⚠️ Confirm Decision                                         │
│                                                              │
│ You are about to award full payment to the influencer.     │
│ This will:                                                  │
│ - Release 9,700 SAR to influencer                          │
│ - Mark dispute as resolved                                 │
│ - Notify both parties                                      │
│                                                              │
│ Both parties can appeal within 5 days.                     │
│                                                              │
│ [Cancel] [Confirm Decision]                                │
└─────────────────────────────────────────────────────────────┘
```

### Flow 3: Escrow Release

```
┌─────────────────────────────────────────────────────────────┐
│ ESCROW MONITORING PAGE                                       │
│                                                              │
│ Filters: [Status: Pending Release ▼]                        │
│                                                              │
│ Transaction #E-5678                                         │
│ Campaign: Tech Review Video                                 │
│ Business: TechGadgets Inc.                                  │
│ Influencer: Mohammed Ali                                    │
│ Amount: 15,000 SAR (Commission: 450 SAR)                    │
│ Status: 🟢 Pending Release (Content approved 2 hours ago)   │
│ [Release Payment →]                                         │ ← Click
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ MODAL: Confirm Escrow Release                               │
│                                                              │
│ Transaction Details:                                        │
│ Campaign: Tech Review Video (#C-9012)                       │
│ Business: TechGadgets Inc.                                  │
│ Influencer: Mohammed Ali (@mohammed_tech)                   │
│                                                              │
│ Financial Breakdown:                                        │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ Campaign Budget:         15,000 SAR                 │    │
│ │ Platform Commission (3%):   450 SAR                 │    │
│ │ ────────────────────────────────────                │    │
│ │ To Influencer:           14,550 SAR                 │    │
│ │ To JUSOR Platform:          450 SAR                 │    │
│ └─────────────────────────────────────────────────────┘    │
│                                                              │
│ This action will:                                           │
│ ✓ Credit influencer wallet with 14,550 SAR                 │
│ ✓ Record commission of 450 SAR                             │
│ ✓ Update ZATCA invoice                                     │
│ ✓ Notify both parties                                      │
│                                                              │
│ Requires 2FA verification:                                 │
│ [Enter verification code]                                  │
│                                                              │
│ [Cancel] [Release Payment]                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓ Click Release
┌─────────────────────────────────────────────────────────────┐
│ SUCCESS NOTIFICATION                                         │
│ ✅ Payment Released Successfully                            │
│    14,550 SAR has been credited to Mohammed Ali's wallet   │
│    Transaction ID: T-123456                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

### Responsive Patterns

**1. Sidebar Navigation**
- **Desktop (≥1024px):** Fixed sidebar, always visible
- **Tablet (768px-1023px):** Collapsible sidebar, overlay when open
- **Mobile (<768px):** Hidden by default, full-screen overlay when opened

**2. Data Tables**
- **Desktop:** Full table with all columns
- **Tablet:** Hide less important columns, show on row expansion
- **Mobile:** Card-based layout instead of table

**3. Metrics Dashboard**
- **Desktop:** 4 cards per row
- **Tablet:** 2 cards per row
- **Mobile:** 1 card per row (stacked)

**4. Forms**
- **Desktop:** Two-column layout for related fields
- **Tablet/Mobile:** Single column, full width

### Mobile-Specific Patterns

**Bottom Navigation (Mobile Alternative)**
```tsx
{/* Only visible on mobile */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-2 safe-area-inset-bottom">
  <div className="flex items-center justify-around">
    <button className="flex flex-col items-center gap-1 p-2">
      <Home className="w-6 h-6 text-primary-600" />
      <span className="text-xs text-primary-600">Home</span>
    </button>
    <button className="flex flex-col items-center gap-1 p-2">
      <Users className="w-6 h-6 text-neutral-600" />
      <span className="text-xs text-neutral-600">Users</span>
    </button>
    <button className="flex flex-col items-center gap-1 p-2">
      <Bell className="w-6 h-6 text-neutral-600" />
      <span className="text-xs text-neutral-600">Alerts</span>
    </button>
    <button className="flex flex-col items-center gap-1 p-2">
      <Settings className="w-6 h-6 text-neutral-600" />
      <span className="text-xs text-neutral-600">More</span>
    </button>
  </div>
</nav>
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**1. Color Contrast**
- Text on background: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

**2. Keyboard Navigation**
- All interactive elements accessible via Tab
- Logical tab order
- Visible focus indicators
- Escape key closes modals/dropdowns

**3. Screen Reader Support**
- Semantic HTML (`<nav>`, `<main>`, `<aside>`, `<button>`, etc.)
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content
- Alt text for images

**4. Forms**
- Proper label associations
- Error messages linked to fields
- Required field indicators
- Clear validation feedback

### Accessibility Examples

```tsx
{/* Icon Button with ARIA Label */}
<button
  aria-label="Edit user profile"
  className="p-2 hover:bg-neutral-100 rounded-md"
>
  <Edit className="w-5 h-5" />
</button>

{/* Link with Descriptive Text */}
<a href="/users/123">
  View details
  <span className="sr-only">for user Ahmed Hassan</span>
</a>

{/* Form with Proper Labels */}
<div>
  <label htmlFor="email" className="block text-sm font-medium mb-1">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    aria-describedby="email-help"
    className="..."
  />
  <p id="email-help" className="text-xs text-neutral-500">
    We'll never share your email.
  </p>
</div>

{/* Live Region for Notifications */}
<div
  role="alert"
  aria-live="polite"
  className="..."
>
  User verified successfully
</div>
```

### Focus Indicators

```css
/* Visible focus ring */
.focus-visible:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Or using Tailwind */
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

---

## Dark Mode

### Strategy

**Phase 1 (Current):** Light mode only
**Phase 2 (Future):** Add dark mode support

### Dark Mode Color Palette (Future)

```css
/* Dark Mode Colors */
.dark {
  /* Backgrounds */
  --bg-primary: #0f172a;      /* Slate 900 */
  --bg-secondary: #1e293b;    /* Slate 800 */
  --bg-tertiary: #334155;     /* Slate 700 */

  /* Text */
  --text-primary: #f1f5f9;    /* Slate 100 */
  --text-secondary: #cbd5e1;  /* Slate 300 */
  --text-tertiary: #94a3b8;   /* Slate 400 */

  /* Borders */
  --border-color: #334155;    /* Slate 700 */

  /* Overlays */
  --overlay: rgba(0, 0, 0, 0.8);
}
```

### Implementation Pattern

```tsx
// Using Tailwind dark mode
<div className="bg-white dark:bg-slate-900 text-neutral-900 dark:text-slate-100">
  {/* Content */}
</div>
```

---

## Animation & Transitions

### Timing Functions

```css
/* Easing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Duration */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Common Animations

**1. Fade In**
```tsx
<div className="animate-in fade-in duration-200">
  Content
</div>
```

**2. Slide In from Top**
```tsx
<div className="animate-in slide-in-from-top-2 duration-300">
  Notification
</div>
```

**3. Scale In (Modal)**
```tsx
<div className="animate-in zoom-in-95 duration-200">
  Modal content
</div>
```

**4. Hover Transitions**
```tsx
<button className="transition-colors duration-200 hover:bg-primary-700">
  Hover me
</button>

<div className="transition-shadow duration-200 hover:shadow-lg">
  Card
</div>
```

**5. Loading Spinner**
```tsx
<div className="animate-spin rounded-full h-8 w-8 border-4 border-neutral-200 border-t-primary-600" />
```

### Animation Best Practices

**Do's:**
- ✅ Keep animations subtle and fast (150-300ms)
- ✅ Use animations to guide user attention
- ✅ Respect `prefers-reduced-motion` for accessibility
- ✅ Animate opacity and transform (GPU-accelerated)

**Don'ts:**
- ❌ Avoid animating layout properties (width, height) - expensive
- ❌ Don't overuse animations - can be distracting
- ❌ Don't make critical interactions dependent on animation completion

### Reduced Motion

```tsx
{/* Respect user preference */}
<div className="
  transition-all duration-200
  motion-reduce:transition-none
">
  Content
</div>
```

---

## Design System Maintenance

### Versioning

**Current Version:** 1.0.0

**Changelog:**
- v1.0.0 (Jan 2026): Initial design system

### Future Enhancements

**Planned:**
1. Dark mode support (Q2 2026)
2. Advanced data visualizations (charts for complex analytics)
3. Mobile-specific optimizations
4. Design tokens export for other platforms
5. Component library documentation site
6. Figma design kit integration

### Contributing to Design System

**Process:**
1. Propose new component or pattern
2. Review with design team
3. Prototype and test
4. Document thoroughly
5. Add to component library
6. Update this document

---

**Document Version:** 1.0.0
**Last Updated:** January 24, 2026
**Maintained By:** JUSOR UI/UX Team

**Related Documentation:**
- See `SYSTEM_DESIGN.md` for technical architecture
- See `BUSINESS_AND_ADMIN_GUIDE.md` for business context and admin workflows
