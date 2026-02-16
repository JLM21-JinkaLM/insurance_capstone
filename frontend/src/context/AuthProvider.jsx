import { createContext, useState } from "react";
import apiClient from "../services/apiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = async (credentials) => {
    try {
      const res = await apiClient.post("/users/login", credentials);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
