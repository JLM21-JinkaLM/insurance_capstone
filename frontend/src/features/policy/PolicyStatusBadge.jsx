export default function PolicyStatusBadge({ status }) {
  const colors = {
    DRAFT: "secondary",
    ACTIVE: "success",
    SUSPENDED: "warning",
    EXPIRED: "danger"
  };

  return (
    <span className={`badge bg-${colors[status]}`}>
      {status}
    </span>
  );
}
