"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  left: number;
  bottom: number;
  duration: number;
  delay: number;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const next = Array.from({ length: 15 }, () => ({
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
      <div className="container relative z-10 flex min-h-screen flex-col items-start justify-center gap-8 px-4 py-24 md:px-0">
        <motion.h1
          className="section-title font-black leading-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          스트리밍하면
          <br />
          <span className="bg-clip-text bg-gradient-to-r from-mint to-purple text-transparent">
            보상받는 세상
          </span>
        </motion.h1>
        <motion.p
          className="max-w-xl text-lg leading-relaxed text-gray"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          모든 스트리머가 자신의 영향력만큼 보상받는 세상을 만듭니다.
          <br />
          성과 기반 자동 보상 · 소형 스트리머 25배 전환율 · USDC 즉시 정산
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#waitlist"
            className="rounded-full bg-purple px-7 py-3 text-sm font-bold text-white"
          >
            얼리 액세스 신청
          </a>
          <a
            href="#problem"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-bold text-white"
          >
            자세히 알아보기
          </a>
        </motion.div>
      </div>
    </section>
  );
}
