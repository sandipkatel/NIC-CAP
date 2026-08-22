import Link from "next/link";
import HeroImageStack from "../components/home/HeroImageStack";
import { stats, processSteps, benefits } from "../data/mockData";

export default function HomePage() {
  return (
    <>
     {/* FR-1.1 - Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Decorative glow accents for depth */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-red/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 bg-blue/20 rounded-full blur-3xl" />

        <div className="container-page relative pt-10 md:pt-12 pb-28 md:pb-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">National Innovation Centre · Nepal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-5">
              Every campus has an innovator. <span className="text-red">We give them a platform.</span>
            </h1>
            <p className="text-white/75 text-lg mb-8 max-w-md">
              The College Ambassador Program trains students to lead innovation activities
              at their own institution - with NIC&apos;s network, resources, and mentorship behind them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn-primary">Become Ambassador</Link>
              <Link href="/network" className="btn-outline-light">Explore Network</Link>
            </div>
          </div>
          <HeroImageStack />
        </div>
      </section>

      {/* FR-1.5 - Summary statistics, elevated to bridge hero and the section below */}
      <section className="container-page relative z-10 -mt-16 md:-mt-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card text-center py-7 shadow-lg">
              <p className="text-3xl font-extrabold text-navy">{s.value}</p>
              <p className="text-text-light text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Student Program */}
      <section id="about" className="container-page pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="eyebrow mb-3">About NIC Student Program</p>
            <h2 className="section-title mb-5">Not a club. A launchpad.</h2>
            <p className="text-text-light leading-relaxed mb-4">
              The NIC Student Program connects students directly to Nepal&apos;s national
              innovation ecosystem. Instead of another campus club that meets and disperses,
              it&apos;s a standing bridge between colleges and the people building the
              country&apos;s innovation infrastructure - mentors, funders, and industry
              partners who are actively looking for early talent.
            </p>
            <p className="text-text-light leading-relaxed mb-4">
              Student Ambassadors are the front line of that bridge. They bring opportunities,
              events, and resources back to their own campuses, and in turn surface student
              ideas and projects that deserve a wider audience. It&apos;s hands-on: organizing
              sessions, running outreach, and helping peers turn a rough idea into something
              they can actually pitch, build, or ship.
            </p>
            <p className="text-text-light leading-relaxed">
              The program is built on one belief - talent is distributed evenly across Nepal,
              but access to opportunity isn&apos;t. Being an Ambassador means closing that gap
              for your own college, one connection at a time.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-navy mb-2">Our Vision</h3>
            <p className="text-text-light text-sm mb-5">
              A Nepal where every college has a direct line to national innovation
              infrastructure - no student's idea stalls for lack of access.
            </p>
            <img
              src="/images/vision-illustration.png"
              alt="Illustration of a student looking ahead through a telescope, representing vision and foresight"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* FR-1.3 - Benefits */}
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

      {/* FR-1.4 - Application process as a sequence */}
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
