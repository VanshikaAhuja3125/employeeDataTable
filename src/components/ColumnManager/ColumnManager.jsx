import { useState, useEffect } from 'react';
import { useTable } from '../../context/TableContext';
import { tableColumns } from '../../constants/tableConfig';
import './ColumnManager.css';

const ColumnManager = () => {
  const { visibleColumns, setVisibleColumns } = useTable();
  const [isOpen, setIsOpen] = useState(false);
  const [localVisibleColumns, setLocalVisibleColumns] = useState({});

  // Initialize local state from context
  useEffect(() => {
    const initial = {};
    tableColumns.forEach((col) => {
      if (Object.keys(visibleColumns).length === 0) {
        // If no columns are set, use default visibility
        initial[col.id] = col.visible !== false;
      } else {
        // Use existing visibility state
        initial[col.id] = visibleColumns[col.id] !== false;
      }
    });
    setLocalVisibleColumns(initial);
  }, [visibleColumns]);

  const handleToggle = (columnId) => {
    // Prevent hiding the first column (NAME) and actions column
    if (columnId === 'name' || columnId === 'actions') return;

    setLocalVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const handleApply = () => {
    setVisibleColumns(localVisibleColumns);
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset to current visibleColumns
    const reset = {};
    tableColumns.forEach((col) => {
      if (Object.keys(visibleColumns).length === 0) {
        reset[col.id] = col.visible !== false;
      } else {
        reset[col.id] = visibleColumns[col.id] !== false;
      }
    });
    setLocalVisibleColumns(reset);
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    const allVisible = {};
    tableColumns.forEach((col) => {
      allVisible[col.id] = col.id === 'name' || col.id === 'actions' ? true : true; // Name always visible
    });
    setLocalVisibleColumns(allVisible);
  };

  const handleDeselectAll = () => {
    const allHidden = {};
    tableColumns.forEach((col) => {
      allHidden[col.id] = col.id === 'name' || col.id === 'actions' ? true : false; // Name always visible
    });
    setLocalVisibleColumns(allHidden);
  };

  const visibleCount = Object.values(localVisibleColumns).filter(Boolean).length;
  const totalColumns = tableColumns.length;

  return (
    <>
      <button
        className="column-manager-button"
        onClick={() => setIsOpen(true)}
        title="Manage Columns"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M11.3333 2.66667L13.3333 4.66667L6 12L4 12L4 10L11.3333 2.66667Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 14H14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Manage Columns</span>
      </button>

      {isOpen && (
        <div className="column-manager-overlay" onClick={handleCancel}>
          <div className="column-manager-modal" onClick={(e) => e.stopPropagation()}>
            <div className="column-manager-header">
              <h3>Manage Columns</h3>
              <button
                className="close-button"
                onClick={handleCancel}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="column-manager-actions">
              <button className="action-button" onClick={handleSelectAll}>
                Select All
              </button>
              <button className="action-button" onClick={handleDeselectAll}>
                Deselect All
              </button>
              <span className="column-count">
                {visibleCount} of {totalColumns} columns selected
              </span>
            </div>

            <div className="column-manager-list">
              {tableColumns.map((column) => {
                const isChecked = localVisibleColumns[column.id] !== false;
                const isDisabled = column.id === 'name' || column.id === 'actions'; // First column and actions column cannot be hidden

                return (
                  <label
                    key={column.id}
                    className={`column-item ${isDisabled ? 'disabled' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggle(column.id)}
                      disabled={isDisabled}
                    />
                    <span className="checkbox-label">{column.label}</span>
                    {isDisabled && (
                      <span className="required-badge">Required</span>
                    )}
                  </label>
                );
              })}
            </div>

            <div className="column-manager-footer">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="apply-button" onClick={handleApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ColumnManager;

