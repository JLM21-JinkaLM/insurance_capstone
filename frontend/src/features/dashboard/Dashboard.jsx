import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { policyAPI, claimAPI, adminAPI } from "../../services/api";
import ExposureDashboard from "./ExposureDashboard";
import ClaimsRatioChart from "./ClaimsRatioChart";
import RiskDistributionChart from "./RiskDistributionChart";
import "../../styles/login.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    policies: 0,
    claims: 0,
    users: 0,
    loading: true,
  });
  const [lob, setLob] = useState("ALL");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [policiesRes, claimsRes, usersRes] = await Promise.all([
          policyAPI.getPolicies(),
          claimAPI.getClaims(),
          adminAPI.getUsers(),
        ]);
        setStats({
          policies: policiesRes.data.length,
          claims: claimsRes.data.length,
          users: usersRes.data.length,
          loading: false,
        });
      } catch (err) {
        console.error(err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ label, value, icon, bg }) => (
    <div className="col-md-4 mb-4">
      <div className={`card shadow-sm border-0 rounded-4 ${bg}`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-1">{label}</h6>
            <h3 className="fw-bold mb-0">
              {stats.loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                value
              )}
            </h3>
          </div>
          <div className="fs-2">{icon}</div>
        </div>
      </div>
    </div>
  );

  const role = user?.role;

  const renderDashboard = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <div className="row">
              <StatCard
                label="Total Users"
                value={stats.users}
                icon="👥"
                bg="bg-light border-start border-4 border-success"
              />
              <StatCard
                label="Total Policies"
                value={stats.policies}
                icon="📋"
                bg="bg-light border-start border-4 border-primary"
              />
              <StatCard
                label="Total Claims"
                value={stats.claims}
                icon="💼"
                bg="bg-light border-start border-4 border-warning"
              />
            </div>
          </>
        );

      case "UNDERWRITER":
        return (
          <>
            <div className="row">
              <StatCard
                label="Total Policies"
                value={stats.policies}
                icon="📋"
                bg="bg-light border-start border-4 border-primary"
              />
            </div>

            <div className="card shadow-sm border-0 rounded-4 mt-4">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">
                  Policy Analytics Overview
                </h5>
                {/* <ExposureDashboard filterLob={lob} /> */}
              </div>
            </div>
          </>
        );

      case "CLAIMS_ADJUSTER":
        return (
          <div className="card shadow-sm border-0 rounded-4 mt-3">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                Claims Ratio Analytics
              </h5>
              <ClaimsRatioChart filterLob={lob} />
            </div>
          </div>
        );

      case "REINSURANCE_MANAGER":
        return (
          <div className="card shadow-sm border-0 rounded-4 mt-3">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                Risk Distribution Overview
              </h5>
              <RiskDistributionChart />
            </div>
          </div>
        );

      default:
        return (
          <div className="alert alert-info shadow-sm rounded-4">
            Welcome to the Insurance & Reinsurance Management System.
          </div>
        );
    }
  };

  return (
    <div className="container-fluid py-4 bg-dashboard">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Welcome back, {user?.username} 👋
          </h2>
          <p className="text-muted mb-0">
            Insurance & Reinsurance Management Dashboard
          </p>
        </div>
        <div className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
          {user?.role?.replace(/_/g, " ")}
        </div>
      </div>

      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
