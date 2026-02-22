"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const products = [
  {
    icon: "🔌",
    title: "성과 보상 플러그인",
    subtitle: "스트리밍만 하면 자동으로 보상",
    features: [
      "Twitch/치지직/숲 데이터 수집",
      "임팩트 모먼트 AI 감지",
      "맞춤 캠페인 자동 매칭",
      "USDC 즉시 정산",
    ],
  },
  {
    icon: "📊",
    title: "스트리머 툴 플랫폼",
    subtitle: "데이터로 성장하는 스트리머",
    features: [
      "구독자 인사이트 대시보드",
      "AI 하이라이트 자동 추출",
      "스트리머 랭킹 시스템",
      "성과 분석 리포트",
    ],
  },
  {
    icon: "🛒",
    title: "게임 마켓플레이스",
    subtitle: "Steam의 대안. 스트리머가 수익을 나눈다",
    features: [
      "라이브 커머스 게임 판매",
      "스트리머 백마진 5-15%",
      "수수료 15% (Steam 30%)",
      "블록체인 투명 정산",
    ],
  },
];

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-dark py-24">
      <div className="container px-4" ref={ref}>
        <h2 className="section-title mb-10 text-3xl font-bold text-white">
          3가지 핵심 제품
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass-card rounded-2xl border border-white/5 p-7 transition hover:border-mint/20"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <p className="text-4xl">{item.icon}</p>
              <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-gray">{item.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm text-gray">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-mint">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
