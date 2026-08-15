// TODO: Retrieve events from backend using API: /events/ and /events/{id}/ endpoints. For now, we are using mock data from data/mockData.js.

import { upcomingEvents, pastEvents } from "../../data/mockData";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventsPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow mb-3">Events Management</p>
      <h1 className="section-title mb-3">Events</h1>
      <p className="text-text-light mb-10 max-w-2xl">
        Ambassador-led workshops, hackathons, and info sessions happening across our partner campuses.
      </p>

      {/* FR-5.1 - Upcoming events */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-navy mb-5">Upcoming</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((e) => (
            <div key={e.id} className="card flex flex-col">
              <p className="text-sm text-blue font-semibold mb-2">{formatDate(e.date)}</p>
              <h3 className="font-semibold text-navy mb-1.5">{e.name}</h3>
              <p className="text-text-light text-sm mb-5">{e.location}</p>
              <button
                disabled={!e.registrationOpen}
                className={e.registrationOpen ? "btn-primary mt-auto" : "btn-secondary mt-auto opacity-50 cursor-not-allowed"}
              >
                {e.registrationOpen ? "Register" : "Registration Closed"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FR-5.2 - Past events archive */}
      <section>
        <h2 className="text-xl font-bold text-navy mb-5">Past Events Archive</h2>
        <div className="space-y-4">
          {pastEvents.map((e) => (
            <div key={e.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-40 h-24 rounded-btn bg-bg border border-border flex items-center justify-center shrink-0">
                <span className="text-xs text-text-light">Event photo</span>
              </div>
              <div>
                <p className="text-sm text-text-light">{formatDate(e.date)} · {e.location}</p>
                <h3 className="font-semibold text-navy">{e.name}</h3>
                <p className="text-text-light text-sm mt-1">{e.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
