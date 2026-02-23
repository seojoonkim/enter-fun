"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

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
  visible: { transition: { staggerChildren: 0.14 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 20 },
  },
};

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const next = Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      width: Math.random() * 3 + 2,
      height: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
    setParticles(next);
    setMounted(true);
  }, []);

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

      {/* Streamer bg image — right side */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block"
        style={{
          backgroundImage: "url('/images/hero-streamer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center left",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.5) 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Background orb */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,97,255,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="container relative z-10 flex min-h-screen items-center px-4 py-20 md:px-0">
        <div className="grid w-full gap-12 md:grid-cols-2 md:items-center md:gap-16">

          {/* Left — Copy */}
          <motion.div
            className="flex flex-col gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={childVariants}>
              <span className="section-badge">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
                게임 스트리머 수익 플랫폼
              </span>
            </motion.div>

            <motion.h1 className="display-title text-white" variants={childVariants}>
              스트리머가
              <br />
              <span className="gradient-text">게임을 팔면,</span>
              <br />
              수익이 된다.
            </motion.h1>

            <motion.p
              className="max-w-md text-base leading-[1.75] text-gray md:text-lg"
              variants={childVariants}
            >
              게이머{" "}
              <span className="font-semibold text-white">67%</span>가
              스트리머를 통해 게임을 구매합니다.
              <br />
              그러나 스트리머{" "}
              <span className="font-semibold text-white">53%</span>의
              수익은 0원입니다.
              <br />
              <span className="mt-1.5 block font-medium text-mint">
                Enter.fun이 이 불균형을 해결합니다.
              </span>
            </motion.p>

            <motion.div className="flex flex-wrap gap-3" variants={childVariants}>
              <a href="#waitlist" className="btn-primary">
                얼리 액세스 신청
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#how-it-works" className="btn-secondary">
                작동 원리
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/30"
              variants={childVariants}
            >
              {[
                "Kellogg School 2024 연구 기반",
                "블록체인 정산 (USDC)",
                "수수료 15%",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M8.5 2.5L4 7.5 1.5 5" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Revenue comparison */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="absolute inset-x-8 top-8 h-full rounded-3xl opacity-50"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,212,170,0.07) 0%, rgba(123,97,255,0.03) 60%, transparent 100%)", filter: "blur(20px)" }} />

            <div className="relative card-glass shadow-2xl overflow-hidden border border-white/10">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint/40" />
                </div>
                <span className="text-[11px] font-semibold text-white/25 tracking-wider uppercase">Enter.fun Dashboard</span>
                <div className="w-14" />
              </div>

              {/* Before / After */}
              <div className="grid grid-cols-2 divide-x divide-white/5">
                <div className="p-7 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4">기존 구조</p>
                  <p className="text-5xl font-black text-white/15 tracking-[-0.04em]">$0</p>
                  <p className="mt-2 text-xs text-white/20">스트리머 수익</p>
                  <div className="mt-5 space-y-2">
                    {["스폰서 수익", "전환 보상", "캠페인 수당"].map((label) => (
                      <div key={label} className="flex items-center gap-2 justify-center">
                        <div className="h-1 flex-1 max-w-[60px] rounded-full bg-white/5" />
                        <span className="text-[10px] text-white/15">{label}</span>
                        <div className="h-1 flex-1 max-w-[60px] rounded-full bg-white/5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-7 text-center bg-mint/[0.02]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-mint/50 mb-4">Enter.fun</p>
                  {mounted && (
                    <p className="text-5xl font-black text-mint tracking-[-0.04em]">
                      $<CountUp end={560} />
                    </p>
                  )}
                  <p className="mt-2 text-xs text-mint/40">월 평균 추가 수익</p>
                  <div className="mt-5 space-y-2">
                    {[
                      { label: "스트리밍 캠페인", pct: 57 },
                      { label: "전환 보상", pct: 29 },
                      { label: "이벤트 보너스", pct: 14 },
                    ].map((bar) => (
                      <div key={bar.label} className="flex items-center gap-2">
                        <span className="text-[10px] text-white/25 w-20 text-right shrink-0">{bar.label}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-mint to-purple"
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.pct}%` }}
                            transition={{ duration: 1, delay: 0.9 + bar.pct * 0.005 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 bg-white/[0.02] px-5 py-3 flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                <span className="text-[11px] text-white/25">USDC 자동 정산 · 블록체인 기록</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
