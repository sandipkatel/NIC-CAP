import { adminSummary } from "../../data/mockData";

export default function AdminPage() {
  return (
    <div className="container-page py-16 max-w-4xl">
      <p className="eyebrow mb-3">Administration</p>
      <h1 className="section-title mb-6">Admin Panel</h1>

      {/* FR-7.4 - Analytics dashboard */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{adminSummary.totalAmbassadors}</p>
          <p className="text-text-light text-sm mt-1">Total Ambassadors</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-red">{adminSummary.pendingApplications}</p>
          <p className="text-text-light text-sm mt-1">Pending Applications</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{adminSummary.upcomingEvents}</p>
          <p className="text-text-light text-sm mt-1">Upcoming Events</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-extrabold text-navy">{adminSummary.publishedStories}</p>
          <p className="text-text-light text-sm mt-1">Published Stories</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FR-7.1, FR-7.2 */}
        <div className="card">
          <h2 className="font-semibold text-navy mb-2">Ambassadors & Applications</h2>
          <p className="text-text-light text-sm mb-4">
            View/edit/deactivate ambassador records, and approve or reject pending applications.
          </p>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1">Manage Ambassadors</button>
            <button className="btn-primary flex-1">Review Applications</button>
          </div>
        </div>

        {/* FR-7.3 */}
        <div className="card">
          <h2 className="font-semibold text-navy mb-2">Events & Content</h2>
          <p className="text-text-light text-sm mb-4">
            Create, edit, or remove events, and publish new innovation stories.
          </p>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1">Manage Events</button>
            <button className="btn-primary flex-1">Publish Story</button>
          </div>
        </div>
      </div>
    </div>
  );
}
