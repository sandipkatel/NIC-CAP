"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePasswordAction } from "@/actions/authActions";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsSubmitting(true);

    const res = await changePasswordAction({
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.message || "Couldn't change your password.");
      setFieldErrors(res.fieldErrors || {});
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="container-page py-24 max-w-md">
      <p className="eyebrow mb-3">Account Security</p>
      <h1 className="section-title mb-3">Change your password</h1>
      <p className="text-text-light mb-6 text-sm">
        You'll need to set a new password before continuing to your dashboard.
      </p>

      {formError && (
        <div className="mb-6 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-5">
        <div>
          <label className="label-field">Current Password</label>
          <input
            required
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input-field"
          />
          {fieldErrors.old_password && (
            <p className="text-xs text-red mt-1">{fieldErrors.old_password[0]}</p>
          )}
        </div>
        <div>
          <label className="label-field">New Password</label>
          <input
            required
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
          />
          {fieldErrors.new_password && (
            <p className="text-xs text-red mt-1">{fieldErrors.new_password[0]}</p>
          )}
        </div>
        <div>
          <label className="label-field">Confirm New Password</label>
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          {fieldErrors.confirm_password && (
            <p className="text-xs text-red mt-1">{fieldErrors.confirm_password[0]}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
