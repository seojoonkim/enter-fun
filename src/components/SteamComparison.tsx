"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Row = {
  label: string;
  mcnVal: string;
  enterVal: string;
  mcnWidth: number;
  enterWidth: number;
  note?: string;
};

const rows: Row[] = [
  {
    label: "플랫폼 수수료",
    mcnVal: "30~50%",
    enterVal: "15%",
    mcnWidth: 90,
    enterWidth: 30,
    note: "업계 최저 수준",
  },
  {
    label: "스트리머 수익 배분",
    mcnVal: "50~70%",
    enterVal: "85%",
    mcnWidth: 55,
    enterWidth: 100,
    note: "스트리머가 가져가는 몫",
  },
  {
    label: "정산 기준",
    mcnVal: "고정 계약금",
    enterVal: "실적 100% 기반",
    mcnWidth: 25,
    enterWidth: 100,
  },
  {
    label: "정산 투명성",
    mcnVal: "블랙박스",
    enterVal: "블록체인 온체인",
    mcnWidth: 10,
    enterWidth: 100,
  },
];

const perks = [
  { icon: "📊", title: "실적 기반 정산", desc: "뷰·클릭·전환 수치 그대로 정산. 숨겨진 공제 없음." },
  { icon: "🔗", title: "블록체인 기록", desc: "모든 거래가 온체인에 기록. 누구도 조작할 수 없습니다." },
  { icon: "⚡", title: "즉시 지급", desc: "월정산이 아닙니다. 전환 발생 즉시 USDC로 자동 지급." },
];

export default function SteamComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="comparison" className="relative bg-dark2 py-24 md:py-32 overflow-hidden" ref={ref}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 100%, rgba(123,97,255,0.06), transparent)",
        }}
      />

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="max-w-xl">
          <span className="section-badge">MCN vs Enter.fun</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            기존 MCN은 절반을 가져갑니다.
            <br />
            <span className="gradient-text">우리는 15%만 받습니다.</span>
          </h2>
          <p className="mt-4 text-base text-gray">
            나머지{" "}
            <span className="font-semibold text-white">85%는 전부 스트리머</span>에게.
            계약서 없이, 실적 그대로, 블록체인으로 투명하게.
          </p>
        </div>

        {/* Bar chart rows */}
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
                {/* MCN bar */}
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-right text-xs text-white/30">기존 MCN</span>
                  <div className="flex-1 h-7 rounded-full bg-white/5 overflow-hidden">
                    {row.mcnWidth > 0 && (
                      <motion.div
                        className="h-full rounded-full bg-white/15"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${row.mcnWidth}%` } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 + idx * 0.1 }}
                      />
                    )}
                  </div>
                  <span className="w-24 shrink-0 text-xs text-white/25 line-through">{row.mcnVal}</span>
                </div>

                {/* Enter.fun bar */}
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-right text-xs font-semibold text-mint">
                    Enter.fun
                  </span>
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

        {/* Perks grid */}
        <motion.div
          className="mt-6 grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5"
            >
              <span className="text-2xl shrink-0">{perk.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{perk.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray">{perk.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 text-center text-sm text-white/30 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          숨겨진 공제 없음 · 계약금 요구 없음 · 스트리머가 먼저입니다.
        </motion.p>
      </div>
    </section>
  );
}
