import { useEffect, useState } from "react";
import { getAuditLogs } from "../services/auditService";

export default function useAudit() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getAuditLogs(filters);
      setLogs(data);
    } catch {
      alert("Error loading audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { logs, loading, load };
}
