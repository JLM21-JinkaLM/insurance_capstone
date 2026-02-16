export default function PolicyStepReview({ form }) {
  return (
    <div>
      <h6>Review Policy</h6>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
