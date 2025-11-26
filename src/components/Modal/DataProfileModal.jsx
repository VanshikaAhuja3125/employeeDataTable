import { useEffect } from 'react';
import { useTable } from '../../context/TableContext';
import './DataProfileModal.css';

const DataProfileModal = () => {
  const { selectedRow, isModalOpen, setIsModalOpen } = useTable();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen || !selectedRow) return null;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
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

  const formatFieldLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const formatFieldValue = (key, value) => {
    if (key === 'tenureInCurrentRole' || key === 'tenure') {
      return `${value} months`;
    }
    if (key === 'totalAttrition') {
      return `${value}%`;
    }
    return value;
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <div
              className="modal-avatar"
              style={{ backgroundColor: getAvatarColor(selectedRow.name) }}
            >
              {getInitials(selectedRow.name)}
            </div>
            <div>
              <h2 className="modal-title">{selectedRow.name}</h2>
              <p className="modal-subtitle">{selectedRow.email}</p>
            </div>
          </div>
          <button
            className="modal-close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-details-grid">
            <div className="detail-item">
              <span className="detail-label">ID</span>
              <span className="detail-value">{selectedRow.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Name</span>
              <span className="detail-value">{selectedRow.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{selectedRow.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Manager Email</span>
              <span className="detail-value">{selectedRow.managerEmail}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ENPS</span>
              <span className="detail-value">{selectedRow.enps}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">MRX Score</span>
              <span className="detail-value">{selectedRow.mrxScore}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of Joining</span>
              <span className="detail-value">{selectedRow.dateOfJoining}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tenure in Current Role</span>
              <span className="detail-value">
                {formatFieldValue('tenureInCurrentRole', selectedRow.tenureInCurrentRole)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Attrition</span>
              <span className="detail-value">
                {formatFieldValue('totalAttrition', selectedRow.totalAttrition)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tenure</span>
              <span className="detail-value">
                {formatFieldValue('tenure', selectedRow.tenure)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value">
                <span className={`status-badge status-${selectedRow.status?.toLowerCase()}`}>
                  {selectedRow.status}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataProfileModal;

