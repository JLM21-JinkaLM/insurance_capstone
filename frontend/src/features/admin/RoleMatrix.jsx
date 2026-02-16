import { useState } from "react";
import { Modal, Button, Alert, Table } from "react-bootstrap";

const roleAccess = {
  UNDERWRITER: {
    policies: "Create/Edit",
    claims: "View",
    reinsurers: "View",
    treaties: "View",
    risk: "View",
    users: "No"
  },
  CLAIMS_ADJUSTER: {
    policies: "View",
    claims: "Full",
    reinsurers: "View",
    treaties: "View",
    risk: "View",
    users: "No"
  },
  REINSURANCE_ANALYST: {
    policies: "View",
    claims: "View",
    reinsurers: "Full",
    treaties: "Full",
    risk: "Full",
    users: "No"
  },
  ADMIN: {
    policies: "Full",
    claims: "Full",
    reinsurers: "Full",
    treaties: "Full",
    risk: "Full",
    users: "Full"
  }
};

export default function RoleMatrix() {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);

  const getBadge = (value) => {
    const colors = {
      Full: "success",
      View: "info",
      "Create/Edit": "warning",
      No: "secondary"
    };

    return (
      <span className={`badge bg-${colors[value]}`}>
        {value}
      </span>
    );
  };

  const handleSave = async () => {
    try {
      // Example API call
      // await adminService.updateRoleMatrix()

      setAlert({ type: "success", message: "Role matrix saved successfully!" });
      setShowModal(false);
    } catch (error) {
      setAlert({ type: "danger", message: "Failed to save role matrix." });
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">ROLE ACCESS RULES</h4>

      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Module</th>
            <th>Underwriter</th>
            <th>Claims Adjuster</th>
            <th>Reinsurance Analyst</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {["policies", "claims", "reinsurers", "treaties", "risk", "users"].map((module) => (
            <tr key={module}>
              <td className="text-capitalize">{module}</td>
              <td>{getBadge(roleAccess.UNDERWRITER[module])}</td>
              <td>{getBadge(roleAccess.CLAIMS_ADJUSTER[module])}</td>
              <td>{getBadge(roleAccess.REINSURANCE_ANALYST[module])}</td>
              <td>{getBadge(roleAccess.ADMIN[module])}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Save Changes
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update role access rules?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
