import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useExchangeRateFilters from "@/hooks/useExchangeRateFilters";


const CurrencyFilter = () => {
  const { target_currency, setFilters } = useExchangeRateFilters();

  const handleChange = (newCurrency: "USD" | "AUD" | "GBP") => {
    setFilters({ target_currency: newCurrency });
  };

  return (
    <Select value={target_currency} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">American Dollar (USD)</SelectItem>
        <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencyFilter;
