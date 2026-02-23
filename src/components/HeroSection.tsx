"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  left: number;
  bottom: number;
  duration: number;
  delay: number;
}

const trustMetrics = [
  { icon: "🧪", text: "Northwestern University 연구 기반" },
  { icon: "⛓️", text: "블록체인 정산" },
  { icon: "💰", text: "USDC 즉시 지급" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const next = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      duration: Math.random() * 7 + 5,
      delay: Math.random() * 3,
    }));
    setParticles(next);
  }, []);

  const particleStyles = useMemo(
    () =>
      particles.map((particle) => ({
        left: `${particle.left}%`,
        bottom: `${particle.bottom}%`,
        animationDuration: `${particle.duration}s`,
        animationDelay: `${particle.delay}s`,
      })),
    [particles]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark hero-gradient">
      <div className="hero-particles pointer-events-none">
        {particleStyles.map((particle, idx) => (
          <div
            key={idx}
            className="particle"
            style={{
              width: "4px",
              height: "4px",
              left: particle.left,
              bottom: particle.bottom,
              animationDuration: particle.animationDuration,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-mint/10 to-purple/10 blur-[200px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="container relative z-10 flex min-h-screen flex-col justify-center gap-8 px-4 py-24 md:px-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants} className="section-badge">
          🎮 게임 스트리밍의 새로운 경제
        </motion.div>
        <motion.h1
          className="section-title max-w-4xl text-5xl leading-tight font-black text-white md:text-7xl"
          variants={childVariants}
        >
          스트리머가 게임을 판다.
          <br />
          <span className="gradient-text">게임사가 성과로 보상한다.</span>
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg leading-relaxed text-gray"
          variants={childVariants}
        >
          <span className="text-mint font-bold">67%</span>의 게이머가 스트리머를 보고
          게임을 삽니다. 그런데 <span className="text-mint font-bold">53%</span>의
          스트리머는 수익이 <span className="text-mint font-bold">0원</span>입니다.
          Enter.fun이 이 구조를 뒤집습니다.
        </motion.p>
        <motion.div className="flex flex-wrap gap-3" variants={childVariants}>
          <a
            href="#waitlist"
            className="rounded-full bg-purple px-7 py-3 text-sm font-bold text-white transition hover:scale-105 hover:shadow-[0_0_28px_rgba(123,97,255,0.35)]"
          >
            얼리 액세스 신청 →
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-white transition hover:border-mint hover:text-mint"
          >
            2분 만에 이해하기 ↓
          </a>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-4 text-xs text-gray"
          variants={childVariants}
        >
          {trustMetrics.map((metric) => (
            <span key={metric.text} className="flex items-center gap-2 text-white/80">
              <span>{metric.icon}</span>
              <span>{metric.text}</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
