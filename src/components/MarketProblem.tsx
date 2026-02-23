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
    desc: "180억 달러. 그리고 게이머 67%가 스트리머 보고 게임을 삽니다.",
    accent: "#00d4aa",
  },
  {
    num: "02",
    valueType: "count",
    number: 53,
    suffix: "%",
    label: "수익이 0원인 스트리머",
    desc: "절반이 넘는 스트리머가 마케팅에 기여하고도 아무것도 받지 못합니다.",
    accent: "#7b61ff",
  },
  {
    num: "03",
    valueType: "text",
    number: "−ROI",
    label: "스폰서 스트리밍의 현실",
    desc: "Northwestern Kellogg 2024. 기존 스폰서 모델은 게임사도, 스트리머도 모두 실패시킵니다.",
    accent: "#ff6b6b",
  },
];

export default function MarketProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="market-problem" className="relative overflow-hidden bg-dark2 py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative image */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/3 hidden lg:block opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/market-problem.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
        }}
      />

      <div className="container px-4 relative z-10" ref={ref}>
        <div className="max-w-xl">
          <span className="section-badge">왜 필요한가</span>
          <h2 className="mt-4 section-title text-white">
            기여한 만큼
            <br />
            보상받아야 합니다.
          </h2>
          <p className="mt-4 text-base leading-[1.75] text-gray">
            시장은 $18B 규모로 성장했지만, 스트리머에 대한 보상 구조는 10년째 바뀌지 않았습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: step.accent }}
              />

              {/* Ghost step number */}
              <p
                className="absolute top-3 right-4 text-[4rem] font-black leading-none tracking-[-0.05em] select-none"
                style={{ color: step.accent, opacity: 0.07 }}
              >
                {step.num}
              </p>

              {/* Value */}
              <p
                className="text-[3.2rem] font-black leading-none tracking-[-0.04em]"
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
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-white/40">
                {step.label}
              </p>

              {/* Divider */}
              <div
                className="my-4 h-px w-10"
                style={{ background: `linear-gradient(90deg, ${step.accent}60, transparent)` }}
              />

              {/* Desc */}
              <p className="text-sm leading-relaxed text-gray">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
