import { useState, useEffect } from 'react';
import { useTable } from '../../context/TableContext';
import './TableCell.css';

const TableCell = ({ column, row, columnIndex, getAvatarColor, getInitials, onTalentCardClick }) => {
  const { updateRowData } = useTable();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(row[column.accessor]);

  // Update editValue when row data changes
  useEffect(() => {
    setEditValue(row[column.accessor]);
  }, [row, column.accessor]);

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (editValue !== row[column.accessor]) {
      updateRowData(row.id, column.accessor, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditValue(row[column.accessor]);
  };

  const renderCellContent = () => {
    if (column.id === 'name') {
      return (
        <div className="name-cell">
          <div
            className="avatar"
            style={{ backgroundColor: getAvatarColor(row.name) }}
          >
            {getInitials(row.name)}
          </div>
          <div className="name-info">
            <div className="name">{row.name}</div>
            <div className="email">{row.email}</div>
          </div>
        </div>
      );
    }

    if (column.isActionColumn) {
      return (
        <button
          className="view-details-button"
          onClick={onTalentCardClick}
          title="View Details"
        >
          <span>View Details</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5.25 3.5L8.75 7L5.25 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      );
    }

    if (column.id === 'tenureInCurrentRole' || column.id === 'tenure') {
      return `${row[column.accessor]} months`;
    }

    if (column.id === 'totalAttrition') {
      return `${row[column.accessor]}%`;
    }

    if (column.editable && isEditing) {
      return (
        <div className="edit-cell" onClick={(e) => e.stopPropagation()}>
          <select
            value={editValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setEditValue(newValue);
              // Update immediately at UI level
              updateRowData(row.id, column.accessor, newValue);
            }}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave(e);
              } else if (e.key === 'Escape') {
                handleCancel(e);
              }
            }}
            autoFocus
          >
            {column.editOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (column.editable) {
      return (
        <div className="editable-cell">
          <span>{row[column.accessor]}</span>
          <button
            className="edit-button"
            onClick={handleEdit}
            title="Edit"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M8.75 2.625L11.375 5.25L8.75 7.875M3.5 11.375H1.75V9.625L7.875 3.5L9.625 5.25L3.5 11.375Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      );
    }

    return <span>{row[column.accessor]}</span>;
  };

  return (
    <td className={`table-cell ${columnIndex === 0 ? 'sticky-column' : ''}`}>
      {renderCellContent()}
    </td>
  );
};

export default TableCell;

