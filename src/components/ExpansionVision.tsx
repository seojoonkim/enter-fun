"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Phase = {
  period: string;
  title: string;
  tags: string[];
  desc: string;
  active?: boolean;
};

const phases: Phase[] = [
  {
    period: "Phase 1 (NOW)",
    title: "게임",
    tags: ["🎮"],
    desc: "스트리머 × 게임 마켓플레이스",
    active: true,
  },
  {
    period: "Phase 2 (2025 Q3)",
    title: "TCG · 전자제품",
    tags: ["🃏", "📱"],
    desc: "디지털 & 피지컬 확장",
  },
  {
    period: "Phase 3 (2026)",
    title: "패션 · K-POP · 엔터",
    tags: ["👗", "🎵", "🎬"],
    desc: "글로벌 라이브 커머스 인프라",
  },
];

export default function ExpansionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="vision"
      className="bg-dark relative py-24 overflow-hidden"
      ref={ref}
      style={{
        backgroundImage:
          "linear-gradient(transparent 0%, transparent 99%), radial-gradient(circle at 10% 10%, rgba(0,212,170,0.08), transparent 45%), radial-gradient(circle at 90% 90%, rgba(123,97,255,0.08), transparent 45%)",
      }}
    >
      <div className="container px-4">
        <p className="section-badge">🌍 확장 비전</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
          게임에서 시작해, 모든 라이브 커머스를 장악합니다.
        </h2>
        <p className="mt-3 max-w-2xl text-gray">
          Enter.fun의 성과 기반 보상 인프라는 게임을 넘어 모든 크리에이터 이코노미에 적용됩니다.
        </p>
        <div className="mt-12 hidden md:block relative">
          <motion.div
            className="absolute top-9 left-8 right-8 h-0.5 origin-left bg-gradient-to-r from-mint/40 via-mint/20 to-white/5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 80, damping: 18 }}
          />
          <div className="grid grid-cols-3 gap-6">
            {phases.map((phase, idx) => (
              <motion.article
                key={phase.period}
                className={`relative pt-16 ${phase.active ? "opacity-100" : "opacity-90"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <motion.span
                  className="absolute left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-dark"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.4, type: "spring", stiffness: 180 }}
                  style={{
                    backgroundColor: phase.active ? "#00d4aa" : "rgba(0,212,170,0.28)",
                    borderColor: phase.active ? "#00d4aa" : "rgba(0,212,170,0.4)",
                  }}
                />
                <div
                  className={`glass-card rounded-2xl border p-6 ${
                    phase.active
                      ? "border-mint/40 glow-mint"
                      : "border-white/10 border-dashed bg-white/[0.03]"
                  }`}
                >
                  <p className="text-xs font-bold tracking-wider text-mint/80">{phase.period}</p>
                  <p className="mt-3 text-xl font-black text-white">{phase.title}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {phase.tags.map((tag) => (
                      <span key={tag} className="text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-gray">{phase.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="md:hidden mt-10 relative pl-8 border-l-2 border-mint/25 space-y-8">
          {phases.map((phase, idx) => (
            <motion.article
              key={phase.period}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <span
                className="absolute -left-[2.15rem] top-2 h-4 w-4 rounded-full border-4 border-dark"
                style={{
                  backgroundColor: phase.active ? "#00d4aa" : "rgba(0,212,170,0.28)",
                  borderColor: phase.active ? "#00d4aa" : "rgba(0,212,170,0.4)",
                }}
              />
              <div
                className={`glass-card rounded-2xl border p-5 ${
                  phase.active
                    ? "border-mint/40 bg-mint/5"
                    : "border-white/10 border-dashed bg-white/[0.03]"
                }`}
              >
                <p className="text-xs font-bold tracking-wider text-mint/80">{phase.period}</p>
                <p className="mt-3 text-xl font-black text-white">{phase.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {phase.tags.map((tag) => (
                    <span key={tag} className="text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray">{phase.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
