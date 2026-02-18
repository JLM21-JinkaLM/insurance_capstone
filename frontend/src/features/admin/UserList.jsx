import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { adminAPI } from '../../services/api';

const UserForm = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'UNDERWRITER',
    status: user?.status || 'ACTIVE',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (user) {
        delete payload.password;
      }
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '12px' }}>
          <div className="modal-header border-bottom-0 pt-4 px-4">
            <h5 className="modal-title fw-bold text-dark">{user ? 'Edit Member Profile' : 'Add New Member'}</h5>
            <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body px-4 pt-0">
              {error && (
                <div className="alert alert-danger py-2 small border-0 mb-3 rounded-3">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">Username</label>
                <input
                  name="username"
                  className="form-control bg-light border-0 py-2"
                  value={form.username}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  style={{ opacity: user ? 0.6 : 1 }}
                />
                {user && <div className="form-text small mt-1">Username is a unique permanent identifier.</div>}
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control bg-light border-0 py-2"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {!user && (
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Initial Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control bg-light border-0 py-2"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted text-uppercase">System Role</label>
                  <select name="role" className="form-select bg-light border-0 py-2" value={form.role} onChange={handleChange}>
                    <option value="ADMIN">Admin</option>
                    <option value="UNDERWRITER">Underwriter</option>
                    <option value="CLAIMS_ADJUSTER">Claims Adjuster</option>
                    <option value="REINSURANCE_MANAGER">Manager</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted text-uppercase">Status</label>
                  <select name="status" className="form-select bg-light border-0 py-2" value={form.status} onChange={handleChange}>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0 px-4 pb-4">
              <button type="button" className="btn btn-link text-decoration-none text-muted fw-bold" onClick={onClose}>Cancel</button>
              <button type="submit" disabled={saving} className="btn btn-primary px-4 py-2 fw-bold shadow-sm" style={{ backgroundColor: '#4f46e5', border: 'none' }}>
                {saving ? 'Processing...' : 'Save Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getUsers();
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load user records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = () => { setEditUser(null); setShowForm(true); };
  const handleEdit = (user) => { setEditUser(user); setShowForm(true); };
  const handleSave = async (form) => {
    if (editUser) { await adminAPI.updateUser(editUser._id, form); } 
    else { await adminAPI.createUser(form); }
    await fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) { setError('Failed to delete user.'); }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-grow text-primary" role="status"></div>
        <span className="ms-3 fw-bold text-muted">SYNCHRONIZING DIRECTORY...</span>
      </div>
    );
  }

  const roleBadges = {
    'ADMIN': 'bg-danger text-white',
    'UNDERWRITER': 'bg-primary text-white',
    'CLAIMS_ADJUSTER': 'bg-warning text-dark',
    'REINSURANCE_MANAGER': 'bg-success text-white'
  };

  return (
    <div className="container-fluid py-5 px-lg-5 bg-light min-vh-100">
      <div className="d-md-flex align-items-center justify-content-between mb-5">
        <div>
          <h2 className="fw-bold text-dark mb-1">Team Management</h2>
          <p className="text-muted small mb-0">Oversee organizational roles, permissions, and account status.</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2 mt-3 mt-md-0" style={{ backgroundColor: '#4f46e5', border: 'none' }}>
          <span className="fs-5">+</span> New Member
        </button>
      </div>

      {error && <div className="alert alert-danger border-0 shadow-sm py-2 mb-4 rounded-3">{error}</div>}

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom">
              <tr className="text-muted small fw-bold text-uppercase">
                <th className="px-4 py-3 border-0">Identify</th>
                <th className="py-3 border-0">Role</th>
                <th className="py-3 border-0 text-center">Status</th>
                <th className="px-4 py-3 border-0 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((u, idx) => (
                <tr key={u._id} className={idx % 2 === 0 ? '' : 'bg-light-subtle'}>
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px' }}>
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-bold text-dark mb-0">{u.username}</div>
                        <div className="text-muted x-small" style={{ fontSize: '0.75rem' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${roleBadges[u.role] || 'bg-secondary'} px-3 py-2`} style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className={`d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill ${u.status === 'ACTIVE' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`} style={{ fontSize: '11px', fontWeight: '700' }}>
                      <span className={`rounded-circle ${u.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`} style={{ width: '6px', height: '6px' }}></span>
                      {u.status}
                    </div>
                  </td>
                  <td className="px-4 text-end">
                    <button onClick={() => handleEdit(u)} className="btn btn-sm btn-light border-0 text-primary fw-bold px-3 me-2">Edit</button>
                    <button onClick={() => handleDelete(u._id)} className="btn btn-sm btn-light border-0 text-danger fw-bold px-3">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white border-0 py-3 px-4">
          <small className="text-muted fw-bold">TOTAL REGISTERED MEMBERS: {users.length}</small>
        </div>
      </div>

      {showForm && <UserForm user={editUser} onSave={handleSave} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default UserList;