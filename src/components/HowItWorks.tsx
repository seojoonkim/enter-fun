"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "플러그인 연결",
    desc: "Twitch, 치지직, 숲 — 쓰는 플랫폼에 플러그인 연결. 30초.",
    detail: "코딩 불필요. 설정 없음.",
  },
  {
    num: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: "그냥 방송하기",
    desc: "그냥 방송하세요. AI가 알아서 감지하고, 맞는 캠페인 붙여줍니다.",
    detail: "개입 없음. 자동화 100%.",
  },
  {
    num: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
      </svg>
    ),
    title: "USDC 자동 입금",
    desc: "전환 발생 → USDC 자동 입금. 월정산 같은 거 없어요.",
    detail: "블록체인. 지연 없음.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-dark2 py-24 md:py-32">
      <div className="container px-4" ref={ref}>
        <div className="text-center max-w-xl mx-auto">
          <span className="section-badge">사용법</span>
          <h2 className="mt-4 section-title text-white">
            3단계면 끝.
            <br />
            <span className="gradient-text">나머진 알아서 합니다.</span>
          </h2>
          <p className="mt-4 text-base text-gray">
            복잡한 설정 없음. 그냥 방송하면, Enter.fun이 알아서 돈을 만들어 줍니다.
          </p>
        </div>

        <div className="mt-14 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px">
            <motion.div
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, rgba(0,212,170,0.3), rgba(123,97,255,0.3))" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Fragment key={step.num}>
                <motion.article
                  className="relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-7"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Step indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/10 text-mint">
                      {step.icon}
                    </div>
                    <span className="text-[3rem] font-black leading-none tracking-[-0.05em] text-white/5 select-none">
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray">{step.desc}</p>
                  </div>

                  {/* Detail tag */}
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-mint/70">
                    <span className="h-1 w-1 rounded-full bg-mint/50" />
                    {step.detail}
                  </span>
                </motion.article>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center md:hidden">
                    <motion.div
                      className="h-6 w-px bg-gradient-to-b from-mint/30 to-transparent"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
