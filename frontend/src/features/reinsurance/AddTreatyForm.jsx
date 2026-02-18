import React, { useEffect, useState } from 'react';
import { reinsuranceAPI } from '../../services/api';

const initialForm = {
  treatyName: '',
  treatyType: 'QUOTA_SHARE',
  reinsurerId: '',
  sharePercentage: '',
  retentionLimit: '',
  treatyLimit: '',
  applicableLOBs: [],
  effectiveFrom: '',
  effectiveTo: '',
  status: 'ACTIVE',
};

const lobOptions = ['HEALTH', 'MOTOR', 'LIFE', 'PROPERTY'];
const treatyTypes = ['QUOTA_SHARE', 'SURPLUS'];

const AddTreatyForm = ({ onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [reinsurers, setReinsurers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reinsuranceAPI.getReinsurers().then(res => setReinsurers(res.data));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({
        ...f,
        applicableLOBs: checked
          ? [...f.applicableLOBs, value]
          : f.applicableLOBs.filter(lob => lob !== value),
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        sharePercentage: Number(form.sharePercentage),
        retentionLimit: Number(form.retentionLimit),
        treatyLimit: Number(form.treatyLimit),
      };
      await reinsuranceAPI.createTreaty(payload);
      setSuccess('Treaty created successfully!');
      setForm(initialForm);
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create treaty');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 bg-white">
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Row 1 */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">Treaty Name</label>
              <input 
                name="treatyName" 
                value={form.treatyName} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Quota Share 2024"
                className="form-control form-control-lg fs-6 shadow-none border-light-subtle bg-light" 
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold small text-muted">Treaty Type</label>
              <select 
                name="treatyType" 
                value={form.treatyType} 
                onChange={handleChange} 
                required 
                className="form-select form-control-lg fs-6 shadow-none border-light-subtle bg-light"
              >
                {treatyTypes.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold small text-muted">Share %</label>
              <div className="input-group">
                <input 
                  name="sharePercentage" 
                  type="number" 
                  value={form.sharePercentage} 
                  onChange={handleChange} 
                  required 
                  min={1} max={100} 
                  className="form-control form-control-lg fs-6 shadow-none border-light-subtle bg-light" 
                />
                <span className="input-group-text bg-light border-light-subtle text-muted">%</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">Reinsurer Partner</label>
              <select 
                name="reinsurerId" 
                value={form.reinsurerId} 
                onChange={handleChange} 
                required 
                className="form-select form-control-lg fs-6 shadow-none border-light-subtle bg-light"
              >
                <option value="">Select a Reinsurer</option>
                {reinsurers.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold small text-muted">Retention Limit</label>
              <input 
                name="retentionLimit" 
                type="number" 
                value={form.retentionLimit} 
                onChange={handleChange} 
                required 
                className="form-control form-control-lg fs-6 shadow-none border-light-subtle bg-light" 
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold small text-muted">Treaty Limit</label>
              <input 
                name="treatyLimit" 
                type="number" 
                value={form.treatyLimit} 
                onChange={handleChange} 
                required 
                className="form-control form-control-lg fs-6 shadow-none border-light-subtle bg-light" 
              />
            </div>

            {/* Row 3 */}
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">Effective Dates</label>
              <div className="input-group">
                <input 
                  name="effectiveFrom" 
                  type="date" 
                  value={form.effectiveFrom} 
                  onChange={handleChange} 
                  required 
                  className="form-control shadow-none border-light-subtle bg-light" 
                />
                <span className="input-group-text bg-light border-light-subtle text-muted">to</span>
                <input 
                  name="effectiveTo" 
                  type="date" 
                  value={form.effectiveTo} 
                  onChange={handleChange} 
                  required 
                  className="form-control shadow-none border-light-subtle bg-light" 
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">Applicable Lines of Business</label>
              <div className="d-flex flex-wrap gap-3 p-2 border border-light-subtle rounded-3 bg-light bg-opacity-50">
                {lobOptions.map(lob => (
                  <div key={lob} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="applicableLOBs"
                      id={`lob-${lob}`}
                      value={lob}
                      checked={form.applicableLOBs.includes(lob)}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small fw-medium" htmlFor={`lob-${lob}`}>
                      {lob}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-between">
            <div className="flex-grow-1 me-3">
              {error && <div className="text-danger small fw-bold anim-shake">⚠️ {error}</div>}
              {success && <div className="text-success small fw-bold">✅ {success}</div>}
            </div>
            <button 
              type="submit" 
              className="btn btn-primary px-5 py-2 fw-bold shadow-sm rounded-3" 
              style={{ backgroundColor: '#4f46e5', border: 'none' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : 'Create Treaty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatyForm;