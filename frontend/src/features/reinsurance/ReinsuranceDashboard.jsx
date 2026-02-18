import React, { useState, useEffect } from 'react';
import TreatyList from './TreatyList';
import AllocationTable from './AllocationTable';
import AllocationSummary from './AllocationSummary';

import { policyAPI, reinsuranceAPI } from '../../services/api';
import AddReinsurerModal from './AddReinsurerModal';

const ReinsuranceDashboard = () => {
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReinsurerModal, setShowReinsurerModal] = useState(false);
  const [reinsurerSuccess, setReinsurerSuccess] = useState('');
  const [reinsurerError, setReinsurerError] = useState('');

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await policyAPI.getPolicies();
        setPolicies(res.data.filter(p => p.status === 'ACTIVE'));
      } catch (err) {
        setError('Failed to load policies');
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const handleCreateReinsurer = async (data) => {
    setReinsurerError('');
    setReinsurerSuccess('');
    try {
      await reinsuranceAPI.createReinsurer(data);
      setReinsurerSuccess('Reinsurer created successfully!');
    } catch (err) {
      setReinsurerError(err.response?.data?.message || 'Failed to create reinsurer');
    }
  };

  return (
    <div className="container-fluid py-4 px-lg-5 bg-light min-vh-100">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Reinsurance Dashboard</h2>
          <p className="text-muted small mb-0">Monitor risk distribution, treaty limits, and policy cessions.</p>
        </div>
        
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary fw-bold shadow-sm d-flex align-items-center gap-2"
            onClick={() => setShowReinsurerModal(true)}
          >
            <span className="fs-5">+</span> Add Reinsurer
          </button>
        </div>
      </div>

      <AddReinsurerModal
        isOpen={showReinsurerModal}
        onClose={() => setShowReinsurerModal(false)}
        onCreate={handleCreateReinsurer}
      />

      {/* Status Notifications */}
      <div className="mb-3">
        {reinsurerSuccess && (
          <div className="alert alert-success border-0 shadow-sm py-2 px-3 small anim-fade-in">
            <span className="me-2">✅</span> {reinsurerSuccess}
          </div>
        )}
        {reinsurerError && (
          <div className="alert alert-danger border-0 shadow-sm py-2 px-3 small anim-fade-in">
            <span className="me-2">⚠️</span> {reinsurerError}
          </div>
        )}
        {error && (
          <div className="alert alert-warning border-0 shadow-sm py-2 px-3 small">
            {error}
          </div>
        )}
      </div>

      {/* Policy Selection Section */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-auto">
            <label htmlFor="policySelect" className="form-label fw-bold text-secondary small text-uppercase mb-0">
              Select Active Policy:
            </label>
          </div>
          <div className="col col-md-4">
            <select
              id="policySelect"
              className="form-select form-select-lg border-light-subtle shadow-none fs-6 bg-light"
              value={selectedPolicyId}
              onChange={e => setSelectedPolicyId(e.target.value)}
            >
              <option value="">-- Browse Active Policies --</option>
              {policies.map(p => (
                <option key={p._id} value={p._id}>{p.policyNumber} ({p.insuredName})</option>
              ))}
            </select>
          </div>
          {loading && (
            <div className="col-auto">
              <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
            </div>
          )}
        </div>
      </div>

      {/* Analytics & Table Row */}
      <div className="row g-4">
        <div className="col-lg-8">
          <AllocationTable policyId={selectedPolicyId} />
        </div>
        <div className="col-lg-4">
          <AllocationSummary policyId={selectedPolicyId} />
        </div>
      </div>

      {/* Master Treaty Repository */}
      <div className="mt-5 pt-4 border-top">
        <div className="mb-3">
          <h4 className="fw-bold text-dark">Master Treaty Repository</h4>
          <p className="text-muted small">Global view of all configured reinsurance agreements.</p>
        </div>
        <TreatyList />
      </div>
    </div>
  );
};

export default ReinsuranceDashboard;