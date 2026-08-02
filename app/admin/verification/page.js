"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserAction } from "@/actions/authActions";
import {
  adminListVerificationsAction,
  adminGetVerificationAction,
  adminApproveVerificationAction,
  adminRejectVerificationAction,
} from "@/actions/verificationActions";
import StatusBadge from "@/components/admin/StatusBadge";

const STATUS_FILTERS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminVerificationPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);

  useEffect(() => {
    getCurrentUserAction().then((res) => {
      if (!res.ok) {
        router.push("/login");
        return;
      }
      if (res.data.role !== "ADMIN") {
        setLoadError("This page is only available to admin accounts.");
        setIsLoading(false);
        return;
      }
      setIsAuthorized(true);
    });
  }, [router]);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({ page: String(page), page_size: "20" });
    if (statusFilter) params.set("status", statusFilter);

    const res = await adminListVerificationsAction(`?${params.toString()}`);
    setIsLoading(false);

    if (!res.ok) {
      setLoadError(res.message || "Couldn't load verification requests.");
      return;
    }
    setLoadError("");
    setRequests(res.data.results);
    setHasNext(Boolean(res.data.next));
    setHasPrevious(Boolean(res.data.previous));
  }, [page, statusFilter]);

  useEffect(() => {
    if (isAuthorized) loadRequests();
  }, [isAuthorized, loadRequests]);

  const openReview = async (id) => {
    setSelectedId(id);
    setSelectedDetail(null);
    setReviewComment("");
    setActionError("");
    setDetailLoading(true);
    const res = await adminGetVerificationAction(id);
    setDetailLoading(false);
    if (res.ok) setSelectedDetail(res.data);
  };

  const closeReview = () => {
    setSelectedId(null);
    setSelectedDetail(null);
    setActionError("");
  };

  const handleApprove = async () => {
    setIsSubmittingDecision(true);
    const res = await adminApproveVerificationAction(selectedId);
    setIsSubmittingDecision(false);

    if (!res.ok) {
      setActionError(res.message || "Couldn't approve this request.");
      return;
    }
    closeReview();
    loadRequests();
  };

  const handleReject = async () => {
    if (!reviewComment.trim()) {
      setActionError("A review comment is required to reject a request.");
      return;
    }
    setIsSubmittingDecision(true);
    const res = await adminRejectVerificationAction(selectedId, reviewComment);
    setIsSubmittingDecision(false);

    if (!res.ok) {
      setActionError(res.message || "Couldn't reject this request.");
      return;
    }
    closeReview();
    loadRequests();
  };

  if (loadError && !isAuthorized) {
    return (
      <div className="container-page py-16 max-w-5xl">
        <div className="card"><p className="text-red">{loadError}</p></div>
      </div>
    );
  }

  return (
    <div className="container-page py-16 max-w-5xl">
      <p className="eyebrow mb-3">Administration</p>
      <h1 className="section-title mb-6">Verification Requests</h1>

      <div className="flex gap-2 mb-6">
        {STATUS_FILTERS.map((f) => (
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

      {isLoading && <p className="text-text-light">Loading requests...</p>}
      {loadError && <p className="text-red mb-4">{loadError}</p>}

      {!isLoading && !loadError && (
        <>
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="card flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div>
                  <p className="font-semibold text-navy">{req.submitter}</p>
                  <p className="text-text-light text-sm">{req.verification_type.replace("_", " ")}</p>
                  <p className="text-text-light text-xs mt-1">
                    Submitted {formatDate(req.created_at)}
                    {req.reviewed_at && ` · Reviewed ${formatDate(req.reviewed_at)} by ${req.reviewer}`}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={req.status} />
                  {req.status === "PENDING" && (
                    <button onClick={() => openReview(req.id)} className="btn-primary text-sm px-4 py-2">
                      Review
                    </button>
                  )}
                </div>
              </div>
            ))}
            {requests.length === 0 && <p className="text-text-light">No verification requests match this filter.</p>}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button disabled={!hasPrevious} onClick={() => setPage((p) => p - 1)} className="btn-secondary px-4 py-2 text-sm disabled:opacity-40">
              Previous
            </button>
            <button disabled={!hasNext} onClick={() => setPage((p) => p + 1)} className="btn-secondary px-4 py-2 text-sm disabled:opacity-40">
              Next
            </button>
          </div>
        </>
      )}

      {selectedId && (
        <div className="fixed inset-0 bg-navy/40 flex items-center justify-center p-4 z-50" onClick={closeReview}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-semibold text-navy mb-1">Review Verification Request</h2>

            {detailLoading && <p className="text-text-light text-sm">Loading request...</p>}

            {!detailLoading && selectedDetail && (
              <>
                <p className="text-text-light text-sm mb-4">
                  {selectedDetail.submitter} · {selectedDetail.verification_type.replace("_", " ")}
                </p>

                {selectedDetail.resource && (
                  <div className="border border-border rounded-btn p-4 mb-4 space-y-2 text-sm">
                    {selectedDetail.resource.bio && (
                      <p><span className="text-text-light">Bio: </span>{selectedDetail.resource.bio}</p>
                    )}
                    {selectedDetail.resource.linkedin_url && (
                      <p><span className="text-text-light">LinkedIn: </span>{selectedDetail.resource.linkedin_url}</p>
                    )}
                    {selectedDetail.resource.github_url && (
                      <p><span className="text-text-light">GitHub: </span>{selectedDetail.resource.github_url}</p>
                    )}
                    {selectedDetail.resource.portfolio_url && (
                      <p><span className="text-text-light">Portfolio: </span>{selectedDetail.resource.portfolio_url}</p>
                    )}
                    {selectedDetail.resource.profile_photo && (
                      <img src={selectedDetail.resource.profile_photo} alt="Requested profile photo" className="w-24 h-24 rounded-btn object-cover mt-2" />
                    )}
                    {selectedDetail.resource.cv && (
                      <a href={selectedDetail.resource.cv} target="_blank" rel="noreferrer" className="text-navy font-semibold hover:underline block">
                        View submitted CV →
                      </a>
                    )}
                  </div>
                )}

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
                  <button
                    onClick={handleReject}
                    disabled={isSubmittingDecision}
                    className="flex-1 border border-red text-red rounded-btn py-2 text-sm font-semibold hover:bg-red/5 disabled:opacity-60"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isSubmittingDecision}
                    className="btn-primary flex-1 text-sm disabled:opacity-60"
                  >
                    Approve
                  </button>
                </div>
              </>
            )}

            <button onClick={closeReview} className="text-text-light text-sm mt-4 w-full text-center hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
