import { useState } from "react";
import useClaims from "../../hooks/useClaims";
import ClaimDetailsModal from "./ClaimDetailsModal";

export default function ClaimsList() {
  const { claims, loading, reload } = useClaims();
  const [selectedClaim, setSelectedClaim] = useState(null);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card p-3 shadow-sm">
      <h4>Claims</h4>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Claim No</th>
            <th>Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {claims.map((c) => (
            <tr key={c._id}>
              <td>{c.claimNumber}</td>
              <td>₹ {c.claimAmount}</td>
              <td>
                <span
                  className={`badge ${
                    c.status === "APPROVED"
                      ? "bg-success"
                      : c.status === "REJECTED"
                      ? "bg-danger"
                      : c.status === "SETTLED"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setSelectedClaim(c)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClaimDetailsModal
        claim={selectedClaim}
        onClose={() => setSelectedClaim(null)}
        reload={reload}
      />
    </div>
  );
}
