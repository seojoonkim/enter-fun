"use client";

interface FooterProps {
  language: "ko" | "en";
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-dark px-4 py-10">
      <div className="container mx-auto flex flex-col gap-4 text-sm text-gray-300 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-2xl font-black text-mint">enter.fun</p>
          <p className="mt-2 max-w-sm text-gray-400">
            {language === "ko"
              ? "게임 스트리머와 게임사가 함께 성장하는 공정한 수익 생태계"
              : "A fair reward ecosystem where streamers and game companies grow together"}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="transition hover:text-white">
            Twitter/X
          </a>
          <a href="#" className="transition hover:text-white">
            Discord
          </a>
          <a href="#" className="transition hover:text-white">
            Telegram
          </a>
        </div>
      </div>
      <p className="container mx-auto mt-6 border-t border-white/10 pt-4 text-center text-xs text-gray-500">
        © 2026 Enter.fun. Hashed × Nexus Joint Venture
      </p>
    </footer>
  );
}
