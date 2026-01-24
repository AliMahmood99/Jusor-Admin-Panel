/**
 * Financial Calculations Utilities
 * Helper functions for calculating commissions, VAT, and totals
 */

/**
 * Calculate financial breakdown for a campaign
 *
 * IMPORTANT: Influencer receives the FULL agreed amount
 * Commission is ADDED on top, not deducted
 *
 * Example:
 * Influencer wants: 6,000 SAR (net amount they receive)
 *
 * Calculation:
 * - Net to Influencer: 6,000 SAR (100%)
 * - Commission (3%): 6,000 ÷ 97 × 3 = 185.57 SAR
 * - Amount before commission: 6,185.57 SAR
 * - VAT on Commission (15%): 185.57 × 15% = 27.84 SAR
 * - Total Paid by Business: 6,213.41 SAR
 *
 * Formula:
 * - netToInfluencer = agreed amount (e.g., 6000)
 * - commission = netToInfluencer ÷ 97 × 3
 * - amountBeforeCommission = netToInfluencer + commission
 * - vat = commission × 0.15
 * - totalPaid = amountBeforeCommission + vat
 */
export interface FinancialBreakdown {
  netToInfluencer: number;       // Amount influencer receives (agreed amount)
  commission: number;            // 3% platform commission (added on top)
  commissionRate: number;        // 0.03
  vat: number;                   // 15% VAT on commission
  vatRate: number;               // 0.15
  amountBeforeCommission: number; // netToInfluencer + commission
  totalPaid: number;             // Total business pays (amountBeforeCommission + vat)
  platformRevenue: number;       // commission (before VAT to government)
}

/**
 * Calculate complete financial breakdown from net influencer amount
 * @param netToInfluencer - The amount influencer will receive (agreed campaign amount)
 */
export function calculateFinancialBreakdown(netToInfluencer: number): FinancialBreakdown {
  const commissionRate = 0.03;  // 3%
  const vatRate = 0.15;          // 15%

  // Commission is 3% of the total, so if influencer gets 97%, commission is 3%
  // Formula: commission = netToInfluencer / 97 * 3
  const commission = Math.round((netToInfluencer / 97 * 3) * 100) / 100;

  const amountBeforeCommission = Math.round((netToInfluencer + commission) * 100) / 100;
  const vat = Math.round(commission * vatRate * 100) / 100;
  const totalPaid = Math.round((amountBeforeCommission + vat) * 100) / 100;

  return {
    netToInfluencer,
    commission,
    commissionRate,
    vat,
    vatRate,
    amountBeforeCommission,
    totalPaid,
    platformRevenue: commission,
  };
}

/**
 * Format currency in SAR
 */
export function formatSAR(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format currency number only (no symbol)
 */
export function formatCurrencyNumber(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(amount: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((amount / total) * 100 * 100) / 100;
}

/**
 * Example usage and test cases
 */
export const CALCULATION_EXAMPLES = {
  example1: {
    description: 'Influencer wants 6,000 SAR',
    input: 6000,
    expected: {
      netToInfluencer: 6000,
      commission: 185.57,              // 6000 ÷ 97 × 3
      vat: 27.84,                      // 185.57 × 15%
      amountBeforeCommission: 6185.57, // 6000 + 185.57
      totalPaid: 6213.41,              // 6185.57 + 27.84
      platformRevenue: 185.57,
    }
  },
  example2: {
    description: 'Influencer wants 10,000 SAR',
    input: 10000,
    expected: {
      netToInfluencer: 10000,
      commission: 309.28,              // 10000 ÷ 97 × 3
      vat: 46.39,                      // 309.28 × 15%
      amountBeforeCommission: 10309.28,
      totalPaid: 10355.67,
      platformRevenue: 309.28,
    }
  },
  example3: {
    description: 'Influencer wants 15,000 SAR',
    input: 15000,
    expected: {
      netToInfluencer: 15000,
      commission: 463.92,              // 15000 ÷ 97 × 3
      vat: 69.59,                      // 463.92 × 15%
      amountBeforeCommission: 15463.92,
      totalPaid: 15533.51,
      platformRevenue: 463.92,
    }
  },
};
