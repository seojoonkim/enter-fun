"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/CountUp";

const tracks = [
  { label: "얼리 액세스 신청", end: 500, suffix: "+" },
  { label: "파트너십 논의 중인 게임사", end: 3, suffix: "" },
  { label: "타겟 시장 규모", end: 18, prefix: "$", suffix: "B" },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="social-proof" className="bg-dark py-24" ref={ref}>
      <div className="container px-4 text-center">
        <p className="section-badge mx-auto">📊 트랙션</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
          이미 시작되고 있습니다
        </h2>
        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
        >
          {tracks.map((track, index) => (
            <div
              key={track.label}
              className="glass-card border border-white/10 rounded-2xl px-6 py-8"
            >
              <p className="text-4xl font-black text-mint">
                <CountUp
                  end={track.end}
                  prefix={track.prefix ?? ""}
                  suffix={track.suffix}
                />
              </p>
              <p className="mt-3 text-sm text-gray">{track.label}</p>
              <motion.div
                className="mt-4 h-0.5 w-12 bg-gradient-to-r from-mint to-purple mx-auto"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
              />
            </div>
          ))}
        </motion.div>
        <div className="mt-10 text-sm text-gray">
          <p className="font-semibold text-white">Backed by</p>
          <div className="mt-4 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray">
              Northwestern University
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray">
              Steam ROI 인용
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray">
              파트너 대기 중
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
