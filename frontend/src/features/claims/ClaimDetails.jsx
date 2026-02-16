export default function ClaimDetails() {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);

  const load = async () => {
    try {
      const data = await getClaimById(id);
      setClaim(data);
    } catch {
      alert("Failed to load claim");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!claim) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Claim #{claim.claimNumber}</h4>
          <span className="badge bg-info">{claim.status}</span>
        </div>

        <div className="row">
          <div className="col-md-6">
            <p><strong>Policy:</strong> {claim.policy?.policyNumber}</p>
            <p><strong>Claim Amount:</strong> ₹ {claim.claimAmount}</p>
          </div>

          <div className="col-md-6">
            <p><strong>Filed Date:</strong> {new Date(claim.createdAt).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {claim.description}</p>
          </div>
        </div>

        <ClaimStatusTimeline status={claim.status} />
        <ClaimActionPanel claim={claim} reload={load} />
        <ClaimNotes claimId={claim._id} />
        <ClaimDocuments claimId={claim._id} />

      </div>
    </div>
  );
}
