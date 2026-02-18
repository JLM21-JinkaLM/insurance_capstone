import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { authAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import "../../styles/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector(".login-card")?.classList.add("fade-in");
  }, []);

  const showToast = () => {
    const toastEl = document.getElementById("loginToast");
    const toast = new Toast(toastEl, {
      delay: 1500,
      autohide: true,
    });
    toast.show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await authAPI.login(username, password);

      const userObj = {
        ...res.data.user,
        _id: res.data.user.id,
      };

      login(userObj, res.data.token);

      showToast();

      setTimeout(() => {
        navigate("/");
      }, 1600);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">

      {/* LEFT BRAND PANEL */}
      <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center brand-panel text-white">
        <div className="text-center px-5">
          <h1 className="display-5 fw-bold mb-3">AegisRe</h1>
          <p className="lead mb-4">
            Global Risk. Intelligent Protection.
          </p>
          <p>
            Enterprise Insurance & Reinsurance Management Platform designed for 
            Underwriters, Claims Adjusters, Reinsurance Managers & Administrators.
          </p>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="col-md-6 d-flex align-items-center justify-content-center bg-glass">

        <div className="card login-card shadow-lg border-0 rounded-4 p-4">

          <div className="card-body">

            {/* Logo */}
            <div className="text-center mb-4">
              <div className="logo-circle mb-3">
                🛡
              </div>
              <h4 className="fw-semibold text-dark">
                AegisRe Insurance Group
              </h4>
              <small className="text-muted">
                Secure Enterprise Access
              </small>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing in...
                  </>
                ) : (
                  "Login Securely"
                )}
              </button>

            </form>

          </div>
        </div>
      </div>

      {/* TOP CENTER TOAST */}
      <div className="position-fixed top-0 start-50 translate-middle-x mt-4" style={{ zIndex: 1055 }}>
        <div
          id="loginToast"
          className="toast text-white border-0 shadow"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ backgroundColor: "#142b5f", minWidth: "350px" }}
        >
          <div className="d-flex">
            <div className="toast-body text-center fw-semibold">
              ✅ Login Successful! Redirecting...
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
            ></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
