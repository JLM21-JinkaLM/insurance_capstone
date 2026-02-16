export default function AllocationSummary({ allocations, totalSum }) {
  const allocated = allocations.reduce(
    (sum, a) => sum + Number(a.allocatedAmount || 0),
    0
  );

  const retained = totalSum - allocated;

  return (
    <div className="card p-3 mt-3">
      <h6>Allocation Summary</h6>
      <p>Reinsured: {allocated}</p>
      <p>Retained: {retained}</p>
    </div>
  );
}
