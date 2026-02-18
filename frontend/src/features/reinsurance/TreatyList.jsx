import React, { useEffect, useState } from 'react';
import { reinsuranceAPI } from '../../services/api';
import AddTreatyForm from './AddTreatyForm';
import AddTreatyModal from './AddTreatyModal';

const TreatyList = () => {
  const [treaties, setTreaties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchTreaties = async () => {
    try {
      const res = await reinsuranceAPI.getTreaties();
      setTreaties(res.data);
    } catch (err) {
      setError('Failed to load treaties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreaties();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-lg-5 bg-light min-vh-100">
      {/* Header Section */}
      <div className="d-md-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Reinsurance Treaties</h2>
          <p className="text-muted small mb-0">Manage global risk distribution agreements and reinsurer participation.</p>
        </div>
        <button
          className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2 mt-3 mt-md-0"
          style={{ backgroundColor: '#4f46e5', border: 'none' }}
          onClick={() => setShowModal(true)}
        >
          <span className="fs-5">+</span> Add New Treaty
        </button>
      </div>

      <AddTreatyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => { setShowModal(false); fetchTreaties(); }}
        AddTreatyForm={AddTreatyForm}
      />

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger border-0 shadow-sm py-3 mb-4 rounded-3 d-flex align-items-center">
          <span className="me-2">⚠️</span> {error}
        </div>
      )}

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {treaties.length === 0 ? (
          <div className="card-body py-5 text-center">
            <div className="display-6 text-muted opacity-25 mb-3">📂</div>
            <h5 className="text-muted fw-normal">No treaties configured in the system</h5>
            <p className="small text-muted">Click the button above to create your first agreement.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                  <th className="px-4 py-3 border-0">Agreement Details</th>
                  <th className="py-3 border-0">Type</th>
                  <th className="py-3 border-0">Lead Reinsurer</th>
                  <th className="py-3 border-0 text-end">Participation</th>
                  <th className="px-4 py-3 border-0 text-center">Lifecycle Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {treaties.map(treaty => (
                  <tr key={treaty._id}>
                    <td className="px-4 py-4">
                      <div className="fw-bold text-dark">{treaty.treatyName}</div>
                      <div className="text-muted x-small" style={{ fontSize: '0.7rem' }}>ID: {treaty._id.slice(-8)}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border fw-medium px-2 py-1">
                        {treaty.treatyType}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center fw-bold me-2" style={{ width: '32px', height: '32px', fontSize: '10px' }}>
                          {(treaty.reinsurerId?.name || 'N').charAt(0)}
                        </div>
                        <span className="text-dark fw-medium">{treaty.reinsurerId?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="fw-bold text-dark">{treaty.sharePercentage}%</div>
                      <div className="progress mt-1 ms-auto" style={{ height: '4px', width: '60px' }}>
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{ width: `${treaty.sharePercentage}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 text-center">
                      <span className={`badge rounded-pill px-3 py-2 ${
                        treaty.status === 'ACTIVE' 
                        ? 'bg-success-subtle text-success border border-success' 
                        : 'bg-secondary-subtle text-secondary border border-secondary'
                      }`} style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                        {treaty.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="card-footer bg-white border-0 py-3 px-4">
          <small className="text-muted fw-bold">ACTIVE TREATY REPOSITORY: {treaties.length}</small>
        </div>
      </div>
    </div>
  );
};

export default TreatyList;