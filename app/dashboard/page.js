import { currentAmbassador } from "../../data/mockData";

export default function DashboardPage() {
  const a = currentAmbassador;

  return (
    <div className="container-page py-16 max-w-4xl">
      <p className="eyebrow mb-3">Ambassador Dashboard</p>
      <h1 className="section-title mb-6">Welcome back, {a.name.split(" ")[0]}</h1>

      {/* FR-3.1 - Dashboard summary */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{a.level.split(" ")[1]}</p>
          <p className="text-text-light text-sm mt-1">Level</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{a.tasksCompleted}</p>
          <p className="text-text-light text-sm mt-1">Tasks Completed</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{a.approvedEvents}</p>
          <p className="text-text-light text-sm mt-1">Approved Events</p>
        </div>
        <div className="card text-center">
          <p className="text-sm font-semibold text-red">{a.nextEvent.name}</p>
          <p className="text-text-light text-xs mt-1">Next Event</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FR-3.2 - Profile management */}
        <div className="card">
          <h2 className="font-semibold text-navy mb-4">My Profile</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-text-light">College</dt><dd className="font-medium text-navy">{a.college}</dd></div>
            <div className="flex justify-between"><dt className="text-text-light">Level</dt><dd className="font-medium text-navy">{a.level}</dd></div>
          </dl>
          <button className="btn-secondary mt-5 w-full">Edit Profile</button>
        </div>

        {/* FR-3.3 - Activity report submission */}
        <div className="card">
          <h2 className="font-semibold text-navy mb-4">Submit Activity Report</h2>
          <p className="text-text-light text-sm mb-4">
            Log an event you ran on campus - details, photos, participant count, and outcomes.
          </p>
          <button className="btn-primary w-full">New Activity Report</button>
        </div>
      </div>
    </div>
  );
}
