import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurrencyFilters, ExchangeRate, Pagination } from "@/types/typings";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import TablePagination from "./TablePagination";
import useExchangeRateFilters from "@/hooks/useExchangeRateFilters";

type CurrencyTableProps = {
  data: ExchangeRate[];
  currency: CurrencyFilters["target_currency"];
  pagination: Pagination;
};

const CurrencyTable = ({ data, currency, pagination }: CurrencyTableProps) => {
  const { order, setFilters } = useExchangeRateFilters();

  const handleSortChange = () => {
    const sortOrder = order === "ASC" ? "DESC" : "ASC";
    setFilters({ order: sortOrder });
  };

  const columns: ColumnDef<ExchangeRate>[] = [
    {
      accessorKey: "date",
      header: () => {
        return (
          <Button variant="ghost" onClick={handleSortChange}>
            Date
            {order === "ASC" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "exchange_rate",
      header: `EUR to ${currency}`,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination.totalPages > 1 && (
        <TablePagination totalPages={pagination.totalPages} />
      )}
    </>
  );
};

export default CurrencyTable;
