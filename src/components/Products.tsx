"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type AudienceTone = "streamer" | "studio" | "gamer";

type Product = {
  audience: string;
  title: string;
  headline: string;
  metric: string;
  features: string[];
  tone: AudienceTone;
  icon: string;
};

const toneStyle: Record<AudienceTone, { badgeColor: string; border: string; shadow: string }> = {
  streamer: {
    badgeColor: "#00d4aa",
    border: "#00d4aa",
    shadow: "0 0 60px rgba(0, 212, 170, 0.18)",
  },
  studio: {
    badgeColor: "#7b61ff",
    border: "#7b61ff",
    shadow: "0 0 60px rgba(123, 97, 255, 0.18)",
  },
  gamer: {
    badgeColor: "#ff6b6b",
    border: "#ff6b6b",
    shadow: "0 0 60px rgba(255, 107, 107, 0.18)",
  },
};

const products: Product[] = [
  {
    audience: "For 스트리머",
    icon: "🧩",
    title: "성과 보상 플러그인",
    headline: "스트리밍만 하세요. 보상은 자동입니다.",
    metric: "평균 월 $500+ 추가 수익",
    features: [
      "Twitch/치지직/숲 연동",
      "AI 임팩트 감지",
      "자동 캠페인 매칭",
      "USDC 즉시 정산",
    ],
    tone: "streamer",
  },
  {
    audience: "For 게임사",
    icon: "📈",
    title: "스트리머 인사이트",
    headline: "스폰서 대신, 성과에만 지불하세요.",
    metric: "ROI 25x 향상",
    features: [
      "성과 기반 과금",
      "소형 스트리머 네트워크",
      "실시간 캠페인 대시보드",
      "AI 매칭 최적화",
    ],
    tone: "studio",
  },
  {
    audience: "For 게이머",
    icon: "🛒",
    title: "게임 마켓플레이스",
    headline: "좋아하는 스트리머에게서 게임을 사세요.",
    metric: "수수료 15% (Steam 30%)",
    features: [
      "스트리머 라이브 커머스",
      "스트리머 수익 공유",
      "블록체인 투명 결제",
      "더 저렴한 가격",
    ],
    tone: "gamer",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="bg-dark py-24">
      <div className="container px-4" ref={ref}>
        <p className="section-badge">🚀 핵심 제품</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
          스트리머 · 게임사 · 게이머, 모두를 위한 인프라
        </h2>
        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
            {products.map((item) => (
              <motion.article
                key={item.title}
                className="glass-card rounded-2xl border p-7 transition-all"
                style={{ borderColor: toneStyle[item.tone].border }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                  boxShadow: toneStyle[item.tone].shadow,
                }}
                variants={cardVariants}
              >
                <span
                  className="section-badge mb-4"
                  style={{
                    color: toneStyle[item.tone].badgeColor,
                    borderColor: `${toneStyle[item.tone].badgeColor}66`,
                    backgroundColor: `${toneStyle[item.tone].badgeColor}14`,
                  }}
                >
                  {item.audience}
                </span>
                <p className="text-4xl">{item.icon}</p>
                <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-gray">{item.headline}</p>
                <p
                  className="mt-6 text-3xl font-black text-white"
                  style={{ color: toneStyle[item.tone].badgeColor }}
                >
                  {item.metric}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-gray">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span style={{ color: toneStyle[item.tone].badgeColor }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
      </div>
    </section>
  );
}
