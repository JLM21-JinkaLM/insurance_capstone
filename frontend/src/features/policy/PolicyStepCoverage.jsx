export default function PolicyStepCoverage({ form, setForm }) {
  return (
    <>
      <div className="mb-3">
        <label>Line of Business</label>
        <select
          className="form-control"
          onChange={(e) =>
            setForm({ ...form, lineOfBusiness: e.target.value })
          }
        >
          <option>HEALTH</option>
          <option>MOTOR</option>
          <option>LIFE</option>
          <option>PROPERTY</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Sum Insured</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) =>
            setForm({ ...form, sumInsured: e.target.value })
          }
        />
      </div>
    </>
  );
}
