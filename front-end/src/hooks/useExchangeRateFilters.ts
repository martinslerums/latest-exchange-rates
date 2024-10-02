import { CurrencyFilters } from "@/types/typings";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useExchangeRateFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: CurrencyFilters = {
    target_currency: searchParams.get("target_currency") as CurrencyFilters['target_currency'],
    page: searchParams.get("page") as CurrencyFilters['page'] || undefined,
    limit: searchParams.get("limit") as CurrencyFilters['limit'] || undefined,
    order: searchParams.get('order') as CurrencyFilters['order']
  };

  const setFilters = useCallback(
    (filters: Partial<CurrencyFilters>) => {
      setSearchParams((params) => {
        Object.entries(filters).forEach(([key, value]) => {
          if ((key === 'page' || key === 'limit') && !isNaN(Number(value))) {
            params.set(key, String(value));
          }
          
          if (key !== 'page' && key !== 'limit') {
            params.set(key, String(value));
          }
        });
        return params;
      });
    },
    [setSearchParams]
  );

  return { ...filters, setFilters };
};

export default useExchangeRateFilters;
