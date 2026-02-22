"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stacks = [
  {
    icon: "⛓️",
    title: "블록체인",
    items: ["이더리움 L2 (Arbitrum)", "Account Abstraction", "소셜 로그인 지갑", "USDC 정산"],
  },
  {
    icon: "🔄",
    title: "데이터 파이프라인",
    items: [
      "Apache Kafka",
      "Flink",
      "ClickHouse",
      "실시간 스트리밍 데이터",
      "이벤트 드리븐",
    ],
  },
  {
    icon: "🤖",
    title: "AI / ML",
    items: [
      "XGBoost + LSTM",
      "임팩트 모먼트 감지",
      "하이라이트 자동 추출",
      "전환율 예측 모델",
    ],
  },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-dark py-24">
      <div className="container px-4">
        <h2 className="section-title mb-10 text-3xl font-bold text-white">기술 스택</h2>
        <div
          className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3 text-center"
          ref={ref}
        >
          {stacks.map((stack, index) => (
            <motion.div
              key={stack.title}
              className="glass-card rounded-2xl border border-white/5 p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <p className="text-4xl">{stack.icon}</p>
              <h3 className="mt-3 text-xl font-bold text-white">{stack.title}</h3>
              <ul className="mt-4 space-y-1 text-sm text-gray">
                {stack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
