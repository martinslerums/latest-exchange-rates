import useExchangeRateFilters from "./hooks/useExchangeRateFilters";
import useGetExchangeRates from "./hooks/useGetExchangeRates";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyFilter from "./components/CurrencyFilter";
import CurrencyStatistics from "./components/CurrencyStatistics";
import { Statistics } from "./types/typings";

function App() {
  const { target_currency } = useExchangeRateFilters();
  const { data, isLoading, isError } = useGetExchangeRates({ target_currency });

  const title = `1 EUR to ${target_currency} Exchange Rate`;

  const statistics: Statistics = {
    highest: data?.highest ?? 0,
    lowest: data?.lowest ?? 0,
    average: data?.average ?? 0,
    date: data?.results[0]?.createdAt ?? "",
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
            Something went wrong. Could not get data for currency:{" "}
            {target_currency}
          </p>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <h1 className="text-3xl font-bold p-2 text-center">{title}</h1>
          <div className="max-w-7xl mx-auto flex gap-10 mt-10">
            <div className="flex-1">
              {data && (
                <CurrencyTable data={data.results} currency={target_currency} />
              )}
            </div>
            <div className="space-y-2">
              <CurrencyFilter />
              <CurrencyStatistics statistics={statistics} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
