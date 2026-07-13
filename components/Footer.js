import Link from "next/link";
import Image from "next/image";

export default function Footer() {
   const quickActions = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.43c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21h-4V9Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      ),
    },
    {
      name: "Mail",
      href: "mailto:cap@nic.org.np",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 6h16v12H4z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-navy text-white mt-20">
      <div className="container-page py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg mb-3">
            <Image src="/logo.png" alt="NIC CAP" width={32} height={32} className="rounded-lg bg-slate-50 rounded-full w-8 h-8" />
            <span>CAP</span>
          </div>
          <p className="text-sm text-white/70">
            National Innovation Centre, Nepal - building the country&apos;s next generation
            of student innovators, one campus at a time.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/60">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-red transition-colors">Home</Link></li>
            <li><Link href="/apply" className="hover:text-red transition-colors">Apply</Link></li>
            <li><Link href="/events" className="hover:text-red transition-colors">Events</Link></li>
            <li><Link href="/network" className="hover:text-red transition-colors">Ambassador Network</Link></li>
            <li><Link href="/stories" className="hover:text-red transition-colors">Innovation Stories</Link></li>
          </ul>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/60">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70 sm:flex-1">
              <li>National Innovation Centre, ICT Lab</li>
              <li>Pokhara, Kaski, Nepal</li>
              <li>cap@nic.org.np</li>
            </ul>
            <div className="mt-8">
              <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-white/60">Quick Connect</h4>
              <div className="flex items-center gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/10 text-white/80 hover:text-red hover:bg-white/20 transition-colors"
                    aria-label={action.name}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {action.icon}
                  </Link>
                ))}
              </div>
            </div>
            </div>
            <div
              className="w-full sm:flex-1 overflow-hidden rounded-lg"
              style={{ position: "relative", paddingBottom: "50%", height: 0 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3414.1171174484602!2d83.98379877536637!3d28.243702875879336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595b4d7957d9d%3A0x1f703077bd987c49!2sICT%26Electronics%20Innovation%20Lab%20(NIC)!5e1!3m2!1sen!2snp!4v1783871053932!5m2!1sen!2snp"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="NIC CAP Location Map"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} National Innovation Centre. All rights reserved.
      </div>
    </footer>
  );
}