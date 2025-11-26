import { useTable } from '../../context/TableContext';
import DateFilter from '../DateFilter/DateFilter';
import './TableHeader.css';

const TableHeader = ({ columns }) => {
  const { sortConfig, setSortConfig, dateFilters, updateDateFilter } = useTable();

  const handleSort = (columnId) => {
    setSortConfig((prevConfig) => {
      const existingIndex = prevConfig.findIndex((s) => s.column === columnId);
      
      if (existingIndex !== -1) {
        // Column already in sort config
        const existing = prevConfig[existingIndex];
        if (existing.direction === 'asc') {
          // Change to desc
          const newConfig = [...prevConfig];
          newConfig[existingIndex] = { ...existing, direction: 'desc' };
          return newConfig;
        } else {
          // Remove from sort config
          return prevConfig.filter((_, index) => index !== existingIndex);
        }
      } else {
        // Add new column to sort config (multi-column sorting)
        return [...prevConfig, { column: columnId, direction: 'asc' }];
      }
    });
  };

  const getSortIcon = (columnId) => {
    const sort = sortConfig.find((s) => s.column === columnId);
    if (!sort) {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 4.5L6 1.5L9 4.5M3 7.5L6 10.5L9 7.5"
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (sort.direction === 'asc') {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 4.5L6 1.5L9 4.5"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 7.5L6 10.5L9 7.5"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  };

  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            key={column.id}
            className={`table-header-cell ${column.sortable ? 'sortable' : ''} ${index === 0 ? 'sticky-column' : ''}`}
            onClick={(e) => {
              // Only sort if clicking on the header content, not the date filter
              if (column.sortable && !e.target.closest('.date-filter-wrapper')) {
                handleSort(column.accessor);
              }
            }}
          >
            <div className="header-content">
              <span>{column.label}</span>
              {column.sortable && (
                <span className="sort-icon">{getSortIcon(column.accessor)}</span>
              )}
            </div>
            {column.isDate && (
              <div className="date-filter-wrapper" onClick={(e) => e.stopPropagation()}>
                <DateFilter
                  column={column}
                  onDateChange={updateDateFilter}
                  dateRange={dateFilters[column.accessor] || null}
                />
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

