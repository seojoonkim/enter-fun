"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  left: number;
  bottom: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 20 },
  },
};

const mockupVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// Fake live session data for the product preview
const liveSession = {
  streamer: "Faker_KR",
  game: "League of Legends",
  viewers: "24,381",
  earnings: "$47.50",
  conversions: 127,
  product: "LoL Champion Pack",
  progress: 78,
};

const recentActivity = [
  { name: "Park J.", action: "구매", item: "LoL Pack", amount: "+$2.10" },
  { name: "Kim S.", action: "구매", item: "LoL Pack", amount: "+$2.10" },
  { name: "Lee M.", action: "구매", item: "LoL Pack", amount: "+$2.10" },
];

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const next = Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      width: Math.random() * 3 + 2,
      height: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
    setParticles(next);
  }, []);

  // Animate the earnings counter
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const earnings = (47.5 + tick * 2.1).toFixed(2);

  const particleStyles = useMemo(
    () =>
      particles.map((p) => ({
        left: `${p.left}%`,
        bottom: `${p.bottom}%`,
        width: `${p.width}px`,
        height: `${p.height}px`,
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
      })),
    [particles]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark hero-gradient noise-overlay">
      {/* Particles */}
      <div className="hero-particles pointer-events-none">
        {particleStyles.map((p, idx) => (
          <div key={idx} className="particle" style={p} />
        ))}
      </div>

      {/* Background orbs */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="container relative z-10 flex min-h-screen items-center px-4 py-28 md:px-0">
        <div className="grid w-full gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* Left — Copy */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={childVariants}>
              <span className="section-badge">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
                게임 스트리밍의 새로운 경제
              </span>
            </motion.div>

            <motion.h1
              className="text-[2.8rem] font-black leading-[1.05] tracking-[-0.04em] text-white md:text-[3.8rem] lg:text-[4.5rem]"
              variants={childVariants}
            >
              스트리머가
              <br />
              <span className="gradient-text">게임을 판다.</span>
              <br />
              게임사가
              <br />
              성과로 보상한다.
            </motion.h1>

            <motion.p
              className="max-w-lg text-base leading-relaxed text-gray md:text-lg"
              variants={childVariants}
            >
              게이머{" "}
              <span className="font-semibold text-white">67%</span>가 스트리머를 보고
              게임을 삽니다. 그런데 스트리머{" "}
              <span className="font-semibold text-white">53%</span>의 수익은{" "}
              <span className="font-semibold text-white">0원</span>입니다.
              <br />
              <span className="text-mint font-medium">Enter.fun이 이 구조를 뒤집습니다.</span>
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" variants={childVariants}>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-sm font-bold text-dark shadow-[0_0_24px_rgba(0,212,170,0.3)] transition hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,212,170,0.45)] active:scale-[0.98]"
              >
                얼리 액세스 신청
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                어떻게 작동하나요?
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/40"
              variants={childVariants}
            >
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L5 8.5 2 5.5" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Northwestern University 연구 기반
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L5 8.5 2 5.5" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                블록체인 투명 정산
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L5 8.5 2 5.5" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                USDC 즉시 지급
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Product Preview */}
          <motion.div
            className="relative hidden md:block"
            variants={mockupVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Ambient glow behind card */}
            <div className="absolute inset-x-8 top-8 h-full rounded-3xl bg-gradient-to-b from-mint/10 to-purple/10 blur-3xl" />

            {/* Main card */}
            <div className="relative gradient-border shadow-2xl">
              {/* Top bar */}
              <div className="flex items-center justify-between rounded-t-[15px] border-b border-white/5 bg-white/[0.04] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
                  <span className="flex h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="flex h-2 w-2 rounded-full bg-mint shadow-[0_0_6px_rgba(0,212,170,0.5)]" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                  LIVE
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1.5C3.07 1.5 1.5 3.07 1.5 5S3.07 8.5 5 8.5 8.5 6.93 8.5 5 6.93 1.5 5 1.5zm0 6C3.62 7.5 2.5 6.38 2.5 5S3.62 2.5 5 2.5 7.5 3.62 7.5 5 6.38 7.5 5 7.5z" fill="currentColor"/>
                  </svg>
                  {liveSession.viewers} 시청 중
                </div>
              </div>

              {/* Streamer info */}
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-mint">{liveSession.game}</p>
                    <p className="mt-0.5 text-base font-bold text-white">{liveSession.streamer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40">이번 세션 수익</p>
                    <motion.p
                      key={earnings}
                      className="text-xl font-black text-mint"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${earnings}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Conversion bar */}
              <div className="mx-5 mb-4 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3">
                <div className="flex items-center justify-between text-[11px] text-white/50 mb-2">
                  <span>{liveSession.product}</span>
                  <span className="text-mint font-semibold">전환 {liveSession.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-mint to-purple"
                    initial={{ width: "0%" }}
                    animate={{ width: `${liveSession.progress}%` }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-white/40">
                  <span className="font-semibold text-white">{liveSession.conversions}명</span>이 구매했습니다
                </p>
              </div>

              {/* Activity feed */}
              <div className="mx-5 mb-4 space-y-1.5">
                {recentActivity.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + idx * 0.15 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint/10 text-[9px] font-bold text-mint">
                        {item.name.charAt(0)}
                      </span>
                      <span className="text-[11px] text-white/60">
                        <span className="font-medium text-white/80">{item.name}</span> {item.action} {item.item}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-mint">{item.amount}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom badge */}
              <div className="flex items-center justify-center gap-2 rounded-b-[15px] border-t border-white/5 bg-white/[0.02] px-5 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                <span className="text-[11px] text-white/40">
                  USDC로 자동 정산 중 · 블록체인 기록
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] tracking-widest text-white/20 uppercase">Scroll</span>
        <motion.div
          className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
