"use client";

import { useState, useMemo, useEffect } from "react";
import { listAmbassadorsAction, getAmbassadorProfileAction } from "@/actions/ambassadorActions";

function fullName(a) {
  return `${a.first_name} ${a.last_name}`.trim();
}

function initials(a) {
  return fullName(a)
    .split(" ")
    .map((n) => n[0])
    .join("");
}

// "2027 Cohort" -> 2027, so we can sort batches newest-first. Falls back to
// string order if a batch name doesn't start with a year.
function batchSortKey(batch) {
  const match = batch.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : -Infinity;
}

export default function NetworkPage() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [query, setQuery] = useState("");
  const [batchMenuOpen, setBatchMenuOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Load the public directory once. page_size=100 to approximate "everyone" —
  // bump this or add real pagination controls if the roster grows past that.
  useEffect(() => {
    listAmbassadorsAction("?page_size=100").then((res) => {
      setIsLoading(false);
      if (!res.ok) {
        setLoadError(res.message || "Couldn't load the ambassador directory.");
        return;
      }
      console.log("Loaded ambassadors:", res.data);
      setAmbassadors(res.data);
    });
  }, []);

  const batches = useMemo(() => {
    const unique = [...new Set(ambassadors.map((a) => a.batch))];
    return unique.sort((a, b) => batchSortKey(b) - batchSortKey(a));
  }, [ambassadors]);

  // Default to the newest batch once the directory has loaded.
  useEffect(() => {
    if (batches.length > 0 && !selectedBatch) {
      setSelectedBatch(batches[0]);
    }
  }, [batches, selectedBatch]);

  const filtered = ambassadors.filter((a) => {
    const q = query.toLowerCase();
    const matchesQuery =
      fullName(a).toLowerCase().includes(q) ||
      a.college_name.toLowerCase().includes(q) ||
      a.faculty.toLowerCase().includes(q);
    return a.batch === selectedBatch && matchesQuery;
  });

  const isCurrentBatch = selectedBatch === batches[0];

  const openAmbassador = async (a) => {
    setSelectedId(a.id);
    setSelectedDetail(null);
    setDetailLoading(true);
    const res = await getAmbassadorProfileAction(a.id);
    setDetailLoading(false);
    if (res.ok) setSelectedDetail(res.data);
  };

  const closeModal = () => {
    setSelectedId(null);
    setSelectedDetail(null);
  };

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectedCard = ambassadors.find((a) => a.id === selectedId);

  return (
    <div className="container-page py-16">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="eyebrow mb-3">Ambassador Network</p>
          <h1 className="section-title mb-3">Meet the ambassadors</h1>
        </div>

        {/* Batch selector, top right */}
        {batches.length > 0 && (
          <div className="relative shrink-0">
            <button
              onClick={() => setBatchMenuOpen((o) => !o)}
              className="flex items-center gap-2 border border-border rounded-full px-4 py-2 text-sm font-semibold text-navy hover:bg-bg transition"
            >
              {selectedBatch}
              {isCurrentBatch && (
                <span className="text-[10px] bg-blue/10 text-blue px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  Current
                </span>
              )}
              <span className={`transition-transform ${batchMenuOpen ? "rotate-180" : ""}`}>▾</span>
            </button>

            {batchMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-20">
                {batches.map((b, i) => (
                  <button
                    key={b}
                    onClick={() => {
                      setSelectedBatch(b);
                      setBatchMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-bg transition flex items-center justify-between ${
                      b === selectedBatch ? "text-red font-semibold" : "text-navy"
                    }`}
                  >
                    {b}
                    {i === 0 && <span className="text-[10px] text-text-light">Current</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-text-light mb-8 max-w-2xl">
        Browse ambassadors by batch, or search by name, college, or faculty.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, college, or faculty..."
        className="input-field max-w-md mb-10"
      />

      {isLoading && <p className="text-text-light">Loading ambassadors...</p>}
      {loadError && <p className="text-red">{loadError}</p>}

      {!isLoading && !loadError && (
        <div className="flex flex-wrap justify-center gap-6">
          {filtered.map((a) => (
            <div
              key={a.id}
              onClick={() => openAmbassador(a)}
              className="group relative bg-white border border-border rounded-2xl overflow-hidden cursor-pointer transition hover:shadow-lg hover:-translate-y-1 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(20%-1.125rem)]"
            >
              {/* Photo — the focal point of the card */}
              <div className="relative w-full aspect-[4/4] bg-bg overflow-hidden">
                {a.profile_photo ? (
                  <img
                    src={a.profile_photo}
                    alt={fullName(a)}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue/10 to-navy/10">
                    <span className="text-6xl font-bold text-navy/25">{initials(a)}</span>
                  </div>
                )}

                {/* Gradient + name/college/CTA overlay */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white text-lg leading-tight drop-shadow-sm">
                      {fullName(a)}
                    </h3>
                    <p className="text-white/85 text-sm">{a.college_name}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAmbassador(a);
                    }}
                    className="shrink-0 text-white text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5 hover:bg-white/25 transition"
                  >
                    Know more
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-text-light col-span-full">
              No ambassadors in {selectedBatch} match &quot;{query}&quot;.
            </p>
          )}
        </div>
      )}

      {/* Detail modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-navy/40 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo — fixed-width column on desktop, capped-height banner on mobile */}
            <div className="relative w-full sm:w-56 h-48 sm:h-auto shrink-0 bg-bg">
              {selectedCard.profile_photo ? (
                <img
                  src={selectedCard.profile_photo}
                  alt={fullName(selectedCard)}
                  className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue/10 to-navy/10 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl">
                  <span className="text-6xl font-bold text-navy/25">{initials(selectedCard)}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <h2 className="font-bold text-navy text-xl leading-tight">
                {fullName(selectedCard)}
              </h2>
              <p className="text-text-light text-sm">{selectedCard.college_name}</p>
              <p className="text-text-light/70 text-xs mt-0.5 mb-5">{selectedCard.batch}</p>

              {detailLoading && <p className="text-text-light text-sm">Loading profile...</p>}

              {!detailLoading && selectedDetail && (
                <div className="space-y-5">
                  <div>
                    <p className="eyebrow mb-1">Faculty</p>
                    <p className="text-text-light text-sm">{selectedDetail.faculty}</p>
                  </div>
                  {selectedDetail.bio && (
                    <div>
                      <p className="eyebrow mb-1">About</p>
                      <p className="text-text-light text-sm">{selectedDetail.bio}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-4 flex-wrap">
                  {selectedDetail?.linkedin_url && (
                    <a
                      href={selectedDetail.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red text-sm font-semibold hover:underline"
                    >
                      LinkedIn →
                    </a>
                  )}
                  {selectedDetail?.github_url && (
                    <a
                      href={selectedDetail.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-navy text-sm font-semibold hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {selectedDetail?.portfolio_url && (
                    <a
                      href={selectedDetail.portfolio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-navy text-sm font-semibold hover:underline"
                    >
                      Portfolio →
                    </a>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="text-sm font-semibold text-navy border border-border rounded-full px-4 py-2 hover:bg-bg transition shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}