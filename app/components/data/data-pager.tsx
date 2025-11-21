import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconService } from "~/service/icon-service";
import { SolidIcon } from "~/utils/enums";
import { useDataContext } from "./data-context";

interface DataPagerProps {
  pageSizeOptions?: number[];
}

const DataPager: React.FC<DataPagerProps> = ({
  pageSizeOptions = [1, 5, 10, 20, 50],
}) => {
  const {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalItems,
    setRefreshData,
  } = useDataContext();

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const onPageSizeChange = (size: number) => {
    setRowsPerPage(size);
    setCurrentPage(1); // Reset to first page when changing page size
    setRefreshData(new Date().getTime());
  };

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page);
    setRefreshData(new Date().getTime());
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-x-2 mt-4 w-full justify-center">
      <div>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={!canGoPrev}
          aria-label="First Page"
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.BACKWARD)}
          ></FontAwesomeIcon>
        </button>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          aria-label="Previous Page"
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.STEP_BACKWARD)}
          ></FontAwesomeIcon>
        </button>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Next Page"
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.STEP_FORWARD)}
          ></FontAwesomeIcon>
        </button>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          aria-label="Last Page"
        >
          <FontAwesomeIcon
            icon={IconService.getSolid(SolidIcon.FORWARD)}
          ></FontAwesomeIcon>
        </button>
      </div>

      <div>
        <span className="">Rows per page:</span>
        <select
          className="mx-3 bg-background border border-gray-400 rounded px-2 py-1"
          value={rowsPerPage}
          onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="ml-2 text-foreground">Total rows: {totalItems}</span>
      </div>
    </div>
  );
};

DataPager.displayName = "DataPager";
export { DataPager };
