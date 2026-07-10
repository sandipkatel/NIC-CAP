import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/60">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>National Innovation Centre</li>
            <li>Jawalakhel, Lalitpur, Nepal</li>
            <li>cap@nic.org.np</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} National Innovation Centre. All rights reserved.
      </div>
    </footer>
  );
}
