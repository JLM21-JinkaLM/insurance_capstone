import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { claimAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { 
  Plus, Search, Filter, FileText, 
  CheckCircle, XCircle, Clock, Wallet, 
  Trash2, Eye, ChevronRight 
} from 'lucide-react';
import "../../styles/login.css";  // Assuming your styles are here

const ClaimsList = () => {
  const { user } = useAuth();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await claimAPI.getClaims();
        setClaims(res.data);
      } catch (err) {
        setError('Failed to load claims.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-primary';
      case 'IN_REVIEW':
        return 'bg-warning';
      case 'APPROVED':
        return 'bg-success';
      case 'REJECTED':
        return 'bg-danger';  // Red for rejected
      case 'SETTLED':
        return 'bg-secondary'; // Grey for settled
      default:
        return 'bg-dark';
    }
  };

  const filteredClaims = filter === 'ALL' ? claims : claims.filter(c => c.status === filter);

  const activeClaimsCount = claims.filter(c => c.status === 'ACTIVE').length;
  const rejectedClaimsCount = claims.filter(c => c.status === 'REJECTED').length;
  const submittedClaimsCount = claims.filter(c => c.status === 'SUBMITTED').length;
  const settledClaimsCount = claims.filter(c => c.status === 'SETTLED').length;

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this claim?')) return;
    try {
      await claimAPI.deleteClaim(id);
      setClaims(claims.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete claim.');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading claims...</div>;

 return (
    <div className="container-fluid py-4 min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
      
      {/* HEADER SECTION */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Claims Management</h3>
          <p className="text-muted mb-0 small">Overview of all insurance reimbursement requests</p>
        </div>
        {user?.role !== 'ADMIN' && (
          <Link to="/claims/create" className="btn btn-primary shadow-sm px-4 py-2 rounded-pill fw-bold d-flex align-items-center mt-3 mt-md-0">
            <Plus size={18} className="me-2" /> Create New Claim
          </Link>
        )}
      </div>

      {/* SUMMARY STATS (Professional Gradients) */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 stat-card" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '16px' }}>
            <div className="card-body text-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="opacity-75 fw-bold text-uppercase x-small">Total</small>
                  <h3 className="fw-bold mb-0 mt-1">{claims.length}</h3>
                </div>
                <FileText size={24} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 stat-card" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', borderRadius: '16px' }}>
            <div className="card-body text-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="opacity-75 fw-bold text-uppercase x-small">Active</small>
                  <h3 className="fw-bold mb-0 mt-1">{activeClaimsCount}</h3>
                </div>
                <Clock size={24} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 stat-card" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', borderRadius: '16px' }}>
            <div className="card-body text-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="opacity-75 fw-bold text-uppercase x-small">Rejected</small>
                  <h3 className="fw-bold mb-0 mt-1">{rejectedClaimsCount}</h3>
                </div>
                <XCircle size={24} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 stat-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '16px' }}>
            <div className="card-body text-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="opacity-75 fw-bold text-uppercase x-small">Settled</small>
                  <h3 className="fw-bold mb-0 mt-1">{settledClaimsCount}</h3>
                </div>
                <Wallet size={24} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted ps-3">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Search insured name..."
                  className="form-control border-start-0 ps-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted ps-3">
                  <Filter size={18} />
                </span>
                <select 
                  className="form-select border-start-0 ps-0" 
                  value={filter} 
                  onChange={e => setFilter(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="IN_REVIEW">In Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="SETTLED">Settled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger border-0 shadow-sm small fw-bold mb-4">{error}</div>}

      {/* TABLE HEADER (Visible on MD+) */}
      <div className="px-4 mb-2 d-none d-md-block">
        <div className="row text-muted small fw-bold text-uppercase ls-wide">
          <div className="col-md-2">Claim ID</div>
          <div className="col-md-3">Insured Party</div>
          <div className="col-md-2">Claim Amount</div>
          <div className="col-md-2">Status</div>
          <div className="col-md-2">Date</div>
          <div className="col-md-1 text-center">Action</div>
        </div>
      </div>

      {/* CLAIMS LIST */}
      {filteredClaims.length > 0 ? filteredClaims.map((claim) => (
        <div key={claim._id} className="card claim-row border-0 shadow-sm mb-3">
          <div className="card-body py-3">
            <div className="row align-items-center">
              {/* ID */}
              <div className="col-md-2 mb-2 mb-md-0">
                <div className="fw-bold text-primary mb-0">{claim.claimNumber}</div>
                <small className="text-muted d-block">{claim?.policyId?.policyNumber || 'N/A'}</small>
              </div>

              {/* Insured */}
              <div className="col-md-3 mb-2 mb-md-0">
                <div className="fw-medium text-dark">{claim?.policyId?.insuredName}</div>
              </div>

              {/* Amount */}
              <div className="col-md-2 mb-2 mb-md-0">
                <div className="fw-bold text-dark">₹{claim.claimAmount?.toLocaleString('en-IN')}</div>
              </div>

              {/* Status Badge */}
              <div className="col-md-2 mb-2 mb-md-0">
                <span className={`badge rounded-pill px-3 py-2 fw-bold text-uppercase ${getStatusBadge(claim.status)}`} style={{ fontSize: '10px' }}>
                  {claim.status}
                </span>
              </div>

              {/* Date */}
              <div className="col-md-2 mb-2 mb-md-0">
                <small className="text-muted fw-medium">
                  {claim.reportedDate ? new Date(claim.reportedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                </small>
              </div>

              {/* Actions */}
              <div className="col-md-1 text-center d-flex justify-content-center gap-2">
                <Link
                  to={`/claims/${claim._id}`}
                  className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                  title="View Details"
                >
                  <Eye size={16} className="text-primary" />
                </Link>
                {user?.role === 'CLAIMS_ADJUSTER' && (
                  <button
                    onClick={async () => {
                      if (!window.confirm('Permanent Delete: Are you sure?')) return;
                      try {
                        await claimAPI.deleteClaim(claim._id);
                        setClaims(claims.filter((c) => c._id !== claim._id));
                      } catch {
                        setError('Failed to delete claim.');
                      }
                    }}
                    className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                    title="Delete Claim"
                  >
                    <Trash2 size={16} className="text-danger" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="text-center py-5">
           <div className="text-muted mb-3 opacity-25"><FileText size={64} /></div>
           <h5 className="text-muted">No claims found matching your filters.</h5>
        </div>
      )}

      {/* CUSTOM CSS FOR DASHBOARD */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ls-wide { letter-spacing: 0.08em; }
        .x-small { font-size: 0.65rem; }
        .stat-card { transition: transform 0.2s; }
        .stat-card:hover { transform: translateY(-5px); }
        .claim-row { 
          border-left: 4px solid transparent !important; 
          transition: all 0.2s; 
          border-radius: 12px;
        }
        .claim-row:hover { 
          background-color: #f1f5f9; 
          border-left: 4px solid #6366f1 !important;
          transform: scale(1.005);
        }
        .btn-light { border-color: #e2e8f0; }
        .form-control:focus, .form-select:focus {
           border-color: #6366f1;
           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
      `}} />
    </div>
  );
};

export default ClaimsList;
