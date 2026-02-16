export default function AuditLogDetailsModal({ log, onClose }) {
  if (!log) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-4">

          <h5>Audit Details</h5>

          <p><strong>Entity:</strong> {log.entityType}</p>
          <p><strong>Action:</strong> {log.action}</p>
          <p><strong>Performed By:</strong> {log.performedBy?.email}</p>

          <hr />

          <h6>Old Value</h6>
          <pre>{JSON.stringify(log.oldValue, null, 2)}</pre>

          <h6>New Value</h6>
          <pre>{JSON.stringify(log.newValue, null, 2)}</pre>

          <button className="btn btn-secondary mt-3" onClick={onClose}>
            Close
          </button>

        </div>
      </div>
    </div>
  );
}
