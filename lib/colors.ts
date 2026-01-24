/**
 * Centralized Color Mapping
 * Maps semantic color names to Tailwind classes
 * Based on UI/UX Design System
 */

export const colors = {
  // Primary brand color
  primary: {
    50: 'primary-50',
    100: 'primary-100',
    200: 'primary-200',
    300: 'primary-300',
    400: 'primary-400',
    500: 'primary-500',
    600: 'primary-600',   // Main brand color: #0284c7
    700: 'primary-700',
    800: 'primary-800',
    900: 'primary-900',
  },

  // Neutral colors (slate is our standard)
  neutral: {
    50: 'slate-50',
    100: 'slate-100',
    200: 'slate-200',
    300: 'slate-300',
    400: 'slate-400',
    500: 'slate-500',
    600: 'slate-600',
    700: 'slate-700',
    800: 'slate-800',
    900: 'slate-900',
  },

  // Success (green)
  success: {
    50: 'emerald-50',
    100: 'emerald-100',
    500: 'emerald-500',
    600: 'emerald-600',
    700: 'emerald-700',
  },

  // Warning (yellow/amber)
  warning: {
    50: 'amber-50',
    100: 'amber-100',
    500: 'amber-500',
    600: 'amber-600',
    700: 'amber-700',
  },

  // Error (red/rose)
  error: {
    50: 'rose-50',
    100: 'rose-100',
    500: 'rose-500',
    600: 'rose-600',
    700: 'rose-700',
  },

  // Info (blue)
  info: {
    50: 'blue-50',
    100: 'blue-100',
    500: 'blue-500',
    600: 'blue-600',
    700: 'blue-700',
  },
} as const;

/**
 * Status Badge Colors
 * Semantic mapping for status badges
 */
export const statusColors = {
  verified: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  rejected: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  suspended: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
  },
  active: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  completed: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  'in-progress': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  draft: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
  },
  cancelled: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  disputed: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
} as const;

/**
 * Button Colors
 * Semantic mapping for button variants
 */
export const buttonColors = {
  primary: {
    bg: 'bg-primary-600',
    hover: 'hover:bg-primary-700',
    text: 'text-white',
    focus: 'focus:ring-primary-500',
  },
  secondary: {
    bg: 'bg-white',
    hover: 'hover:bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-300 hover:border-slate-400',
    focus: 'focus:ring-primary-500',
  },
  destructive: {
    bg: 'bg-rose-600',
    hover: 'hover:bg-rose-700',
    text: 'text-white',
    focus: 'focus:ring-rose-500',
  },
  ghost: {
    bg: 'bg-transparent',
    hover: 'hover:bg-slate-100',
    text: 'text-slate-700',
    focus: 'focus:ring-primary-500',
  },
  success: {
    bg: 'bg-emerald-600',
    hover: 'hover:bg-emerald-700',
    text: 'text-white',
    focus: 'focus:ring-emerald-500',
  },
} as const;

/**
 * Text Colors
 * Semantic mapping for text colors
 */
export const textColors = {
  primary: 'text-slate-900',
  secondary: 'text-slate-600',
  tertiary: 'text-slate-500',
  disabled: 'text-slate-400',
  error: 'text-rose-600',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
  brand: 'text-primary-600',
} as const;

/**
 * Background Colors
 * Semantic mapping for backgrounds
 */
export const backgroundColors = {
  primary: 'bg-white',
  secondary: 'bg-slate-50',
  tertiary: 'bg-slate-100',
  dark: 'bg-slate-900',
  brand: 'bg-primary-600',
  brandLight: 'bg-primary-50',
} as const;

/**
 * Border Colors
 * Semantic mapping for borders
 */
export const borderColors = {
  default: 'border-slate-200',
  light: 'border-slate-100',
  medium: 'border-slate-300',
  dark: 'border-slate-400',
  error: 'border-rose-500',
  success: 'border-emerald-500',
  warning: 'border-amber-500',
} as const;
