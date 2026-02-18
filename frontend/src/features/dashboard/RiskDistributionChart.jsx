import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../../services/api';

const RiskDistributionChart = () => {
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await dashboardAPI.getReinsurerRiskDistribution();
        setDistribution(res.data);
      } catch (err) {
        setError('Failed to load risk distribution data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistribution();
  }, []);

  if (loading) {
    return (
      <div className="card border-0 shadow-sm p-4 text-center">
        <div className="spinner-border text-primary opacity-50 mb-2" role="status"></div>
        <p className="text-muted small fw-bold text-uppercase mb-0">Syncing Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center" role="alert">
        <span className="me-2">⚠️</span>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '16px' }}>
      {/* Header Section */}
      <div className="card-header bg-white border-0 pt-4 px-4 d-flex align-items-center justify-content-between">
        <div>
          <h5 className="fw-bold mb-1 text-dark" style={{ letterSpacing: '-0.02em' }}>
            Risk Distribution
          </h5>
          <p className="text-muted small mb-0">Allocation by Reinsurer Entity</p>
        </div>
        <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
          <span style={{ fontSize: '1.2rem' }}>🔄</span>
        </div>
      </div>

      <div className="card-body p-0 mt-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light-subtle">
              <tr className="text-muted small fw-bold text-uppercase border-top border-bottom" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                <th className="ps-4 py-3 border-0">Reinsurer Entity</th>
                <th className="pe-4 py-3 border-0 text-end">Total Allocated Value</th>
              </tr>
            </thead>
            <tbody className="border-0">
              {distribution.length > 0 ? (
                distribution.map((row, idx) => (
                  <tr key={row._id} style={{ transition: 'all 0.2s ease' }}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-3 me-3 d-flex align-items-center justify-content-center fw-bold" 
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            backgroundColor: idx % 2 === 0 ? '#eef2ff' : '#f0fdf4',
                            color: idx % 2 === 0 ? '#4f46e5' : '#16a34a',
                            fontSize: '0.85rem'
                          }}
                        >
                          {row._id?.charAt(0) || 'R'}
                        </div>
                        <span className="fw-semibold text-dark">{row._id}</span>
                      </div>
                    </td>
                    <td className="pe-4 py-3 text-end">
                      <div className="d-flex flex-column align-items-end">
                        <span className="fw-bold text-success" style={{ fontSize: '0.95rem' }}>
                          ₹{row.totalAllocated?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </span>
                        <div className="progress mt-1 w-50" style={{ height: '4px' }}>
                          <div 
                            className="progress-bar bg-success opacity-50" 
                            role="progressbar" 
                            style={{ width: '70%' }} 
                            aria-valuenow="70" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-5 text-muted">
                    No data available for distribution
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="card-footer bg-white border-0 py-3 px-4">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted small">Updated just now</span>
          <button className="btn btn-sm btn-light text-primary fw-bold border-0" style={{ fontSize: '0.75rem' }}>
            VIEW FULL REPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskDistributionChart;