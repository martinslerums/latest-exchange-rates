import useExchangeRateFilters from "@/hooks/useExchangeRateFilters";
import { Button } from "./ui/button";

type PaginationProps = {
  totalPages: number;
};

const TablePagination = ({ totalPages }: PaginationProps) => {
  const { page, setFilters } = useExchangeRateFilters();
  
  const pageNum = parseInt(page ?? "1");

  const pagesToShow = [pageNum - 1, pageNum, pageNum + 1].filter(
    (page) => page >= 1 && page <= totalPages
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters({ page: newPage.toString() });
    }
  };

  return (
    <div className="flex justify-between mt-7">
      <Button
        onClick={() => handlePageChange(pageNum - 1)}
        disabled={pageNum === 1}
      >
        First
      </Button>
      <div className="flex items-baseline">
        {pagesToShow.length > 1 &&
          pagesToShow.map((page) => (
            <Button
              variant="link"
              size="icon"
              key={page}
              onClick={() => handlePageChange(page)}
              className={pageNum === page ? "font-bold" : ""}
            >
              {page}
            </Button>
          ))}
      </div>
      <Button
        onClick={() => handlePageChange(pageNum + 1)}
        disabled={pageNum === totalPages}
      >
        Last
      </Button>
    </div>
  );
};

export default TablePagination;
