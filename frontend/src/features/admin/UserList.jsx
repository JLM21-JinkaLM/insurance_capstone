import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "../../services/adminService";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      alert("Error loading users");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await updateUserRole(id, role);
      load();
    } catch {
      alert("Error updating role");
    }
  };

  return (
    <div className="card p-3 shadow-sm">
      <h4>User Management</h4>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>
                <select
                  className="form-control"
                  value={u.role}
                  onChange={(e) =>
                    changeRole(u._id, e.target.value)
                  }
                >
                  <option>ADMIN</option>
                  <option>UNDERWRITER</option>
                  <option>CLAIMS_ADJUSTER</option>
                  <option>REINSURANCE_MANAGER</option>
                </select>
              </td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
