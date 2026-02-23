"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Comparison = {
  label: string;
  steamLabel: string;
  enterLabel: string;
  steamWidth: number;
  enterWidth: number;
};

const comparisons: Comparison[] = [
  {
    label: "수수료",
    steamLabel: "30%",
    enterLabel: "15%",
    steamWidth: 30,
    enterWidth: 15,
  },
  {
    label: "스트리머 보상",
    steamLabel: "0%",
    enterLabel: "5-15%",
    steamWidth: 0,
    enterWidth: 15,
  },
  {
    label: "게임 발견",
    steamLabel: "알고리즘 추천",
    enterLabel: "스트리머 라이브 큐레이션",
    steamWidth: 42,
    enterWidth: 84,
  },
  {
    label: "투명성",
    steamLabel: "블랙박스",
    enterLabel: "블록체인 온체인",
    steamWidth: 20,
    enterWidth: 95,
  },
];

export default function SteamComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comparison" className="bg-dark2 py-24" ref={ref}>
      <div className="container px-4">
        <p className="section-badge">⚔️ 게임 유통의 혁명</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
          Steam이 30%를 가져갈 때, 우리는 15%만 받습니다.
        </h2>
        <p className="mt-3 max-w-3xl text-gray">
          성과 중심 구조로 바꾸면 비용 절감이 아니라 생태계 전체의 효율이 바뀝니다.
        </p>
        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {comparisons.map((item, idx) => (
            <Fragment key={item.label}>
              <motion.div
                className="glass-card rounded-2xl border border-white/10 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <p className="text-lg font-bold text-white">{item.label}</p>
                <div className="mt-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-right text-sm text-white/40">Steam</span>
                    <div className="h-8 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-white/20"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.steamWidth}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.15 + idx * 0.1 }}
                      />
                    </div>
                    <span className="w-16 text-sm text-white/30 line-through">{item.steamLabel}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-right text-sm font-semibold text-mint">Enter.fun</span>
                    <div className="h-8 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-mint to-purple"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.enterWidth}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.25 + idx * 0.1 }}
                      />
                    </div>
                    <span className="w-16 text-sm font-semibold text-mint">
                      {item.enterLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Fragment>
          ))}
        </motion.div>
        <p className="mt-8 text-center text-lg italic text-white/60">
          게임사도, 스트리머도, 게이머도 이깁니다.
        </p>
      </div>
    </section>
  );
}
