import { useTable } from '../../context/TableContext';
import { tableColumns, ITEMS_PER_PAGE } from '../../constants/tableConfig';
import { useMemo, useEffect, useRef, useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import Pagination from '../Pagination/Pagination';
import { isDateInRange } from '../../utils/dateUtils';
import './Table.css';

const Table = () => {
  const { data, searchTerm, sortConfig, currentPage, setCurrentPage, visibleColumns, paginationType, dateFilters } = useTable();
  const [scrollPage, setScrollPage] = useState(1);
  const observerTarget = useRef(null);

  // Reset to page 1 when search term or date filters change
  useEffect(() => {
    setCurrentPage(1);
    setScrollPage(1);
  }, [searchTerm, dateFilters, setCurrentPage]);

  // Reset scroll page when switching pagination types
  useEffect(() => {
    setScrollPage(1);
  }, [paginationType]);

  // Filter data based on search term and date filters
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((row) => {
        const name = (row.name || '').toLowerCase();
        const email = (row.email || '').toLowerCase();
        return name.includes(term) || email.includes(term);
      });
    }

    // Apply date filters
    Object.keys(dateFilters).forEach((columnAccessor) => {
      const dateRange = dateFilters[columnAccessor];
      if (dateRange && dateRange.from) {
        result = result.filter((row) => {
          return isDateInRange(row[columnAccessor], dateRange);
        });
      }
    });

    return result;
  }, [data, searchTerm, dateFilters]);

  // Helper function to parse date string (DD-MM-YYYY format)
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // Helper function to check if value is numeric (handles both number and string types)
  const isNumeric = (value) => {
    if (value === null || value === undefined || value === '') return false;
    if (typeof value === 'number') return true;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed !== '' && !isNaN(trimmed) && !isNaN(parseFloat(trimmed));
    }
    return false;
  };

  // Helper function to get numeric value
  const getNumericValue = (value) => {
    if (typeof value === 'number') return value;
    return parseFloat(value);
  };

  // Sort data based on sortConfig
  const sortedData = useMemo(() => {
    if (sortConfig.length === 0) return filteredData;

    // Create a map of column configs for faster lookup
    const columnConfigMap = {};
    tableColumns.forEach(col => {
      columnConfigMap[col.accessor] = col;
    });

    return [...filteredData].sort((a, b) => {
      // Iterate through all sort configurations
      for (const sort of sortConfig) {
        const { column, direction } = sort;
        const columnConfig = columnConfigMap[column];
        const isDateColumn = columnConfig?.isDate;
        
        let aValue = a[column];
        let bValue = b[column];

        let comparison = 0;
        
        // Handle date columns
        if (isDateColumn) {
          const aDate = parseDate(aValue);
          const bDate = parseDate(bValue);
          
          if (aDate && bDate) {
            comparison = aDate.getTime() - bDate.getTime();
          } else if (aDate) {
            comparison = 1; // aDate comes after null
          } else if (bDate) {
            comparison = -1; // bDate comes after null
          } else {
            comparison = 0; // Both are null/invalid
          }
        } 
        // Handle numeric columns - check if both are numeric
        else if (isNumeric(aValue) && isNumeric(bValue)) {
          const aNum = getNumericValue(aValue);
          const bNum = getNumericValue(bValue);
          comparison = aNum - bNum;
        }
        // Handle string columns (including name, email, status, etc.)
        else {
          // Convert to strings and normalize
          const aStr = String(aValue || '').trim().toLowerCase();
          const bStr = String(bValue || '').trim().toLowerCase();
          
          // Use localeCompare for proper string comparison
          comparison = aStr.localeCompare(bStr, undefined, { 
            numeric: true, 
            sensitivity: 'base' 
          });
        }

        // If comparison is not 0, apply direction and return
        // This is the key to multi-column sorting - only return if values differ
        if (comparison !== 0) {
          // Apply direction: asc means positive comparison stays positive, desc reverses it
          return direction === 'asc' ? comparison : -comparison;
        }
        // If comparison is 0, continue to next sort column
      }
      // If all comparisons are 0, items are equal
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data based on pagination type
  const paginatedData = useMemo(() => {
    if (paginationType === 'scroll') {
      // For scroll pagination, show all items up to current scroll page
      const endIndex = scrollPage * ITEMS_PER_PAGE;
      return sortedData.slice(0, endIndex);
    } else {
      // For regular pagination
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return sortedData.slice(startIndex, endIndex);
    }
  }, [sortedData, currentPage, scrollPage, paginationType]);

  // Infinite scroll observer
  useEffect(() => {
    if (paginationType !== 'scroll') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const maxPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
          if (scrollPage < maxPages) {
            setScrollPage((prev) => prev + 1);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [paginationType, scrollPage, sortedData.length]);

  // Get visible columns
  const columns = useMemo(() => {
    return tableColumns.filter((col) => {
      // If visibleColumns is empty, show all columns
      if (Object.keys(visibleColumns).length === 0) {
        return col.visible !== false;
      }
      return visibleColumns[col.id] !== false;
    });
  }, [visibleColumns]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="data-table">
          <TableHeader columns={columns} />
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id} row={row} columns={columns} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {paginationType === 'scroll' && paginatedData.length < sortedData.length && (
        <div ref={observerTarget} className="scroll-loader">
          <div className="loading-spinner">Loading more...</div>
        </div>
      )}
      <div className="table-footer">
        <div className="table-info">
          {paginationType === 'scroll' ? (
            <>
              Showing {paginatedData.length} of {sortedData.length} entries
            </>
          ) : (
            <>
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length)} of{' '}
              {sortedData.length} entries
            </>
          )}
        </div>
        {paginationType === 'pagination' && (
          <Pagination totalItems={sortedData.length} />
        )}
      </div>
    </div>
  );
};

export default Table;

