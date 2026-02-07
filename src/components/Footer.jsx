"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const explorePages = [
    {
      column1: ["HOME", "PRODUCTS", "BLOGS"],
      column2: ["SERVICE", "ABOUT", "CONTACT"],
    },
  ];

  const socials = [
    { column1: ["FACEBOOK", "INSTAGRAM"], column2: ["SHOPEE", "LAZADA"] },
  ];

  return (
    <footer
      className="
        relative w-full bg-[#002420] text-[#f5ffef]
        px-5 py-10
        md:px-10 md:py-12
        flex flex-col gap-10
        xl:flex-row xl:items-start xl:gap-84.25 xl:px-31.25 xl:py-15
        min-h-61
      "
    >
      {/* Left */}
      <div className="flex flex-col items-start w-full xl:w-64">
        <h2 className="
          sailec-bold tracking-[0]
          text-3xl leading-tight
          md:text-4xl md:leading-12
          xl:text-[46px] xl:leading-[55.2px]
          whitespace-nowrap
        ">
          SAFFY INC
        </h2>

        <address className="
          mt-2
          sailec-medium font-medium not-italic tracking-[0]
          text-base leading-relaxed
          md:text-xl
          xl:text-xl xl:leading-7
          w-full
          text-[#F6FFEF]
        ">
          2594 Lamayan, Santa Ana, Manila, 1009 Metro Manila
        </address>
      </div>

      {/* Right */}
      <nav
        className="
          w-full
          flex flex-col gap-10
          md:flex-row md:flex-wrap md:gap-12
          xl:inline-flex xl:flex-nowrap xl:w-auto xl:gap-32.5
        "
        aria-label="Footer navigation"
      >
        {/* Explore Pages */}
        <div className="flex flex-col gap-4.5">
          <h3 className="sailec-bold font-bold text-xl leading-6 whitespace-nowrap">
            EXPLORE PAGES
          </h3>

          <div className="
            flex gap-10
            sm:gap-14
            xl:gap-14.5
          ">
            {explorePages.map((pages, index) => (
              <div key={index} className="contents">
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {pages.column1.map((page, pageIndex) => (
                    <li
                      key={pageIndex}
                      className="sailec-medium font-medium text-xl leading-[21.6px]"
                    >
                      <Link
                        href={`/${page.toLowerCase()}`}
                        className="hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]"
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {pages.column2.map((page, pageIndex) => (
                    <li
                      key={pageIndex}
                      className="sailec-medium font-medium text-xl leading-[21.6px]"
                    >
                      <Link
                        href={`/${page.toLowerCase()}`}
                        className="hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef]"
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4.5">
          <h3 className="sailec-bold font-bold text-xl leading-6 whitespace-nowrap">
            SOCIALS
          </h3>

          <div className="
            flex gap-10
            sm:gap-14
            xl:gap-14.5
          ">
            {socials.map((social, index) => (
              <div key={index} className="contents">
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {social.column1.map((platform, platformIndex) => (
                    <li
                      key={platformIndex}
                      className="sailec-medium font-medium text-xl leading-[21.6px] whitespace-nowrap"
                    >
                      <a
                        href={`https://${platform.toLowerCase()}.com`}
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

                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {social.column2.map((platform, platformIndex) => (
                    <li
                      key={platformIndex}
                      className="sailec-medium font-medium text-xl leading-[21.6px] whitespace-nowrap"
                    >
                      <a
                        href={`https://${platform.toLowerCase()}.com`}
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
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-4.5 w-full md:w-65 xl:w-64">
          <h3 className="sailec-bold font-bold text-xl leading-6 whitespace-nowrap">
            EMAIL
          </h3>

          <a
            href="mailto:marketing@saffyinc.com"
            className="sailec-medium font-medium text-xl leading-[25.2px] hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#f5ffef] break-all"
          >
            marketing@saffyinc.com
          </a>
        </div>
      </nav>
    </footer>
  );
}
