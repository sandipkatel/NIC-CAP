"use client";

import { useState } from "react";
import PlaceholderNote from "../../components/PlaceholderNote";
import { collegeOptions, academicYearOptions, skillOptions } from "../../data/mockData";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  college: "",
  collegeLocation: "",
  faculty: "",
  academicYear: "",
  skills: [],
  motivation: "",
  socialLinks: "",
};

export default function ApplyPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // FR-2.3 — In production this would POST to the backend, which routes
    // the application to NIC administrators for review. Here we just
    // simulate that with local state.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-page py-24 max-w-lg text-center">
        <div className="card">
          <h1 className="section-title mb-3">Application received</h1>
          <p className="text-text-light">
            Thanks, {form.fullName.split(" ")[0] || "there"}. NIC administrators will review your
            application and follow up by email at <span className="font-semibold text-navy">{form.email || "your address"}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-16 max-w-3xl">
      <p className="eyebrow mb-3">Ambassador Recruitment</p>
      <h1 className="section-title mb-3">Apply to become an ambassador</h1>
      <p className="text-text-light mb-8">
        Fields marked <span className="text-red">*</span> are required. Your application is
        reviewed by NIC staff before a decision is made (FR-2.3, FR-2.4).
      </p>

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Full Name <span className="text-red">*</span></label>
            <input required name="fullName" value={form.fullName} onChange={handleChange} className="input-field" placeholder="e.g. Sujata Koirala" />
          </div>
          <div>
            <label className="label-field">Email <span className="text-red">*</span></label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
          </div>
          <div>
            <label className="label-field">Phone <span className="text-red">*</span></label>
            <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="98XXXXXXXX" />
          </div>
          <div>
            <label className="label-field">Faculty <span className="text-red">*</span></label>
            <input required name="faculty" value={form.faculty} onChange={handleChange} className="input-field" placeholder="e.g. Computer Engineering" />
          </div>
          <div>
            <label className="label-field">College <span className="text-red">*</span></label>
            <select required name="college" value={form.college} onChange={handleChange} className="input-field">
              <option value="">Select your college</option>
              {collegeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">Academic Year <span className="text-red">*</span></label>
            <select required name="academicYear" value={form.academicYear} onChange={handleChange} className="input-field">
              <option value="">Select year</option>
              {academicYearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="label-field">Address <span className="text-red">*</span></label>
          <input required name="address" value={form.address} onChange={handleChange} className="input-field" placeholder="Start typing your address" />
          <p className="text-xs text-text-light mt-1.5">
            Autocomplete note below — this field uses a plain text input for now.
          </p>
        </div>

        <div>
          <label className="label-field">College Location <span className="text-red">*</span></label>
          <input required name="collegeLocation" value={form.collegeLocation} onChange={handleChange} className="input-field" placeholder="Start typing college location" />
        </div>

        <PlaceholderNote title="OpenStreetMap (OSM) address autocomplete">
          Per SRS FR-2.1, the Address and College Location fields are meant to use OSM-based
          location suggestions as the user types. That requires a map/geocoding integration
          (e.g. Nominatim) which is out of scope for this frontend boilerplate — the fields
          above are plain text inputs standing in for that behavior.
        </PlaceholderNote>

        <div>
          <label className="label-field">Skills</label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors duration-150 ${
                  form.skills.includes(skill)
                    ? "bg-red text-white border-red"
                    : "bg-transparent text-navy border-border hover:border-navy"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-field">Motivation <span className="text-red">*</span></label>
          <textarea required name="motivation" value={form.motivation} onChange={handleChange} rows={4} className="input-field" placeholder="Why do you want to become an ambassador?" />
        </div>

        <div>
          <label className="label-field">Social Links <span className="text-red">*</span></label>
          <input required type="url" name="socialLinks" value={form.socialLinks} onChange={handleChange} className="input-field" placeholder="https://linkedin.com/in/your-profile" />
        </div>

        <div>
          <label className="label-field">Recommendation Letter</label>
          <input type="file" className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm" />
          <p className="text-xs text-text-light mt-1.5">Optional. PDF preferred, max 5MB.</p>
        </div>

        <PlaceholderNote title="File upload & storage">
          Uploaded recommendation letters would be sent to backend storage (e.g. S3 or a
          Django media bucket) and linked to the application record. This form does not
          persist the file — it is a UI placeholder only.
        </PlaceholderNote>

        <button type="submit" className="btn-primary w-full sm:w-auto">Submit Application</button>
      </form>
    </div>
  );
}
