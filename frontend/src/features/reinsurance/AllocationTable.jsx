export default function AllocationTable({ allocations, setAllocations }) {

  const updateValue = (index, field, value) => {
    const updated = [...allocations];
    updated[index][field] = Number(value);
    setAllocations(updated);
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Reinsurer</th>
          <th>Allocated %</th>
          <th>Allocated Amount</th>
        </tr>
      </thead>
      <tbody>
        {allocations.map((a, index) => (
          <tr key={index}>
            <td>{a.reinsurerId?.name}</td>
            <td>
              <input
                type="number"
                value={a.allocatedPercentage}
                className="form-control"
                onChange={(e) =>
                  updateValue(index, "allocatedPercentage", e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={a.allocatedAmount}
                className="form-control"
                onChange={(e) =>
                  updateValue(index, "allocatedAmount", e.target.value)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
