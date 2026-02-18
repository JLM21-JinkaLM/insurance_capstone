import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { policyAPI } from '../../services/api';
import PolicyActions from './PolicyActions';
import AllocationTable from '../reinsurance/AllocationTable';
import AllocationSummary from '../reinsurance/AllocationSummary';

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPolicy = async () => {
    try {
      const res = await policyAPI.getPolicyById(id);
      setPolicy(res.data);
    } catch (err) {
      setError('Failed to load policy details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicy();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted fw-bold">RETRIEVING POLICY DATA...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger border-0 shadow-sm px-4 py-3" role="alert">
          <span className="fw-bold">Error:</span> {error}
        </div>
      </div>
    );
  }

  if (!policy) return <div className="container mt-5 text-center text-muted">Policy not found</div>;

  // Helper for Status Badge Colors
  const getStatusBadge = (status) => {
    const statusMap = {
      'ACTIVE': 'bg-success-subtle text-success border-success',
      'PENDING': 'bg-warning-subtle text-warning border-warning',
      'EXPIRED': 'bg-secondary-subtle text-secondary border-secondary',
      'CANCELLED': 'bg-danger-subtle text-danger border-danger'
    };
    return `badge border rounded-pill px-3 py-2 ${statusMap[status] || 'bg-light text-dark'}`;
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="container">
        {/* Top Header Navigation */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <button 
            onClick={() => navigate('/policy')} 
            className="btn btn-white bg-white border shadow-sm d-flex align-items-center gap-2 fw-semibold px-3"
          >
            <span className="fs-5">←</span> Back to Directory
          </button>
          <div className="text-end">
            <span className="text-muted small text-uppercase fw-bold d-block">System Identifier</span>
            <span className="fw-mono text-dark small">{policy._id}</span>
          </div>
        </div>

        {/* Main Details Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-header bg-white border-bottom-0 pt-4 px-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="fw-bold text-dark mb-1">{policy.policyNumber}</h2>
                <p className="text-muted mb-0">{policy.insuredName}</p>
              </div>
              <span className={`${getStatusBadge(policy.status)} fw-bold`} style={{ fontSize: '0.8rem' }}>
                {policy.status}
              </span>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              {/* Left Column: General Info */}
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 h-100">
                  <h6 className="text-muted small fw-bold text-uppercase mb-3" style={{ letterSpacing: '0.5px' }}>General Information</h6>
                  
                  <div className="mb-3">
                    <label className="text-secondary small d-block mb-1">Insured Type</label>
                    <div className="fw-semibold text-dark">{policy.insuredType}</div>
                  </div>
                  
                  <div className="mb-0">
                    <label className="text-secondary small d-block mb-1">Line of Business</label>
                    <div className="fw-semibold text-dark">{policy.lineOfBusiness}</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Financial Data */}
              <div className="col-md-6">
                <div className="p-3 border rounded-3 h-100 bg-white">
                  <h6 className="text-muted small fw-bold text-uppercase mb-3" style={{ letterSpacing: '0.5px' }}>Financial Exposure</h6>
                  
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="text-secondary small d-block mb-1">Sum Insured</label>
                      <div className="fw-bold text-dark fs-5">₹{policy.sumInsured?.toLocaleString() || 0}</div>
                    </div>
                    <div className="col-6 text-end">
                      <label className="text-secondary small d-block mb-1">Net Premium</label>
                      <div className="fw-bold text-success fs-5">₹{policy.premium?.toLocaleString() || 0}</div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-2" style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
                        <label className="text-warning-emphasis small fw-bold mb-0">Retention Limit</label>
                        <span className="fw-bold text-warning-emphasis">₹{policy.retentionLimit?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Section */}
            <div className="row mt-4 pt-3 border-top">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-2">📅</div>
                  <div>
                    <label className="text-secondary small d-block">Policy Commencement</label>
                    <div className="fw-semibold">{policy.effectiveFrom ? new Date(policy.effectiveFrom).toLocaleDateString() : '-'}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-2">⌛</div>
                  <div>
                    <label className="text-secondary small d-block">Expiry Date</label>
                    <div className="fw-semibold">{policy.effectiveTo ? new Date(policy.effectiveTo).toLocaleDateString() : '-'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Component */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-3">
          <PolicyActions policy={policy} refresh={fetchPolicy} />
        </div>

        {/* Reinsurance Section */}
        {policy.status === 'ACTIVE' && (
          <div className="mt-5 animate-in">
            <div className="d-flex align-items-center gap-2 mb-3 px-1">
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '12px' }}>R</div>
              <h4 className="fw-bold text-dark mb-0">Reinsurance Allocation</h4>
            </div>
            <div className="row g-4">
              <div className="col-lg-8">
                <AllocationTable policyId={policy._id} />
              </div>
              <div className="col-lg-4">
                <AllocationSummary policyId={policy._id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDetails;