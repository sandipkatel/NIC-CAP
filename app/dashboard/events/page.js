"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { listEventsAction, createEventAction } from "@/actions/eventActions";
import EventStatusBadge from "@/components/events/EventStatusBadge";

const TABS = [
  { label: "My Events", value: "mine" },
  { label: "Public", value: "public" },
  { label: "All", value: "all" },
];

const initialForm = {
  title: "",
  details: "",
  registrationLink: "",
  eventDate: "",
  eventTime: "",
  deadline: "",
  isPublic: true,
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function EventsListPage() {
  const router = useRouter();
  const [tab, setTab] = useState("mine");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    const query = tab === "mine" ? "?mine=true" : tab === "public" ? "?public=true" : "";
    const res = await listEventsAction(query);
    setIsLoading(false);

    if (!res.ok) {
      setLoadError(res.message || "Couldn't load events.");
      return;
    }
    console.log("Events loaded:", res.data);
    setLoadError("");
    setEvents(res.data);
  }, [tab]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsCreating(true);

    const payload = {
      title: form.title,
      details: form.details,
      event_date: form.eventDate,
      event_time: form.eventTime,
      is_public: form.isPublic,
    };
    if (form.registrationLink) payload.registration_link = form.registrationLink;
    if (form.deadline) payload.deadline = new Date(form.deadline).toISOString();

    const res = await createEventAction(payload);
    setIsCreating(false);

    if (!res.ok) {
      setFormError(res.message || "Couldn't create event.");
      setFieldErrors(res.fieldErrors || {});
      return;
    }

    // Jump straight into managing the new event (team members, publishing, etc).
    router.push(`/dashboard/events/${res.data.id}`);
  };

  return (
    <div className="container-page py-16 max-w-4xl">
      <Link href="/dashboard" className="text-sm text-navy hover:underline mb-3 inline-block">← Dashboard</Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="eyebrow mb-3">Events</p>
          <h1 className="section-title">Manage Events</h1>
        </div>
        <button onClick={() => setShowCreateForm((s) => !s)} className="btn-primary shrink-0">
          {showCreateForm ? "Cancel" : "New Event"}
        </button>
      </div>

      {showCreateForm && (
        <div className="card mb-8">
          <h2 className="font-semibold text-navy mb-4">Create Event</h2>

          {formError && (
            <div className="mb-4 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="label-field">Title</label>
              <input required name="title" value={form.title} onChange={handleChange} className="input-field" placeholder="e.g. Intro to Web3 Workshop" />
              {fieldErrors.title && <p className="text-xs text-red mt-1">{fieldErrors.title[0]}</p>}
            </div>
            <div>
              <label className="label-field">Details</label>
              <textarea required name="details" value={form.details} onChange={handleChange} rows={3} className="input-field" placeholder="What's this event about?" />
              {fieldErrors.details && <p className="text-xs text-red mt-1">{fieldErrors.details[0]}</p>}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="label-field">Date</label>
                <input required type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className="input-field" />
                {fieldErrors.event_date && <p className="text-xs text-red mt-1">{fieldErrors.event_date[0]}</p>}
              </div>
              <div>
                <label className="label-field">Time</label>
                <input required type="time" name="eventTime" value={form.eventTime} onChange={handleChange} className="input-field" />
                {fieldErrors.event_time && <p className="text-xs text-red mt-1">{fieldErrors.event_time[0]}</p>}
              </div>
              <div>
                <label className="label-field">Registration Deadline</label>
                <input type="datetime-local" name="deadline" value={form.deadline} onChange={handleChange} className="input-field" />
                {fieldErrors.deadline && <p className="text-xs text-red mt-1">{fieldErrors.deadline[0]}</p>}
              </div>
            </div>
            <div>
              <label className="label-field">Registration Link</label>
              <input type="url" name="registrationLink" value={form.registrationLink} onChange={handleChange} className="input-field" placeholder="https://..." />
              {fieldErrors.registration_link && <p className="text-xs text-red mt-1">{fieldErrors.registration_link[0]}</p>}
            </div>
            <label className="flex items-center gap-2 text-sm text-navy">
              <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
              Make this event public
            </label>

            <button type="submit" disabled={isCreating} className="btn-primary w-full disabled:opacity-60">
              {isCreating ? "Creating..." : "Create Event (Draft)"}
            </button>
          </form>
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`text-sm px-4 py-1.5 rounded-full border transition ${
              tab === t.value ? "bg-navy text-white border-navy" : "border-border text-navy hover:bg-bg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-text-light">Loading events...</p>}
      {loadError && <p className="text-red mb-4">{loadError}</p>}

      {!isLoading && !loadError && (
        <div className="space-y-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/dashboard/events/${event.id}`}
              className="card flex flex-col sm:flex-row sm:items-center gap-3 justify-between hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-navy">{event.title}</p>
                <p className="text-text-light text-sm">{formatDate(event.event_date)} · {event.event_time}</p>
                <p className="text-text-light text-xs mt-1">
                  {event.created_by.full_name} · {event.created_by.college_name} · {event.team_count} team member(s)
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {event.has_report && <span className="text-xs text-green-700 font-semibold">Reported</span>}
                <EventStatusBadge status={event.status} />
              </div>
            </Link>
          ))}
          {events.length === 0 && <p className="text-text-light">No events here yet.</p>}
        </div>
      )}
    </div>
  );
}
