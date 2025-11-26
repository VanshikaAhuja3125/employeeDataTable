import { useTable } from '../../context/TableContext';
import './PaginationToggle.css';

const PaginationToggle = () => {
  const { paginationType, setPaginationType } = useTable();

  const handleToggle = () => {
    setPaginationType(paginationType === 'pagination' ? 'scroll' : 'pagination');
  };

  return (
    <div className="pagination-toggle">
      <span className="toggle-label">Pagination Type:</span>
      <button
        className={`toggle-option ${paginationType === 'pagination' ? 'active' : ''}`}
        onClick={() => setPaginationType('pagination')}
      >
        Pagination
      </button>
      <button
        className={`toggle-option ${paginationType === 'scroll' ? 'active' : ''}`}
        onClick={() => setPaginationType('scroll')}
      >
        Scroll
      </button>
    </div>
  );
};

export default PaginationToggle;

