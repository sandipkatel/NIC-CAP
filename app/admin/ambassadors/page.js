"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUserAction } from "@/actions/authActions";
import { adminListApplicationsAction } from "@/actions/applicationActions";
import {
  adminListAmbassadorsAction,
  adminGetAmbassadorAction,
  adminProvisionAmbassadorAction,
} from "@/actions/ambassadorActions";
import StatusBadge from "@/components/admin/StatusBadge";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

const initialProvisionForm = { applicationId: "", batchId: "", organizationEmail: "" };

export default function AdminAmbassadorsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [page, setPage] = useState(1);
  const [ambassadors, setAmbassadors] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [showProvisionForm, setShowProvisionForm] = useState(false);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [provisionForm, setProvisionForm] = useState(initialProvisionForm);
  const [provisionFieldErrors, setProvisionFieldErrors] = useState({});
  const [provisionError, setProvisionError] = useState("");
  const [provisionSuccess, setProvisionSuccess] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);

  useEffect(() => {
    getCurrentUserAction().then((res) => {
      if (!res.ok) {
        router.push("/login");
        return;
      }
      console.log("Current user role:", res.data.role);
      if (res.data.role !== "ADMIN" && res.data.role !== "admin") {
        setLoadError("This page is only available to admin accounts.");
        setIsLoading(false);
        return;
      }
      setIsAuthorized(true);
    });
  }, [router]);

  const loadAmbassadors = useCallback(async () => {
    setIsLoading(true);
    const res = await adminListAmbassadorsAction(`?page=${page}&page_size=20`);
    setIsLoading(false);

    if (!res.ok) {
      setLoadError(res.message || "Couldn't load ambassadors.");
      return;
    }
    setLoadError("");
    setAmbassadors(res.data.results);
    setHasNext(Boolean(res.data.next));
    setHasPrevious(Boolean(res.data.previous));
  }, [page]);

  useEffect(() => {
    if (isAuthorized) loadAmbassadors();
  }, [isAuthorized, loadAmbassadors]);

  const openDetail = async (id) => {
    setSelectedId(id);
    setSelectedDetail(null);
    setDetailLoading(true);
    const res = await adminGetAmbassadorAction(id);
    setDetailLoading(false);
    if (res.ok) setSelectedDetail(res.data);
  };

  const closeDetail = () => {
    setSelectedId(null);
    setSelectedDetail(null);
  };

  const openProvisionForm = async () => {
    setShowProvisionForm(true);
    setProvisionForm(initialProvisionForm);
    setProvisionError("");
    setProvisionSuccess("");
    setProvisionFieldErrors({});

    // No endpoint distinguishes "approved but not yet provisioned" — this list
    // may include applications already turned into ambassadors. Re-using one
    // will surface the backend's own error, which we'll show below the form.
    const res = await adminListApplicationsAction("?status=APPROVED&page_size=100");
    if (res.ok) setApprovedApplications(res.data.results);
  };

  const handleProvisionChange = (e) => {
    const { name, value } = e.target;
    setProvisionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProvisionSubmit = async (e) => {
    e.preventDefault();
    setProvisionError("");
    setProvisionFieldErrors({});
    setProvisionSuccess("");
    setIsProvisioning(true);

    const res = await adminProvisionAmbassadorAction({
      application_id: provisionForm.applicationId,
      batch_id: provisionForm.batchId,
      organization_email: provisionForm.organizationEmail,
    });
    setIsProvisioning(false);

    if (!res.ok) {
      setProvisionError(res.message || "Couldn't provision ambassador.");
      setProvisionFieldErrors(res.fieldErrors || {});
      return;
    }

    setProvisionSuccess("Ambassador provisioned. Login credentials were emailed to their personal email.");
    setProvisionForm(initialProvisionForm);
    loadAmbassadors();
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
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <Link href="/admin" className="text-sm text-navy hover:underline mb-3 inline-block">← Admin Panel</Link>
          <p className="eyebrow mb-3">Administration</p>
          <h1 className="section-title">Manage Ambassadors</h1>
        </div>
        <button onClick={openProvisionForm} className="btn-primary shrink-0">Provision New Ambassador</button>
      </div>

      {isLoading && <p className="text-text-light">Loading ambassadors...</p>}
      {loadError && <p className="text-red mb-4">{loadError}</p>}

      {!isLoading && !loadError && (
        <>
          <div className="space-y-3">
            {ambassadors.map((amb) => (
              <div key={amb.id} className="card flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div>
                  <p className="font-semibold text-navy">{amb.first_name} {amb.last_name}</p>
                  <p className="text-text-light text-sm">{amb.organization_email}</p>
                  <p className="text-text-light text-sm">{amb.college_name} — {amb.faculty}</p>
                  <p className="text-text-light text-xs mt-1">{amb.batch} · Joined {formatDate(amb.created_at)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={amb.status} />
                  <button onClick={() => openDetail(amb.id)} className="text-navy text-sm font-semibold hover:underline">
                    View
                  </button>
                </div>
              </div>
            ))}
            {ambassadors.length === 0 && <p className="text-text-light">No ambassadors yet.</p>}
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

      {/* Detail modal */}
      {selectedId && (
        <div className="fixed inset-0 bg-navy/40 flex items-center justify-center p-4 z-50" onClick={closeDetail}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            {detailLoading && <p className="text-text-light text-sm">Loading profile...</p>}
            {!detailLoading && selectedDetail && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-bold text-navy text-xl">{selectedDetail.first_name} {selectedDetail.last_name}</h2>
                  <p className="text-text-light text-sm">{selectedDetail.college_name} — {selectedDetail.faculty}</p>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-text-light">Status</dt><dd><StatusBadge status={selectedDetail.status} /></dd></div>
                  <div className="flex justify-between"><dt className="text-text-light">Batch</dt><dd className="font-medium text-navy">{selectedDetail.batch}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-light">Organization Email</dt><dd className="font-medium text-navy">{selectedDetail.organization_email}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-light">Personal Email</dt><dd className="font-medium text-navy">{selectedDetail.personal_email}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-light">Phone</dt><dd className="font-medium text-navy">{selectedDetail.phone_number}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-light">Address</dt><dd className="font-medium text-navy text-right">{selectedDetail.address}, {selectedDetail.city}, {selectedDetail.district}, {selectedDetail.province}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-light">Directory Visibility</dt><dd className="font-medium text-navy">{selectedDetail.is_public ? "Public" : "Private"}</dd></div>
                </dl>
                {selectedDetail.bio && (
                  <div>
                    <p className="text-text-light text-sm mb-1">Bio</p>
                    <p className="text-navy text-sm">{selectedDetail.bio}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  {selectedDetail.linkedin_url && <a href={selectedDetail.linkedin_url} target="_blank" rel="noreferrer" className="text-red font-semibold hover:underline">LinkedIn →</a>}
                  {selectedDetail.github_url && <a href={selectedDetail.github_url} target="_blank" rel="noreferrer" className="text-navy font-semibold hover:underline">GitHub →</a>}
                  {selectedDetail.portfolio_url && <a href={selectedDetail.portfolio_url} target="_blank" rel="noreferrer" className="text-navy font-semibold hover:underline">Portfolio →</a>}
                  {selectedDetail.cv && <a href={selectedDetail.cv} target="_blank" rel="noreferrer" className="text-navy font-semibold hover:underline">CV →</a>}
                </div>
                <button onClick={closeDetail} className="text-sm font-semibold text-navy border border-border rounded-full px-4 py-2 hover:bg-bg transition w-full mt-4">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Provision form modal */}
      {showProvisionForm && (
        <div className="fixed inset-0 bg-navy/40 flex items-center justify-center p-4 z-50" onClick={() => setShowProvisionForm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-semibold text-navy mb-1">Provision New Ambassador</h2>
            <p className="text-text-light text-sm mb-4">
              Turns an approved application into a live ambassador account. Login credentials are
              emailed to the applicant automatically.
            </p>

            {provisionError && (
              <div className="mb-4 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
                {provisionError}
              </div>
            )}
            {provisionSuccess && (
              <div className="mb-4 rounded-btn border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm text-green-700">
                {provisionSuccess}
              </div>
            )}

            <form onSubmit={handleProvisionSubmit} className="space-y-4">
              <div>
                <label className="label-field">Approved Application</label>
                <select
                  required
                  name="applicationId"
                  value={provisionForm.applicationId}
                  onChange={handleProvisionChange}
                  className="input-field"
                >
                  <option value="">Select an application</option>
                  {approvedApplications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.first_name} {app.last_name} — {app.email}
                    </option>
                  ))}
                </select>
                {provisionFieldErrors.application_id && (
                  <p className="text-xs text-red mt-1">{provisionFieldErrors.application_id[0]}</p>
                )}
              </div>

              <div>
                <label className="label-field">Organization Email</label>
                <input
                  required
                  type="email"
                  name="organizationEmail"
                  value={provisionForm.organizationEmail}
                  onChange={handleProvisionChange}
                  className="input-field"
                  placeholder="name@nic.gov.np"
                />
                {provisionFieldErrors.organization_email && (
                  <p className="text-xs text-red mt-1">{provisionFieldErrors.organization_email[0]}</p>
                )}
              </div>

              <div>
                <label className="label-field">Batch ID</label>
                <input
                  required
                  name="batchId"
                  value={provisionForm.batchId}
                  onChange={handleProvisionChange}
                  className="input-field font-mono text-sm"
                  placeholder="uuid of an active batch"
                />
                <p className="text-xs text-text-light mt-1.5">
                  There's no endpoint yet to list batches — paste the active batch's UUID directly.
                </p>
                {provisionFieldErrors.batch_id && (
                  <p className="text-xs text-red mt-1">{provisionFieldErrors.batch_id[0]}</p>
                )}
              </div>

              <button type="submit" disabled={isProvisioning} className="btn-primary w-full disabled:opacity-60">
                {isProvisioning ? "Provisioning..." : "Provision Ambassador"}
              </button>
            </form>
            <button onClick={() => setShowProvisionForm(false)} className="text-text-light text-sm mt-4 w-full text-center hover:underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
