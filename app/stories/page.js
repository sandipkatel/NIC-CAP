import { innovationStories } from "../../data/mockData";

// TODO: Fetch stories from the backend instead of using mock data
// Currently fetch from mock data as program organized by Sandip, Purnima, Prakriti

export default function StoriesPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow mb-3">Innovation Stories</p>
      <h1 className="section-title mb-3">Ideas built by ambassadors</h1>
      <p className="text-text-light mb-10 max-w-2xl">
        Projects and initiatives published by NIC administrators to showcase student-led
        innovation happening across partner campuses.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {innovationStories.map((s) => (
          <div key={s.id} className="card flex flex-col">
            <div className="w-full h-36 rounded-btn bg-bg border border-border flex items-center justify-center mb-4">
              <span className="text-xs text-text-light">Project photo</span>
            </div>
            <h3 className="font-semibold text-navy mb-1.5">{s.project}</h3>
            <p className="text-sm text-blue font-medium mb-3">{s.team}</p>
            <p className="text-text-light text-sm">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
