"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getEventAction,
  publishEventAction,
  completeEventAction,
  addTeamMemberAction,
  removeTeamMemberAction,
  submitEventReportAction,
  uploadReportImageAction,
} from "@/actions/eventActions";
import { getMyAmbassadorProfileAction } from "@/actions/ambassadorActions";
import { listAmbassadorsAction } from "@/actions/ambassadorActions";
import EventStatusBadge from "@/components/events/EventStatusBadge";

const TEAM_ROLES = ["LEAD", "HOST", "VOLUNTEER", "LEAD_MANAGER", "COORDINATOR", "SPEAKER", "OTHER"];

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [myAmbassadorId, setMyAmbassadorId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  // Add team member
  const [ambassadorQuery, setAmbassadorQuery] = useState("");
  const [ambassadorOptions, setAmbassadorOptions] = useState([]);
  const [selectedAmbassadorId, setSelectedAmbassadorId] = useState("");
  const [selectedRole, setSelectedRole] = useState(TEAM_ROLES[0]);

  // Report submission
  const [reportForm, setReportForm] = useState({ participantCount: "", participantType: "", notes: "" });
  const [reportFile, setReportFile] = useState(null);
  const [reportFieldErrors, setReportFieldErrors] = useState({});
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  // Image upload
  const [imageFile, setImageFile] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const loadEvent = useCallback(async () => {
    const res = await getEventAction(id);
    setIsLoading(false);
    if (!res.ok) {
      setLoadError(res.message || "Couldn't load this event.");
      return;
    }
    setLoadError("");
    setEvent(res.data);
  }, [id]);

  useEffect(() => {
    loadEvent();
    getMyAmbassadorProfileAction().then((res) => {
      if (res.ok) setMyAmbassadorId(res.data.id);
    });
  }, [loadEvent]);

  // Load ambassadors once for the "add team member" search.
  useEffect(() => {
    listAmbassadorsAction("?page_size=100").then((res) => {
      if (res.ok) setAmbassadorOptions(res.data.results);
    });
  }, []);

  const isCreator = event && myAmbassadorId && event.created_by.id === myAmbassadorId;

  const runAction = async (fn) => {
    setActionError("");
    setIsBusy(true);
    const res = await fn();
    setIsBusy(false);
    if (!res.ok) {
      setActionError(res.message || "Something went wrong.");
      return;
    }
    setEvent(res.data);
  };

  const handlePublish = () => runAction(() => publishEventAction(id));
  const handleComplete = () => runAction(() => completeEventAction(id));

  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    if (!selectedAmbassadorId) return;
    setActionError("");
    setIsBusy(true);
    const res = await addTeamMemberAction(id, selectedAmbassadorId, selectedRole);
    setIsBusy(false);
    if (!res.ok) {
      setActionError(res.message || "Couldn't add team member.");
      return;
    }
    setSelectedAmbassadorId("");
    setAmbassadorQuery("");
    loadEvent();
  };

  const handleRemoveTeamMember = async (ambassadorId) => {
    setActionError("");
    setIsBusy(true);
    const res = await removeTeamMemberAction(id, ambassadorId);
    setIsBusy(false);
    if (!res.ok) {
      setActionError(res.message || "Couldn't remove team member.");
      return;
    }
    loadEvent();
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setReportFieldErrors({});
    setActionError("");

    const payload = new FormData();
    payload.append("participant_count", reportForm.participantCount);
    payload.append("participant_type", reportForm.participantType);
    if (reportForm.notes) payload.append("notes", reportForm.notes);
    if (reportFile) payload.append("report_file", reportFile);

    setIsSubmittingReport(true);
    const res = await submitEventReportAction(id, payload);
    setIsSubmittingReport(false);

    if (!res.ok) {
      setActionError(res.message || "Couldn't submit report.");
      setReportFieldErrors(res.fieldErrors || {});
      return;
    }

    loadEvent();
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!imageFile) return;
    setActionError("");

    const payload = new FormData();
    payload.append("image", imageFile);
    if (imageCaption) payload.append("caption", imageCaption);

    setIsUploadingImage(true);
    const res = await uploadReportImageAction(event.report.id, payload);
    setIsUploadingImage(false);

    if (!res.ok) {
      setActionError(res.message || "Couldn't upload image.");
      return;
    }

    setImageFile(null);
    setImageCaption("");
    loadEvent();
  };

  const filteredAmbassadors = ambassadorOptions.filter((a) =>
    `${a.first_name} ${a.last_name}`.toLowerCase().includes(ambassadorQuery.toLowerCase())
  );

  if (isLoading) return <div className="container-page py-16 max-w-3xl">Loading event...</div>;
  if (loadError) return <div className="container-page py-16 max-w-3xl"><p className="text-red">{loadError}</p></div>;

  return (
    <div className="container-page py-16 max-w-3xl">
      <Link href="/dashboard/events" className="text-sm text-navy hover:underline mb-3 inline-block">← All Events</Link>

      {actionError && (
        <div className="mb-6 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">{actionError}</div>
      )}

      <div className="card mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="section-title mb-1">{event.title}</h1>
            <p className="text-text-light text-sm">
              {formatDate(event.event_date)} · {event.event_time} · {event.is_public ? "Public" : "Private"}
            </p>
          </div>
          <EventStatusBadge status={event.status} />
        </div>

        <p className="text-navy text-sm mt-4">{event.details}</p>

        {event.registration_link && (
          <a href={event.registration_link} target="_blank" rel="noreferrer" className="text-red text-sm font-semibold hover:underline mt-3 inline-block">
            Registration Link →
          </a>
        )}
        {event.deadline && (
          <p className="text-text-light text-xs mt-2">Registration deadline: {formatDate(event.deadline)}</p>
        )}
        <p className="text-text-light text-xs mt-2">
          Created by {event.created_by.full_name} ({event.created_by.college_name})
        </p>

        <div className="flex gap-3 mt-5">
          {event.status === "DRAFT" && (
            <button onClick={handlePublish} disabled={isBusy} className="btn-primary text-sm disabled:opacity-60">
              Publish Event
            </button>
          )}
          {event.status === "PUBLISHED" && (
            <button onClick={handleComplete} disabled={isBusy} className="btn-primary text-sm disabled:opacity-60">
              Mark Completed
            </button>
          )}
        </div>
      </div>

      {/* Team members */}
      <div className="card mb-6">
        <h2 className="font-semibold text-navy mb-4">Team Members</h2>
        <div className="space-y-2 mb-4">
          {event.team_members.map((member) => (
            <div key={member.id} className="flex items-center justify-between border border-border rounded-btn px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-navy">{member.ambassador.full_name}</p>
                <p className="text-xs text-text-light">{member.ambassador.college_name} · {member.role}</p>
              </div>
              <button
                onClick={() => handleRemoveTeamMember(member.ambassador.id)}
                disabled={isBusy}
                className="text-xs text-red font-semibold hover:underline disabled:opacity-60"
              >
                Remove
              </button>
            </div>
          ))}
          {event.team_members.length === 0 && <p className="text-text-light text-sm">No team members added yet.</p>}
        </div>

        <form onSubmit={handleAddTeamMember} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              value={ambassadorQuery || (selectedAmbassadorId ? ambassadorQuery : "")}
              onChange={(e) => {
                setAmbassadorQuery(e.target.value);
                setSelectedAmbassadorId("");
              }}
              placeholder="Search ambassador by name..."
              className="input-field"
            />
            {ambassadorQuery && !selectedAmbassadorId && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-border rounded-btn shadow-lg max-h-48 overflow-y-auto">
                {filteredAmbassadors.slice(0, 8).map((a) => (
                  <button
                    type="button"
                    key={a.id}
                    onClick={() => {
                      setSelectedAmbassadorId(a.id);
                      setAmbassadorQuery(`${a.first_name} ${a.last_name}`);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-bg"
                  >
                    {a.first_name} {a.last_name} - {a.college_name}
                  </button>
                ))}
                {filteredAmbassadors.length === 0 && <p className="px-3 py-2 text-sm text-text-light">No matches.</p>}
              </div>
            )}
          </div>
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="input-field sm:w-40">
            {TEAM_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="submit" disabled={!selectedAmbassadorId || isBusy} className="btn-primary text-sm px-4 disabled:opacity-60">
            Add
          </button>
        </form>
      </div>

      {/* Report */}
      <div className="card">
        <h2 className="font-semibold text-navy mb-4">Event Report</h2>

        {event.report ? (
          <div className="space-y-4">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-text-light">Participants</dt><dd className="text-navy font-medium">{event.report.participant_count} ({event.report.participant_type})</dd></div>
              <div className="flex justify-between"><dt className="text-text-light">Submitted</dt><dd className="text-navy font-medium">{formatDate(event.report.submitted_at)}</dd></div>
            </dl>
            {event.report.notes && <p className="text-navy text-sm">{event.report.notes}</p>}
            {event.report.report_file && (
              <a href={event.report.report_file} target="_blank" rel="noreferrer" className="text-navy text-sm font-semibold hover:underline block">
                View Report File →
              </a>
            )}

            {event.report.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {event.report.images.map((img) => (
                  <img key={img.id} src={img.image} alt={img.caption || "Event photo"} className="w-full aspect-square object-cover rounded-btn" />
                ))}
              </div>
            )}

            {isCreator && (
              <form onSubmit={handleUploadImage} className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="input-field flex-1 file:mr-3 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm"
                />
                <input
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Caption (optional)"
                  className="input-field sm:w-48"
                />
                <button type="submit" disabled={!imageFile || isUploadingImage} className="btn-secondary text-sm px-4 disabled:opacity-60">
                  {isUploadingImage ? "Uploading..." : "Upload"}
                </button>
              </form>
            )}
          </div>
        ) : isCreator ? (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Participant Count</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={reportForm.participantCount}
                  onChange={(e) => setReportForm((p) => ({ ...p, participantCount: e.target.value }))}
                  className="input-field"
                />
                {reportFieldErrors.participant_count && <p className="text-xs text-red mt-1">{reportFieldErrors.participant_count[0]}</p>}
              </div>
              <div>
                <label className="label-field">Participant Type</label>
                <input
                  required
                  value={reportForm.participantType}
                  onChange={(e) => setReportForm((p) => ({ ...p, participantType: e.target.value }))}
                  className="input-field"
                  placeholder="e.g. College Students"
                />
                {reportFieldErrors.participant_type && <p className="text-xs text-red mt-1">{reportFieldErrors.participant_type[0]}</p>}
              </div>
            </div>
            <div>
              <label className="label-field">Notes</label>
              <textarea
                value={reportForm.notes}
                onChange={(e) => setReportForm((p) => ({ ...p, notes: e.target.value }))}
                rows={3}
                className="input-field"
                placeholder="Outcomes, highlights, learnings..."
              />
            </div>
            <div>
              <label className="label-field">Report File</label>
              <input
                type="file"
                onChange={(e) => setReportFile(e.target.files?.[0] ?? null)}
                className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm"
              />
            </div>
            <button type="submit" disabled={isSubmittingReport} className="btn-primary w-full disabled:opacity-60">
              {isSubmittingReport ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        ) : (
          <p className="text-text-light text-sm">No report has been submitted for this event yet.</p>
        )}
      </div>
    </div>
  );
}
