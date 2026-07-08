// A small callout used to mark features that need real backend/integration
// work (auth, OSM autocomplete, file storage, RBAC, etc.) rather than
// building that complexity into this frontend boilerplate.
export default function PlaceholderNote({ title, children }) {
  return (
    <div className="placeholder-note flex gap-3">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue shrink-0 mt-0.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
      <div>
        {title && <p className="font-semibold text-navy mb-1">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
