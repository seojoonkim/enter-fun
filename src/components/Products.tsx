"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

type AudienceKey = "streamer" | "studio" | "gamer";

type Product = {
  key: AudienceKey;
  tab: string;
  headline: string;
  subhead: string;
  metric: string;
  metricLabel: string;
  features: string[];
  color: string;
  bgColor: string;
  visual: React.ReactNode;
};

const StreamerVisual = () => (
  <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a1a]" style={{ minHeight: 220 }}>
    {/* Background dashboard image */}
    <img
      src="/images/streamer-dashboard.png"
      alt="스트리머 수익 대시보드"
      className="w-full h-full object-cover opacity-80"
      style={{ minHeight: 220 }}
    />
    {/* Overlay stats */}
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent px-5 py-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-white/40">수익 배분율</p>
          <p className="text-2xl font-black text-mint">85%</p>
          <p className="text-[10px] text-white/30 mt-0.5">스트리머가 가져가는 몫</p>
        </div>
        <span className="rounded-full bg-mint/10 border border-mint/20 px-3 py-1 text-[10px] font-bold text-mint">
          ↑ 에이전시 50~70% 대비
        </span>
      </div>
    </div>
  </div>
);

const StudioVisual = () => (
  <div className="relative rounded-2xl bg-[#0a0a1a] border border-white/5 p-5 overflow-hidden">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4">캠페인 성과</p>
    <div className="grid grid-cols-2 gap-3 mb-4">
      {[
        { label: "활성 스트리머", val: "143", unit: "명", color: "#7b61ff" },
        { label: "총 전환", val: "2,891", unit: "건", color: "#7b61ff" },
        { label: "평균 ROI", val: "25x", unit: "", color: "#00d4aa" },
        { label: "캠페인 비용", val: "$8", unit: "/전환", color: "#00d4aa" },
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-white/5 px-3 py-3">
          <p className="text-[10px] text-white/30">{stat.label}</p>
          <p className="mt-1 text-lg font-black" style={{ color: stat.color }}>
            {stat.val}<span className="text-xs font-normal text-white/30">{stat.unit}</span>
          </p>
        </div>
      ))}
    </div>
    <div className="rounded-xl bg-purple/5 border border-purple/10 px-3 py-2 flex items-center justify-between">
      <span className="text-[10px] text-white/40">AI 최적화 제안</span>
      <span className="text-[10px] font-semibold text-purple">+18% 예상 향상 →</span>
    </div>
  </div>
);

const GamerVisual = () => (
  <div className="relative rounded-2xl bg-[#0a0a1a] border border-white/5 p-5 overflow-hidden">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4">마켓플레이스</p>
    <div className="space-y-2">
      {[
        { name: "League of Legends Pack", price: "₩12,000", streamer: "Faker_KR", badge: "LIVE" },
        { name: "Elden Ring DLC", price: "₩25,000", streamer: "이성계TV", badge: "" },
        { name: "Minecraft Java", price: "₩30,000", streamer: "도티", badge: "인기" },
      ].map((item) => (
        <div key={item.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-mint/20 to-purple/20 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-white truncate">{item.name}</p>
            <p className="text-[10px] text-white/30">{item.streamer}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {item.badge && (
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                item.badge === "LIVE" ? "bg-red-500/20 text-red-400" : "bg-mint/10 text-mint"
              }`}>
                {item.badge}
              </span>
            )}
            <span className="text-xs font-bold text-mint">{item.price}</span>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-3 text-[10px] text-center text-white/20">Steam 30% 수수료 vs Enter.fun 15%</p>
  </div>
);

const products: Product[] = [
  {
    key: "streamer",
    tab: "스트리머",
    headline: "스트리밍만 하면 돼요.",
    subhead: "나머진 자동입니다.",
    metric: "85%",
    metricLabel: "스트리머 수익 배분율",
    features: [
      "Twitch · 치지직 · 숲 통합 연동",
      "AI 임팩트 모먼트 자동 감지",
      "게임사 캠페인 스마트 매칭",
      "USDC 즉시 정산 · 블록체인 기록",
    ],
    color: "#00d4aa",
    bgColor: "rgba(0,212,170,0.05)",
    visual: <StreamerVisual />,
  },
  {
    key: "studio",
    tab: "게임사",
    headline: "전환 없으면 비용 없음.",
    subhead: "성과 기반 과금.",
    metric: "25x",
    metricLabel: "ROI 향상",
    features: [
      "성과 기반 과금 — 전환 시에만 지불",
      "소형 스트리머 143명+ 네트워크",
      "실시간 캠페인 대시보드",
      "AI 스트리머-게임 자동 매칭",
    ],
    color: "#7b61ff",
    bgColor: "rgba(123,97,255,0.05)",
    visual: <StudioVisual />,
  },
  {
    key: "gamer",
    tab: "게이머",
    headline: "좋아하는 스트리머에게서",
    subhead: "더 싸게 삽니다.",
    metric: "15%",
    metricLabel: "수수료 (Steam 30%)",
    features: [
      "스트리머 라이브 중 즉시 구매",
      "구매 수익 일부 스트리머 공유",
      "블록체인 기반 투명한 거래",
      "Steam 대비 평균 10% 저렴",
    ],
    color: "#ff6b6b",
    bgColor: "rgba(255,107,107,0.05)",
    visual: <GamerVisual />,
  },
];

export default function Products() {
  const [active, setActive] = useState<AudienceKey>("streamer");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const current = products.find((p) => p.key === active)!;

  return (
    <section id="products" className="relative bg-dark py-14 md:py-20">
      <div className="container px-4" ref={ref}>
        <div className="max-w-xl">
          <span className="section-badge">핵심 제품</span>
          <h2 className="mt-4 section-title text-white">
            세 주체 모두가
            <br />
            <span className="gradient-text">이기는 구조입니다.</span>
          </h2>
          <p className="mt-4 text-base leading-[1.75] text-gray">
            스트리머, 게임사, 게이머 각각의 니즈를 반영한 구조를 설계했습니다.
          </p>
        </div>

        {/* Tab switcher */}
        <motion.div
          className="mt-10 flex gap-2 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.2 }}
        >
          {products.map((p) => {
            const icons: Record<string, React.ReactNode> = {
              streamer: (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7" cy="4" r="2.5"/>
                  <path d="M7 7v2m0 0a3 3 0 01-3 3h6a3 3 0 01-3-3z"/>
                </svg>
              ),
              studio: (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="12" height="8" rx="1.5"/>
                  <circle cx="5" cy="7" r="1.5"/>
                  <path d="M9 5.5h2M9 8.5h2"/>
                </svg>
              ),
              gamer: (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7a5 5 0 0010 0V5a5 5 0 00-10 0v2z"/>
                  <path d="M5 6v2M4 7h2M9 7h2"/>
                </svg>
              ),
            };
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active === p.key
                    ? "text-dark"
                    : "border-white/10 text-gray hover:border-white/20 hover:text-white"
                }`}
                style={active === p.key ? { backgroundColor: p.color, borderColor: p.color } : {}}
              >
                {icons[p.key]}
                {p.tab}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="mt-6 grid gap-6 md:grid-cols-2 items-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left — details */}
            <div
              className="rounded-2xl border p-7 md:p-8"
              style={{ borderColor: `${current.color}20`, background: current.bgColor }}
            >
              <p className="text-3xl font-black leading-none tracking-[-0.04em]" style={{ color: current.color }}>
                {current.metric}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                {current.metricLabel}
              </p>

              <div className="my-5 h-px w-full bg-white/5" />

              <h3 className="text-xl font-black leading-tight text-white">
                {current.headline}<br />
                <span style={{ color: current.color }}>{current.subhead}</span>
              </h3>

              <ul className="mt-5 space-y-3">
                {current.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray">
                    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke={current.color} strokeWidth="1.5" strokeOpacity="0.4"/>
                      <path d="M4.5 7l2 2 3-3" stroke={current.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-dark transition hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: current.color }}
                >
                  {active === "streamer" && "스트리머로 신청하기"}
                  {active === "studio" && "게임사로 문의하기"}
                  {active === "gamer" && "게이머로 신청하기"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right — visual */}
            <div className="md:pt-2">
              {current.visual}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
