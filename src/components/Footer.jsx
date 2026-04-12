"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const explorePages = [
    { label: "HOME", href: "/" },
    { label: "GALLERY", href: "#" },
    { label: "STORIES", href: "/stories" },
    { label: "SERVICE", href: "/service" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const socials = [
    { label: "FACEBOOK", href: "https://www.facebook.com/manomanosaffy" },
    { label: "INSTAGRAM", href: "https://www.instagram.com/manomanosaffy" },
    { label: "SHOPEE", href: "https://shopee.ph/shop/184550137" },
    { label: "LAZADA", href: "https://www.lazada.com.ph/shop/saffy-handicrafts" },
  ];

  return (
    <footer className="bg-[#002520] text-[#F6FFEF] px-6 py-10 sm:px-10 lg:px-16 2xl:px-32">
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[1.6fr_1fr_0.9fr_1fr] xl:gap-12">
          {/* Company Info */}
          <div className="min-w-0">
            <h1 className="sailec-bold text-[36px] leading-none sm:text-[48px] xl:text-[56px]">
              SAFFY INC
            </h1>

            <div className="mt-4 space-y-1">
              <p className="sailec-medium text-[20px] leading-[1.35] sm:text-[22px] xl:text-[20px]">
                2594 Lamayan, Santa Ana,
              </p>
              <p className="sailec-medium text-[20px] leading-[1.35] sm:text-[22px] xl:text-[20px]">
                Manila, 1009 Metro Manila
              </p>
            </div>
          </div>

          {/* Explore Pages */}
          <div className="min-w-0">
            <h2 className="sailec-bold text-[20px] sm:text-[22px] xl:text-[20px]">
              EXPLORE PAGES
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {explorePages.map((page) => (
                <Link
                  key={page.label}
                  href={page.href}
                  className="sailec-medium text-[18px] leading-[1.4] hover:opacity-80 transition-opacity"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="min-w-0">
            <h2 className="sailec-bold text-[20px] sm:text-[22px] xl:text-[20px]">
              SOCIALS
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  target="_blank"
                  href={social.href}
                  className="sailec-medium text-[18px] leading-[1.4] hover:opacity-80 transition-opacity"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="min-w-0">
            <h2 className="sailec-bold text-[20px] sm:text-[22px] xl:text-[20px]">
              EMAIL
            </h2>

            <div className="mt-4">
              <a
                href="mailto:saffy@saffyinc.com"
                className="sailec-medium text-[18px] leading-[1.4] break-all hover:opacity-80 transition-opacity"
              >
                saffy@saffyinc.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}