function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STATUS_STYLES = {
  SUBMITTED: "bg-blue/10 text-blue",
  APPLIED: "bg-green-500/10 text-green-700",
  DISCARDED: "bg-bg text-text-light",
};

export default function RequestHistory({ edits }) {
  return (
    <div className="card">
      <h2 className="font-semibold text-navy mb-4">My Profile Edit Requests</h2>

      {edits.length === 0 ? (
        <p className="text-text-light text-sm">You haven't submitted any profile edits yet.</p>
      ) : (
        <div className="space-y-3">
          {edits.map((edit) => (
            <div key={edit.id} className="flex items-center justify-between border border-border rounded-btn px-4 py-3">
              <div>
                <p className="text-sm text-navy font-medium">Submitted {formatDate(edit.submitted_at)}</p>
                {edit.applied_at && (
                  <p className="text-xs text-text-light mt-0.5">Applied {formatDate(edit.applied_at)}</p>
                )}
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[edit.status] || "bg-bg text-text-light"}`}>
                {edit.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
