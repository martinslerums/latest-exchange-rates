import useExchangeRateFilters from "@/hooks/useExchangeRateFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TableItemSelectProps = {
  className?: string
}

const TableItemSelect = ({className}: TableItemSelectProps) => {
  const { limit, setFilters } = useExchangeRateFilters();

  const handleChange = (newLimit: string) => {
    setFilters({ limit: newLimit });
  };

  return (
    <Select value={limit} onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="5" />
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="15">15</SelectItem>
        <SelectItem value="20">20</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TableItemSelect;
