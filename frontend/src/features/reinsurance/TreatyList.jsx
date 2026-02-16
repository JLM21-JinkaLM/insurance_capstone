import useReinsurance from "../../hooks/useReinsurance";

export default function TreatyList() {
  const { treaties } = useReinsurance();

  return (
    <div className="card p-3 shadow-sm">
      <h4>Treaties</h4>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Share %</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {treaties.map((t) => (
            <tr key={t._id}>
              <td>{t.treatyName}</td>
              <td>{t.treatyType}</td>
              <td>{t.sharePercentage}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
