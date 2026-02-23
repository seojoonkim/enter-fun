"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type StatRowProps = {
  label: string;
  value: string;
  muted?: boolean;
};

const bigStreamers = {
  label: "대형 스트리머 1명",
  budget: "$10,000 예산",
  emoji: "🧊",
  tag: "일반적인 방식",
  stats: [
    { label: "도달 시청자", value: "50,000명" },
    { label: "평균 참여율", value: "2%" },
    { label: "실제 전환", value: "50명" },
    { label: "전환당 비용", value: "$200" },
  ],
};

const smallStreamers = {
  label: "소형 스트리머 100명",
  budget: "$100 × 100명",
  emoji: "🔥",
  tag: "Enter.fun 방식",
  stats: [
    { label: "도달 시청자", value: "50,000명" },
    { label: "평균 참여율", value: "35%" },
    { label: "실제 전환", value: "1,250명" },
    { label: "전환당 비용", value: "$8" },
  ],
};

function StatRow({ label, value, muted = false }: StatRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className={`text-xs ${muted ? "text-white/30" : "text-white/50"}`}>{label}</span>
      <span className={`text-sm font-semibold ${muted ? "text-white/30" : "text-mint"}`}>{value}</span>
    </div>
  );
}

export default function Multiplier25x() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="multiplier" className="relative overflow-hidden bg-dark py-16 md:py-24" ref={ref}>
      {/* Radial accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)" }} />

      <div className="container px-4">
        <div className="max-w-xl">
          <span className="section-badge">핵심 수치</span>
          <h2 className="mt-4 section-title text-white">
            같은 $10,000.
            <br />
            <span className="gradient-text">결과는 25배 차이.</span>
          </h2>
          <p className="mt-4 text-base text-gray">
            소형 스트리머 100명의 신뢰 기반 커뮤니티가 만들어내는 압도적인 차이입니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-[1fr_auto_1fr] items-center max-w-4xl mx-auto">
          {/* Big streamer card */}
          <motion.div
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/40">
                  {bigStreamers.tag}
                </span>
                <div className="mt-3 text-white/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="mt-3 text-base font-bold text-white/60">{bigStreamers.label}</p>
            <p className="text-xs text-white/30">{bigStreamers.budget}</p>
            <div className="mt-5">
              {bigStreamers.stats.map((s) => (
                <StatRow key={s.label} label={s.label} value={s.value} muted />
              ))}
            </div>
          </motion.div>

          {/* VS */}
          <motion.div
            className="flex flex-col items-center justify-center gap-1 py-4 md:py-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
          >
            <span className="text-3xl font-black tracking-[-0.04em] text-white/15">VS</span>
          </motion.div>

          {/* Small streamers card */}
          <motion.div
            className="relative rounded-2xl border border-mint/20 bg-mint/[0.03] p-6 glow-mint"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-semibold text-mint">
                  {smallStreamers.tag}
                </span>
                <div className="mt-3 text-mint">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="mt-3 text-base font-bold text-mint">{smallStreamers.label}</p>
            <p className="text-xs text-mint/50">{smallStreamers.budget}</p>
            <div className="mt-5">
              {smallStreamers.stats.map((s) => (
                <StatRow key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Result banner */}
        <motion.div
          className="mt-10 mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-mint/8 via-mint/5 to-purple/8 border border-mint/10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div>
            <p className="text-[3.5rem] font-black leading-none tracking-[-0.05em] gradient-text">
              25x
            </p>
            <p className="mt-1 text-sm font-semibold text-white">더 높은 전환율</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/5" />
          <p className="text-sm leading-relaxed text-gray max-w-xs">
            소형 스트리머의 밀접한 커뮤니티가 만들어내는<br className="hidden md:block" /> 압도적인 차이입니다.
          </p>
          <div className="hidden md:block w-px h-12 bg-white/5" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">$8</p>
            <p className="text-xs text-white/40">전환당 비용</p>
            <p className="text-xs text-white/20 line-through">$200 (대형)</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
