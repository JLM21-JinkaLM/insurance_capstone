import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

export default function Dashboard() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await apiClient.get("/dashboard/summary");
      setSummary(res.data);
    } catch {
      alert("Failed to load dashboard");
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Total Policies</h6>
          <h3>{summary.totalPolicies || 0}</h3>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h6>Total Claims</h6>
          <h3>{summary.totalClaims || 0}</h3>
        </div>
      </div>
    </div>
  );
}
