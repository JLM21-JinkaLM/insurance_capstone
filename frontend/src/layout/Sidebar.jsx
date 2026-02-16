import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role?.toUpperCase(); 
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "260px" }}>
      <h5 className="mb-4">Insurance Management</h5>

      <ul className="nav flex-column">

        <Link className="nav-link text-white" to="/dashboard">
          Dashboard
        </Link>

        {/* Policies */}
        {(user?.role === "UNDERWRITER" || user?.role === "ADMIN") && (
          <Link className="nav-link text-white" to="/policies">
            Policies
          </Link>
        )}

        {/* Claims */}
        {(user?.role === "CLAIMS_ADJUSTER" || user?.role === "ADMIN") && (
          <Link className="nav-link text-white" to="/claims">
            Claims
          </Link>
        )}

        {/* Reinsurance */}
        {(user?.role === "REINSURANCE_MANAGER" || user?.role === "ADMIN") && (
          <>
            <Link className="nav-link text-white" to="/treaties">
              Treaties
            </Link>
            <Link className="nav-link text-white" to="/risk-allocations">
              Risk Allocation
            </Link>
          </>
        )}

        {/* Admin Only */}
        {user?.role === "ADMIN" && (
          <>
            <Link className="nav-link text-white" to="/audit">
              Audit Logs
            </Link>

            {/* <Link className="nav-link text-white" to="/admin/roles">
              Role Matrix
            </Link> */}
          </>
        )}

      </ul>
    </div>
  );
}
