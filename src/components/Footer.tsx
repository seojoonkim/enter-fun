export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark py-12">
      <div className="container px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-xl font-black tracking-tight">
              <span className="text-mint">Enter</span>
              <span className="text-white">.fun</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray">
              스트리머가 정당하게 보상받는 구조를 만듭니다.
              <br />
              게임에서 시작해, 모든 라이브 커머스로.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-gray md:grid-cols-3">
            <a href="#how-it-works" className="transition hover:text-white">어떻게 작동하나요</a>
            <a href="#products" className="transition hover:text-white">제품</a>
            <a href="#comparison" className="transition hover:text-white">비교</a>
            <a href="#vision" className="transition hover:text-white">비전</a>
            <a href="#waitlist" className="text-mint transition hover:text-mint/80">얼리 액세스 →</a>
            <a href="mailto:contact@enter.fun" className="transition hover:text-white">Contact</a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">소셜</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white"
                aria-label="Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M13 1L8.5 6.5 14 13H10.5L7 8.5 3 13H0l5-6L0 1h3.5L7 5l3.5-4H13z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-white/20 hover:text-white"
                aria-label="Discord"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M11.55 2.48A10.9 10.9 0 008.99 1.7a.04.04 0 00-.04.02c-.13.22-.27.5-.37.72a10.1 10.1 0 00-3.15 0 7.4 7.4 0 00-.38-.72.04.04 0 00-.04-.02 10.9 10.9 0 00-2.56.78.04.04 0 00-.02.02C.79 5.6.36 8.62.58 11.6c0 .02.01.03.03.04a11 11 0 003.32 1.68.04.04 0 00.05-.02c.26-.35.48-.72.68-1.1a.04.04 0 00-.02-.06 7.2 7.2 0 01-1.03-.5.04.04 0 010-.07l.21-.16a.04.04 0 01.04 0 7.8 7.8 0 006.68 0 .04.04 0 01.04 0l.21.16a.04.04 0 010 .07 6.8 6.8 0 01-1.04.5.04.04 0 00-.02.06c.2.38.43.75.68 1.1a.04.04 0 00.05.01 10.9 10.9 0 003.32-1.68.04.04 0 00.03-.04c.27-2.8-.44-5.8-1.87-8.1a.04.04 0 00-.02-.02zM5.08 9.8c-.68 0-1.24-.63-1.24-1.4 0-.77.55-1.4 1.24-1.4s1.25.63 1.24 1.4c0 .77-.55 1.4-1.24 1.4zm4.84 0c-.68 0-1.24-.63-1.24-1.4 0-.77.55-1.4 1.24-1.4s1.25.63 1.24 1.4c0 .77-.55 1.4-1.24 1.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/25">© 2025 Enter.fun. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition">개인정보처리방침</a>
            <a href="#" className="hover:text-white/50 transition">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
