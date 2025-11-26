import { useTable } from '../../context/TableContext';
import TableCell from './TableCell';
import './TableRow.css';

const TableRow = ({ row, columns }) => {
  const { setSelectedRow, setIsModalOpen } = useTable();

  const handleTalentCardClick = (e) => {
    e.stopPropagation();
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Get avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      '#8b5cf6', // purple
      '#10b981', // green
      '#f59e0b', // orange
      '#ef4444', // red
      '#3b82f6', // blue
      '#ec4899', // pink
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <tr className="table-row">
      {columns.map((column, index) => (
        <TableCell
          key={column.id}
          column={column}
          row={row}
          columnIndex={index}
          getAvatarColor={getAvatarColor}
          getInitials={getInitials}
          onTalentCardClick={handleTalentCardClick}
        />
      ))}
    </tr>
  );
};

export default TableRow;

