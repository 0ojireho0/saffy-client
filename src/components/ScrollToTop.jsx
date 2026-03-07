"use client";

import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show after user scrolls down a bit
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={[
        "fixed right-4 sm:right-6 bottom-4 sm:bottom-6",
        "flex items-center gap-2",
        "rounded-full px-3 py-2",
        "bg-[#E4E9A7] text-[#05251F]",
        "sailec-medium text-[12px] sm:text-[13px]",
        "shadow-lg",
        "transition-all duration-200",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
        "hover:scale-105",
      ].join(" ")}
    >
      {/* small arrow (no extra libs) */}
      <span className="text-[14px] leading-none">↑</span>
      <span>Scroll Up</span>
    </button>
  );
}