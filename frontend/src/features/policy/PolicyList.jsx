import { useEffect, useState, useContext } from "react";
import { ToastContext } from "../../context/ToastContext";
import * as policyService from "../../services/policyService";
import PolicyFormModal from "./PolicyFormModal";
import PolicyDetailsModal from "./PolicyDetailsModal";
import PolicyActions from "./PolicyActions";

export default function PolicyList() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const { showToast } = useContext(ToastContext);

  // ✅ Load Policies
  const loadPolicies = async () => {
    try {
      setLoading(true);

      const res = await policyService.getPolicies();

      const data = Array.isArray(res) ? res : res.data.data || [];

      setPolicies(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load policies", "danger");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await policyService.changeStatus(id, newStatus);
      showToast("Status updated successfully", "success");
      loadPolicies();
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", "danger");
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Policies</h4>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Create Policy
        </button>
      </div>

      {loading && <div>Loading...</div>}

      <table className="table table-hover align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Policy No</th>
            <th>Insured</th>
            <th>LOB</th>
            <th>Status</th>
            <th>Sum Insured</th>
            <th style={{ width: "120px" }}>View Details</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {policies.length === 0 && !loading && (
            <tr>
              <td colSpan="6" className="text-center">
                No policies found
              </td>
            </tr>
          )}

          {policies.map((p) => (
            <tr key={p._id}>
              <td>{p.policyNumber}</td>
              <td>{p.insuredName}</td>
              <td>{p.lineOfBusiness}</td>

              <td>{p.status}</td>

              <td>{p.sumInsured}</td>

              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => setSelectedPolicy(p)}
                >
                  View
                </button>
              </td>
              <td>
                <PolicyActions policy={p} refresh={loadPolicies} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create/Edit Modal */}
      <PolicyFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={loadPolicies}
      />

      {/* View Modal */}
      {selectedPolicy && (
        <PolicyDetailsModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
}
