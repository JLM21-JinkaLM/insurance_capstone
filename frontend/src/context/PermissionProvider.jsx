import { createContext } from "react";

export const PermissionContext = createContext();

export default function PermissionProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <PermissionContext.Provider value={{ hasRole }}>
      {children}
    </PermissionContext.Provider>
  );
}
