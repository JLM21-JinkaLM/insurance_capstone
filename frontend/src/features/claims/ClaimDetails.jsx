import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { claimAPI } from '../../services/api';
import ClaimActions from './ClaimActions';
// Professional Icons
import { 
  ArrowLeft, FileText, Calendar, User, 
  IndianRupee, ClipboardList, Info, CheckCircle2 
} from 'lucide-react';

const ClaimDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClaim = async () => {
    try {
      const res = await claimAPI.getClaimById(id);
      setClaim(res.data);
    } catch (err) {
      setError('System could not retrieve claim details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaim();
  }, [id]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (error || !claim) return (
    <div className="container mt-5 text-center">
      <div className="alert alert-danger shadow-sm border-0">{error || 'Claim not found'}</div>
      <button className="btn btn-primary rounded-pill" onClick={() => navigate('/claims')}>Return to List</button>
    </div>
  );

  const getStatusConfig = (status) => {
    const configs = {
      'SUBMITTED': { color: 'bg-primary', icon: <Info size={14}/> },
      'IN_REVIEW': { color: 'bg-warning text-dark', icon: <ClipboardList size={14}/> },
      'APPROVED': { color: 'bg-success', icon: <CheckCircle2 size={14}/> },
      'REJECTED': { color: 'bg-danger', icon: <Info size={14}/> },
      'SETTLED': { color: 'bg-info', icon: <CheckCircle2 size={14}/> }
    };
    return configs[status] || { color: 'bg-secondary', icon: null };
  };

  const statusStyle = getStatusConfig(claim.status);

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Top Navigation */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <button 
            onClick={() => navigate('/claims')} 
            className="btn btn-link text-decoration-none text-muted fw-bold d-flex align-items-center p-0"
          >
            <ArrowLeft size={18} className="me-2" /> Back to Dashboard
          </button>
          <div className={`badge ${statusStyle.color} px-3 py-2 rounded-pill shadow-sm d-flex align-items-center`}>
            <span className="me-2">{statusStyle.icon}</span>
            {claim.status}
          </div>
        </div>

        <div className="row g-4">
          {/* Main Details Card */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 p-md-5" style={{ borderRadius: '16px' }}>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary-soft p-3 rounded-3 me-3">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="fw-bold mb-0">Claim #{claim.claimNumber}</h4>
                  <p className="text-muted mb-0 small">Policy: {claim.policyId?.policyNumber || 'N/A'}</p>
                </div>
              </div>

              <hr className="my-4 opacity-10" />

              <div className="row g-4">
                <div className="col-md-6">
                  <label className="text-uppercase small fw-bold text-muted mb-2 d-block">Timeline Details</label>
                  <div className="d-flex align-items-start mb-3">
                    <Calendar size={18} className="text-primary mt-1 me-3" />
                    <div>
                      <div className="fw-bold">Incident Date</div>
                      <div className="text-muted">{new Date(claim.incidentDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mb-3">
                    <Info size={18} className="text-primary mt-1 me-3" />
                    <div>
                      <div className="fw-bold">Reported On</div>
                      <div className="text-muted">{new Date(claim.reportedDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-uppercase small fw-bold text-muted mb-2 d-block">Assigned Officer</label>
                  <div className="d-flex align-items-center bg-light p-3 rounded-3">
                    <div className="bg-white rounded-circle p-2 me-3 shadow-sm">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">{claim.handledBy?.username || 'Unassigned'}</div>
                      <div className="text-muted small">Claims Adjuster</div>
                    </div>
                  </div>
                </div>

                {claim.remarks && (
                  <div className="col-12 mt-3">
                    <label className="text-uppercase small fw-bold text-muted mb-2 d-block">Incident Statement/Remarks</label>
                    <div className="p-3 bg-light rounded-3 italic border-start border-primary border-4 text-secondary">
                      "{claim.remarks}"
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions Component Section */}
            <div className="mt-4">
              <ClaimActions claim={claim} refresh={fetchClaim} />
            </div>
          </div>

          {/* Right Sidebar: Summary Stats */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm overflow-hidden mb-4" style={{ borderRadius: '16px' }}>
              <div className="card-header bg-dark text-white py-3 border-0">
                <h6 className="mb-0 fw-bold">Financial Summary</h6>
              </div>
              <div className="card-body p-4 text-center">
                <div className="mb-4">
                  <span className="text-muted small text-uppercase fw-bold d-block mb-1">Total Claim Amount</span>
                  <h2 className="fw-bold text-primary mb-0 d-flex align-items-center justify-content-center">
                    <IndianRupee size={28} /> {claim.claimAmount?.toLocaleString('en-IN')}
                  </h2>
                </div>
                
                <div className="p-3 rounded-3 bg-success-soft border border-success border-opacity-10 mb-2">
                  <span className="text-success small fw-bold text-uppercase d-block">Approved Settlement</span>
                  <h3 className="fw-bold text-success mb-0">
                    ₹{claim.approvedAmount ? claim.approvedAmount.toLocaleString('en-IN') : '0.00'}
                  </h3>
                  {claim.status === 'SUBMITTED' && <span className="badge bg-white text-success mt-1">Under Assessment</span>}
                </div>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="card border-0 bg-primary text-white p-4 shadow-sm" style={{ borderRadius: '16px' }}>
               <h5 className="fw-bold mb-2">Need Help?</h5>
               <p className="small opacity-75">If you have questions regarding this settlement, contact our support team 24/7.</p>
               <button className="btn btn-light btn-sm rounded-pill fw-bold px-3">Contact Support</button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-primary-soft { background-color: #e0e7ff; }
        .bg-success-soft { background-color: #f0fdf4; }
        .bg-warning-soft { background-color: #fefce8; }
        .italic { font-style: italic; }
      `}} />
    </div>
  );
};

export default ClaimDetails;
