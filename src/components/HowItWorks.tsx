"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: "🔌",
    title: "플러그인 설치",
    desc: "Twitch/치지직/숲에 Enter.fun 플러그인을 설치합니다. 30초면 끝.",
  },
  {
    num: "02",
    icon: "🎙️",
    title: "평소처럼 스트리밍",
    desc: "AI가 자동으로 임팩트 모먼트를 감지하고 맞춤 캠페인을 매칭합니다.",
  },
  {
    num: "03",
    icon: "💰",
    title: "USDC로 즉시 정산",
    desc: "성과가 발생하면 자동으로 보상. 블록체인 기반 투명 정산.",
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const numberVariants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="bg-dark py-24">
      <div className="container px-4" ref={ref}>
        <p className="section-badge">🔧 어떻게 작동하나요?</p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">
          3단계로 시작하는 새로운 수익
        </h2>
        <motion.div
          className="mt-10 flex flex-col md:flex-row md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <Fragment key={step.num}>
              <motion.article
                className="glass-card relative flex-1 rounded-2xl border border-white/10 p-6"
                variants={cardVariants}
              >
                <motion.p
                  className="text-7xl font-black leading-none text-mint/20"
                  variants={numberVariants}
                >
                  {step.num}
                </motion.p>
                <p className="mt-4 text-4xl">{step.icon}</p>
                <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-gray">{step.desc}</p>
              </motion.article>
              {index < steps.length - 1 && (
                <>
                  <div className="flex justify-center py-4 md:hidden">
                    <span className="h-8 w-px border-l-2 border-dashed border-mint/20" />
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <span className="w-8 border-t-2 border-dashed border-mint/20" />
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
