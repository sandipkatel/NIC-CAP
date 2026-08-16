const STYLES = {
  DRAFT: "bg-bg text-text-light",
  PUBLISHED: "bg-blue/10 text-blue",
  COMPLETED: "bg-green-500/10 text-green-700",
  REPORTED: "bg-navy/10 text-navy",
};

export default function EventStatusBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STYLES[status] || "bg-bg text-text-light"}`}>
      {status}
    </span>
  );
}
