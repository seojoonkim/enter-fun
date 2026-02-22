"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-dark/80 border-b border-white/5 backdrop-blur-md" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-0">
        <a href="/" className="text-2xl font-black tracking-tight">
          <span className="text-mint">Enter</span>
          <span className="text-white">.fun</span>
        </a>
        <a
          href="#waitlist"
          className="rounded-full bg-purple px-5 py-2 text-sm font-semibold text-white"
        >
          얼리 액세스
        </a>
      </div>
    </header>
  );
}
