"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "작동 원리", href: "#how-it-works" },
  { label: "제품", href: "#products" },
  { label: "수수료 비교", href: "#comparison" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/5 bg-dark/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-0">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 text-xl font-black tracking-tight">
            <span className="text-mint">Enter</span>
            <span className="text-white">.fun</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-white/50 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile menu toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#waitlist"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-mint px-5 py-2.5 text-sm font-bold text-dark shadow-[0_0_16px_rgba(0,212,170,0.25)] transition hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(0,212,170,0.35)] active:scale-[0.98]"
            >
              얼리 액세스
            </a>

            {/* Mobile menu button */}
            <button
              className="flex md:hidden flex-col justify-center gap-1.5 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              aria-label="메뉴"
            >
              <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-16 z-40 border-b border-white/5 bg-dark/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="container flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#waitlist"
                className="mt-2 rounded-full bg-mint px-5 py-3 text-center text-sm font-bold text-dark"
                onClick={() => setMenuOpen(false)}
              >
                얼리 액세스 신청
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
