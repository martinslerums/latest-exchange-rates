export type ExchangeRate = {
  id: number;
  currency_id: number;
  date: string;
  exchange_rate: number;
  createdAt: string;
  updatedAt: string;
};

export type APIResponse = {
  results: ExchangeRate[];
  highest: number;
  lowest: number;
  average: number;
  lastUpdate: string;
  pagination: Pagination;
};

export type Statistics = {
  highest: number;
  lowest: number;
  average: number;
  date?: string;
};

export type CurrencyFilters = {
  target_currency: "USD" | "AUD" | "GBP";
  page?: string;
  limit?: string;
  order?: "ASC" | "DESC";
};

export type Pagination = {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};
