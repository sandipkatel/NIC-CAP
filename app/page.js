import Link from "next/link";
import { stats, processSteps, benefits } from "../data/mockData";

export default function HomePage() {
  return (
    <>
      {/* FR-1.1 — Hero */}
      <section className="bg-navy text-white">
        <div className="container-page py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow mb-4">National Innovation Centre · Nepal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-5">
              Every campus has an innovator. <span className="text-red">We give them a platform.</span>
            </h1>
            <p className="text-white/75 text-lg mb-8 max-w-md">
              The College Ambassador Program trains students to lead innovation activities
              at their own institution — with NIC&apos;s network, resources, and mentorship behind them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary">Become Ambassador</Link>
              <Link href="/network" className="btn-outline-light">Explore Network</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-sm aspect-square rounded-card bg-navy-tint border border-white/10 flex items-center justify-center">
              <p className="text-white/40 text-sm text-center px-8">
                Campus illustration / photo placeholder
                <br />(supplied by NIC per SRS §2.4)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FR-1.5 — Summary statistics */}
      <section className="bg-navy">
        <div className="container-page pb-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card !bg-navy-tint !border-white/10 text-center py-6">
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-white/60 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FR-1.2 — About CAP */}
      <section id="about" className="container-page py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow mb-3">About CAP</p>
            <h2 className="section-title mb-5">Not a club. A launchpad.</h2>
            <p className="text-text-light leading-relaxed mb-4">
              The College Ambassador Program (CAP) is NIC&apos;s student-led extension into
              universities across Nepal. Our mission is simple: put innovation tools,
              mentorship, and national visibility directly in the hands of students who
              want to build something on their own campus.
            </p>
            <p className="text-text-light leading-relaxed">
              Since launch, ambassadors have organized hackathons, design workshops, and
              idea-pitch nights that connect classmates to NIC&apos;s incubation and funding
              programs — turning campus projects into recognized ventures.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-navy mb-2">Our Vision</h3>
            <p className="text-text-light text-sm mb-5">
              A Nepal where every college has a direct line to national innovation
              infrastructure — no student's idea stalls for lack of access.
            </p>
            <h3 className="font-semibold text-navy mb-2">Our Impact</h3>
            <p className="text-text-light text-sm">
              186 active ambassadors across 37 partner institutions have reached over
              12,000 students with hands-on innovation programming.
            </p>
          </div>
        </div>
      </section>

      {/* FR-1.3 — Benefits */}
      <section className="bg-card border-y border-border">
        <div className="container-page py-20">
          <p className="eyebrow mb-3 text-center">Why Join</p>
          <h2 className="section-title text-center mb-12">What ambassadors gain</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="card">
                <h3 className="font-semibold text-navy mb-2">{b.title}</h3>
                <p className="text-text-light text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FR-1.4 — Application process as a sequence */}
      <section className="container-page py-20">
        <p className="eyebrow mb-3 text-center">The Path</p>
        <h2 className="section-title text-center mb-14">From application to leadership</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {processSteps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="card h-full">
                <p className="text-red font-extrabold text-2xl mb-2">0{s.step}</p>
                <h3 className="font-semibold text-navy mb-1.5">{s.title}</h3>
                <p className="text-text-light text-sm">{s.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy text-white">
        <div className="container-page py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to lead innovation on your campus?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Applications are reviewed on a rolling basis by the NIC team.
          </p>
          <Link href="/apply" className="btn-primary">Start Your Application</Link>
        </div>
      </section>
    </>
  );
}
