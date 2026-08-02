function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProfileSummary({ profile }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{profile.status}</p>
          <p className="text-text-light text-sm mt-1">Status</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{profile.batch}</p>
          <p className="text-text-light text-sm mt-1">Batch</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{profile.is_public ? "Public" : "Private"}</p>
          <p className="text-text-light text-sm mt-1">Directory Visibility</p>
        </div>
        <div className="card text-center">
          <p className="text-sm font-semibold text-navy">{formatDate(profile.created_at)}</p>
          <p className="text-text-light text-xs mt-1">Member Since</p>
        </div>
      </div>

      <div id="edit-profile" className="card scroll-mt-8">
        <h2 className="font-semibold text-navy mb-4">My Profile</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-text-light">College</dt>
            <dd className="font-medium text-navy">{profile.college_name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-light">Faculty</dt>
            <dd className="font-medium text-navy">{profile.faculty}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-light">Year / Semester</dt>
            <dd className="font-medium text-navy">{profile.current_year_or_semester}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-light">Organization Email</dt>
            <dd className="font-medium text-navy">{profile.organization_email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-light">Personal Email</dt>
            <dd className="font-medium text-navy">{profile.personal_email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-light">Phone</dt>
            <dd className="font-medium text-navy">{profile.phone_number}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-light">Address</dt>
            <dd className="font-medium text-navy text-right">
              {profile.address}, {profile.city}, {profile.district}, {profile.province}
            </dd>
          </div>
        </dl>

        {profile.bio && (
          <div className="mt-4">
            <p className="text-text-light text-sm mb-1">Bio</p>
            <p className="text-navy text-sm">{profile.bio}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-red font-semibold hover:underline">
              LinkedIn →
            </a>
          )}
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-navy font-semibold hover:underline">
              GitHub →
            </a>
          )}
          {profile.portfolio_url && (
            <a href={profile.portfolio_url} target="_blank" rel="noreferrer" className="text-navy font-semibold hover:underline">
              Portfolio →
            </a>
          )}
        </div>
      </div>
    </>
  );
}
