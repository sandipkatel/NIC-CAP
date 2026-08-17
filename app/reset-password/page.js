"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { confirmPasswordResetAction } from "@/actions/authActions";
import PasswordInput from "@/components/PasswordInput";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!uid || !token) {
    return (
      <div className="card">
        <p className="text-red text-sm">
          This reset link is missing required information. Request a new one from the{" "}
          <Link href="/forgot-password" className="underline font-semibold">forgot password</Link> page.
        </p>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="card text-center">
        <p className="text-navy text-sm mb-4">{successMessage}</p>
        <Link href="/login" className="btn-primary inline-block">Sign in</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsSubmitting(true);

    const res = await confirmPasswordResetAction({
      uid,
      token,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.message || "Couldn't reset your password.");
      setFieldErrors(res.fieldErrors || {});
      return;
    }

    setSuccessMessage(res.data?.detail || "Password has been reset successfully.");
  };

  return (
    <div className="card">
      {formError && (
        <div className="mb-6 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {formError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">New Password</label>
          <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          {fieldErrors.new_password && <p className="text-xs text-red mt-1">{fieldErrors.new_password[0]}</p>}
        </div>
        <div>
          <label className="label-field">Confirm New Password</label>
          <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {fieldErrors.confirm_password && <p className="text-xs text-red mt-1">{fieldErrors.confirm_password[0]}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="container-page py-24 max-w-md">
      <p className="eyebrow mb-3">Account Security</p>
      <h1 className="section-title mb-6">Reset your password</h1>
      <Suspense fallback={<p className="text-text-light">Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
