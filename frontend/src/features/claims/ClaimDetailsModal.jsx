import { Modal, Button, Dropdown } from "react-bootstrap";
import { useContext, useState } from "react";
import {
  reviewClaim,
  approveClaim,
  rejectClaim,
  settleClaim
} from "../../services/claimsService";
import { ToastContext } from "../../context/ToastContext";

export default function ClaimDetailsModal({ claim, onClose, reload }) {
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  if (!claim) return null;

  const handleAction = async (type) => {
    try {
      setLoading(true);

      if (type === "IN_REVIEW")
        await reviewClaim(claim._id);

      if (type === "APPROVED")
        await approveClaim(claim._id);

      if (type === "REJECTED")
        await rejectClaim(claim._id);

      if (type === "SETTLED") {
        const response = await settleClaim(claim._id);

        showToast(
          `Claim settled. Amount Paid: ₹ ${response.data.settlementAmount}`,
          "success"
        );

        await reload();
        onClose();
        return;
      }

      showToast(`Claim moved to ${type}`, "success");

      await reload();
      onClose();

    } catch (err) {
      showToast(err.response?.data?.message || "Action failed", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={!!claim} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Claim Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Claim No:</strong> {claim.claimNumber}</p>
        <p><strong>Claim Amount:</strong> ₹ {claim.claimAmount}</p>
        <p><strong>Status:</strong> {claim.status}</p>

        {claim.settlementAmount > 0 && (
          <p><strong>Settlement Paid:</strong> ₹ {claim.settlementAmount}</p>
        )}

        {claim.policyId && (
          <>
            <hr />
            <p><strong>Policy No:</strong> {claim.policyId.policyNumber}</p>
            <p><strong>Sum Insured:</strong> ₹ {claim.policyId.sumInsured}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Dropdown>
          <Dropdown.Toggle disabled={loading}>
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>

            {claim.status === "SUBMITTED" && (
              <Dropdown.Item onClick={() => handleAction("IN_REVIEW")}>
                Mark In Review
              </Dropdown.Item>
            )}

            {claim.status === "IN_REVIEW" && (
              <>
                <Dropdown.Item onClick={() => handleAction("APPROVED")}>
                  Approve
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleAction("REJECTED")}>
                  Reject
                </Dropdown.Item>
              </>
            )}

            {claim.status === "APPROVED" && (
              <Dropdown.Item onClick={() => handleAction("SETTLED")}>
                Settle Claim
              </Dropdown.Item>
            )}

          </Dropdown.Menu>
        </Dropdown>
      </Modal.Footer>
    </Modal>
  );
}
