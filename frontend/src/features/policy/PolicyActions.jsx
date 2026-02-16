import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContext } from "../../context/ToastContext";
import * as policyService from "../../services/policyService";

export default function PolicyActions({ policy, refresh }) {
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await policyService.changeStatus(policy._id, newStatus);
      showToast("Status updated successfully", "success");
      refresh();
    } catch {
      showToast("Status update failed", "danger");
    }
  };

  const confirmDelete = async () => {
    try {
      await policyService.deletePolicy(policy._id);
      showToast("Policy deleted successfully", "success");
      setShowDeleteModal(false);
      refresh();
    } catch {
      showToast("Delete failed", "danger");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3">

        {/* Status Dropdown */}
        {(user?.role === "UNDERWRITER" || user?.role === "ADMIN") && (
          <select
            className="form-select form-select-sm"
            style={{ width: "130px" }}
            value={policy.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="EXPIRED">Expired</option>
          </select>
        )}

        {/* Delete Button (Admin Only) */}
        {user?.role === "ADMIN" && (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        )}
      </div>

      {/* 🔥 Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete policy
          <strong> {policy.policyNumber}</strong>?
          <br />
          This action cannot be undone.
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={confirmDelete}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
