/**
 * JUSOR Admin - Design System
 * Centralized design tokens and utilities for consistent UI
 */

// ============================================
// COLOR VARIANTS
// ============================================
// Use these instead of dynamic Tailwind classes like `bg-${color}-100`
// Tailwind requires static class names at build time

export const colorVariants = {
  violet: {
    bg: 'bg-violet-100',
    bgDark: 'bg-violet-500',
    bgGradient: 'bg-gradient-to-br from-violet-500 to-violet-600',
    text: 'text-violet-600',
    textLight: 'text-violet-500',
    textDark: 'text-violet-700',
    border: 'border-violet-200',
    borderDark: 'border-violet-500',
    button: 'bg-violet-600 hover:bg-violet-700',
    shadow: 'shadow-violet-500/25',
    ring: 'ring-violet-500',
  },
  blue: {
    bg: 'bg-blue-100',
    bgDark: 'bg-blue-500',
    bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    text: 'text-blue-600',
    textLight: 'text-blue-500',
    textDark: 'text-blue-700',
    border: 'border-blue-200',
    borderDark: 'border-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700',
    shadow: 'shadow-blue-500/25',
    ring: 'ring-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-100',
    bgDark: 'bg-emerald-500',
    bgGradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    text: 'text-emerald-600',
    textLight: 'text-emerald-500',
    textDark: 'text-emerald-700',
    border: 'border-emerald-200',
    borderDark: 'border-emerald-500',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    shadow: 'shadow-emerald-500/25',
    ring: 'ring-emerald-500',
  },
  amber: {
    bg: 'bg-amber-100',
    bgDark: 'bg-amber-500',
    bgGradient: 'bg-gradient-to-br from-amber-500 to-amber-600',
    text: 'text-amber-600',
    textLight: 'text-amber-500',
    textDark: 'text-amber-700',
    border: 'border-amber-200',
    borderDark: 'border-amber-500',
    button: 'bg-amber-600 hover:bg-amber-700',
    shadow: 'shadow-amber-500/25',
    ring: 'ring-amber-500',
  },
  rose: {
    bg: 'bg-rose-100',
    bgDark: 'bg-rose-500',
    bgGradient: 'bg-gradient-to-br from-rose-500 to-rose-600',
    text: 'text-rose-600',
    textLight: 'text-rose-500',
    textDark: 'text-rose-700',
    border: 'border-rose-200',
    borderDark: 'border-rose-500',
    button: 'bg-rose-600 hover:bg-rose-700',
    shadow: 'shadow-rose-500/25',
    ring: 'ring-rose-500',
  },
  gray: {
    bg: 'bg-gray-100',
    bgDark: 'bg-gray-500',
    bgGradient: 'bg-gradient-to-br from-gray-500 to-gray-600',
    text: 'text-gray-600',
    textLight: 'text-gray-500',
    textDark: 'text-gray-700',
    border: 'border-gray-200',
    borderDark: 'border-gray-500',
    button: 'bg-gray-600 hover:bg-gray-700',
    shadow: 'shadow-gray-500/25',
    ring: 'ring-gray-500',
  },
  slate: {
    bg: 'bg-slate-100',
    bgDark: 'bg-slate-500',
    bgGradient: 'bg-gradient-to-br from-slate-500 to-slate-600',
    text: 'text-slate-600',
    textLight: 'text-slate-500',
    textDark: 'text-slate-700',
    border: 'border-slate-200',
    borderDark: 'border-slate-500',
    button: 'bg-slate-600 hover:bg-slate-700',
    shadow: 'shadow-slate-500/25',
    ring: 'ring-slate-500',
  },
  purple: {
    bg: 'bg-purple-100',
    bgDark: 'bg-purple-500',
    bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    text: 'text-purple-600',
    textLight: 'text-purple-500',
    textDark: 'text-purple-700',
    border: 'border-purple-200',
    borderDark: 'border-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700',
    shadow: 'shadow-purple-500/25',
    ring: 'ring-purple-500',
  },
} as const;

export type ColorVariant = keyof typeof colorVariants;

// ============================================
// SEMANTIC COLORS (for specific use cases)
// ============================================

export const semanticColors = {
  // User Types
  influencer: colorVariants.violet,
  business: colorVariants.blue,
  admin: colorVariants.slate,

  // Status Colors
  success: colorVariants.emerald,
  warning: colorVariants.amber,
  error: colorVariants.rose,
  info: colorVariants.blue,
  neutral: colorVariants.gray,

  // Priority Colors
  critical: colorVariants.rose,
  high: colorVariants.amber,
  medium: colorVariants.blue,
  low: colorVariants.gray,
} as const;

// ============================================
// STAT CARD PRESETS
// ============================================

export const statCardColors = {
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
  },
  violet: {
    iconBg: 'bg-violet-50',
    iconText: 'text-violet-600',
  },
  emerald: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
  },
  amber: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
  },
  rose: {
    iconBg: 'bg-rose-50',
    iconText: 'text-rose-600',
  },
  gray: {
    iconBg: 'bg-gray-50',
    iconText: 'text-gray-600',
  },
} as const;

export type StatCardColor = keyof typeof statCardColors;

// ============================================
// BADGE STYLES
// ============================================

export const badgeStyles = {
  // Status Badges
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  suspended: 'bg-rose-50 text-rose-700 border-rose-200',
  banned: 'bg-slate-100 text-slate-700 border-slate-200',

  // Priority Badges
  critical: 'bg-rose-500 text-white',
  high: 'bg-amber-500 text-white',
  medium: 'bg-blue-500 text-white',
  low: 'bg-gray-400 text-white',

  // Type Badges
  public: 'bg-emerald-50 text-emerald-700',
  invite: 'bg-blue-50 text-blue-700',
  hybrid: 'bg-purple-50 text-purple-700',
} as const;

// ============================================
// AVATAR GRADIENTS
// ============================================

export const avatarGradients = {
  influencer: 'bg-gradient-to-br from-violet-500 to-violet-600 shadow-violet-500/25',
  business: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25',
  admin: 'bg-gradient-to-br from-slate-500 to-slate-600 shadow-slate-500/25',
} as const;

// ============================================
// BUTTON VARIANTS
// ============================================

export const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25',
  secondary: 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25',
  warning: 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/25',
  ghost: 'hover:bg-gray-100 text-gray-600',
  outlineDanger: 'border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700',
  outlineWarning: 'border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700',
} as const;

// ============================================
// TAB STYLES
// ============================================

export const tabStyles = {
  active: 'bg-white text-gray-900 shadow-sm',
  inactive: 'text-gray-500 hover:text-gray-700',
  activeBadge: 'bg-blue-100 text-blue-600',
  inactiveBadge: 'bg-gray-200 text-gray-500',
} as const;

// ============================================
// FORMATTERS
// ============================================

/**
 * Format follower count to human readable format
 * @example formatFollowers(1500000) => "1.5M"
 * @example formatFollowers(15000) => "15K"
 */
export function formatFollowers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}

/**
 * Calculate total followers from SocialFollowers object
 */
export function getTotalFollowers(followers: Record<string, number | undefined> | null | undefined): number {
  if (!followers) return 0;
  return Object.values(followers).reduce<number>((sum, count) => sum + (count || 0), 0);
}

/**
 * Format currency in SAR
 */
export function formatSAR(amount: number): string {
  return `SAR ${amount.toLocaleString()}`;
}

/**
 * Format date to readable format
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options || defaultOptions);
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get color variant for user type
 */
export function getUserTypeColor(type: 'influencer' | 'business' | 'admin'): typeof colorVariants[ColorVariant] {
  return semanticColors[type];
}

/**
 * Get avatar classes for user type
 */
export function getAvatarClasses(type: 'influencer' | 'business' | 'admin'): string {
  return avatarGradients[type];
}

/**
 * Get stat card color classes
 */
export function getStatCardClasses(color: StatCardColor): { iconBg: string; iconText: string } {
  return statCardColors[color];
}
