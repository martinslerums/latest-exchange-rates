import useExchangeRateFilters from "./hooks/useExchangeRateFilters";
import useGetExchangeRates from "./hooks/useGetExchangeRates";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyFilter from "./components/CurrencyFilter";
import CurrencyStatistics from "./components/CurrencyStatistics";
import { Statistics } from "./types/typings";
import TableItemSelect from "./components/TableItemSelect";
import { useEffect } from "react";

function App() {
  const { target_currency, page, limit, order, setFilters } = useExchangeRateFilters();
  const { data, isLoading, isError } = useGetExchangeRates({ target_currency, page, limit, order });

  const title = `1 EUR to ${target_currency} Exchange Rate`;

  useEffect(() => {
    if (!target_currency) {
      setFilters({ target_currency: "USD" });
    }
  }, [target_currency, setFilters]);

  useEffect(() => {
    const currentPage = Number(page);
    const totalPages = data?.pagination?.totalPages;

    if (currentPage < 1 || (totalPages && currentPage > totalPages)) {
      setFilters({ page: "1" });
    }
  }, [page, data, setFilters]);

  const statistics: Statistics = {
    highest: data?.highest ?? 0,
    lowest: data?.lowest ?? 0,
    average: data?.average ?? 0,
    date: data?.lastUpdate ?? "",
  };

  return (
    <main className="container">
      {isLoading && (
        <div className="h-screen flex justify-center items-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      )}
      {isError && (
        <div className="h-screen flex justify-center items-center">
          <p className="text-xl text-red-600 text-center">
            Something went wrong. Could not get data for currency: {target_currency}
          </p>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <h1 className="text-3xl font-bold pt-10 text-center">{title}</h1>
          <div className="max-w-7xl mx-auto flex gap-10 mt-10">
            <div className="flex-1">
              {data && (
                <CurrencyTable
                  data={data.results}
                  currency={target_currency}
                  pagination={data.pagination}
                />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <CurrencyFilter className="flex-2" />
                <TableItemSelect className="max-w-14" />
              </div>
              <CurrencyStatistics statistics={statistics} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
