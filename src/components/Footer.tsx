export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-10">
      <div className="container px-4 text-sm text-gray">
        <p className="text-xl font-black text-white">
          <span className="text-mint">Enter</span>.fun
        </p>
        <p className="mt-2">스트리머가 보상받는 세상을 만듭니다.</p>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <a className="hover:text-white transition" href="#hero">
            Twitter
          </a>
          <a className="hover:text-white transition" href="#hero">
            Discord
          </a>
          <a className="hover:text-white transition" href="mailto:contact@enter.fun">
            Contact
          </a>
        </div>
        <p className="mt-6 text-xs text-white/60">© 2025 Enter.fun</p>
      </div>
    </footer>
  );
}
