import { CurrencyFilters } from "@/types/typings";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useExchangeRateFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentTargetCurrency = searchParams.get("target_currency");
    if (!currentTargetCurrency) {
      setSearchParams({ target_currency: "USD" });
    }
  }, [searchParams, setSearchParams]);

  const filters: CurrencyFilters = {
    target_currency: searchParams.get("target_currency") as CurrencyFilters['target_currency']
  };

  const setFilters = useCallback(
    (filters: Partial<CurrencyFilters>) => {
      setSearchParams((params) => {
        Object.entries(filters).forEach(([key, value]) => {
          params.set(key, String(value));
        });
        
        return params;
      });
    },
    [setSearchParams]
  );

  return { ...filters, setFilters};
};

export default useExchangeRateFilters;
