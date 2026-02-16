export default function AuditTimeline({ logs }) {
  return (
    <div className="mt-4">
      <h6>Audit Timeline</h6>

      {logs.map((log) => (
        <div key={log._id} className="border-start ps-3 mb-3">
          <strong>{log.entityType}</strong> — {log.action}
          <div className="text-muted small">
            {new Date(log.performedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
