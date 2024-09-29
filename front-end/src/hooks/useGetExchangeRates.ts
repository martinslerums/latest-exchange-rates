import { useQuery } from "@tanstack/react-query";
import { customApi } from "../api/api";
import { APIResponse, CurrencyFilters } from "@/types/typings";

const useGetExchangeRates = (filters?: CurrencyFilters) => {
  const query = new URLSearchParams();

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof CurrencyFilters];
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });
  }

  return useQuery<APIResponse>({
    queryKey: ["rates", filters],
    queryFn: async () => {
      const { data } = await customApi.get<APIResponse>(`/exchange_rates?${query.toString()}`);
      return data;
    },
    enabled: true, 
  });
};

export default useGetExchangeRates;
