"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SolutionSectionProps {
  language: "ko" | "en";
}

const steps = [
  {
    step: 1,
    icon: "🔌",
    ko: "플러그인 설치",
    en: "Install plugin",
    koDesc: "방송 데이터 자동 수집",
    enDesc: "Auto collection of live stream metrics",
  },
  {
    step: 2,
    icon: "🤖",
    ko: "AI 매칭",
    en: "AI Matching",
    koDesc: "최적의 게임 캠페인 자동 추천",
    enDesc: "Auto-recommendation of optimal game campaigns",
  },
  {
    step: 3,
    icon: "⚡",
    ko: "즉시 정산",
    en: "Auto Payout",
    koDesc: "성과 기반 USDC 자동 지급",
    enDesc: "Performance-based USDC payouts made instantly",
  },
];

export default function SolutionSection({ language }: SolutionSectionProps) {
  const title = language === "ko" ? "Enter.fun이 바꿉니다" : "How Enter.fun Works";

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true, amount: 0.25 }}
      className="section-fade bg-[#141a2d] px-4 py-20"
      id="solution"
    >
      <div className="container mx-auto">
        <h2 className="section-title font-bold text-white">{title}</h2>
        <p className="mt-3 max-w-3xl text-gray-300">
          {language === "ko"
            ? "복잡한 결제와 정산 과정을 Enter.fun이 간단하게 통합합니다."
            : "Enter.fun unifies the entire payout and campaign workflow in one layer."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.step}
              className="glass-card flex min-h-[180px] flex-col rounded-2xl border border-white/10 p-6"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.18 }}
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint text-xl text-dark">
                {step.icon}
              </span>
              <p className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-mint/90 text-xs font-bold text-dark">
                {step.step}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {language === "ko" ? step.ko : step.en}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-200">
                {language === "ko" ? step.koDesc : step.enDesc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
