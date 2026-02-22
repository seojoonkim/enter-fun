"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SimulatorSectionProps {
  language: "ko" | "en";
}

export default function SimulatorSection({ language }: SimulatorSectionProps) {
  const title = language === "ko" ? "나의 예상 수익 계산하기" : "Calculate Your Earnings";
  const viewerLabel = language === "ko" ? "평균 시청자 수" : "Average Viewers";
  const hoursLabel = language === "ko" ? "월 방송 시간" : "Monthly Stream Hours";

  const [viewers, setViewers] = useState(500);
  const [hours, setHours] = useState(40);
  const [animatedIncome, setAnimatedIncome] = useState(0);

  const expected = viewers * hours * 0.05;

  useEffect(() => {
    const controls = animate(animatedIncome, expected, {
      type: "spring",
      stiffness: 120,
      damping: 18,
      onUpdate: (value: number) => setAnimatedIncome(value),
    });

    return () => controls.stop();
  }, [expected, animatedIncome]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true, amount: 0.25 }}
      className="section-fade px-4 py-20"
      id="simulator"
    >
      <div className="container mx-auto">
        <h2 className="section-title font-bold text-white">{title}</h2>
        <p className="mt-3 text-gray-300">
          {language === "ko"
            ? "수치 조절로 스트리머 보상 규모를 빠르게 가늠해 보세요."
            : "Adjust the values to estimate monthly USDC earnings quickly."}
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#141a2d] p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm text-gray-300">{viewerLabel}</span>
              <input
                type="range"
                min={10}
                max={10000}
                step={10}
                value={viewers}
                onChange={(event) => setViewers(Number(event.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-mint"
              />
              <p className="mt-1 text-lg font-semibold text-mint">{viewers.toLocaleString()}</p>
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">{hoursLabel}</span>
              <input
                type="range"
                min={1}
                max={200}
                step={1}
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-mint"
              />
              <p className="mt-1 text-lg font-semibold text-mint">{hours}h</p>
            </label>
          </div>

          <motion.p
            layout
            className="mt-8 rounded-xl border border-mint/40 bg-mint/10 p-4 text-2xl font-black text-mint"
          >
            {language === "ko"
              ? `월 예상 수익: $${animatedIncome.toFixed(2)} USDC`
              : `Monthly Estimated: $${animatedIncome.toFixed(2)} USDC`}
          </motion.p>

          <p className="mt-3 text-sm text-gray-400">
            {language === "ko"
              ? "실제 수익은 게임 카테고리, 전환율에 따라 다를 수 있습니다"
              : "Actual earnings may vary by game category and conversion rate."}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
