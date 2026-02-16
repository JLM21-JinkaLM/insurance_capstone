export default function AuditLogFilters({ onFilter }) {
  const applyFilter = (e) => {
    e.preventDefault();
    const entityType = e.target.entityType.value;
    onFilter({ entityType });
  };

  return (
    <form className="row g-2 mb-3" onSubmit={applyFilter}>
      <div className="col-md-4">
        <select name="entityType" className="form-control">
          <option value="">All Entities</option>
          <option value="POLICY">Policy</option>
          <option value="CLAIM">Claim</option>
          <option value="TREATY">Treaty</option>
          <option value="USER">User</option>
        </select>
      </div>

      <div className="col-md-2">
        <button className="btn btn-primary">Filter</button>
      </div>
    </form>
  );
}
