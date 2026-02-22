"use client";

interface NavbarProps {
  language: "ko" | "en";
  onLanguageChange: (language: "ko" | "en") => void;
}

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-dark/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
        <p className="text-xl font-extrabold tracking-tight text-mint">enter.fun</p>
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-white/20 bg-[#0e1022]/60 px-3 py-2 text-sm text-gray-200">
            <button
              className={`px-2 py-1 transition ${
                language === "ko" ? "text-mint" : "text-gray-300"
              }`}
              type="button"
              onClick={() => onLanguageChange("ko")}
            >
              KO
            </button>
            <span className="text-gray-500"> | </span>
            <button
              className={`px-2 py-1 transition ${
                language === "en" ? "text-mint" : "text-gray-300"
              }`}
              type="button"
              onClick={() => onLanguageChange("en")}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="rounded-full bg-mint px-4 py-2 text-sm font-semibold text-dark transition hover:brightness-95"
          >
            Early Access
          </button>
        </div>
      </div>
    </header>
  );
}
