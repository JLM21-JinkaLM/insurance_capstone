export default function PolicyStepGeneral({ form, setForm }) {
  return (
    <>
      <div className="mb-3">
        <label>Policy Number</label>
        <input
          className="form-control"
          onChange={(e) =>
            setForm({ ...form, policyNumber: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label>Insured Name</label>
        <input
          className="form-control"
          onChange={(e) =>
            setForm({ ...form, insuredName: e.target.value })
          }
        />
      </div>
    </>
  );
}
