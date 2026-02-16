import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import AppShell from "../layout/AppShell";
import PolicyList from "../features/policy/PolicyList";
import PolicyDetails from "../features/policy/PolicyDetails";
import CreatePolicyWizard from "../features/policy/CreatePolicyWizard";
import ClaimsList from "../features/claims/ClaimsList";
import ClaimDetails from "../features/claims/ClaimDetails";
import Dashboard from "../features/dashboard/Dashboard";
import TreatyList from "../features/reinsurance/TreatyList";
import TreatyForm from "../features/reinsurance/TreatyForm";
import RiskAllocationView from "../features/reinsurance/RiskAllocationView";
// import UserList from "../features/admin/UserList";
import RoleMatrix from "../features/admin/RoleMatrix";
// import PermissionEditor from "../features/admin/PermissionEditor";
// import TreatyConfiguration from "../features/admin/TreatyConfiguration";
// import ThresholdConfig from "../features/admin/ThresholdConfig";
import RoleRoute from "../routes/RoleRoute";
import AuditLogList from "../features/audit/AuditLogList";
import Login from "../features/auth/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "UNDERWRITER", "CLAIMS_ADJUSTER", "REINSURANCE_MANAGER"]}>
            <AppShell>
              <Dashboard />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />

      <Route
        path="/policies"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "UNDERWRITER"]}>
            <AppShell>
              <PolicyList />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/policies/new"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "UNDERWRITER"]}>
            <AppShell>
              <CreatePolicyWizard />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/policies/:id"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "UNDERWRITER"]}>
            <AppShell>
              <PolicyDetails />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/claims"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "CLAIMS_ADJUSTER"]}>
            <AppShell>
              <ClaimsList />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/claims/:id"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "CLAIMS_ADJUSTER"]}>
            <AppShell>
              <ClaimDetails />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/treaties"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "REINSURANCE_MANAGER"]}>
            <AppShell>
              <TreatyList />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/treaties/new"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "REINSURANCE_MANAGER"]}>
            <AppShell>
              <TreatyForm />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/risk-allocations"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN", "REINSURANCE_MANAGER"]}>
            <AppShell>
              <RiskAllocationView />
            </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN"]}>
              <AppShell>
                <>
                  <UserList />
                  <RoleMatrix />
                  <PermissionEditor />
                  <TreatyConfiguration />
                  <ThresholdConfig />
                </>
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/admin/roles"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN"]}>
              <AppShell>
                <RoleMatrix />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/audit"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["ADMIN"]}>
              <AppShell>
                <AuditLogList />
              </AppShell>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
