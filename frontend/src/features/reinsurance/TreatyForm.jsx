import { useState } from "react";
import { createTreaty } from "../../services/reinsuranceService";

export default function TreatyForm() {
  const [form, setForm] = useState({});

  const submit = async () => {
    try {
      await createTreaty(form);
      alert("Treaty Created");
    } catch {
      alert("Error creating treaty");
    }
  };

  return (
    <div className="card p-4">
      <h4>Create Treaty</h4>

      <input
        className="form-control mb-2"
        placeholder="Treaty Name"
        onChange={(e) =>
          setForm({ ...form, treatyName: e.target.value })
        }
      />

      <select
        className="form-control mb-2"
        onChange={(e) =>
          setForm({ ...form, treatyType: e.target.value })
        }
      >
        <option value="QUOTA_SHARE">Quota Share</option>
        <option value="SURPLUS">Surplus</option>
      </select>

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Share %"
        onChange={(e) =>
          setForm({ ...form, sharePercentage: e.target.value })
        }
      />

      <button className="btn btn-success" onClick={submit}>
        Save
      </button>
    </div>
  );
}
