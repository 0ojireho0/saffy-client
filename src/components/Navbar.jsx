'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [showNavItems, setShowNavItems] = useState(false);
  const pathName = usePathname();

  const navItems = [
    { id: 1, title: "HOME", path: "/" },
    { id: 2, title: "PRODUCTS", path: "/products" },
    { id: 3, title: "BLOGS", path: "/blogs" },
    { id: 4, title: "SERVICE", path: "/service" },
    { id: 5, title: "ABOUT", path: "/about" },
    { id: 6, title: "CONTACT", path: "/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setShowNavItems(false);
  }, [pathName]);

  // Close on ESC key
  useEffect(() => {
    if (!showNavItems) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowNavItems(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showNavItems]);

  const openMenu = () => setShowNavItems(true);
  const closeMenu = () => setShowNavItems(false);

  const spring = { type: "spring", stiffness: 260, damping: 28 };

  return (
    <>
      {/* Top bar */}
      <div className="w-full bg-white py-4 px-4 sticky top-0">
        <div className="flex items-center justify-between md:justify-center">
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center"
            aria-label="Open menu"
            onClick={openMenu}
          >
            <Menu />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-6 justify-center items-center">
            {navItems.map((i) => {
              const isActive = pathName === i.path;
              return (
                <Link
                  href={i.path}
                  key={i.id}
                  className={`${
                    isActive ? "text-[#1B1B1B]" : "text-[#9E9E9E]"
                  } sailec-medium hover:text-[#1B1B1B] transition-colors`}
                >
                  {i.title}
                </Link>
              );
            })}
          </div>

          {/* Spacer to keep desktop centered */}
          <div className="md:hidden w-6" />
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {showNavItems && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black"
              onClick={closeMenu}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />

            {/* Slide-over panel */}
            <motion.aside
              className="fixed top-0 left-0 z-50 h-dvh w-[80%] max-w-[320px] bg-white shadow-xl"
              role="dialog"
              aria-modal="true"
              initial={{ x: -320, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 1 }}
              transition={spring}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <div className="sailec-medium text-[#1B1B1B]">Menu</div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  <X />
                </button>
              </div>

              <nav className="flex flex-col px-4 py-4 gap-3">
                {navItems.map((i) => {
                  const isActive = pathName === i.path;
                  return (
                    <Link
                      href={i.path}
                      key={i.id}
                      className={`sailec-medium py-2 ${
                        isActive ? "text-[#1B1B1B]" : "text-[#9E9E9E]"
                      } hover:text-[#1B1B1B] transition-colors`}
                      onClick={closeMenu}
                    >
                      {i.title}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
