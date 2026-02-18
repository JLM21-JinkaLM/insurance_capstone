import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { policyAPI, claimAPI } from '../../services/api';
// Icons for a professional touch
import { FileText, DollarSign, Calendar, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';

const ClaimCreateForm = () => {
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    policyId: '',
    claimAmount: '',
    incidentDate: '',
    reportedDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await policyAPI.getPolicies();
        setPolicies(res.data.filter(p => p.status === 'ACTIVE'));
      } catch (err) {
        setError('Connection error: Could not load your active policies.');
      }
    };
    fetchPolicies();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'policyId') {
      const policy = policies.find(p => p._id === value);
      setSelectedPolicy(policy);
    }
    setForm({ ...form, [name]: value });
    if (error) setError('');
  };

  const handleSubmit = async e => {
    const formElement = e.currentTarget;
    e.preventDefault();
    
    if (formElement.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (selectedPolicy && parseFloat(form.claimAmount) > selectedPolicy.sumInsured) {
      setError(`Overlimit: Maximum claimable amount is ₹${selectedPolicy.sumInsured.toLocaleString('en-IN')}`);
      return;
    }

    setIsLoading(true);
    try {
      await claimAPI.createClaim({ ...form, claimAmount: parseFloat(form.claimAmount) });
      navigate('/claims');
    } catch (err) {
      setError(err.response?.data?.message || 'Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* Header Section */}
            <div className="text-center mb-4">
              <div className="badge bg-primary-soft text-primary px-3 py-2 mb-2 rounded-pill">Claims Portal</div>
              <h2 className="fw-bold text-dark">Submit Reimbursement Claim</h2>
              <p className="text-muted">Please provide the incident details to initiate your claim process.</p>
            </div>

            <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '16px' }}>
              <div className="row g-0">
                {/* Sidebar Info */}
                <div className="col-md-4 bg-primary text-white p-4 d-flex flex-column justify-content-center">
                  <div className="mb-4">
                    <ShieldCheck size={40} className="mb-3 opacity-75" />
                    <h5>Secure Filing</h5>
                    <p className="small opacity-75">Your claim data is encrypted and sent directly to our processing team.</p>
                  </div>
                  <div className="mt-auto">
                    <div className="d-flex align-items-center mb-2 small">
                      <div className="bg-white rounded-circle me-2" style={{ width: '6px', height: '6px' }}></div>
                      Policy Verification
                    </div>
                    <div className="d-flex align-items-center mb-2 small opacity-50">
                      <div className="bg-white rounded-circle me-2" style={{ width: '6px', height: '6px' }}></div>
                      Internal Review
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="col-md-8 p-4 p-md-5 bg-white">
                  {error && (
                    <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
                      <AlertCircle size={18} className="me-2" />
                      <div className="small fw-bold">{error}</div>
                    </div>
                  )}

                  <form 
                    onSubmit={handleSubmit} 
                    className={`needs-validation ${validated ? 'was-validated' : ''}`} 
                    noValidate
                  >
                    {/* Policy Picker */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-uppercase text-muted">Select Active Policy</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><FileText size={18} className="text-muted" /></span>
                        <select
                          name="policyId"
                          className="form-select bg-light border-start-0 ps-0"
                          value={form.policyId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose a policy...</option>
                          {policies.map(p => (
                            <option key={p._id} value={p._id}>{p.policyNumber} - {p.insuredName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      {/* Amount */}
                      <div className="col-sm-6 mb-4">
                        <label className="form-label small fw-bold text-uppercase text-muted">Claim Amount</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0"><DollarSign size={18} className="text-muted" /></span>
                          <input
                            type="number"
                            name="claimAmount"
                            className="form-control bg-light border-start-0 ps-0"
                            placeholder="0.00"
                            value={form.claimAmount}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {selectedPolicy && (
                          <div className="form-text text-primary x-small mt-1">
                            Limit: ₹{selectedPolicy.sumInsured.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>

                      {/* Date */}
                      <div className="col-sm-6 mb-4">
                        <label className="form-label small fw-bold text-uppercase text-muted">Incident Date</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0"><Calendar size={18} className="text-muted" /></span>
                          <input
                            type="date"
                            name="incidentDate"
                            className="form-control bg-light border-start-0 ps-0"
                            value={form.incidentDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Remarks */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-uppercase text-muted">Remarks</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 align-items-start pt-2"><MessageSquare size={18} className="text-muted" /></span>
                        <textarea
                          name="remarks"
                          className="form-control bg-light border-start-0 ps-0"
                          rows="3"
                          placeholder="Briefly describe what happened..."
                          value={form.remarks}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                      <button
                        type="button"
                        onClick={() => navigate('/claims')}
                        className="btn btn-link text-decoration-none text-muted fw-bold px-4 me-md-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary px-5 py-2 shadow-sm fw-bold rounded-pill"
                      >
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : 'Submit Claim Request'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-primary-soft { background-color: #e0e7ff; }
        .form-control:focus, .form-select:focus {
          background-color: #fff !important;
          border-color: #6366f1;
          box-shadow: 0 0 0 0.25rem rgba(99, 102, 241, 0.1);
        }
        .input-group-text { border-color: #dee2e6; color: #64748b; }
        .x-small { font-size: 0.75rem; }
        .btn-primary { background-color: #6366f1; border-color: #6366f1; }
        .btn-primary:hover { background-color: #4f46e5; }
      `}} />
    </div>
  );
};

export default ClaimCreateForm;
