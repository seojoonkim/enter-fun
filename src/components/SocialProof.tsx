"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/CountUp";

const stats = [
  {
    end: 500,
    suffix: "+",
    label: "얼리 액세스 신청",
    desc: "스트리머 · 게임사 · 투자자",
  },
  {
    end: 18,
    prefix: "$",
    suffix: "B",
    label: "타겟 시장 규모",
    desc: "게임 스트리밍 글로벌 시장",
  },
  {
    end: 25,
    suffix: "x",
    label: "ROI 향상",
    desc: "기존 스폰서 대비 전환율",
  },
];

const references = [
  {
    source: "Northwestern University",
    quote: "스트리머 기반 마케팅은 기존 스폰서 방식 대비 25배 이상의 참여율을 보입니다.",
    year: "2024 연구",
  },
  {
    source: "Streamlabs Report",
    quote: "전 세계 게임 스트리머의 53%가 월 수익 $0 — 그들의 마케팅 기여는 측정되지 않고 있습니다.",
    year: "2023",
  },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="social-proof" className="relative bg-dark py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container px-4">
        {/* Headline */}
        <div className="text-center max-w-lg mx-auto mb-14">
          <span className="section-badge">트랙션</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            이미 시작되고 있습니다
          </h2>
          <p className="mt-4 text-base text-gray">
            숫자가 말합니다.
          </p>
        </div>

        {/* Stats */}
        <motion.div
          className="grid gap-px border border-white/5 rounded-2xl overflow-hidden md:grid-cols-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="relative bg-white/[0.02] px-8 py-10 text-center"
            >
              {/* Separator (desktop) */}
              {idx > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/5" />
              )}
              <p className="stat-number gradient-text">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                />
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{stat.label}</p>
              <p className="mt-1 text-xs text-gray">{stat.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Research citations */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {references.map((ref) => (
            <div
              key={ref.source}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-xs font-bold text-white">{ref.source}</p>
                <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                  {ref.year}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray">"{ref.quote}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
