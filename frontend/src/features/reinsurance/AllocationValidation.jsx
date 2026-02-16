export default function AllocationValidation({ allocations }) {
  const totalPercentage = allocations.reduce(
    (sum, a) => sum + Number(a.allocatedPercentage || 0),
    0
  );

  if (totalPercentage > 100) {
    return (
      <div className="alert alert-danger">
        Allocation exceeds 100%
      </div>
    );
  }

  return (
    <div className="alert alert-success">
      Total Allocation: {totalPercentage}%
    </div>
  );
}
