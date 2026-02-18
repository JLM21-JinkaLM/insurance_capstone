import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { policyAPI } from "../../services/api";

const PolicyActions = ({ policy, refresh }) => {
  const { user } = useAuth();
  const [actionError, setActionError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = user?.role === "UNDERWRITER";
  const canApprove = user?.role === "UNDERWRITER";

  const handleApprove = async () => {
    setActionError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      await policyAPI.approvePolicy(policy._id);
      setSuccessMsg(
        "Policy approved successfully. Risk allocation has been auto-calculated."
      );
      setTimeout(() => refresh(), 1000);
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Failed to approve policy"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setActionError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      await policyAPI.submitPolicy(policy._id);
      setSuccessMsg("Policy submitted for approval.");
      setTimeout(() => refresh(), 1000);
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Failed to submit policy"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!canSubmit && !canApprove) {
    return (
      <div className="card shadow-sm border-0 rounded-4 mt-4">
        <div className="card-body bg-warning-subtle">
          <p className="mb-0 text-warning fw-medium">
            You do not have permission to manage policies. Only Underwriters
            can create and approve policies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">

      {/* Alerts */}
      {actionError && (
        <div className="alert alert-danger shadow-sm rounded-3">
          {actionError}
        </div>
      )}

      {successMsg && (
        <div className="alert alert-success shadow-sm rounded-3">
          {successMsg}
        </div>
      )}

      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">
              <i className="bi bi-clipboard-check me-2"></i>
              Policy Actions
            </h5>

            {/* Status Badge */}
            <span
              className={`badge px-3 py-2 rounded-pill ${
                policy.status === "DRAFT"
                  ? "bg-secondary"
                  : policy.status === "SUBMITTED"
                  ? "bg-warning text-dark"
                  : "bg-success"
              }`}
            >
              {policy.status}
            </span>
          </div>

          {/* Action Buttons */}
          {policy.status === "DRAFT" && canSubmit && (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary px-4"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-send-check me-2"></i>
                  Submit for Approval
                </>
              )}
            </button>
          )}

          {policy.status === "SUBMITTED" && canApprove && (
            <button
              onClick={handleApprove}
              disabled={isLoading}
              className="btn btn-success px-4"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Approving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Approve Policy & Allocate Risk
                </>
              )}
            </button>
          )}

          {policy.status === "ACTIVE" && (
            <div className="alert alert-success mt-3 mb-0 rounded-3">
              <i className="bi bi-check-circle-fill me-2"></i>
              Policy Active & Risk Allocation Completed
            </div>
          )}

          {policy.status === "DRAFT" && !canSubmit && (
            <p className="text-muted fst-italic mt-3 mb-0">
              Policy is in draft. Only Underwriters can submit it for approval.
            </p>
          )}

          {policy.status === "SUBMITTED" && !canApprove && (
            <p className="text-muted fst-italic mt-3 mb-0">
              Policy is awaiting Underwriter approval. Risk allocation will
              occur once approved.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyActions;
