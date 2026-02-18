import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/login.css";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  let menuItems = [];
  if (user?.role === "ADMIN") {
    menuItems.push({ label: "Users", path: "/admin", icon: "bi-people-fill" });
    menuItems.push({ label: "Audit Logs", path: "/admin/audit-logs", icon: "bi-journal-text" });
    menuItems.push({ label: "Policies", path: "/policy", icon: "bi-file-earmark-text-fill" });
    menuItems.push({ label: "Claims", path: "/claims", icon: "bi-briefcase-fill" });
    menuItems.push({ label: "Reinsurance", path: "/reinsurance", icon: "bi-arrow-repeat" });
  } else if (user?.role === "UNDERWRITER") {
    menuItems.push({ label: "Policies", path: "/policy", icon: "bi-file-earmark-text-fill" });
  } else if (user?.role === "CLAIMS_ADJUSTER") {
    menuItems.push({ label: "Policies", path: "/policy", icon: "bi-file-earmark-text-fill" });
    menuItems.push({ label: "Claims", path: "/claims", icon: "bi-briefcase-fill" });
  } else if (user?.role === "REINSURANCE_MANAGER") {
    menuItems.push({ label: "Policies", path: "/policy", icon: "bi-file-earmark-text-fill" });
    menuItems.push({ label: "Reinsurance", path: "/reinsurance", icon: "bi-arrow-repeat" });
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navy-pro shadow-lg px-4 sticky-top">
      <div className="container-fluid">

        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <div className="brand-logo me-2">
            <i className="bi bi-shield-check"></i>
          </div>
          <span className="brand-text">AegisRe</span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>

          {/* Menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link nav-hover px-3 ${
                    isActive(item.path) ? "active-nav" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Info */}
          <div className="d-flex align-items-center">

            <div className="user-badge me-3">
              <div className="fw-semibold small">{user?.username}</div>
              <div className="role-text small">
                {user?.role?.replace(/_/g, " ")}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm px-3 rounded-pill"
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
