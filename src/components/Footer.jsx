'use client'
import React from "react";
import Link from "next/link";

export default function Footer() {
  const navItems = [
    { id: 1, title: "HOME", path: "/" },
    { id: 2, title: "PRODUCTS", path: "/products" },
    { id: 3, title: "BLOGS", path: "/blogs" },
    { id: 4, title: "SERVICE", path: "/service" },
    { id: 5, title: "ABOUT", path: "/about" },
    { id: 6, title: "CONTACT", path: "/contact" },
  ];

  const socials = [
    { id: 1, title: "FACEBOOK", path: "/" },
    { id: 2, title: "SHOPEE", path: "/" },
    { id: 3, title: "INSTAGRAM", path: "/" },
    { id: 4, title: "LAZADA", path: "/" },
  ];

  return (
    <footer className="w-full bg-[#002520] text-white">
      <div className="px-5 py-10 md:px-10 md:py-12 max-w-7xl mx-auto">
        {/* Layout */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-12 md:items-start">
          {/* Brand / Address */}
          <div className="md:basis-1/4 space-y-2">
            <h1 className="sailec-bold text-2xl md:text-3xl">SAFFY INC</h1>
            <div className="text-sm text-white/80 leading-relaxed">
              <p>2594 Lamayan, Santa Ana,</p>
              <p>Manila, 1009 Metro Manila</p>
            </div>
          </div>

          {/* Right side sections */}
          <div className="md:basis-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Explore Pages */}
            <div className="space-y-3">
              <h2 className="sailec-bold text-base md:text-lg tracking-wide">
                EXPLORE PAGES
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-6">
                {navItems.map((i) => (
                  <Link
                    key={i.id}
                    href={i.path}
                    className="text-sm sailec-medium text-white/75 hover:text-white transition-colors"
                  >
                    {i.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <h2 className="sailec-bold text-base md:text-lg tracking-wide">
                SOCIALS
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-6">
                {socials.map((i) => (
                  <Link
                    key={i.id}
                    href={i.path}
                    className="text-sm sailec-medium text-white/75 hover:text-white transition-colors"
                  >
                    {i.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <h2 className="sailec-bold text-base md:text-lg tracking-wide">
                EMAIL
              </h2>
              <a
                href="mailto:marketing@saffyinc.com"
                className="text-sm sailec-medium text-white/75 hover:text-white transition-colors break-all"
              >
                marketing@saffyinc.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} SAFFY INC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
