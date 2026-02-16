import { useState } from "react";
import PolicyStepGeneral from "./PolicyStepGeneral";
import PolicyStepCoverage from "./PolicyStepCoverage";
import PolicyStepReview from "./PolicyStepReview";
import { createPolicy } from "../../services/policyService";

export default function CreatePolicyWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const submit = async () => {
    try {
      await createPolicy(form);
      alert("Policy created successfully");
    } catch {
      alert("Error creating policy");
    }
  };

  return (
    <div className="card p-4">
      <h4>Create Policy</h4>

      {step === 1 && <PolicyStepGeneral form={form} setForm={setForm} />}
      {step === 2 && <PolicyStepCoverage form={form} setForm={setForm} />}
      {step === 3 && <PolicyStepReview form={form} />}

      <div className="mt-3">
        {step > 1 && (
          <button className="btn btn-secondary me-2" onClick={back}>
            Back
          </button>
        )}

        {step < 3 && (
          <button className="btn btn-primary" onClick={next}>
            Next
          </button>
        )}

        {step === 3 && (
          <button className="btn btn-success" onClick={submit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
