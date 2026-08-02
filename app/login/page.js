"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/authActions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const res = await loginAction(email, password);
    setIsSubmitting(false);

    if (!res.ok) {
      setError(res.message || "Invalid email or password.");
      return;
    }

    // API note: must_change_password forces a stop here before dashboard access.
    if (res.data.mustChangePassword) {
      router.push("/change-password");
      return;
    }

    router.push(res.data.user.role === "ADMIN" || res.data.user.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="container-page py-24 max-w-md">
      <p className="eyebrow mb-3">Ambassador Login</p>
      <h1 className="section-title mb-6">Sign in</h1>

      {error && (
        <div className="mb-6 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {error}
        </div>
      )}

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
        <div>
          <label className="label-field">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}