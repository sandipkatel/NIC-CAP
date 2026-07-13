"use client";

import { useState, useMemo, useEffect } from "react";
import { ambassadors } from "../../data/mockData";

export default function NetworkPage() {
  const [query, setQuery] = useState("");
  const [cohortMenuOpen, setCohortMenuOpen] = useState(false);
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);

  // All cohorts, most recent first. The current cohort is whichever has the highest cohortOrder.
  const cohorts = useMemo(() => {
    const unique = [...new Set(ambassadors.map((a) => a.cohort))];
    return unique.sort((a, b) => {
      const orderA = ambassadors.find((x) => x.cohort === a).cohortOrder;
      const orderB = ambassadors.find((x) => x.cohort === b).cohortOrder;
      return orderB - orderA;
    });
  }, []);

  const [selectedCohort, setSelectedCohort] = useState(cohorts[0]);

  const filtered = ambassadors.filter((a) => {
    const q = query.toLowerCase();
    const matchesQuery =
      a.name.toLowerCase().includes(q) ||
      a.college.toLowerCase().includes(q) ||
      a.skills.some((s) => s.toLowerCase().includes(q));
    return a.cohort === selectedCohort && matchesQuery;
  });

  const isCurrentCohort = selectedCohort === cohorts[0];

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedAmbassador(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="container-page py-16">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="eyebrow mb-3">Ambassador Network</p>
          <h1 className="section-title mb-3">Meet the ambassadors</h1>
        </div>

        {/* Cohort selector, top right */}
        <div className="relative shrink-0">
          <button
            onClick={() => setCohortMenuOpen((o) => !o)}
            className="flex items-center gap-2 border border-border rounded-full px-4 py-2 text-sm font-semibold text-navy hover:bg-bg transition"
          >
            {selectedCohort}
            {isCurrentCohort && (
              <span className="text-[10px] bg-blue/10 text-blue px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Current
              </span>
            )}
            <span className={`transition-transform ${cohortMenuOpen ? "rotate-180" : ""}`}>▾</span>
          </button>

          {cohortMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-20">
              {cohorts.map((c, i) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedCohort(c);
                    setCohortMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-bg transition flex items-center justify-between ${
                    c === selectedCohort ? "text-red font-semibold" : "text-navy"
                  }`}
                >
                  {c}
                  {i === 0 && <span className="text-[10px] text-text-light">Current</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-text-light mb-8 max-w-2xl">
        Lorem epsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget aliquam nisl nunc vel nisl.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, college, or skill..."
        className="input-field max-w-md mb-10"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((a) => (
          <div
            key={a.id}
            onClick={() => setSelectedAmbassador(a)}
            className="group relative bg-white border border-border rounded-2xl overflow-hidden cursor-pointer transition hover:shadow-lg hover:-translate-y-1"
          >
            {/* Photo — the focal point of the card */}
            <div className="relative w-full aspect-[4/4] bg-bg overflow-hidden">
              {a.photo ? (
                <img
                  src={a.photo}
                  alt={a.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue/10 to-navy/10">
                  <span className="text-6xl font-bold text-navy/25">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}

              {/* Gradient + name/college overlay */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-semibold text-white text-lg leading-tight drop-shadow-sm">
                  {a.name}
                </h3>
                <p className="text-white/85 text-sm">{a.college}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-5">
              <p className="text-text-light text-sm mb-3">📍 {a.location}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {a.skills.map((s) => (
                  <span key={s} className="text-xs bg-blue/10 text-blue px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <a
                  href={a.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-red text-sm font-semibold hover:underline"
                >
                  View LinkedIn →
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAmbassador(a);
                  }}
                  className="text-navy text-sm font-semibold hover:underline"
                >
                  Know more
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-text-light col-span-full">
            No ambassadors in {selectedCohort} match &quot;{query}&quot;.
          </p>
        )}
      </div>

      {/* Detail modal */}
      {selectedAmbassador && (
        <div
          className="fixed inset-0 bg-navy/40 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAmbassador(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo banner */}
            <div className="relative w-full aspect-[16/9] bg-bg">
              {selectedAmbassador.photo ? (
                <img
                  src={selectedAmbassador.photo}
                  alt={selectedAmbassador.name}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue/10 to-navy/10 rounded-t-2xl">
                  <span className="text-6xl font-bold text-navy/25">
                    {selectedAmbassador.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent rounded-t-2xl" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="font-bold text-white text-xl leading-tight drop-shadow-sm">
                  {selectedAmbassador.name}
                </h2>
                <p className="text-white/85 text-sm">{selectedAmbassador.college}</p>
                <p className="text-white/70 text-xs mt-0.5">{selectedAmbassador.cohort}</p>
              </div>
            </div>

            <div className="p-8">
            <div className="space-y-5">
              <div>
                <p className="eyebrow mb-2">Programs organized</p>
                <div className="space-y-3">
                  {selectedAmbassador.program.map((p, i) => (
                    <div
                      key={i}
                      className="flex gap-3 border border-border rounded-xl p-3"
                    >
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-24 h-30 rounded-lg object-cover shrink-0"
                        />
                      ) }
                      <div>
                        <p className="text-navy text-sm font-semibold mb-0.5">{p.name}</p>
                        <p className="text-text-light text-sm">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-1">Contribution to NIC</p>
                <p className="text-text-light text-sm">{selectedAmbassador.contribution}</p>
              </div>
              <div>
                <p className="eyebrow mb-1">What they gained</p>
                <p className="text-text-light text-sm">{selectedAmbassador.gained}</p>
              </div>
              <div className="border-l-2 border-red pl-4">
                <p className="text-navy text-sm italic">&quot;{selectedAmbassador.testimonial}&quot;</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <a
                href={selectedAmbassador.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-red text-sm font-semibold hover:underline"
              >
                View LinkedIn →
              </a>
              <button
                onClick={() => setSelectedAmbassador(null)}
                className="text-sm font-semibold text-navy border border-border rounded-full px-4 py-2 hover:bg-bg transition"
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