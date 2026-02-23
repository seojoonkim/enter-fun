"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Row = {
  label: string;
  steamVal: string;
  enterVal: string;
  steamWidth: number;
  enterWidth: number;
  note?: string;
};

const rows: Row[] = [
  {
    label: "플랫폼 수수료",
    steamVal: "30%",
    enterVal: "15%",
    steamWidth: 100,
    enterWidth: 50,
    note: "같은 가격, 절반의 비용",
  },
  {
    label: "스트리머 보상",
    steamVal: "0%",
    enterVal: "최대 15%",
    steamWidth: 0,
    enterWidth: 100,
    note: "성과 기반 자동 분배",
  },
  {
    label: "게임 발견 방식",
    steamVal: "알고리즘",
    enterVal: "라이브 큐레이션",
    steamWidth: 35,
    enterWidth: 90,
  },
  {
    label: "정산 투명성",
    steamVal: "블랙박스",
    enterVal: "블록체인 온체인",
    steamWidth: 15,
    enterWidth: 100,
  },
];

export default function SteamComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="comparison" className="relative bg-dark2 py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 0% 100%, rgba(123,97,255,0.06), transparent)" }} />

      <div className="container px-4 relative z-10">
        <div className="max-w-xl">
          <span className="section-badge">플랫폼 비교</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            Steam은 30%를 가져갑니다.
            <br />
            <span className="gradient-text">우리는 15%만 받습니다.</span>
          </h2>
          <p className="mt-4 text-base text-gray">
            수수료만의 문제가 아닙니다. 스트리머에게도 돌아가고, 투명하게 기록됩니다.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {rows.map((row, idx) => (
            <motion.div
              key={row.label}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">{row.label}</p>
                {row.note && (
                  <span className="text-[10px] font-semibold text-mint/60 bg-mint/5 rounded-full px-2.5 py-1 border border-mint/10">
                    {row.note}
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                {/* Steam bar */}
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-right text-xs text-white/30">Steam</span>
                  <div className="flex-1 h-7 rounded-full bg-white/5 overflow-hidden">
                    {row.steamWidth > 0 ? (
                      <motion.div
                        className="h-full rounded-full bg-white/15"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${row.steamWidth}%` } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 + idx * 0.1 }}
                      />
                    ) : null}
                  </div>
                  <span className="w-20 shrink-0 text-xs text-white/25 line-through">{row.steamVal}</span>
                </div>

                {/* Enter.fun bar */}
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-right text-xs font-semibold text-mint">Enter.fun</span>
                  <div className="flex-1 h-7 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-mint to-purple"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${row.enterWidth}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.35 + idx * 0.1 }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-xs font-bold text-mint">{row.enterVal}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-center text-sm text-white/40 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          게임사도, 스트리머도, 게이머도 — 세 주체 모두가 더 나은 결과를 얻습니다.
        </motion.p>
      </div>
    </section>
  );
}
