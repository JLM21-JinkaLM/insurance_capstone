import React from 'react';

const AddTreatyModal = ({ isOpen, onClose, onCreated, AddTreatyForm }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1"
      style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.7)', // Deep Slate Overlay
        backdropFilter: 'blur(6px)', // Modern Blur Effect
        zIndex: 1060 
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Top Branding Accent Strip */}
          <div style={{ 
            height: '5px', 
            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' 
          }}></div>

          <div className="modal-header border-0 pt-4 px-4 pb-0 d-flex align-items-start">
            <div>
              <h4 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>
                New Treaty Configuration
              </h4>
              <p className="text-muted small mb-0">
                Set up risk distribution parameters and reinsurer capacity.
              </p>
            </div>
            <button
              type="button"
              className="btn-close shadow-none p-2 bg-light rounded-circle border"
              onClick={onClose}
              aria-label="Close"
              style={{ fontSize: '0.75rem', transition: 'transform 0.2s ease' }}
              onMouseOver={(e) => e.target.style.transform = 'rotate(90deg)'}
              onMouseOut={(e) => e.target.style.transform = 'rotate(0deg)'}
            ></button>
          </div>

          <div className="modal-body p-4">
            {/* Form Wrapper with subtle depth */}
            <div className="p-3 rounded-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #edf2f7' }}>
              <AddTreatyForm onCreated={onCreated} />
            </div>
          </div>

          <div className="modal-footer border-0 bg-white px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-none d-md-flex align-items-center text-muted small">
              <span className="me-2 text-success">●</span> 
              System Ready for Validation
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-light text-primary border rounded-pill py-2 px-3 fw-medium" style={{ fontSize: '11px' }}>
                🛡️ REINSURANCE MODULE v2.1
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddTreatyModal;