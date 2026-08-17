"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/actions/authActions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    const res = await requestPasswordResetAction(email);
    setIsSubmitting(false);

    if (!res.ok) {
      setError(res.message || "Couldn't process your request.");
      return;
    }

    // The API always returns the same message regardless of whether the
    // email exists, by design — don't build UI that reveals account existence.
    setMessage(res.data?.detail || "If an account with that email exists, a password reset email has been sent.");
  };

  return (
    <div className="container-page py-24 max-w-md">
      <p className="eyebrow mb-3">Account Security</p>
      <h1 className="section-title mb-3">Forgot your password?</h1>
      <p className="text-text-light mb-6 text-sm">
        Enter your email and we'll send you a link to reset your password.
      </p>

      {error && (
        <div className="mb-6 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {error}
        </div>
      )}
      {message && (
        <div className="mb-6 rounded-btn border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {!message && (
        <form onSubmit={handleSubmit} className="card space-y-5">
          <div>
            <label className="label-field">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      <p className="text-text-light text-sm mt-6 text-center">
        <Link href="/login" className="text-navy font-semibold hover:underline">Back to sign in</Link>
      </p>
    </div>
  );
}
