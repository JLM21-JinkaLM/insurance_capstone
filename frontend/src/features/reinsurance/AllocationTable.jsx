import React, { useEffect, useState } from "react";
import { reinsuranceAPI } from "../../services/api";

const AllocationTable = ({ policyId }) => {
  const [allocations, setAllocations] = useState([]);
  const [retainedAmount, setRetainedAmount] = useState(0);
  const [error, setError] = useState("");

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
        setError("Failed to load allocations");
      }
    };
    if (policyId) fetchAllocations();
  }, [policyId]);

  const validateAllocations = () => {
    return allocations.some(
      (a) => a.allocatedAmount > a.treatyId?.treatyLimit
    );
  };

  if (!policyId)
    return (
      <div className="alert alert-light border shadow-sm mt-4 text-center">
        <small className="text-muted fw-bold text-uppercase">Select a policy to view allocations directory</small>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger border-0 shadow-sm mt-4 fw-medium">
        {error}
      </div>
    );

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
      {/* Card Header */}
      <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold text-dark mb-1">Risk Allocation Table</h5>
          <p className="text-muted small mb-0">Treaty distribution and limit monitoring</p>
        </div>
        <div className="bg-light px-3 py-2 rounded-3 border">
          <span className="text-muted small fw-bold text-uppercase d-block" style={{ fontSize: '10px' }}>Retained Amount</span>
          <span className="h6 fw-bold text-primary mb-0">₹{retainedAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="card-body p-0">
        {/* Validation Warning */}
        {validateAllocations() && (
          <div className="mx-4 mt-3 mb-0 p-3 bg-danger-subtle text-danger border border-danger-subtle rounded-3 d-flex align-items-center gap-2">
            <span className="fs-5">⚠️</span>
            <span className="small fw-bold">Critical: One or more allocations exceed treaty limits!</span>
          </div>
        )}

        {/* Table Container */}
        <div className="table-responsive mt-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light border-top border-bottom">
              <tr className="text-secondary small fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                <th className="px-4 py-3 border-0">Reinsurer Entity</th>
                <th className="py-3 border-0">Treaty Name</th>
                <th className="py-3 border-0 text-end">Allocated Amount</th>
                <th className="py-3 border-0 text-center">Exposure %</th>
                <th className="px-4 py-3 border-0 text-end">Treaty Limit</th>
              </tr>
            </thead>

            <tbody className="border-0">
              {allocations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted small italic">
                    No active allocations found for this policy ID.
                  </td>
                </tr>
              ) : (
                allocations.map((a, idx) => {
                  const isOverLimit = a.allocatedAmount > a.treatyId?.treatyLimit;
                  return (
                    <tr key={idx} className={isOverLimit ? "table-danger opacity-75" : ""}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '32px', height: '32px', fontSize: '11px' }}>
                            {a.reinsurerId?.name?.charAt(0) || "R"}
                          </div>
                          <span className="fw-semibold text-dark small">{a.reinsurerId?.name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="py-3 small text-muted font-monospace">
                        {a.treatyId?.treatyName || "N/A"}
                      </td>
                      <td className={`py-3 text-end fw-bold ${isOverLimit ? 'text-danger' : 'text-dark'}`}>
                        ₹{a.allocatedAmount.toLocaleString()}
                      </td>
                      <td className="py-3 text-center">
                        <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary border px-2 py-1" style={{ fontSize: '11px' }}>
                          {a.allocatedPercentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <span className="text-muted small d-block" style={{ fontSize: '10px' }}>MAX CAP</span>
                        <span className="fw-semibold text-secondary small">₹{a.treatyId?.treatyLimit?.toLocaleString()}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Footer */}
      <div className="card-footer bg-white border-0 py-3 px-4 text-end">
        <span className="text-muted x-small" style={{ fontSize: '11px' }}>
          Total Allocations: <strong>{allocations.length}</strong>
        </span>
      </div>
    </div>
  );
};

export default AllocationTable;