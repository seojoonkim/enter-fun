"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Phase = {
  period: string;
  label: string;
  title: string;
  categories: { icon: string; name: string }[];
  desc: string;
  active?: boolean;
};

const phases: Phase[] = [
  {
    period: "지금",
    label: "Phase 1",
    title: "게임",
    categories: [
      { icon: "🎮", name: "PC/콘솔" },
      { icon: "📱", name: "모바일" },
    ],
    desc: "스트리머 × 게임 마켓플레이스. 성과 기반 캠페인 인프라 구축.",
    active: true,
  },
  {
    period: "2025 Q3",
    label: "Phase 2",
    title: "디지털 & 피지컬",
    categories: [
      { icon: "🃏", name: "TCG" },
      { icon: "💻", name: "전자제품" },
      { icon: "🎲", name: "보드게임" },
    ],
    desc: "디지털을 넘어 피지컬 제품군으로 확장. 스트리머 영향력 전 카테고리 적용.",
  },
  {
    period: "2026",
    label: "Phase 3",
    title: "글로벌 커머스 인프라",
    categories: [
      { icon: "👗", name: "패션" },
      { icon: "🎵", name: "K-POP" },
      { icon: "🎬", name: "엔터" },
    ],
    desc: "모든 크리에이터 이코노미로 확장. 글로벌 라이브 커머스 핵심 인프라.",
  },
];

export default function ExpansionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="vision"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={ref}
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a18 100%)" }}
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="section-badge">확장 비전</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            게임에서 시작해,
            <br />
            <span className="gradient-text">모든 라이브 커머스를 장악합니다.</span>
          </h2>
          <p className="mt-4 text-base text-gray">
            Enter.fun의 성과 기반 인프라는 게임 산업에만 국한되지 않습니다.
            크리에이터가 영향력을 가진 모든 곳에 적용됩니다.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="mt-14 hidden md:block relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-10 left-[12%] right-[12%] h-px bg-white/5">
            <motion.div
              className="absolute inset-0 origin-left"
              style={{ background: "linear-gradient(90deg, #00d4aa, #7b61ff50)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {phases.map((phase, idx) => (
              <motion.article
                key={phase.label}
                className="relative pt-20"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ delay: idx * 0.2 + 0.2, duration: 0.5 }}
              >
                {/* Timeline dot */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-dark"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: idx * 0.2 + 0.4, type: "spring", stiffness: 200 }}
                    style={{
                      backgroundColor: phase.active ? "#00d4aa" : "rgba(0,212,170,0.25)",
                      boxShadow: phase.active ? "0 0 12px rgba(0,212,170,0.5)" : "none",
                    }}
                  />
                </div>

                {/* Period label */}
                <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest"
                  style={{ color: phase.active ? "#00d4aa" : "rgba(255,255,255,0.25)" }}>
                  {phase.period} · {phase.label}
                </p>

                {/* Card */}
                <div
                  className={`rounded-2xl border p-5 transition-all ${
                    phase.active
                      ? "border-mint/20 bg-mint/5 glow-mint"
                      : "border-white/5 bg-white/[0.02] border-dashed"
                  }`}
                >
                  <p className="text-base font-black text-white">{phase.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {phase.categories.map((cat) => (
                      <span key={cat.name} className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-gray">{phase.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden mt-10 relative pl-8 border-l-2 border-white/5 space-y-6">
          {phases.map((phase, idx) => (
            <motion.article
              key={phase.label}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: idx * 0.15 + 0.2 }}
            >
              <div
                className="absolute -left-[2.3rem] top-3 h-4 w-4 rounded-full border-2 border-dark"
                style={{
                  backgroundColor: phase.active ? "#00d4aa" : "rgba(0,212,170,0.25)",
                  boxShadow: phase.active ? "0 0 12px rgba(0,212,170,0.4)" : "none",
                }}
              />
              <p className="mb-2 text-xs font-bold uppercase tracking-widest"
                style={{ color: phase.active ? "#00d4aa" : "rgba(255,255,255,0.3)" }}>
                {phase.period} · {phase.label}
              </p>
              <div
                className={`rounded-2xl border p-4 ${
                  phase.active ? "border-mint/20 bg-mint/5" : "border-white/5 bg-white/[0.02] border-dashed"
                }`}
              >
                <p className="text-base font-black text-white">{phase.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {phase.categories.map((cat) => (
                    <span key={cat.name} className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60">
                      {cat.icon} {cat.name}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray">{phase.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
