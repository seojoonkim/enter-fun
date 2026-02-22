"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  language: "ko" | "en";
}

const particles = [
  { left: "9%", top: "82%", size: 4, delay: "0.1s", duration: "9s", opacity: 0.45 },
  { left: "18%", top: "74%", size: 6, delay: "1.5s", duration: "8s", opacity: 0.3 },
  { left: "29%", top: "86%", size: 3, delay: "3.2s", duration: "11s", opacity: 0.33 },
  { left: "40%", top: "80%", size: 5, delay: "0.9s", duration: "10s", opacity: 0.4 },
  { left: "52%", top: "90%", size: 4, delay: "2.4s", duration: "7s", opacity: 0.38 },
  { left: "63%", top: "84%", size: 3, delay: "1.3s", duration: "9.5s", opacity: 0.35 },
  { left: "71%", top: "88%", size: 6, delay: "4.1s", duration: "8.8s", opacity: 0.42 },
  { left: "83%", top: "79%", size: 4, delay: "0.7s", duration: "10.3s", opacity: 0.34 },
  { left: "91%", top: "84%", size: 3, delay: "2.8s", duration: "9s", opacity: 0.31 },
];

export default function HeroSection({ language }: HeroSectionProps) {
  const t =
    language === "ko"
      ? {
          badge: "🎮 Streamer Monetization, Reimagined",
          title: "스트리밍하면 보상받는다.",
          subtitle:
            "실시간 방송 데이터 분석 × 블록체인 자동 정산. 공정한 게임 스트리밍 생태계를 만듭니다.",
          cta: "Get Early Access →",
          stats: "1,234 스트리머 | 89 파트너 게임사 | $2.4M 누적 보상",
        }
      : {
          badge: "🎮 Streamer Monetization, Reimagined",
          title: "Stream. Earn. Automatically.",
          subtitle:
            "Real-time stream analytics × blockchain auto settlement. We build a fair game streaming ecosystem.",
          cta: "Get Early Access →",
          stats: "1,234 Streamers | 89 Partner Games | $2.4M Total Rewards",
        };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = document.getElementById("waitlist");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={sectionVariants}
      className="hero-gradient section-fade relative overflow-hidden px-4 py-20 md:py-24"
      id="hero"
    >
      <div className="hero-particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={`particle-${index}`}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto flex min-h-[76vh] flex-col justify-center">
        <motion.div
          className="inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-gray-200"
          variants={itemVariants}
        >
          {t.badge}
        </motion.div>

        <motion.h1
          className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl"
          variants={itemVariants}
        >
          {t.title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
          variants={itemVariants}
        >
          {t.subtitle}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-8"
          variants={itemVariants}
        >
          <div className="mx-auto flex max-w-md flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/20 bg-dark/50 px-6 py-3 text-white outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="rounded-full bg-purple px-6 py-3 font-semibold text-white"
            >
              Get Early Access →
            </button>
          </div>
        </motion.form>

        <motion.div
          className="mt-10 grid max-w-3xl rounded-2xl border border-white/10 bg-[#151b31]/80 px-5 py-4 text-sm text-gray-200 md:text-base"
          variants={itemVariants}
        >
          {t.stats}
        </motion.div>
      </div>
    </motion.section>
  );
}
