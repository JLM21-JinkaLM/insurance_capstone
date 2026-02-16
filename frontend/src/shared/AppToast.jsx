import { Toast, ToastContainer } from "react-bootstrap";

export default function AppToast({ show, message, variant, onClose }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
