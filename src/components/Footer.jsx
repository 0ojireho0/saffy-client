"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const explorePages = {
    column1: ["HOME", "PRODUCTS", "BLOGS"],
    column2: ["SERVICE", "ABOUT", "CONTACT"],
  };

  const socials = {
    column1: ["FACEBOOK", "INSTAGRAM"],
    column2: ["SHOPEE", "LAZADA"],
  };

  const hrefForPage = (page) => (page === "HOME" ? "/" : `/${page.toLowerCase()}`);

  return (
    <footer
      className="
        relative w-full bg-[#002420] text-[#f5ffef]
        px-5 py-10
        md:px-10 md:py-12
        flex flex-col gap-10

        /* ✅ KEEP DESKTOP VIEW */
        xl:flex-row xl:items-start xl:gap-84.25 xl:px-31.25 xl:py-15
        min-h-61
      "
    >
      {/* Left */}
      <div className="flex flex-col items-start w-full xl:w-64 min-w-0">
        <h2
          className="
            sailec-bold tracking-[0]
            text-3xl leading-tight
            md:text-4xl md:leading-12
            xl:text-[46px] xl:leading-[55.2px]
            whitespace-nowrap
          "
        >
          SAFFY INC
        </h2>

        <address
          className="
            mt-2
            sailec-medium font-medium not-italic tracking-[0]
            text-base leading-relaxed
            md:text-xl
            xl:text-xl xl:leading-7
            w-full text-[#F6FFEF]
            wrap-break-words
          "
        >
          2594 Lamayan, Santa Ana, Manila, 1009 Metro Manila
        </address>
      </div>

      {/* Right */}
      <nav
        className="
          w-full min-w-0

          /* ✅ MOBILE/TABLET DESIGN (MY OWN) */
          grid grid-cols-1 gap-10
          sm:grid-cols-2 sm:gap-12
          md:grid-cols-2 md:gap-12
          lg:grid-cols-3 lg:gap-12

          /* ✅ KEEP DESKTOP VIEW */
          xl:inline-flex xl:flex-nowrap xl:w-auto xl:gap-32.5
        "
        aria-label="Footer navigation"
      >
        {/* Explore Pages */}
        <div className="flex flex-col gap-4.5 min-w-0">
          <h3 className="sailec-bold font-bold text-xl leading-6 whitespace-nowrap">
            EXPLORE PAGES
          </h3>

          {/* Mobile/tablet: compact 2-column list
              Desktop(xl): keep your original two columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 xl:flex xl:gap-14.5">
            {/* Column 1 */}
            <ul className="flex flex-col gap-2 list-none p-0 m-0 min-w-0">
              {explorePages.column1.map((page) => (
                <li
                  key={page}
                  className="sailec-medium font-medium text-[18px] md:text-xl leading-[21.6px]"
                >
                  <Link
                    href={hrefForPage(page)}
                    className="hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Column 2 */}
            <ul className="flex flex-col gap-2 list-none p-0 m-0 min-w-0">
              {explorePages.column2.map((page) => (
                <li
                  key={page}
                  className="sailec-medium font-medium text-[18px] md:text-xl leading-[21.6px]"
                >
                  <Link
                    href={hrefForPage(page)}
                    className="hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4.5 min-w-0">
          <h3 className="sailec-bold font-bold text-xl leading-6 whitespace-nowrap">
            SOCIALS
          </h3>

          {/* Mobile/tablet: compact 2-column list
              Desktop(xl): keep your original two columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 xl:flex xl:gap-14.5">
            {/* Column 1 */}
            <ul className="flex flex-col gap-2 list-none p-0 m-0 min-w-0">
              {socials.column1.map((platform) => (
                <li
                  key={platform}
                  className="sailec-medium font-medium text-[18px] md:text-xl leading-[21.6px]"
                >
                  <a
                    href={
                      platform === "FACEBOOK"
                        ? "https://facebook.com"
                        : "https://instagram.com"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]"
                    aria-label={`Visit our ${platform} page`}
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>

            {/* Column 2 */}
            <ul className="flex flex-col gap-2 list-none p-0 m-0 min-w-0">
              {socials.column2.map((platform) => (
                <li
                  key={platform}
                  className="sailec-medium font-medium text-[18px] md:text-xl leading-[21.6px]"
                >
                  <a
                    href={
                      platform === "SHOPEE"
                        ? "https://shopee.ph"
                        : "https://lazada.com.ph"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]"
                    aria-label={`Visit our ${platform} store`}
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email */}
        <div
          className="
            flex flex-col gap-4.5 min-w-0
            w-full

            /* tablet layout: span full width nicely */
            sm:col-span-2 lg:col-span-1

            /* ✅ KEEP DESKTOP VIEW */
            xl:w-64
          "
        >
          <h3 className="sailec-bold font-bold text-xl leading-6 whitespace-nowrap">
            EMAIL
          </h3>

          <a
            href="mailto:marketing@saffyinc.com"
            className="
              sailec-medium font-medium text-[18px] md:text-xl leading-[25.2px]
              hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]
              wrap-break-words
            "
          >
            marketing@saffyinc.com
          </a>
        </div>
      </nav>
    </footer>
  );
}
