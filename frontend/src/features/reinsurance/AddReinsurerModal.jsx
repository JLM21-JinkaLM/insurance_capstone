import React, { useState } from 'react';
// Professional Icons
import { User, Phone, Mail, X, PlusCircle, AlertCircle } from 'lucide-react';

const AddReinsurerModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !contact || !email) {
      setError('Please provide all reinsurer details.');
      return;
    }
    setError('');
    onCreate({ name, contact, email });
    setName('');
    setContact('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal d-block" 
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
          
          {/* MODAL HEADER */}
          <div className="modal-header border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="bg-primary-soft p-2 rounded-3 me-3">
                <PlusCircle size={22} className="text-primary" />
              </div>
              <h5 className="modal-title fw-bold text-dark">Add New Reinsurer</h5>
            </div>
            <button 
              type="button" 
              className="btn btn-light rounded-circle p-1" 
              onClick={onClose}
              style={{ width: '32px', height: '32px' }}
            >
              <X size={18} className="text-muted" />
            </button>
          </div>

          <div className="modal-body p-4">
            <p className="text-muted small mb-4">Enter the details of the reinsurance partner to add them to the system.</p>

            {error && (
              <div className="alert alert-danger border-0 small fw-bold d-flex align-items-center rounded-3 mb-4 py-2">
                <AlertCircle size={16} className="me-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase text-muted">Reinsurer Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><User size={18} className="text-muted" /></span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-0"
                    placeholder="e.g. Global Re Group"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Contact Input */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase text-muted">Contact Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Phone size={18} className="text-muted" /></span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-0"
                    placeholder="+91 XXXXX XXXXX"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><Mail size={18} className="text-muted" /></span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0 ps-0"
                    placeholder="contact@reinsurer.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="d-flex gap-2 justify-content-end pt-3">
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none text-muted fw-bold px-4" 
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                >
                  Create Reinsurer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-primary-soft { background-color: #eef2ff; }
        .form-control:focus {
          background-color: #fff !important;
          border-color: #6366f1;
          box-shadow: 0 0 0 0.25rem rgba(99, 102, 241, 0.1);
        }
        .input-group-text { border-color: #dee2e6; color: #64748b; }
        .modal-content {
          animation: modalScale 0.2s ease-out;
        }
        @keyframes modalScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default AddReinsurerModal;
