const STYLES = {
  PENDING: "bg-blue/10 text-blue",
  SUBMITTED: "bg-blue/10 text-blue",
  APPROVED: "bg-green-500/10 text-green-700",
  APPLIED: "bg-green-500/10 text-green-700",
  ACTIVE: "bg-green-500/10 text-green-700",
  REJECTED: "bg-red/10 text-red",
  DISCARDED: "bg-bg text-text-light",
  INACTIVE: "bg-bg text-text-light",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STYLES[status] || "bg-bg text-text-light"}`}>
      {status}
    </span>
  );
}
