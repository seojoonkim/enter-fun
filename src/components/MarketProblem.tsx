"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/CountUp";

type Step = {
  badge: string;
  valueType: "count" | "text";
  number: number | string;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    badge: "STEP 1 — 발견",
    valueType: "count",
    number: 18,
    suffix: "B",
    prefix: "$",
    title: "게임 스트리밍 시장은 180억 달러.",
    description:
      "게이머 67%가 스트리머를 보고 게임을 구매합니다.",
  },
  {
    badge: "STEP 2 — 모순",
    valueType: "count",
    number: 53,
    suffix: "%",
    title: "그런데 스트리머 53%는 수익이 0원입니다.",
    description: "그들의 영향력은 마케팅 비용의 외부자원처럼 취급됩니다.",
  },
  {
    badge: "STEP 3 — 실패",
    valueType: "text",
    number: "-ROI",
    title: "스폰서 스트리밍의 ROI는 매우 부정적",
    description:
      "Northwestern University, 2024 기준. 현재 시스템은 모두에게 실패하고 있습니다.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function MarketProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="market-problem" className="bg-dark py-24" ref={ref}>
      <div className="container px-4">
        <p className="section-badge">💀 $18B 시장의 치명적 모순</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
          스트리머가 팔아주는데, 보상은 0원?
        </h2>
        <p className="mt-3 max-w-2xl text-gray">
          시장은 성장했지만, 보상 구조는 그대로입니다.
        </p>
        <motion.div
          className="mt-12 relative pl-8 border-l-2 border-mint/20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.badge}
              className="relative mb-16 last:mb-0"
              variants={stepVariants}
            >
              <div className="absolute -left-[calc(2rem+5px)] top-3 w-4 h-4 rounded-full bg-mint shadow-[0_0_14px_rgba(0,212,170,0.5)] border border-dark" />
              <div className="absolute -left-8 top-0 h-full w-full -z-10 bg-mint/5 blur-2xl rounded-2xl" />
              <span className="section-badge">{step.badge}</span>
              {step.valueType === "count" ? (
                <p className="mt-2 text-6xl font-black text-mint">
                  <CountUp
                    end={typeof step.number === "number" ? step.number : 0}
                    prefix={step.prefix}
                    suffix={step.suffix}
                  />
                </p>
              ) : (
                <p className="mt-2 text-6xl font-black text-mint">{step.number}</p>
              )}
              <p className="mt-2 text-lg font-semibold text-white">{step.title}</p>
              <p className="mt-2 max-w-lg text-gray">{step.description}</p>
              {index === 0 ? (
                <p className="mt-2 text-sm text-gray">
                  <span className="text-white">67%</span>의 게이머가 스트리머의 추천으로 게임을
                  구매합니다.
                </p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
