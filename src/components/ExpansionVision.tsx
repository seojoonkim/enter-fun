"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = ["🎮 게임", "🃏 TCG", "👗 패션/뷰티", "📱 전자제품", "🎵 K-POP", "🎬 영화", "🍜 음식"];

export default function ExpansionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-dark2 py-24">
      <div className="container px-4 text-center" ref={ref}>
        <h2 className="section-title text-3xl font-bold text-white">
          게임을 넘어 모든 라이브 커머스
        </h2>
        <p className="mt-4 text-gray">
          Enter.fun은 게임에서 시작해 모든 라이브 커머스 인프라로 확장합니다
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => {
            const isActive = category.startsWith("🎮");
            return (
              <motion.span
                key={category}
                className={`rounded-full border px-4 py-2 ${
                  isActive
                    ? "border-mint/30 bg-mint/10 text-mint"
                    : "border-white/20 text-gray"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              >
                {category}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
