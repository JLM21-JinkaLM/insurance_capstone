export default function ClaimStatusTimeline({ status }) {
  const stages = [
    "SUBMITTED",
    "IN_REVIEW",
    "APPROVED",
    "REJECTED",
    "SETTLED"
  ];

  return (
    <div className="d-flex justify-content-between align-items-center my-4">
      {stages.map((stage, index) => (
        <div key={stage} className="text-center flex-fill">
          <div
            className={`rounded-circle mx-auto mb-2 ${
              stage === status
                ? "bg-primary text-white"
                : "bg-light"
            }`}
            style={{ width: 40, height: 40, lineHeight: "40px" }}
          >
            {index + 1}
          </div>
          <small>{stage}</small>
        </div>
      ))}
    </div>
  );
}
