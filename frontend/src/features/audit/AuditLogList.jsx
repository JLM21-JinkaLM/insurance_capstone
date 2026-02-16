import { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/auditService";

export default function AuditLogList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await getAuditLogs();
      setLogs(data);
    } catch {
      alert("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h4>Audit Logs</h4>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Entity</th>
            <th>Action</th>
            <th>User</th>
            <th>Date</th>
            <th>IP</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.entityType}</td>
              <td>
                <span className="badge bg-primary">
                  {log.action}
                </span>
              </td>
              <td>{log.performedBy?.username}</td>
              <td>
                {new Date(log.performedAt).toLocaleString()}
              </td>
              <td>{log.ipAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
