import { createContext, useState } from "react";
import AppToast from "../shared/AppToast";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AppToast
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}
