import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import * as policyService from "../../services/policyService";
import { ToastContext } from "../../context/ToastContext";

export default function PolicyFormModal({
  show,
  onClose,
  onSuccess,
  editData,
}) {
  const isEdit = !!editData;
  const { showToast } = useContext(ToastContext);

  const initialState = {
    policyNumber: "",
    insuredName: "",
    insuredType: "INDIVIDUAL",
    lineOfBusiness: "HEALTH",
    sumInsured: "",
    premium: "",
    retentionLimit: "",
    status: "DRAFT",
    effectiveFrom: "",
    effectiveTo: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm(initialState);
    }
  }, [editData, show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.policyNumber) return "Policy Number required";
    if (!form.insuredName) return "Insured Name required";
    if (!form.sumInsured) return "Sum Insured required";
    if (!form.premium) return "Premium required";
    if (!form.retentionLimit) return "Retention Limit required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await policyService.updatePolicy(editData._id, form);
        showToast("Policy updated successfully", "success");
      } else {
        await policyService.createPolicy({
          ...form,
          status: "DRAFT", // force default
        });
        showToast("Policy created successfully", "success");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create policy"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    const hasData =
      form.policyNumber ||
      form.insuredName ||
      form.sumInsured ||
      form.premium ||
      form.retentionLimit;

    if (hasData) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  const confirmCancel = () => {
    setShowCancelConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleCancelClick} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Edit Policy" : "Create Policy"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Policy Number</Form.Label>
                <Form.Control
                  name="policyNumber"
                  value={form.policyNumber}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Insured Name</Form.Label>
                <Form.Control
                  name="insuredName"
                  value={form.insuredName}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Insured Type</Form.Label>
                <Form.Select
                  name="insuredType"
                  value={form.insuredType}
                  onChange={handleChange}
                >
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="CORPORATE">Corporate</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Line Of Business</Form.Label>
                <Form.Select
                  name="lineOfBusiness"
                  value={form.lineOfBusiness}
                  onChange={handleChange}
                >
                  <option value="HEALTH">Health</option>
                  <option value="MOTOR">Motor</option>
                  <option value="LIFE">Life</option>
                  <option value="PROPERTY">Property</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Sum Insured</Form.Label>
                <Form.Control
                  type="number"
                  name="sumInsured"
                  value={form.sumInsured}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Premium</Form.Label>
                <Form.Control
                  type="number"
                  name="premium"
                  value={form.premium}
                  onChange={handleChange}
                />
              </Col>

              
            </Row>

            {/* Status Disabled */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  value="DRAFT"
                  disabled
                />
              </Col>
              <Col md={6}>
                <Form.Label>Retention Limit</Form.Label>
                <Form.Control
                  type="number"
                  name="retentionLimit"
                  value={form.retentionLimit}
                  onChange={handleChange}
                />
              </Col>

              
            </Row>

            <Row>
              <Col md={6}>
                <Form.Label>Effective From</Form.Label>
                <Form.Control
                  type="date"
                  name="effectiveFrom"
                  value={form.effectiveFrom}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Effective To</Form.Label>
                <Form.Control
                  type="date"
                  name="effectiveTo"
                  value={form.effectiveTo}
                  onChange={handleChange}
                />
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        show={showCancelConfirm}
        onHide={() => setShowCancelConfirm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Discard Changes?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have unsaved changes. Are you sure you want to cancel?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCancelConfirm(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
