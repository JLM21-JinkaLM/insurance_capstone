import { useState } from "react";

export default function ThresholdConfig() {
  const [limit, setLimit] = useState(1000000);

  return (
    <div className="card p-3 mt-4">
      <h5>Threshold Configuration</h5>

      <label>Retention Limit</label>
      <input
        type="number"
        className="form-control"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
    </div>
  );
}
