/**
 * API Response Types
 * Standard response format for all API endpoints
 */

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

// Query parameters for list endpoints
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
