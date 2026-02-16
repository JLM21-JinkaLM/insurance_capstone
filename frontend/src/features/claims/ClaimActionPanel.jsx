import { useContext } from "react";
import { ToastContext } from "../../context/ToastContext";
import {
  reviewClaim,
  approveClaim,
  rejectClaim,
  settleClaim
} from "../../services/claimsService";

export default function ClaimActionPanel({ claim, reload }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { showToast } = useContext(ToastContext);

  if (!["CLAIMS_ADJUSTER", "ADMIN"].includes(user?.role)) return null;

  const handleAction = async (actionFn) => {
    try {
      await actionFn(claim._id);
      showToast(`Claim successfully`, "success");
      reload();
      onclose()
    } catch (err) {
      console.error(err.response?.data || err);
      showToast(err.response?.data?.message || "Action failed", "danger");
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        Actions
      </button>

      <ul className="dropdown-menu dropdown-menu-end">

        {claim.status === "SUBMITTED" && (
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleAction(reviewClaim, "marked In Review")}
            >
              Mark In Review
            </button>
          </li>
        )}

        {claim.status === "IN_REVIEW" && (
          <>
            <li>
              <button
                className="dropdown-item text-success"
                onClick={() => handleAction(approveClaim, "Approved")}
              >
                Approve
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleAction(rejectClaim, "Rejected")}
              >
                Reject
              </button>
            </li>
          </>
        )}

        {claim.status === "APPROVED" && (
          <li>
            <button
              className="dropdown-item text-primary"
              onClick={() => handleAction(settleClaim, "Settled")}
            >
              Settle Claim
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
