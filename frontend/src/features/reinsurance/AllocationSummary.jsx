import React, { useEffect, useState } from 'react';
import { reinsuranceAPI } from '../../services/api';

const AllocationSummary = ({ policyId }) => {
  const [allocations, setAllocations] = useState([]);
  const [retainedAmount, setRetainedAmount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const res = await reinsuranceAPI.getRiskAllocations(policyId);
        if (res.data.length > 0) {
          setAllocations(res.data[0].allocations);
          setRetainedAmount(res.data[0].retainedAmount);
        } else {
          setAllocations([]);
          setRetainedAmount(0);
        }
      } catch (err) {
        setError('Failed to load summary');
      }
    };
    if (policyId) fetchAllocations();
  }, [policyId]);

  const cededAmount = allocations.reduce((sum, a) => sum + (a.allocatedAmount || 0), 0);
  const totalRisk = retainedAmount + cededAmount;
  const retainedPercentage = totalRisk > 0 ? (retainedAmount / totalRisk) * 100 : 0;

  if (!policyId) return (
    <div className="alert alert-light border shadow-sm py-3 text-center">
      <small className="text-muted fw-bold">Select a policy to view risk distribution summary.</small>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger border-0 shadow-sm">
      <small className="fw-bold">{error}</small>
    </div>
  );

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
      <div className="card-header bg-white border-0 pt-4 px-4">
        <h5 className="fw-bold text-dark mb-0">Risk Allocation Summary</h5>
        <p className="text-muted small">Financial exposure breakdown</p>
      </div>

      <div className="card-body px-4 pt-0 pb-4">
        <div className="row g-3 mb-4">
          {/* Retained Risk Card */}
          <div className="col-6">
            <div className="p-3 rounded-3" style={{ backgroundColor: '#f0f7ff', border: '1px solid #e0efff' }}>
              <span className="text-primary small fw-bold text-uppercase d-block mb-1" style={{ letterSpacing: '0.5px' }}>
                Retained Risk
              </span>
              <div className="h4 fw-bold text-primary mb-0">
                ₹{retainedAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Ceded Risk Card */}
          <div className="col-6">
            <div className="p-3 rounded-3" style={{ backgroundColor: '#fff9f2', border: '1px solid #fff1e0' }}>
              <span className="text-warning small fw-bold text-uppercase d-block mb-1" style={{ letterSpacing: '0.5px' }}>
                Ceded Risk
              </span>
              <div className="h4 fw-bold text-warning mb-0">
                ₹{cededAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Distribution Bar */}
        <div className="mt-2">
          <div className="d-flex justify-content-between mb-2">
            <small className="fw-bold text-secondary">Distribution Ratio</small>
            <small className="fw-bold text-dark">{retainedPercentage.toFixed(1)}% Retained</small>
          </div>
          <div className="progress rounded-pill" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${retainedPercentage}%` }}
              aria-valuenow={retainedPercentage} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
            <div 
              className="progress-bar bg-warning" 
              role="progressbar" 
              style={{ width: `${100 - retainedPercentage}%` }}
              aria-valuenow={100 - retainedPercentage} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
          <div className="d-flex justify-content-between mt-2">
             <div className="d-flex align-items-center gap-1">
                <span className="rounded-circle bg-primary" style={{width:'8px', height:'8px'}}></span>
                <span className="x-small text-muted" style={{fontSize: '11px'}}>Retention</span>
             </div>
             <div className="d-flex align-items-center gap-1">
                <span className="rounded-circle bg-warning" style={{width:'8px', height:'8px'}}></span>
                <span className="x-small text-muted" style={{fontSize: '11px'}}>Reinsurance</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationSummary;