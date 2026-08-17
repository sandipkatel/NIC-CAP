"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUserAction, logoutAction } from "@/actions/authActions";
import { getMyAmbassadorProfileAction, listMyProfileEditsAction } from "@/actions/ambassadorActions";
import { normalizeList } from "@/lib/utils/list";
import { normalizeStatus } from "@/lib/utils/status";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";
import RequestHistory from "@/components/dashboard/RequestHistory";

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [edits, setEdits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const loadEdits = useCallback(async () => {
    const res = await listMyProfileEditsAction();
    if (res.ok) setEdits(normalizeList(res.data).items);
  }, []);

  useEffect(() => {
    let ignore = false;

    (async () => {
      const userRes = await getCurrentUserAction();
      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      if (userRes.data.must_change_password) {
        router.push("/change-password");
        return;
      }

      if (normalizeStatus(userRes.data.role) !== "AMBASSADOR") {
        if (!ignore) {
          setIsLoading(false);
          setLoadError("This dashboard is only available to ambassador accounts.");
        }
        return;
      }

      const [profileRes, editsRes] = await Promise.all([
        getMyAmbassadorProfileAction(),
        listMyProfileEditsAction(),
      ]);

      if (ignore) return; // component unmounted or a newer effect run took over

      setIsLoading(false);

      if (!profileRes.ok) {
        setLoadError(profileRes.message || "Couldn't load your ambassador profile.");
        return;
      }

      setProfile(profileRes.data);
      setEdits(editsRes.ok ? normalizeList(editsRes.data).items : []);
    })();

    return () => {
      ignore = true;
    };
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push("/login");
  };

  const header = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="eyebrow mb-3">Ambassador Dashboard</p>
        <h1 className="section-title mb-6">
          {profile ? `Welcome back, ${profile.first_name}` : "Ambassador Dashboard"}
        </h1>
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
  );

  if (isLoading) {
    return (
      <div className="container-page py-16 max-w-4xl">
        {header}
        <p className="text-text-light mt-6">Loading your dashboard...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="container-page py-16 max-w-4xl">
        {header}
        <div className="card mt-6">
          <p className="text-red">{loadError}</p>
        </div>
      </div>
    );
  }

  const hasPendingEdit = edits.some((e) => normalizeStatus(e.status) === "SUBMITTED");

  return (
    <div className="container-page py-16 max-w-4xl">
      {header}

      <ProfileSummary profile={profile} />

      <div className="card mt-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-navy mb-1">Events</h2>
          <p className="text-text-light text-sm">Create events, manage your team, and submit reports.</p>
        </div>
        <Link href="/dashboard/events" className="btn-primary shrink-0">Manage Events</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <ProfileEditForm hasPendingEdit={hasPendingEdit} onSubmitted={loadEdits} />
        <RequestHistory edits={edits} />
      </div>
    </div>
  );
}
