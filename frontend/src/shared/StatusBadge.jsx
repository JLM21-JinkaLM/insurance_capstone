export default function StatusBadge({ status }) {
  const colors = {
    ACTIVE: "success",
    APPROVED: "success",
    REJECTED: "danger",
    IN_REVIEW: "warning"
  };

  return (
    <span className={`badge bg-${colors[status] || "secondary"}`}>
      {status}
    </span>
  );
}
