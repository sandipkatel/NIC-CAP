"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply" },
  { href: "/events", label: "Events" },
  { href: "/network", label: "Network" },
  { href: "/stories", label: "Stories" },
];

// Dashboard/Admin are separate "portals" — kept apart from the public
// navigation links since they represent logged-in areas of the site.
const portalLinks = [
  { href: "/dashboard", label: "Ambassador Login" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="bg-navy sticky top-0 z-50">
      <nav className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-lg tracking-tight">
          <span className="bg-red rounded-md w-8 h-8 flex items-center justify-center text-sm">NIC</span>
          <span className="hidden sm:inline">College Ambassador Program</span>
          <span className="sm:hidden">CAP</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-150 pb-1 border-b-2 ${
                isActive(link.href)
                  ? "text-white border-red"
                  : "text-[#F8F9FA]/80 border-transparent hover:text-white hover:border-red/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-white/20" />
          {portalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-150 ${
                isActive(link.href) ? "text-red" : "text-[#F8F9FA]/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-5 pb-4">
          {[...navLinks, ...portalLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium ${
                isActive(link.href) ? "text-red" : "text-[#F8F9FA]/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
