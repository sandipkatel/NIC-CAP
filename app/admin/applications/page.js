"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUserAction } from "@/actions/authActions";
import { adminListApplicationsAction, adminDecideApplicationAction } from "@/actions/applicationActions";
import StatusBadge from "@/components/admin/StatusBadge";

const FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const DECISIONS = [
  { label: "Approve", value: "APPROVE" },
  { label: "Reject", value: "REJECT" },
];

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Detail/decision modal state. Replaces the old "reviewingId" flow — now any
  // application (not just PENDING ones) can be opened to view full detail and change status.
  const [detailId, setDetailId] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);

  useEffect(() => {
    getCurrentUserAction().then((res) => {
      if (!res.ok) {
        router.push("/login");
        return;
      }
      if (res.data.role !== "ADMIN" && res.data.role !== "admin") {
        setLoadError("This page is only available to admin accounts.");
        setIsLoading(false);
        return;
      }
      setIsAuthorized(true);
    });
  }, [router]);

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({ page: String(page), page_size: "20" });
    if (statusFilter) params.set("status", statusFilter);

    const res = await adminListApplicationsAction(`?${params.toString()}`);
    setIsLoading(false);

    if (!res.ok) {
      setLoadError(res.message || "Couldn't load applications.");
      return;
    }
    setLoadError("");
    setApplications(res.data ?? []);
    setHasNext(Boolean(res.data?.next));
    setHasPrevious(Boolean(res.data?.previous));
  }, [page, statusFilter]);

  useEffect(() => {
    if (isAuthorized) loadApplications();
  }, [isAuthorized, loadApplications]);

  const openDetail = (id) => {
    setDetailId(id);
    setReviewComment("");
    setActionError("");
  };

  const closeDetail = () => {
    setDetailId(null);
    setReviewComment("");
    setActionError("");
  };

  const handleDecision = async (decision) => {
    if (decision === "REJECT" && !reviewComment.trim()) {
      setActionError("A review comment is required to reject an application.");
      return;
    }
    setIsSubmittingDecision(true);
    const res = await adminDecideApplicationAction(detailId, decision, reviewComment);
    setIsSubmittingDecision(false);

    if (!res.ok) {
      setActionError(res.message || "Couldn't submit decision.");
      return;
    }

    closeDetail();
    loadApplications();
  };

  if (loadError && !isAuthorized) {
    return (
      <div className="container-page py-16 max-w-5xl">
        <div className="card"><p className="text-red">{loadError}</p></div>
      </div>
    );
  }

  const detailApp = (applications ?? []).find((a) => a.id === detailId);

  return (
    <div className="container-page py-16 max-w-5xl">
      <Link href="/admin" className="text-sm text-navy hover:underline mb-3 inline-block">← Admin Panel</Link>
      <p className="eyebrow mb-3">Administration</p>
      <h1 className="section-title mb-6">Review Applications</h1>

      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setStatusFilter(f.value);
              setPage(1);
            }}
            className={`text-sm px-4 py-1.5 rounded-full border transition ${
              statusFilter === f.value ? "bg-navy text-white border-navy" : "border-border text-navy hover:bg-bg"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-text-light">Loading applications...</p>}
      {loadError && <p className="text-red mb-4">{loadError}</p>}

      {!isLoading && !loadError && (
        <>
          <div className="space-y-3">
            {(applications ?? []).map((app) => (
              <div
                key={app.id}
                onClick={() => openDetail(app.id)}
                className="card flex flex-col sm:flex-row sm:items-center gap-3 justify-between cursor-pointer hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-navy">{app.first_name} {app.last_name}</p>
                  <p className="text-text-light text-sm">{app.email} · {app.phone_number}</p>
                  <p className="text-text-light text-sm">{app.college_name} — {app.faculty}</p>
                  <p className="text-text-light text-xs mt-1">
                    {app.city}, {app.district}, {app.province} · Applied {formatDate(app.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={app.status} />
                  <button
                    onClick={(e) => { e.stopPropagation(); openDetail(app.id); }}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    View / Review
                  </button>
                </div>
              </div>
            ))}
            {(applications ?? []).length === 0 && <p className="text-text-light">No applications match this filter.</p>}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              disabled={!hasPrevious}
              onClick={() => setPage((p) => p - 1)}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={!hasNext}
              onClick={() => setPage((p) => p + 1)}
              className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}

      {detailApp && (
        <div className="fixed inset-0 bg-navy/40 flex items-center justify-center p-4 z-50" onClick={closeDetail}>
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-navy">
                {detailApp.first_name} {detailApp.last_name}
              </h2>
              <StatusBadge status={detailApp.status} />
            </div>
            <p className="text-text-light text-sm mb-4">{detailApp.college_name} — {detailApp.faculty}</p>

            <dl className="space-y-2 text-sm mb-5">
              <div className="flex justify-between gap-4">
                <dt className="text-text-light">Email</dt>
                <dd className="text-navy text-right">{detailApp.email || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-light">Phone</dt>
                <dd className="text-navy text-right">{detailApp.phone_number || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-light">Location</dt>
                <dd className="text-navy text-right">
                  {[detailApp.city, detailApp.district, detailApp.province].filter(Boolean).join(", ") || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-light">Applied</dt>
                <dd className="text-navy text-right">{formatDateTime(detailApp.created_at)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-light">Reviewed by</dt>
                <dd className="text-navy text-right">{detailApp.reviewed_by || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-light">Reviewed at</dt>
                <dd className="text-navy text-right">{formatDateTime(detailApp.reviewed_at)}</dd>
              </div>
            </dl>

            {/*
              TODO (backend): the admin applications endpoint doesn't currently return
              address, current_year_or_semester, linkedin_url, github_url, portfolio_url,
              or the uploaded cv / cover_letter / college_recommendation_letter files —
              even though those are collected at submission time. Once the API returns
              them, add rows/links here, e.g.:

              {detailApp.cv && (
                <a href={detailApp.cv} target="_blank" rel="noreferrer" className="...">
                  View CV (PDF)
                </a>
              )}
            */}

            {actionError && (
              <div className="mb-4 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
                {actionError}
              </div>
            )}

            <label className="label-field">Review Comment (required to reject)</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              className="input-field mb-4"
              placeholder="Explain the decision..."
            />

            <div className="flex gap-3">
              {DECISIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => handleDecision(d.value)}
                  disabled={isSubmittingDecision || detailApp.status === (d.value === "APPROVE" ? "APPROVED" : "REJECTED")}
                  className={
                    d.value === "APPROVE"
                      ? "btn-primary flex-1 text-sm disabled:opacity-60"
                      : "flex-1 border border-red text-red rounded-btn py-2 text-sm font-semibold hover:bg-red/5 disabled:opacity-60"
                  }
                >
                  {d.label}
                </button>
              ))}
            </div>
            <button onClick={closeDetail} className="text-text-light text-sm mt-3 w-full text-center hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}