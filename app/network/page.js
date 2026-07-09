"use client";

import { useState } from "react";
import { ambassadors } from "../../data/mockData";

export default function NetworkPage() {
  const [query, setQuery] = useState("");

  const filtered = ambassadors.filter((a) => {
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.college.toLowerCase().includes(q) ||
      a.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="container-page py-16">
      <p className="eyebrow mb-3">Ambassador Network</p>
      <h1 className="section-title mb-3">Meet the ambassadors</h1>
      <p className="text-text-light mb-8 max-w-2xl">
        Browse ambassadors by name, college, or skill (FR-4.1).
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, college, or skill..."
        className="input-field max-w-md mb-10"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <div key={a.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center text-navy font-bold">
                {a.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-semibold text-navy">{a.name}</h3>
                <p className="text-text-light text-sm">{a.college}</p>
              </div>
            </div>
            <p className="text-text-light text-sm mb-3">📍 {a.location}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {a.skills.map((s) => (
                <span key={s} className="text-xs bg-blue/10 text-blue px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
            <p className="text-text-light text-sm mb-4">{a.achievements}</p>
            <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-red text-sm font-semibold hover:underline">
              View LinkedIn →
            </a>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-text-light col-span-full">No ambassadors match &quot;{query}&quot;.</p>
        )}
      </div>
    </div>
  );
}
