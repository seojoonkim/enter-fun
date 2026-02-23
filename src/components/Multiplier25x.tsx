"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type StatProps = {
  label: string;
  value: string;
  color: string;
};

const bigStreamers = {
  label: "대형 스트리머 1명",
  budget: "$10,000",
  icon: "🧊",
  stats: [
    { label: "시청자", value: "50,000명" },
    { label: "참여율", value: "2%" },
    { label: "전환", value: "50명" },
  ],
};

const smallStreamers = {
  label: "소형 스트리머 100명",
  budget: "$100 × 100",
  icon: "🔥",
  stats: [
    { label: "시청자", value: "50,000명" },
    { label: "참여율", value: "35%" },
    { label: "전환", value: "1,250명" },
  ],
};

function Stat({ label, value, color }: StatProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}

export default function Multiplier25x() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="multiplier" className="bg-dark2 py-24" ref={ref}>
      <div className="container px-4">
        <p className="section-badge">⚡ 같은 비용, 25배의 결과</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
          $10,000의 두 가지 사용법
        </h2>
        <p className="mt-3 max-w-2xl text-gray">
          같은 비용으로도, 커뮤니티의 밀도가 결과를 완전히 바꿉니다.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto_1fr] items-center max-w-4xl mx-auto">
          <motion.div
            className="glass-card rounded-2xl border border-white/5 p-8"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-5xl mb-4">{bigStreamers.icon}</p>
            <h3 className="text-xl font-bold text-white/70">{bigStreamers.label}</h3>
            <p className="text-sm text-white/40">{bigStreamers.budget}</p>
            <div className="mt-6 space-y-3">
              {bigStreamers.stats.map((item) => (
                <Stat
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  color="text-white/50"
                />
              ))}
            </div>
          </motion.div>
          <motion.p
            className="text-4xl font-black text-white/30 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            VS
          </motion.p>
          <motion.div
            className="glass-card rounded-2xl border border-mint/30 p-8 glow-mint bg-mint/5"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-5xl mb-4">{smallStreamers.icon}</p>
            <h3 className="text-xl font-bold text-mint">{smallStreamers.label}</h3>
            <p className="text-sm text-mint/60">{smallStreamers.budget}</p>
            <div className="mt-6 space-y-3">
              {smallStreamers.stats.map((item) => (
                <Stat key={item.label} label={item.label} value={item.value} color="text-mint" />
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
        >
          <p className="text-6xl font-black text-mint">25x</p>
          <p className="mt-2 text-lg text-gray">
            소형 스트리머의 친밀한 커뮤니티가 만드는 압도적 차이
          </p>
        </motion.div>
      </div>
    </section>
  );
}
