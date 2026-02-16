import { useState } from "react";

export default function PermissionEditor() {
  const [permissions, setPermissions] = useState([]);

  const toggle = (perm) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter((p) => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  const perms = ["CREATE_POLICY", "APPROVE_CLAIM", "MANAGE_TREATY"];

  return (
    <div className="card p-3 mt-4">
      <h5>Permission Editor</h5>

      {perms.map((p) => (
        <div key={p}>
          <input
            type="checkbox"
            onChange={() => toggle(p)}
          />{" "}
          {p}
        </div>
      ))}
    </div>
  );
}
