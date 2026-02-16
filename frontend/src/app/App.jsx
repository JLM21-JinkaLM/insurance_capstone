import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import PermissionProvider from "../context/PermissionProvider";
import AppRoutes from "./AppRoutes";
import { ToastProvider } from "../context/ToastContext";
export default function App() {
  return (
   <AuthProvider>
      <PermissionProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </PermissionProvider>
    </AuthProvider>
  );
}
