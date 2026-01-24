/**
 * useEscrow Hook
 * Custom hook for fetching escrow data from API
 */

'use client';

import { useState, useEffect } from 'react';
import type { EscrowTransaction, EscrowSummary, EscrowFilters } from '@/lib/types/escrow.types';
import type { ApiResponse } from '@/lib/types/api.types';

/**
 * Hook to fetch escrow transactions list
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
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters?.dateTo) params.append('dateTo', filters.dateTo);

        const response = await fetch(`/api/escrow?${params.toString()}`);
        const result: ApiResponse<EscrowTransaction[]> = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch transactions');
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
        setError(null);

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
 * Hook to fetch single escrow transaction
 */
export function useEscrowTransaction(id: string) {
  const [data, setData] = useState<{ transaction: EscrowTransaction; auditLogs: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/escrow/${id}`);
        const result: ApiResponse<{ transaction: EscrowTransaction; auditLogs: any[] }> = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch transaction');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook to update escrow transaction (mark as transferred/refunded)
 */
export function useUpdateEscrow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markAsTransferred = async (id: string, bankReference: string, notes?: string) => {
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

  const markAsRefunded = async (id: string, bankReference: string, notes?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/escrow/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'refund',
          data: { bankReference, notes },
        }),
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        setError(result.error || 'Failed to mark as refunded');
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

  return { markAsTransferred, markAsRefunded, loading, error };
}
