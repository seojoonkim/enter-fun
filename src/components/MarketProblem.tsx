"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/CountUp";

type Step = {
  num: string;
  valueType: "count" | "text";
  number: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
  accent: string;
};

const steps: Step[] = [
  {
    num: "01",
    valueType: "count",
    number: 18,
    prefix: "$",
    suffix: "B",
    label: "게임 스트리밍 시장 규모",
    desc: "180억 달러의 시장. 그리고 게이머 67%가 스트리머를 보고 게임을 구매합니다.",
    accent: "#00d4aa",
  },
  {
    num: "02",
    valueType: "count",
    number: 53,
    suffix: "%",
    label: "수익이 0원인 스트리머",
    desc: "절반 이상의 스트리머가 판매에 기여하면서도 아무런 보상을 받지 못합니다.",
    accent: "#7b61ff",
  },
  {
    num: "03",
    valueType: "text",
    number: "−ROI",
    label: "스폰서 스트리밍의 현실",
    desc: "Northwestern University 2024 연구. 기존 스폰서 모델은 게임사에도, 스트리머에도 작동하지 않습니다.",
    accent: "#ff6b6b",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function MarketProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="market-problem" className="relative overflow-hidden bg-dark2 py-24 md:py-32">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container px-4 relative z-10" ref={ref}>
        {/* Header */}
        <div className="max-w-xl">
          <span className="section-badge">시장 분석</span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
            스트리머가 팔아주는데,
            <br />
            보상은 왜 없나요?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray">
            구조적 문제입니다. 시장은 성장했지만, 보상 모델은 10년 전 그대로입니다.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8"
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Step number */}
              <p
                className="text-[5rem] font-black leading-none tracking-[-0.05em] opacity-[0.07] absolute top-4 right-5 select-none"
                style={{ color: step.accent }}
              >
                {step.num}
              </p>

              {/* Value */}
              <p
                className="text-[3.5rem] font-black leading-none tracking-[-0.04em]"
                style={{ color: step.accent }}
              >
                {step.valueType === "count" ? (
                  <CountUp
                    end={typeof step.number === "number" ? step.number : 0}
                    prefix={step.prefix ?? ""}
                    suffix={step.suffix ?? ""}
                  />
                ) : (
                  step.number
                )}
              </p>

              {/* Label */}
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-white/50">
                {step.label}
              </p>

              {/* Divider */}
              <div
                className="my-4 h-px w-12"
                style={{
                  background: `linear-gradient(90deg, ${step.accent}60, transparent)`,
                }}
              />

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-10 rounded-2xl border border-white/5 bg-gradient-to-r from-mint/5 to-purple/5 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-sm text-gray max-w-xl">
            <span className="font-semibold text-white">결론:</span> 현재 시스템은 모든 참여자—게임사, 스트리머, 게이머—에게 동시에 실패하고 있습니다.
            Enter.fun은 성과 기반 보상으로 이 구조를 처음부터 다시 설계합니다.
          </p>
          <a
            href="#how-it-works"
            className="shrink-0 rounded-full border border-mint/25 px-5 py-2 text-sm font-semibold text-mint transition hover:border-mint hover:bg-mint/5"
          >
            해결책 보기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
