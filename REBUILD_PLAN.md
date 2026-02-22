# Enter.fun 웹사이트 완전 리빌드 — Codex 실행 지시서

## 파일 구조 (최종)

```
src/
├── app/
│   ├── globals.css          ← 유지 (수정)
│   ├── layout.tsx           ← 유지 (그대로)
│   ├── page.tsx             ← 완전 교체
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx            ← 완전 교체
│   ├── HeroSection.tsx       ← 완전 교체
│   ├── MarketProblem.tsx     ← 신규
│   ├── Multiplier25x.tsx     ← 신규
│   ├── Products.tsx          ← 신규
│   ├── SteamComparison.tsx   ← 신규
│   ├── RevenueRoadmap.tsx    ← 신규
│   ├── TechStack.tsx         ← 신규
│   ├── Partnership.tsx       ← 신규
│   ├── ExpansionVision.tsx   ← 신규
│   ├── WaitlistSection.tsx   ← 완전 교체
│   ├── Footer.tsx            ← 완전 교체
│   └── CountUp.tsx           ← 신규 (유틸 컴포넌트)
├── lib/
│   └── supabase.ts           ← 유지
tailwind.config.ts             ← 유지 (그대로)
```

삭제: `ProblemSection.tsx`, `SolutionSection.tsx`, `SimulatorSection.tsx`

---

## Codex 코딩 지시사항

아래를 하나의 Codex 프롬프트로 사용.

---

### 프롬프트 시작

프로젝트: `/Users/gimseojun/enter-fun/`
Next.js App Router + TypeScript + Tailwind CSS 4 (@theme inline, `tailwind.config.ts` 있음) + Framer Motion 12.

**중요 규칙:**
- 모든 컴포넌트에 `"use client"` 선언
- Tailwind CSS 4 사용 중 — `@theme inline`으로 커스텀 색상 정의됨. `bg-dark`, `text-mint`, `bg-purple` 등 사용 가능
- framer-motion import: `import { motion, useInView } from "framer-motion"`
- `npm run build` 에러 없어야 함
- 기존 `globals.css`, `layout.tsx`, `tailwind.config.ts`, `lib/supabase.ts`는 수정하지 마
- 한국어 텍스트 사용

---

### 1. 삭제할 파일

```
rm src/components/ProblemSection.tsx src/components/SolutionSection.tsx src/components/SimulatorSection.tsx
```

---

### 2. `src/components/CountUp.tsx` (신규)

숫자 카운트업 유틸 컴포넌트.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number; // seconds, default 2
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function CountUp({ end, duration = 2, suffix = "", prefix = "", decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}</span>;
}
```

---

### 3. `src/components/Navbar.tsx` (교체)

심플 고정 네비게이션. 로고 + 스크롤 시 배경 blur.

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-dark/80 backdrop-blur-md border-b border-white/5" : ""}`}>
      <div className="container flex items-center justify-between h-16">
        <span className="text-xl font-bold">
          <span className="text-mint">Enter</span><span className="text-white">.fun</span>
        </span>
        <a href="#waitlist" className="bg-purple hover:bg-purple/80 text-white text-sm font-semibold px-5 py-2 rounded-full transition">
          얼리 액세스
        </a>
      </div>
    </nav>
  );
}
```

---

### 4. `src/components/HeroSection.tsx` (교체)

배경: `hero-gradient` + `hero-particles` (globals.css에 이미 정의됨).
파티클은 CSS 기반으로 15개 생성.

```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 30}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 5}s`,
  }));

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      <div className="hero-particles">
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            width: p.size, height: p.size, left: p.left, bottom: p.bottom,
            animationDuration: p.duration, animationDelay: p.delay,
          }} />
        ))}
      </div>
      <div className="container relative z-10 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-mint font-semibold text-sm tracking-widest uppercase mb-4">Hashed × Nexus Joint Venture</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            스트리밍하면<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-purple">보상받는 세상</span>
          </h1>
          <p className="text-gray text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            모든 스트리머가 자신의 영향력만큼 보상받는 세상을 만듭니다.<br />
            성과 기반 자동 보상 · 소형 스트리머 25배 전환율 · USDC 즉시 정산
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <button onClick={scrollToWaitlist} className="bg-purple hover:bg-purple/80 text-white font-bold px-8 py-4 rounded-full text-lg transition">
            얼리 액세스 신청 →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 5. `src/components/MarketProblem.tsx` (신규)

시장 규모 + 문제점. 카운트업 애니메이션 통계 3개 + 핵심 문제 카드.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "./CountUp";

const stats = [
  { value: 180, suffix: "억$", label: "게임 스트리밍 시장 (2024)" },
  { value: 67, suffix: "%", label: "스트리머 보고 게임 구매하는 게이머" },
  { value: 53, suffix: "%", label: "수익 0원인 스트리머" },
];

const problems = [
  { icon: "🎮", title: "스트리머 보상 없음", desc: "게이머 67%가 스트리머 보고 게임을 사지만, 스트리머 53%는 수익 0원" },
  { icon: "📉", title: "스폰서 ROI 최악", desc: "게임사 스폰서 스트리밍 ROI '매우 부정적' — Northwestern University 2024" },
  { icon: "💸", title: "비효율적 마케팅 비용", desc: "대형 1명 $10,000 vs 소형 100명 $10,000 — 같은 비용, 25배 전환율 차이" },
];

export default function MarketProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title font-bold text-center mb-16">
          <span className="text-mint">$180억</span> 시장의<br />해결되지 않은 문제
        </motion.h2>

        {/* 통계 카운트업 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card rounded-2xl p-8 text-center border border-white/5">
              <div className="text-4xl md:text-5xl font-extrabold text-mint mb-2">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-gray text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* 문제 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-gray text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 6. `src/components/Multiplier25x.tsx` (신규)

핵심 셀링 포인트 — 25배 효과 비교 테이블. 행별 stagger 애니메이션.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "./CountUp";

const rows = [
  { metric: "총 시청자", big: "50,000명", small: "50,000명", highlight: false },
  { metric: "평균 시청시간", big: "8분", small: "25분", highlight: true },
  { metric: "채팅 참여율", big: "2%", small: "35%", highlight: true },
  { metric: "게임 언급 반응률", big: "0.5%", small: "12%", highlight: true },
  { metric: "예상 전환율", big: "0.1%", small: "2.5%", highlight: true },
  { metric: "예상 구매자", big: "50명", small: "1,250명", highlight: true },
];

export default function Multiplier25x() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark2">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="section-title font-bold mb-4">
            소형 스트리머 100명 = <span className="text-mint">25배</span> 전환율
          </h2>
          <p className="text-gray max-w-xl mx-auto">동일 비용 $10,000 투자 시, 대형 1명 vs 소형 100명 성과 비교</p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray text-sm py-3 px-4">지표</th>
                <th className="text-center text-gray text-sm py-3 px-4">대형 1명<br/><span className="text-xs">($10,000)</span></th>
                <th className="text-center text-sm py-3 px-4 text-mint font-bold">소형 100명<br/><span className="text-xs font-normal">($100×100)</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="border-b border-white/5">
                  <td className="py-3 px-4 text-sm text-white/80">{r.metric}</td>
                  <td className="py-3 px-4 text-center text-sm text-white/50">{r.big}</td>
                  <td className={`py-3 px-4 text-center text-sm font-bold ${r.highlight ? "text-mint" : "text-white"}`}>{r.small}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 text-center">
          <div className="inline-block glass-card rounded-2xl px-8 py-5 border border-mint/20">
            <span className="text-5xl font-extrabold text-mint">25×</span>
            <p className="text-gray text-sm mt-1">더 높은 전환율</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 7. `src/components/Products.tsx` (신규)

3가지 제품 카드. 각각 아이콘 + 제목 + 설명 + 기능 리스트.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    icon: "🔌",
    title: "성과 보상 플러그인",
    desc: "스트리밍만 하면 자동으로 보상",
    features: ["Twitch / 치지직 / 숲 데이터 수집", "임팩트 모먼트 AI 감지", "맞춤 캠페인 자동 매칭", "USDC 즉시 정산"],
    color: "mint",
  },
  {
    icon: "📊",
    title: "스트리머 툴 플랫폼",
    desc: "데이터로 성장하는 스트리머",
    features: ["구독자 인사이트 대시보드", "AI 하이라이트 자동 추출", "스트리머 랭킹 시스템", "성과 분석 리포트"],
    color: "purple",
  },
  {
    icon: "🛒",
    title: "게임 마켓플레이스",
    desc: "Steam의 대안, 스트리머가 수익을 나눈다",
    features: ["라이브 커머스 게임 판매", "스트리머 백마진 5-15%", "수수료 15% (Steam 30%)", "블록체인 투명 정산"],
    color: "mint",
  },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title font-bold text-center mb-16">
          <span className="text-mint">3가지</span> 핵심 제품
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.2, duration: 0.6 }}
              className="glass-card rounded-2xl p-7 border border-white/5 hover:border-mint/20 transition group">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-gray text-sm mb-5">{p.desc}</p>
              <ul className="space-y-2">
                {p.features.map((f, j) => (
                  <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.color === "mint" ? "bg-mint" : "bg-purple"}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 8. `src/components/SteamComparison.tsx` (신규)

Steam vs Enter.fun 비교표.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  { label: "게임 발견", steam: "알고리즘 추천", enter: "스트리머 라이브 큐레이션" },
  { label: "스트리머 보상", steam: "없음", enter: "판매 수수료 5-15%" },
  { label: "수수료", steam: "30%", enter: "15%" },
  { label: "투명성", steam: "블랙박스", enter: "블록체인 기반 투명" },
];

export default function SteamComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark2">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title font-bold text-center mb-14">
          Steam vs <span className="text-mint">Enter.fun</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray text-sm py-3 px-4">구분</th>
                <th className="text-center text-white/50 text-sm py-3 px-4">Steam</th>
                <th className="text-center text-mint font-bold text-sm py-3 px-4">Enter.fun</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="border-b border-white/5">
                  <td className="py-4 px-4 text-sm text-white/80 font-medium">{r.label}</td>
                  <td className="py-4 px-4 text-center text-sm text-white/40">{r.steam}</td>
                  <td className="py-4 px-4 text-center text-sm text-mint font-semibold">{r.enter}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
```

---

### 9. `src/components/RevenueRoadmap.tsx` (신규)

Phase 1/2/3 수익 모델 로드맵. 수직 타임라인 스타일.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    phase: "Phase 1",
    title: "플랫폼 런칭",
    items: ["플랫폼 수수료 30%", "구독 $9.99 ~ $999/월", "데이터 인사이트 $500-5,000"],
    color: "bg-mint",
  },
  {
    phase: "Phase 2",
    title: "생태계 확장",
    items: ["API $99-999/월", "프로필 인증 $4.99/월"],
    color: "bg-purple",
  },
  {
    phase: "Phase 3",
    title: "마켓플레이스",
    items: ["게임 판매 수수료 15%", "프로모션 슬롯 $1,000-10,000/일"],
    color: "bg-gradient-to-r from-mint to-purple",
  },
];

export default function RevenueRoadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title font-bold text-center mb-16">
          수익 모델 <span className="text-mint">로드맵</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto space-y-8">
          {phases.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${p.color} flex-shrink-0`} />
                {i < phases.length - 1 && <div className="w-0.5 flex-1 bg-white/10 mt-1" />}
              </div>
              <div className="glass-card rounded-xl p-5 border border-white/5 flex-1 mb-2">
                <div className="text-mint text-xs font-bold tracking-widest uppercase mb-1">{p.phase}</div>
                <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
                <ul className="space-y-1.5">
                  {p.items.map((item, j) => (
                    <li key={j} className="text-gray text-sm flex items-center gap-2">
                      <span className="text-mint">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 10. `src/components/TechStack.tsx` (신규)

기술 스택 시각화. 3개 카테고리.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stacks = [
  {
    category: "블록체인",
    icon: "⛓️",
    items: ["이더리움 L2 (Arbitrum)", "Account Abstraction", "소셜 로그인 지갑", "USDC 정산"],
  },
  {
    category: "데이터 파이프라인",
    icon: "🔄",
    items: ["Apache Kafka / Flink", "ClickHouse", "실시간 스트리밍 데이터", "이벤트 드리븐 아키텍처"],
  },
  {
    category: "AI / ML",
    icon: "🤖",
    items: ["XGBoost + LSTM", "임팩트 모먼트 감지", "하이라이트 자동 추출", "전환율 예측 모델"],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark2">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title font-bold text-center mb-16">
          기술 <span className="text-mint">스택</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stacks.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-white font-bold mb-4">{s.category}</h3>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="text-gray text-sm">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 11. `src/components/Partnership.tsx` (신규)

Hashed × Nexus JV 소개. 간결하게.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Partnership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-10 md:p-14 border border-white/5 text-center max-w-3xl mx-auto">
          <p className="text-mint text-sm font-bold tracking-widest uppercase mb-4">Joint Venture</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Hashed × Nexus
          </h2>
          <p className="text-gray text-lg leading-relaxed max-w-xl mx-auto">
            아시아 최대 Web3 VC <span className="text-white font-semibold">Hashed</span>와
            게이밍 인프라 전문 <span className="text-white font-semibold">Nexus</span>의
            합작 벤처. 블록체인 기술과 게이밍 생태계의 깊은 전문성을 결합합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 12. `src/components/ExpansionVision.tsx` (신규)

확장 비전 — 게임 넘어 모든 카테고리.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  { icon: "🎮", label: "게임", active: true },
  { icon: "🃏", label: "TCG", active: false },
  { icon: "👗", label: "패션/뷰티", active: false },
  { icon: "📱", label: "전자제품", active: false },
  { icon: "🎵", label: "K-POP", active: false },
  { icon: "🎬", label: "영화", active: false },
  { icon: "🍜", label: "음식", active: false },
];

export default function ExpansionVision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-dark2">
      <div className="container text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title font-bold mb-4">
          게임을 넘어, <span className="text-mint">모든 라이브 커머스</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray max-w-xl mx-auto mb-12">
          Enter.fun은 게임에서 시작해 모든 라이브 커머스 인프라로 확장합니다
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className={`glass-card rounded-xl px-6 py-4 border ${c.active ? "border-mint/30 bg-mint/5" : "border-white/5"} flex flex-col items-center gap-2`}>
              <span className="text-3xl">{c.icon}</span>
              <span className={`text-sm font-medium ${c.active ? "text-mint" : "text-gray"}`}>{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 13. `src/components/WaitlistSection.tsx` (교체)

이메일 + 역할 선택 (스트리머/게임사/투자자). Supabase 저장.

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const roles = [
  { value: "streamer", label: "스트리머", icon: "🎙️" },
  { value: "publisher", label: "게임사", icon: "🎮" },
  { value: "investor", label: "투자자", icon: "💰" },
];

export default function WaitlistSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("streamer");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("waitlist").insert({ email, role });
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} id="waitlist" className="py-24 bg-dark">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-10 md:p-14 border border-purple/20 max-w-2xl mx-auto text-center">
          <h2 className="section-title font-bold mb-4">
            <span className="text-purple">얼리 액세스</span> 신청
          </h2>
          <p className="text-gray mb-8">가장 먼저 Enter.fun을 경험하세요</p>

          {status === "success" ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-mint text-lg font-semibold py-8">
              🎉 신청 완료! 곧 연락드릴게요.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 역할 선택 */}
              <div className="flex justify-center gap-3">
                {roles.map(r => (
                  <button key={r.value} type="button" onClick={() => setRole(r.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition border ${role === r.value ? "border-purple bg-purple/10 text-purple" : "border-white/10 text-gray hover:border-white/20"}`}>
                    {r.icon} {r.label}
                  </button>
                ))}
              </div>

              {/* 이메일 입력 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일 주소"
                  className="flex-1 bg-dark border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple transition" required />
                <button type="submit" disabled={status === "loading"}
                  className="bg-purple hover:bg-purple/80 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-full transition whitespace-nowrap">
                  {status === "loading" ? "신청 중..." : "신청하기"}
                </button>
              </div>

              {status === "error" && <p className="text-red-400 text-sm">오류가 발생했습니다. 다시 시도해주세요.</p>}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 14. `src/components/Footer.tsx` (교체)

```tsx
"use client";

export default function Footer() {
  return (
    <footer className="py-10 bg-dark border-t border-white/5">
      <div className="container text-center">
        <span className="text-lg font-bold">
          <span className="text-mint">Enter</span><span className="text-white">.fun</span>
        </span>
        <p className="text-gray text-sm mt-3">© 2025 Enter.fun — Hashed × Nexus Joint Venture</p>
        <p className="text-white/20 text-xs mt-2">모든 스트리머가 자신의 영향력만큼 보상받는 세상</p>
      </div>
    </footer>
  );
}
```

---

### 15. `src/app/page.tsx` (교체)

```tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketProblem from "@/components/MarketProblem";
import Multiplier25x from "@/components/Multiplier25x";
import Products from "@/components/Products";
import SteamComparison from "@/components/SteamComparison";
import RevenueRoadmap from "@/components/RevenueRoadmap";
import TechStack from "@/components/TechStack";
import Partnership from "@/components/Partnership";
import ExpansionVision from "@/components/ExpansionVision";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarketProblem />
      <Multiplier25x />
      <Products />
      <SteamComparison />
      <RevenueRoadmap />
      <TechStack />
      <Partnership />
      <ExpansionVision />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
```

---

### 16. Supabase 테이블 확인

waitlist 테이블에 `role` 컬럼이 있어야 함. 없으면:

```sql
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS role text DEFAULT 'streamer';
```

---

### 실행 순서 요약

1. `rm src/components/ProblemSection.tsx src/components/SolutionSection.tsx src/components/SimulatorSection.tsx`
2. 위 코드 순서대로 각 파일 생성/교체
3. `npm run build` 실행 → 에러 없는지 확인
4. `git add . && git commit -m "Full rebuild: Enter.fun landing page" && git push`
5. Vercel 자동 배포 확인

### 프롬프트 끝
