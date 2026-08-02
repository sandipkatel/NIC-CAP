"use client";

import { useState } from "react";
import { submitProfileEditAction } from "@/actions/ambassadorActions";

const initialForm = { bio: "", linkedinUrl: "", githubUrl: "", portfolioUrl: "" };

export default function ProfileEditForm({ hasPendingEdit, onSubmitted }) {
  const [form, setForm] = useState(initialForm);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [cv, setCv] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setSuccessMessage("");

    // All fields are optional per the API, but submitting nothing isn't useful.
    if (!form.bio && !profilePhoto && !form.linkedinUrl && !form.githubUrl && !form.portfolioUrl && !cv) {
      setFormError("Change at least one field before submitting.");
      return;
    }

    const payload = new FormData();
    if (form.bio) payload.append("bio", form.bio);
    if (form.linkedinUrl) payload.append("linkedin_url", form.linkedinUrl);
    if (form.githubUrl) payload.append("github_url", form.githubUrl);
    if (form.portfolioUrl) payload.append("portfolio_url", form.portfolioUrl);
    if (profilePhoto) payload.append("profile_photo", profilePhoto);
    if (cv) payload.append("cv", cv);

    setIsSubmitting(true);
    const res = await submitProfileEditAction(payload);
    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.message || "Couldn't submit your profile edit.");
      setFieldErrors(res.fieldErrors || {});
      return;
    }

    setSuccessMessage("Profile edit submitted — it's now pending admin review.");
    setForm(initialForm);
    setProfilePhoto(null);
    setCv(null);
    onSubmitted?.();
  };

  return (
    <div className="card">
      <h2 className="font-semibold text-navy mb-4">Submit Profile Edit</h2>
      <p className="text-text-light text-sm mb-4">
        Changes go into review before they appear on your public profile.
      </p>

      {hasPendingEdit ? (
        <div className="rounded-btn border border-blue/30 bg-blue/5 px-4 py-3 text-sm text-blue">
          You already have a pending profile edit awaiting review. You can submit a new one once
          it's been reviewed.
        </div>
      ) : (
        <>
          {formError && (
            <div className="mb-4 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
              {formError}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 rounded-btn border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-field">Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="input-field" placeholder="A short public bio" />
              {fieldErrors.bio && <p className="text-xs text-red mt-1">{fieldErrors.bio[0]}</p>}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="label-field">LinkedIn</label>
                <input type="url" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} className="input-field" placeholder="https://linkedin.com/in/..." />
                {fieldErrors.linkedin_url && <p className="text-xs text-red mt-1">{fieldErrors.linkedin_url[0]}</p>}
              </div>
              <div>
                <label className="label-field">GitHub</label>
                <input type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange} className="input-field" placeholder="https://github.com/..." />
                {fieldErrors.github_url && <p className="text-xs text-red mt-1">{fieldErrors.github_url[0]}</p>}
              </div>
              <div>
                <label className="label-field">Portfolio</label>
                <input type="url" name="portfolioUrl" value={form.portfolioUrl} onChange={handleChange} className="input-field" placeholder="https://..." />
                {fieldErrors.portfolio_url && <p className="text-xs text-red mt-1">{fieldErrors.portfolio_url[0]}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Profile Photo</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => setProfilePhoto(e.target.files?.[0] ?? null)}
                  className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm"
                />
                <p className="text-xs text-text-light mt-1.5">JPEG/PNG, max 5MB.</p>
                {fieldErrors.profile_photo && <p className="text-xs text-red mt-1">{fieldErrors.profile_photo[0]}</p>}
              </div>
              <div>
                <label className="label-field">CV</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                  className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm"
                />
                <p className="text-xs text-text-light mt-1.5">PDF only, max 5MB.</p>
                {fieldErrors.cv && <p className="text-xs text-red mt-1">{fieldErrors.cv[0]}</p>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
