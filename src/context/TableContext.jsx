import { createContext, useContext, useState, useMemo } from 'react';
import sampleData from '../data/sampleData.json';

const TableContext = createContext();

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within TableProvider');
  }
  return context;
};

export const TableProvider = ({ children }) => {
  const [data, setData] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState([]); // Array for multi-column sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationType, setPaginationType] = useState('pagination'); // 'pagination' or 'scroll'
  const [visibleColumns, setVisibleColumns] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateFilters, setDateFilters] = useState({});

  // Initialize visible columns (all visible by default)
  const initializeVisibleColumns = () => {
    const initial = {};
    // This will be set from tableConfig
    return initial;
  };

  // Function to update a specific row's data
  const updateRowData = (rowId, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  // Function to update date filter
  const updateDateFilter = (columnAccessor, dateRange) => {
    setDateFilters((prev) => ({
      ...prev,
      [columnAccessor]: dateRange
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const value = useMemo(() => ({
    data,
    setData,
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortConfig,
    currentPage,
    setCurrentPage,
    paginationType,
    setPaginationType,
    visibleColumns,
    setVisibleColumns,
    selectedRow,
    setSelectedRow,
    isModalOpen,
    setIsModalOpen,
    updateRowData,
    dateFilters,
    updateDateFilter
  }), [
    data,
    searchTerm,
    sortConfig,
    currentPage,
    paginationType,
    visibleColumns,
    selectedRow,
    isModalOpen,
    dateFilters
  ]);

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
};

