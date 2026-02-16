import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPolicyById } from "../../services/policyService";
import PolicyActions from "./PolicyActions";

export default function PolicyDetails() {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);

  const load = async () => {
    const data = await getPolicyById(id);
    setPolicy(data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!policy) return <div>Loading...</div>;

  return (
    <div className="card p-4">
      <h4>Policy Details</h4>
      <p><strong>Policy No:</strong> {policy.policyNumber}</p>
      <p><strong>Status:</strong> {policy.status}</p>

      <PolicyActions policy={policy} reload={load} />
    </div>
  );
}
