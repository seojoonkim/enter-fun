"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/CountUp";

const stats = [
  { end: 180, suffix: "억달러", label: "게임 스트리밍 시장 (2024)" },
  { end: 67, suffix: "%", label: "스트리머 보고 게임 구매하는 게이머" },
  { end: 53, suffix: "%", label: "수익 0원인 스트리머" },
];

const problems = [
  {
    icon: "🎮",
    title: "스트리머 보상 없음",
    description: "게이머 67%가 스트리머 보고 게임을 사지만 스트리머 53%는 수익 0원",
  },
  {
    icon: "📉",
    title: "스폰서 ROI 최악",
    description: "게임사 스폰서 스트리밍 ROI 매우 부정적 — Northwestern University 2024",
  },
  {
    icon: "💸",
    title: "비효율적 마케팅",
    description: "대형 1명 0,000 vs 소형 100명 0,000 — 같은 비용 25배 전환율 차이",
  },
];

export default function MarketProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="bg-dark py-24" ref={ref}>
      <div className="container px-4">
        <div className="mb-8">
          <h2 className="section-title text-3xl font-bold text-white">
            180억달러 시장의 해결되지 않은 문제
          </h2>
        </div>
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              className="glass-card rounded-2xl border border-white/5 p-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <p className="text-3xl font-black text-mint">
                <CountUp end={item.end} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm text-gray">{item.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              className="glass-card rounded-2xl border border-white/5 p-6"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <p className="text-4xl">{problem.icon}</p>
              <h3 className="mt-4 text-xl font-bold text-white">{problem.title}</h3>
              <p className="mt-2 text-sm text-gray">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
