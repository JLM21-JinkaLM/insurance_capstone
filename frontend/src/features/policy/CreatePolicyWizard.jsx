import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../../services/api";

const CreatePolicyWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    insuredName: "",
    insuredType: "INDIVIDUAL",
    lineOfBusiness: "HEALTH",
    sumInsured: "",
    premium: "",
    retentionLimit: "",
    effectiveFrom: "",
    effectiveTo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateStep = () => {
    if (step === 1 && !form.insuredName) {
      setError("Please enter insured name");
      return false;
    }
    if (
      step === 2 &&
      (!form.sumInsured || !form.premium || !form.retentionLimit)
    ) {
      setError("Please fill all coverage fields");
      return false;
    }
    if (
      step === 2 &&
      parseFloat(form.retentionLimit) > parseFloat(form.sumInsured)
    ) {
      setError("Retention limit cannot exceed sum insured");
      return false;
    }
    if (step === 3 && !form.effectiveFrom) {
      setError("Please select effective from date");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      await policyAPI.createPolicy({
        ...form,
        sumInsured: parseFloat(form.sumInsured),
        premium: parseFloat(form.premium),
        retentionLimit: parseFloat(form.retentionLimit),
      });
      navigate("/policy");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create policy");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-5">

          {/* Header */}
          <div className="mb-4">
            <h3 className="fw-bold mb-1">Create New Policy</h3>
            <p className="text-muted">
              Complete the steps below to generate a new insurance policy.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-primary"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="d-flex justify-content-between mt-2 small text-muted">
              <span>Basic Info</span>
              <span>Coverage</span>
              <span>Dates</span>
              <span>Review</span>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger shadow-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Insured Name *
                  </label>
                  <input
                    type="text"
                    name="insuredName"
                    value={form.insuredName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Insured Type *
                  </label>
                  <select
                    name="insuredType"
                    value={form.insuredType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="CORPORATE">Corporate</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Line of Business *
                  </label>
                  <select
                    name="lineOfBusiness"
                    value={form.lineOfBusiness}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="HEALTH">Health</option>
                    <option value="MOTOR">Motor</option>
                    <option value="LIFE">Life</option>
                    <option value="PROPERTY">Property</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary px-4"
                >
                  Next →
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      Sum Insured *
                    </label>
                    <input
                      type="number"
                      name="sumInsured"
                      value={form.sumInsured}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      Premium *
                    </label>
                    <input
                      type="number"
                      name="premium"
                      value={form.premium}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      Retention Limit *
                    </label>
                    <input
                      type="number"
                      name="retentionLimit"
                      value={form.retentionLimit}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline-secondary me-2"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  Next →
                </button>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Effective From *
                    </label>
                    <input
                      type="date"
                      name="effectiveFrom"
                      value={form.effectiveFrom}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Effective To
                    </label>
                    <input
                      type="date"
                      name="effectiveTo"
                      value={form.effectiveTo}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn-outline-secondary me-2"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  Review →
                </button>
              </>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <>
                <div className="bg-light p-4 rounded-3 mb-4">
                  <h6 className="fw-bold mb-3">Policy Summary</h6>
                  <p><strong>Insured Name:</strong> {form.insuredName}</p>
                  <p><strong>Type:</strong> {form.insuredType}</p>
                  <p><strong>LOB:</strong> {form.lineOfBusiness}</p>
                  <p><strong>Sum Insured:</strong> ₹{form.sumInsured}</p>
                  <p><strong>Premium:</strong> ₹{form.premium}</p>
                  <p><strong>Retention:</strong> ₹{form.retentionLimit}</p>
                  <p><strong>Effective From:</strong> {form.effectiveFrom}</p>
                  <p><strong>Effective To:</strong> {form.effectiveTo || "-"}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn-outline-secondary me-2"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="btn btn-success px-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Policy"
                  )}
                </button>
              </>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePolicyWizard;
