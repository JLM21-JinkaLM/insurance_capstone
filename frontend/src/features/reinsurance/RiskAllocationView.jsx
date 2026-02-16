import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function RiskAllocationView() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllocations = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/risk-allocation");
      setAllocations(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load allocations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllocations();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h4>Risk Allocations</h4>

        {allocations.length === 0 && (
          <div className="alert alert-info mt-3">
            No allocations found
          </div>
        )}

        {allocations.map((item) => (
          <div key={item._id} className="mt-4 border rounded p-3">

            {/* POLICY INFO */}
            <div className="mb-3">
              <h5>Policy Info</h5>
              <p><strong>Policy No:</strong> {item.policyId?.policyNumber}</p>
              <p><strong>Insured:</strong> {item.policyId?.insuredName}</p>
              <p><strong>LOB:</strong> {item.policyId?.lineOfBusiness}</p>
              <p><strong>Sum Insured:</strong> ₹ {item.policyId?.sumInsured}</p>
            </div>

            {/* ALLOCATION TABLE */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Reinsurer</th>
                  <th>Treaty</th>
                  <th>Allocated %</th>
                  <th>Allocated Amount</th>
                </tr>
              </thead>
              <tbody>
                {item.allocations.map((alloc) => (
                  <tr key={alloc._id}>
                    <td>{alloc.reinsurerId?.name}</td>
                    <td>{alloc.treatyId?.treatyName}</td>
                    <td>{alloc.allocatedPercentage}%</td>
                    <td>₹ {alloc.allocatedAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* SUMMARY */}
            <div className="alert alert-success">
              <strong>Retained Amount:</strong> ₹ {item.retainedAmount}
            </div>

            <div className="text-muted small">
              Calculated By: {item.calculatedBy?.username} <br />
              Calculated At: {new Date(item.calculatedAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
