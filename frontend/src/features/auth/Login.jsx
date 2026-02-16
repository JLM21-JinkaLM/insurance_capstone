import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContext } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);

      if (res.success) {
        showToast("Login successful!", "success");
        navigate("/dashboard");
      } else {
        showToast(res.message || "Login failed!", "danger");
      }
    } catch (err) {
      showToast("Something went wrong!", "danger");
    }
  };

  return (
    <div className="container col-md-4 mt-5">
      <div className="card p-4 shadow">
        <h4 className="text-center">Login</h4>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
