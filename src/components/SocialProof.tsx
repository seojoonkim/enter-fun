"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/CountUp";

const references = [
  {
    source: "Northwestern Kellogg School",
    quote: "소형 스트리머 기반 마케팅은 대형 스폰서 방식 대비 25배 이상의 전환율을 기록했습니다.",
    year: "2024",
  },
  {
    source: "Streamlabs Annual Report",
    quote: "전 세계 게임 스트리머의 53%가 월 수익 $0. 이들의 마케팅 기여는 측정되지 않고 있습니다.",
    year: "2023",
  },
];

const stats = [
  { end: 500, suffix: "+", label: "얼리 액세스 신청", desc: "스트리머 · 게임사 · 투자자" },
  { end: 18, prefix: "$", suffix: "B", label: "타겟 시장 규모", desc: "게임 스트리밍 글로벌" },
  { end: 25, suffix: "x", label: "ROI 향상", desc: "기존 스폰서 대비" },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="social-proof" className="relative bg-dark py-16 md:py-24 overflow-hidden" ref={ref}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container px-4">
        <div className="max-w-xl mb-12">
          <span className="section-badge">근거</span>
          <h2 className="mt-4 section-title text-white">
            근거가 있습니다.
          </h2>
          <p className="mt-4 text-base text-gray">
            학술 연구와 시장 데이터가 이 모델을 뒷받침합니다.
          </p>
        </div>

        {/* Research citations — lead with this */}
        <motion.div
          className="grid gap-4 md:grid-cols-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {references.map((r, idx) => (
            <motion.div
              key={r.source}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-3">
                {/* Quote icon */}
                <svg className="shrink-0 mt-0.5 text-mint/40" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 6c0-1.7 1.3-3 3-3v2c-.55 0-1 .45-1 1v1h2v4H3V6zm7 0c0-1.7 1.3-3 3-3v2c-.55 0-1 .45-1 1v1h2v4h-4V6z"/>
                </svg>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-white">{r.source}</p>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/30">{r.year}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray">{r.quote}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid border border-white/5 rounded-2xl overflow-hidden md:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="relative bg-white/[0.02] px-8 py-10 text-center"
            >
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
      </div>
    </section>
  );
}
