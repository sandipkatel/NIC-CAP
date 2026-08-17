"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUserAction, logoutAction } from "@/actions/authActions";
import { adminListApplicationsAction } from "@/actions/applicationActions";
import { adminListAmbassadorsAction } from "@/actions/ambassadorActions";
import { adminListVerificationsAction } from "@/actions/verificationActions";
import { normalizeList } from "@/lib/utils/list";
import { normalizeStatus } from "@/lib/utils/status";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [counts, setCounts] = useState({
    totalAmbassadors: 0,
    totalApplications: 0,
    pendingApplications: 0,
    pendingProfileEdits: 0,
  });

  useEffect(() => {
    (async () => {
      const userRes = await getCurrentUserAction();
      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      if (normalizeStatus(userRes.data.role) !== "ADMIN") {
        setIsLoading(false);
        setLoadError("This page is only available to admin accounts.");
        return;
      }

      const [ambassadorsRes, allAppsRes, pendingAppsRes, pendingEditsRes] = await Promise.all([
        adminListAmbassadorsAction("?page_size=1"),
        adminListApplicationsAction("?page_size=1"),
        adminListApplicationsAction("?status=PENDING&page_size=1"),
        adminListVerificationsAction("?status=PENDING&page_size=1"),
      ]);

      setIsLoading(false);

      if (!ambassadorsRes.ok || !allAppsRes.ok) {
        setLoadError("Couldn't load admin summary data.");
        return;
      }

      setCounts({
        totalAmbassadors: normalizeList(ambassadorsRes.data).count,
        totalApplications: normalizeList(allAppsRes.data).count,
        pendingApplications: pendingAppsRes.ok ? normalizeList(pendingAppsRes.data).count : 0,
        pendingProfileEdits: pendingEditsRes.ok ? normalizeList(pendingEditsRes.data).count : 0,
      });
    })();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push("/login");
  };

  if (isLoading) {
    return <div className="container-page py-16 max-w-4xl">Loading admin panel...</div>;
  }

  return (
    <div className="container-page py-16 max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Administration</p>
          <h1 className="section-title mb-6">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/change-password"
            className="text-sm font-semibold text-navy border border-border rounded-full px-4 py-2 hover:bg-bg transition"
          >
            Change Password
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-sm font-semibold text-navy border border-border rounded-full px-4 py-2 hover:bg-bg transition disabled:opacity-60"
          >
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>

      {loadError && <p className="text-red mb-4">{loadError}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{counts.totalAmbassadors}</p>
          <p className="text-text-light text-sm mt-1">Total Ambassadors</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-red">{counts.pendingApplications}</p>
          <p className="text-text-light text-sm mt-1">Pending Applications</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{counts.totalApplications}</p>
          <p className="text-text-light text-sm mt-1">Total Applications</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-red">{counts.pendingProfileEdits}</p>
          <p className="text-text-light text-sm mt-1">Pending Profile Edits</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-navy mb-2">Ambassadors & Applications</h2>
          <p className="text-text-light text-sm mb-4">
            View ambassador records, provision new ambassadors, and approve or reject pending
            applications.
          </p>
          <div className="flex gap-3">
            <Link href="/admin/ambassadors" className="btn-secondary flex-1 text-center">
              Manage Ambassadors
            </Link>
            <Link href="/admin/applications" className="btn-primary flex-1 text-center">
              Review Applications
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-navy mb-2">Verification Requests</h2>
          <p className="text-text-light text-sm mb-4">
            Review and approve or reject profile edit requests submitted by ambassadors.
          </p>
          <Link href="/admin/verification" className="btn-primary w-full text-center block">
            Review Verification Requests
          </Link>
        </div>
      </div>

      <p className="text-text-light text-xs mt-8">
        Events and story publishing aren't available yet — those parts of the backend haven't
        been built out.
      </p>
    </div>
  );
}
