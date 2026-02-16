import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";
import LogoutModal from "../shared/LogoutModal";

export default function TopBar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    showToast("Logged out successfully!", "warning");
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm">

        {/* 🔹 LEFT SIDE - LOGO */}
        <div className="d-flex align-items-center">
          <h5 className="mb-0 fw-bold text-dark">
            Insurance Management
          </h5>
        </div>

        {/* 🔹 RIGHT SIDE - USER INFO + LOGOUT */}
        <div className="d-flex align-items-center gap-3">

          {/* User Info */}
          <div className="text-end">
            <div className="fw-semibold">{user?.username}</div>
            <span className="badge bg-secondary">
              {user?.role}
            </span>
          </div>

          {/* Logout Button */}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setShowLogout(true)}
          >
            Logout
          </button>
        </div>
      </div>

      <LogoutModal
        show={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
