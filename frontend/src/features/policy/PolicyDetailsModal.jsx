import { Modal, Button, Row, Col } from "react-bootstrap";

export default function PolicyDetailsModal({ policy, onClose }) {
  if (!policy) return null;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  return (
    <Modal show={!!policy} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Policy Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Row className="mb-3">
          <Col md={4}>
            <strong>Policy Number:</strong>
            <div>{policy.policyNumber}</div>
          </Col>
          <Col md={4}>
            <strong>Status:</strong>
            <div>
              <span
                className={`badge ${
                  policy.status === "ACTIVE"
                    ? "bg-success"
                    : policy.status === "DRAFT"
                    ? "bg-secondary"
                    : policy.status === "SUSPENDED"
                    ? "bg-warning"
                    : "bg-danger"
                }`}
              >
                {policy.status}
              </span>
            </div>
          </Col>
          <Col md={4}>
            <strong>Insured Name:</strong>
            <div>{policy.insuredName}</div>
          </Col>
        </Row>

        <Row className="mb-3">
          
          <Col md={4}>
            <strong>Line Of Business:</strong>
            <div>{policy.lineOfBusiness}</div>
          </Col>
          <Col md={4}>
            <strong>Sum Insured:</strong>
            <div>{policy.sumInsured}</div>
          </Col>
          <Col md={4}>
            <strong>Premium:</strong>
            <div>{policy.premium}</div>
          </Col>
        </Row>

        <Row className="mb-3">
          
          <Col md={4}>
            <strong>Retention Limit:</strong>
            <div>{policy.retentionLimit}</div>
          </Col>
          <Col md={4}>
            <strong>Effective From:</strong>
            <div>{formatDate(policy.effectiveFrom)}</div>
          </Col>

          <Col md={4}>
            <strong>Effective To:</strong>
            <div>{formatDate(policy.effectiveTo)}</div>
          </Col>
        </Row>

        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
