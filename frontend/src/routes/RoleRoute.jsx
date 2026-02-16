import { Navigate } from "react-router-dom";

export default function RoleRoute({ roles, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" />;

  const role = user.role?.toUpperCase();

  if (!roles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}





// import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import { Navigate } from "react-router-dom";

// export default function RoleRoute({ roles, children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/" />;

//   // 🔥 Admin override
//   if (user.role === "ADMIN") return children;

//   if (!roles.includes(user.role)) {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// }
