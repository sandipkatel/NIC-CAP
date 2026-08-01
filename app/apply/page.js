"use client";

import { useState, useEffect } from "react";
import { submitApplicationAction } from "@/actions/applicationActions";
import { getProvincesAction, getDistrictsAction, getCitiesAction } from "@/actions/locationActions";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  province: "",
  district: "",
  city: "",
  collegeName: "",
  faculty: "",
  currentYearOrSemester: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
};

const initialFiles = {
  cv: null,
  coverLetter: null,
  collegeRecommendationLetter: null,
};

export default function ApplyPage() {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState(initialFiles);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  // Load provinces once on mount.
  useEffect(() => {
    getProvincesAction().then((res) => {
      if (res.ok) setProvinces(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList?.[0] ?? null }));
  };

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setForm((prev) => ({ ...prev, province: provinceId, district: "", city: "" }));
    setDistricts([]);
    setCities([]);
    if (!provinceId) return;

    const res = await getDistrictsAction(provinceId);
    if (res.ok) setDistricts(res.data);
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    setForm((prev) => ({ ...prev, district: districtId, city: "" }));
    setCities([]);
    if (!districtId) return;

    const res = await getCitiesAction(districtId);
    if (res.ok) setCities(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    if (!files.cv || !files.coverLetter || !files.collegeRecommendationLetter) {
      setFormError("CV, cover letter, and college recommendation letter are all required.");
      return;
    }

    const payload = new FormData();
    payload.append("first_name", form.firstName);
    payload.append("last_name", form.lastName);
    payload.append("email", form.email);
    payload.append("phone_number", form.phoneNumber);
    payload.append("province", form.province);
    payload.append("district", form.district);
    payload.append("city", form.city);
    payload.append("address", form.address);
    payload.append("college_name", form.collegeName);
    payload.append("faculty", form.faculty);
    payload.append("current_year_or_semester", form.currentYearOrSemester);
    if (form.linkedinUrl) payload.append("linkedin_url", form.linkedinUrl);
    if (form.githubUrl) payload.append("github_url", form.githubUrl);
    if (form.portfolioUrl) payload.append("portfolio_url", form.portfolioUrl);
    payload.append("cv", files.cv);
    payload.append("cover_letter", files.coverLetter);
    payload.append("college_recommendation_letter", files.collegeRecommendationLetter);

    setIsSubmitting(true);
    const res = await submitApplicationAction(payload);
    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.message || "Something went wrong. Please try again.");
      setFieldErrors(res.fieldErrors || {});
      return;
    }

    setSubmitted(res.data);
  };

  if (submitted) {
    return (
      <div className="container-page py-24 max-w-lg text-center">
        <div className="card">
          <h1 className="section-title mb-3">Application received</h1>
          <p className="text-text-light">
            Thanks, {form.firstName || "there"}. NIC administrators will review your application
            and follow up by email at{" "}
            <span className="font-semibold text-navy">{form.email || "your address"}</span>.
          </p>
          <p className="text-xs text-text-light mt-4">
            Reference ID: <span className="font-mono">{submitted.id}</span> · Status: {submitted.status}
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
        reviewed by NIC staff before a decision is made.
      </p>

      {formError && (
        <div className="mb-6 rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="label-field">First Name <span className="text-red">*</span></label>
            <input required name="firstName" value={form.firstName} onChange={handleChange} className="input-field" placeholder="e.g. Sujata" />
            {fieldErrors.first_name && <p className="text-xs text-red mt-1">{fieldErrors.first_name[0]}</p>}
          </div>
          <div>
            <label className="label-field">Last Name <span className="text-red">*</span></label>
            <input required name="lastName" value={form.lastName} onChange={handleChange} className="input-field" placeholder="e.g. Koirala" />
            {fieldErrors.last_name && <p className="text-xs text-red mt-1">{fieldErrors.last_name[0]}</p>}
          </div>
          <div>
            <label className="label-field">Email <span className="text-red">*</span></label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
            {fieldErrors.email && <p className="text-xs text-red mt-1">{fieldErrors.email[0]}</p>}
          </div>
          <div>
            <label className="label-field">Phone <span className="text-red">*</span></label>
            <input required type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="input-field" placeholder="+9779812345678" />
            {fieldErrors.phone_number && <p className="text-xs text-red mt-1">{fieldErrors.phone_number[0]}</p>}
          </div>
          <div>
            <label className="label-field">Faculty <span className="text-red">*</span></label>
            <input required name="faculty" value={form.faculty} onChange={handleChange} className="input-field" placeholder="e.g. Computer Engineering" />
            {fieldErrors.faculty && <p className="text-xs text-red mt-1">{fieldErrors.faculty[0]}</p>}
          </div>
          <div>
            <label className="label-field">College Name <span className="text-red">*</span></label>
            <input required name="collegeName" value={form.collegeName} onChange={handleChange} className="input-field" placeholder="e.g. Pulchowk Campus" />
            {fieldErrors.college_name && <p className="text-xs text-red mt-1">{fieldErrors.college_name[0]}</p>}
          </div>
          <div>
            <label className="label-field">Current Year / Semester <span className="text-red">*</span></label>
            <input required name="currentYearOrSemester" value={form.currentYearOrSemester} onChange={handleChange} className="input-field" placeholder="e.g. 4th Semester or Final Year" />
            {fieldErrors.current_year_or_semester && (
              <p className="text-xs text-red mt-1">{fieldErrors.current_year_or_semester[0]}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label className="label-field">Province <span className="text-red">*</span></label>
            <select required name="province" value={form.province} onChange={handleProvinceChange} className="input-field">
              <option value="">Select province</option>
              {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {fieldErrors.province && <p className="text-xs text-red mt-1">{fieldErrors.province[0]}</p>}
          </div>
          <div>
            <label className="label-field">District <span className="text-red">*</span></label>
            <select required name="district" value={form.district} onChange={handleDistrictChange} disabled={!form.province} className="input-field disabled:opacity-50">
              <option value="">Select district</option>
              {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            {fieldErrors.district && <p className="text-xs text-red mt-1">{fieldErrors.district[0]}</p>}
          </div>
          <div>
            <label className="label-field">City <span className="text-red">*</span></label>
            <select required name="city" value={form.city} onChange={handleChange} disabled={!form.district} className="input-field disabled:opacity-50">
              <option value="">Select city</option>
              {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {fieldErrors.city && <p className="text-xs text-red mt-1">{fieldErrors.city[0]}</p>}
          </div>
        </div>

        <div>
          <label className="label-field">Address <span className="text-red">*</span></label>
          <input required name="address" value={form.address} onChange={handleChange} className="input-field" placeholder="Street / tole / municipality" />
          {fieldErrors.address && <p className="text-xs text-red mt-1">{fieldErrors.address[0]}</p>}
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
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

        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label className="label-field">CV <span className="text-red">*</span></label>
            <input required type="file" name="cv" accept="application/pdf" onChange={handleFileChange} className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm" />
            <p className="text-xs text-text-light mt-1.5">PDF only, max 5MB.</p>
            {fieldErrors.cv && <p className="text-xs text-red mt-1">{fieldErrors.cv[0]}</p>}
          </div>
          <div>
            <label className="label-field">Cover Letter <span className="text-red">*</span></label>
            <input required type="file" name="coverLetter" accept="application/pdf" onChange={handleFileChange} className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm" />
            <p className="text-xs text-text-light mt-1.5">PDF only, max 5MB.</p>
            {fieldErrors.cover_letter && <p className="text-xs text-red mt-1">{fieldErrors.cover_letter[0]}</p>}
          </div>
          <div>
            <label className="label-field">Recommendation Letter <span className="text-red">*</span></label>
            <input required type="file" name="collegeRecommendationLetter" accept="application/pdf" onChange={handleFileChange} className="input-field file:mr-4 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:bg-navy file:text-white file:text-sm" />
            <p className="text-xs text-text-light mt-1.5">PDF only, max 5MB.</p>
            {fieldErrors.college_recommendation_letter && (
              <p className="text-xs text-red mt-1">{fieldErrors.college_recommendation_letter[0]}</p>
            )}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto disabled:opacity-60">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}