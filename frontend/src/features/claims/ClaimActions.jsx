import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { claimAPI } from '../../services/api';
// Icons
import { 
  Settings, CheckCircle, XCircle, Play, 
  Wallet, ShieldAlert, Loader2, IndianRupee 
} from 'lucide-react';

const ClaimActions = ({ claim, refresh }) => {
  const { user } = useAuth();
  const [actionError, setActionError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState(claim.approvedAmount || claim.claimAmount);
  
  const isAdjuster = user?.role === 'CLAIMS_ADJUSTER';

  const handleAction = async (actionFn, message) => {
    setActionError('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await actionFn();
      setSuccessMsg(message);
      setTimeout(() => refresh(), 1500);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Action failed. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdjuster) {
    return (
      <div className="card border-0 shadow-sm bg-light" style={{ borderRadius: '16px' }}>
        <div className="card-body d-flex align-items-center text-muted py-3">
          <ShieldAlert size={18} className="me-2" />
          <span className="small fw-medium">View-only mode: You do not have adjuster permissions.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '16px' }}>
      <div className="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Settings size={18} className="text-primary me-2" />
          <h6 className="mb-0 fw-bold">Admin Control Panel</h6>
        </div>
        <span className="badge bg-primary-soft text-primary small">Adjuster Access</span>
      </div>

      <div className="card-body p-4">
        {/* Notifications */}
        {actionError && (
          <div className="alert alert-danger border-0 small fw-bold shadow-sm mb-4">
            {actionError}
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success border-0 small fw-bold shadow-sm mb-4">
            {successMsg}
          </div>
        )}

        {/* --- Action Logic --- */}

        {/* Phase 1: Move to Review */}
        {claim.status === 'SUBMITTED' && (
          <div className="text-center py-3">
            <p className="text-muted small mb-3">Begin the assessment process for this claim.</p>
            <button
              onClick={() => handleAction(() => claimAPI.reviewClaim(claim._id), 'Claim is now under review.')}
              disabled={isLoading}
              className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center"
            >
              {isLoading ? <Loader2 className="spinner me-2" size={18} /> : <Play className="me-2" size={18} />}
              Start Review Process
            </button>
          </div>
        )}

        {/* Phase 2: Approve / Reject */}
        {claim.status === 'IN_REVIEW' && (
          <div className="row align-items-end g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold text-muted text-uppercase">Final Approved Amount (₹)</label>
              <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                <span className="input-group-text bg-white border-0"><IndianRupee size={16} /></span>
                <input
                  type="number"
                  className="form-control border-0 ps-0 fw-bold"
                  value={approvedAmount}
                  onChange={e => setApprovedAmount(e.target.value)}
                  max={claim.claimAmount}
                />
              </div>
              <div className="form-text x-small">Max allowed: ₹{claim.claimAmount.toLocaleString()}</div>
            </div>
            <div className="col-md-6 d-flex gap-2">
              <button
                onClick={() => handleAction(() => claimAPI.approveClaim(claim._id, { approvedAmount: parseFloat(approvedAmount) }), 'Claim Approved Successfully!')}
                disabled={isLoading}
                className="btn btn-success flex-grow-1 py-2 fw-bold d-flex align-items-center justify-content-center"
              >
                {isLoading ? <Loader2 className="spinner me-2" size={16}/> : <CheckCircle className="me-2" size={16}/>}
                Approve
              </button>
              <button
                onClick={() => { if(window.confirm('Reject this claim?')) handleAction(() => claimAPI.rejectClaim(claim._id), 'Claim Rejected.'); }}
                disabled={isLoading}
                className="btn btn-outline-danger py-2 fw-bold d-flex align-items-center justify-content-center"
              >
                <XCircle size={16} className="me-2" /> Reject
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Settle */}
        {claim.status === 'APPROVED' && (
          <div className="bg-light p-4 rounded-3 text-center border border-dashed border-primary">
            <div className="mb-3 text-primary"><Wallet size={32} /></div>
            <h6 className="fw-bold">Ready for Settlement</h6>
            <p className="text-muted small">The approved amount of ₹{claim.approvedAmount?.toLocaleString()} is ready for payout.</p>
            <button
              onClick={() => handleAction(() => claimAPI.settleClaim(claim._id), 'Claim status updated to SETTLED.')}
              disabled={isLoading}
              className="btn btn-dark px-5 py-2 rounded-pill fw-bold shadow-sm"
            >
              {isLoading ? <Loader2 className="spinner me-2" size={18}/> : 'Disburse & Settle'}
            </button>
          </div>
        )}

        {/* Final State */}
        {(claim.status === 'REJECTED' || claim.status === 'SETTLED') && (
          <div className="p-3 bg-light rounded-3 text-center border">
            <span className="text-muted small fw-bold text-uppercase ls-wide">
              Closed Case — Status: {claim.status}
            </span>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .ls-wide { letter-spacing: 0.05em; }
        .bg-primary-soft { background-color: #eff6ff; }
        .x-small { font-size: 0.7rem; }
      `}} />
    </div>
  );
};

export default ClaimActions;
