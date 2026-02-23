"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Row = {
  label: string;
  agencyVal: string;
  enterVal: string;
  agencyWidth: number;
  enterWidth: number;
  note?: string;
};

const rows: Row[] = [
  {
    label: "플랫폼 수수료",
    agencyVal: "30~50%",
    enterVal: "15%",
    agencyWidth: 90,
    enterWidth: 30,
    note: "업계 최저 수준",
  },
  {
    label: "스트리머 수익 배분",
    agencyVal: "50~70%",
    enterVal: "85%",
    agencyWidth: 55,
    enterWidth: 100,
    note: "스트리머가 가져가는 몫",
  },
  {
    label: "정산 기준",
    agencyVal: "고정 계약금",
    enterVal: "실적 100% 기반",
    agencyWidth: 25,
    enterWidth: 100,
  },
  {
    label: "정산 투명성",
    agencyVal: "블랙박스",
    enterVal: "블록체인 온체인",
    agencyWidth: 10,
    enterWidth: 100,
  },
];

export default function SteamComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="comparison" className="relative bg-dark2 py-16 md:py-24 overflow-hidden" ref={ref}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 100%, rgba(123,97,255,0.06), transparent)",
        }}
      />

      <div className="container px-4 relative z-10">
        <div className="max-w-xl">
          <span className="section-badge">수수료 비교</span>
          <h2 className="mt-4 section-title text-white">
            에이전시는 절반을 떼갑니다.
            <br />
            <span className="gradient-text">우린 15%만 받아요.</span>
          </h2>
          <p className="mt-4 text-base text-gray">
            나머지{" "}
            <span className="font-semibold text-white">85%는 전부 스트리머</span>에게.
            계약서 없이, 실적 그대로, 블록체인으로 투명하게.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {rows.map((row, idx) => (
            <motion.div
              key={row.label}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">{row.label}</p>
                {row.note && (
                  <span className="text-[10px] font-semibold text-mint/70 bg-mint/5 rounded-full px-2.5 py-1 border border-mint/10">
                    {row.note}
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-right text-xs text-white/30">에이전시</span>
                  <div className="flex-1 h-7 rounded-full bg-white/5 overflow-hidden">
                    {row.agencyWidth > 0 && (
                      <motion.div
                        className="h-full rounded-full bg-white/15"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${row.agencyWidth}%` } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 + idx * 0.1 }}
                      />
                    )}
                  </div>
                  <span className="w-24 shrink-0 text-xs text-white/25 line-through">{row.agencyVal}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-right text-xs font-semibold text-mint">Enter.fun</span>
                  <div className="flex-1 h-7 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-mint to-purple"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${row.enterWidth}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.35 + idx * 0.1 }}
                    />
                  </div>
                  <span className="w-24 shrink-0 text-xs font-bold text-mint">{row.enterVal}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 85% callout — replaces perks grid */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-white">
            나머지{" "}
            <span className="text-[2.5rem] font-black text-mint tracking-[-0.04em]">85%</span>
            {" "}는 전부 스트리머 몫.
          </p>
          <p className="mt-2 text-sm text-gray">계약서 없이. 블록체인으로 투명하게. 숨겨진 공제 없음.</p>
        </motion.div>
      </div>
    </section>
  );
}
