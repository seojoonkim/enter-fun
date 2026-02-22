"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

interface ProblemSectionProps {
  language: "ko" | "en";
}

interface StatCard {
  numericValue: number;
  suffix: string;
  ko: string;
  en: string;
}

const baseCards: StatCard[] = [
  { numericValue: 67, suffix: "%", ko: "게이머의 67%가 스트리머를 보고 게임 구매", en: "67% of gamers buy a game after watching streamers" },
  {
    numericValue: 53,
    suffix: "%",
    ko: "스트리머의 53%는 수익 0원",
    en: "53% of streamers earn zero revenue",
  },
  {
    numericValue: 25,
    suffix: "x",
    ko: "소형 스트리머 네트워크가 대형보다 25배 높은 전환율",
    en: "Micro streamer networks convert 25x better than large channels",
  },
];

const StatCardItem = ({
  card,
  language,
  index,
}: {
  card: StatCard;
  language: "ko" | "en";
  index: number;
}) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.35 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, card.numericValue, {
      duration: 1.5,
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, card.numericValue]);

  return (
    <motion.article
      ref={cardRef}
      className="rounded-2xl border border-white/10 bg-dark2 p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay: index * 0.15 }}
    >
      <p className="mb-1 border-l-4 border-mint pl-3 text-sm uppercase tracking-[0.15em] text-gray-300">
        {language === "ko" ? "문제 지표" : "Signal"}
      </p>
      <p className="mt-3 text-4xl font-black text-mint">
        {inView ? count : 0}
        {card.suffix}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-200">
        {language === "ko" ? card.ko : card.en}
      </p>
    </motion.article>
  );
};

export default function ProblemSection({ language }: ProblemSectionProps) {
  const title = language === "ko" ? "깨어진 생태계" : "A Broken Ecosystem";

  const sectionRef = useRef(null);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true, amount: 0.25 }}
      className="section-fade px-4 py-20"
      id="problem"
    >
      <div className="container mx-auto">
        <h2 className="section-title font-bold text-white">{title}</h2>
        <p className="mt-3 max-w-3xl text-gray-300">
          {language === "ko"
            ? "게임 스트리밍은 성장했지만, 보상 구조는 아직도 오래된 방식입니다."
            : "Game streaming has grown fast, but reward structures are still outdated."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {baseCards.map((card, index) => (
            <StatCardItem key={card.ko} card={card} language={language} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
