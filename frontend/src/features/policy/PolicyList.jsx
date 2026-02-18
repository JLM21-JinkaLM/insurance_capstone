import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { policyAPI } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/login.css";

const PolicyList = () => {
  const { user } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await policyAPI.getPolicies();
        setPolicies(res.data);
      } catch (err) {
        setError("Failed to load policies.");
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const filteredPolicies = policies.filter((p) =>
    p.insuredName.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "DRAFT":
        return "bg-secondary";
      case "SUBMITTED":
        return "bg-primary";
      case "ACTIVE":
        return "bg-success";
      case "SUSPENDED":
        return "bg-warning text-dark";
      case "EXPIRED":
        return "bg-danger";
      default:
        return "bg-dark";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* HEADER SECTION */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Policy Control Center</h3>
        <p className="text-muted">
          Monitor underwriting lifecycle & policy performance
        </p>
      </div>

      {/* SUMMARY STRIP */}
      {/* GRADIENT SUMMARY STRIP */}
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card summary-gradient text-white border-0 shadow-lg">
            <div className="card-body">
              <small className="opacity-75">Total Policies</small>
              <h3 className="fw-bold mb-0">{policies.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card summary-gradient-success text-white border-0 shadow-lg">
            <div className="card-body">
              <small className="opacity-75">Active Policies</small>
              <h3 className="fw-bold mb-0">
                {policies.filter((p) => p.status === "ACTIVE").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card summary-gradient-warning text-white border-0 shadow-lg">
            <div className="card-body">
              <small className="opacity-75">Draft Policies</small>
              <h3 className="fw-bold mb-0">
                {policies.filter((p) => p.status === "DRAFT").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 text-md-end d-flex align-items-center justify-content-md-end">
          {user?.role === "UNDERWRITER" && (
            <Link to="/policy/create" className="btn btn-dark px-4 shadow">
              + New Policy
            </Link>
          )}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <input
            type="text"
            placeholder="Search by insured name..."
            className="form-control form-control-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* HORIZONTAL POLICY LIST */}
      <div className="card border-0 shadow-sm mb-2 bg-light">
        <div className="card-body py-2">
          <div className="row fw-semibold text-muted  text-center text-md-start">
            <div className="col-md-2">Policy No</div>
            <div className="col-md-2">Insured Name</div>
            <div className="col-md-2">Premium</div>
            <div className="col-md-2">Sum Insured</div>
            <div className="col-md-2">Effective From</div>
            <div className="col-md-1 text-center">Status</div>
            <div className="col-md-1 text-center">Actions</div>
          </div>
        </div>
      </div>
      {filteredPolicies.map((policy) => (
        <div
          key={policy._id}
          className="card policy-row border-0 shadow-sm mb-3"
        >
          <div className="card-body">
            <div className="row align-items-center text-center text-md-start">
              {/* Column 1: Policy Number */}
              <div className="col-md-2 mb-3 mb-md-0">
                <div className="fw-bold">{policy.policyNumber}</div>
                <small className="text-muted">{policy.lineOfBusiness}</small>
              </div>

              {/* Column 2: Insured Name */}
              <div className="col-md-2 mb-3 mb-md-0">
                <div>{policy.insuredName}</div>
              </div>

              {/* Column 3: Premium */}
              <div className="col-md-2 mb-3 mb-md-0">
                <small className="text-muted d-block">Premium</small>
                <strong>₹{policy.premium?.toFixed(2) || 0}</strong>
              </div>

              {/* Column 4: Sum Insured (New Column) */}
              <div className="col-md-2 mb-3 mb-md-0">
                <small className="text-muted d-block">Sum Insured</small>
                <strong>₹{policy.sumInsured?.toFixed(2) || 0}</strong>
              </div>

              {/* Column 5: Effective From (New Column) */}
              <div className="col-md-2 mb-3 mb-md-0">
                <small className="text-muted d-block">Effective From</small>
                <strong>{policy.effectiveFrom || "-"}</strong>
              </div>

              {/* Column 6: Status */}
              <div className="col-md-1 mb-3 mb-md-0 text-center">
                <span
                  className={`badge px-3 py-2 ${getStatusBadge(policy.status)}`}
                >
                  {policy.status}
                </span>
              </div>

              {/* Column 7: Actions */}
              <div className="col-md-1 text-center">
                <Link
                  to={`/policy/${policy._id}`}
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  View
                </Link>

                {user?.role === "UNDERWRITER" && (
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this policy?")) return;
                      try {
                        await policyAPI.deletePolicy(policy._id);
                        setPolicies(
                          policies.filter((p) => p._id !== policy._id),
                        );
                      } catch {
                        setError("Failed to delete policy.");
                      }
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
