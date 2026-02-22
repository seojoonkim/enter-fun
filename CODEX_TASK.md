프로젝트: /Users/gimseojun/enter-fun/
Next.js App Router + TypeScript + Tailwind CSS 4 + Framer Motion

## 중요 규칙
- 모든 컴포넌트에 "use client" 선언
- Tailwind CSS 4: bg-dark, text-mint, bg-purple, text-gray 등 globals.css에 정의된 클래스 사용
- framer-motion: motion, useInView import
- npm run build 에러 없어야 함
- globals.css, layout.tsx, tailwind.config.ts, lib/supabase.ts 절대 수정 금지

## 1. 삭제할 기존 파일
rm -f src/components/ProblemSection.tsx src/components/SolutionSection.tsx src/components/SimulatorSection.tsx src/components/HeroSection.tsx src/components/WaitlistSection.tsx src/components/Footer.tsx src/components/Navbar.tsx

## 2. src/components/CountUp.tsx (신규)
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
interface CountUpProps { end: number; duration?: number; suffix?: string; prefix?: string; }
export default function CountUp({ end, duration = 2, suffix = "", prefix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);
  return <span ref={ref}>{prefix}{Math.round(value)}{suffix}</span>;
}

## 3. src/components/Navbar.tsx (신규)
고정 네비게이션. 스크롤 시 bg-dark/80 backdrop-blur.
좌측: Enter.fun 로고 (Enter=민트, .fun=흰색)
우측: "얼리 액세스" 버튼 → #waitlist 섹션으로 스크롤
scrollY > 50 이면 배경 표시.

## 4. src/components/HeroSection.tsx (신규)
배경: hero-gradient CSS 클래스 (globals.css에 있음)
파티클: 15개 div.particle 생성 (랜덤 위치, CSS 애니메이션)
Framer Motion: 헤드라인 opacity 0→1, y 30→0, duration 0.8
서브텍스트: delay 0.3

헤드라인: "스트리밍하면<br/>보상받는 세상"
- "보상받는 세상" 부분은 text-transparent bg-clip-text bg-gradient-to-r from-mint to-purple
서브텍스트: "모든 스트리머가 자신의 영향력만큼 보상받는 세상을 만듭니다."
CTAs:
- "얼리 액세스 신청 →" → #waitlist 스크롤 (bg-purple, rounded-full)
- "자세히 알아보기" → #problem 스크롤 (border border-white/20, rounded-full)

## 5. src/components/MarketProblem.tsx (신규)
id="problem"
통계 카운트업 3개 (CountUp 컴포넌트 사용):
- 180 + "억$" + "게임 스트리밍 시장 (2024)"
- 67 + "%" + "스트리머 보고 게임 구매하는 게이머"
- 53 + "%" + "수익 0원인 스트리머"

문제 카드 3개:
- 🎮 "스트리머 보상 없음" + 설명
- 📉 "스폰서 ROI 최악" + "Northwestern University 2024" 인용
- 💸 "비효율적 마케팅" + "대형 1명 vs 소형 100명"

useInView로 스크롤 시 fade-in stagger 애니메이션

## 6. src/components/Multiplier25x.tsx (신규)
핵심 섹션. 배경 bg-dark2.
제목: "소형 스트리머 100명 = 25배 전환율"
부제: "동일 비용 $10,000 투자 시 성과 비교"

비교 테이블 (max-w-3xl mx-auto):
헤더: 지표 | 대형 1명 ($10,000) | 소형 100명 ($100×100)
행들 (소형 스트리머 컬럼은 text-mint, 마지막 행은 font-bold):
- 총 시청자 | 50,000명 | 50,000명
- 평균 시청시간 | 8분 | 25분
- 채팅 참여율 | 2% | 35%
- 게임 언급 반응률 | 0.5% | 12%
- 예상 전환율 | 0.1% | 2.5%
- 예상 구매자 | 50명 | 1,250명

하단 배지: 큰 "25×" 텍스트 (text-5xl text-mint) + "더 높은 전환율"
테이블 행 stagger 애니메이션 (x: -20 → 0)

## 7. src/components/Products.tsx (신규)
제목: "3가지 핵심 제품"
3개 카드 그리드 (hover 시 border-mint/20):

1. 🔌 성과 보상 플러그인 / "스트리밍만 하면 자동으로 보상"
   - Twitch / 치지직 / 숲 데이터 수집
   - 임팩트 모먼트 AI 감지
   - 맞춤 캠페인 자동 매칭
   - USDC 즉시 정산

2. 📊 스트리머 툴 플랫폼 / "데이터로 성장하는 스트리머"
   - 구독자 인사이트 대시보드
   - AI 하이라이트 자동 추출
   - 스트리머 랭킹 시스템
   - 성과 분석 리포트

3. 🛒 게임 마켓플레이스 / "Steam의 대안, 스트리머가 수익을 나눈다"
   - 라이브 커머스 게임 판매
   - 스트리머 백마진 5-15%
   - 수수료 15% (Steam 30%)
   - 블록체인 투명 정산

## 8. src/components/SteamComparison.tsx (신규)
배경 bg-dark2
제목: "Steam vs Enter.fun"

비교 테이블 (max-w-2xl):
헤더: 구분 | Steam | Enter.fun (Enter.fun 컬럼 text-mint)
행들:
- 게임 발견 | 알고리즘 추천 | 스트리머 라이브 큐레이션
- 스트리머 보상 | 없음 | 판매 수수료 5-15%
- 수수료 | 30% | 15%
- 투명성 | 블랙박스 | 블록체인 기반 투명

행 stagger 애니메이션

## 9. src/components/TechStack.tsx (신규)
제목: "기술 스택"
3개 카드 (text-center):
- ⛓️ 블록체인: 이더리움 L2 (Arbitrum), Account Abstraction, 소셜 로그인 지갑, USDC 정산
- 🔄 데이터 파이프라인: Apache Kafka / Flink, ClickHouse, 실시간 스트리밍 데이터, 이벤트 드리븐
- 🤖 AI / ML: XGBoost + LSTM, 임팩트 모먼트 감지, 하이라이트 자동 추출, 전환율 예측 모델

## 10. src/components/ExpansionVision.tsx (신규)
배경 bg-dark2
제목: "게임을 넘어, 모든 라이브 커머스"
설명: "Enter.fun은 게임에서 시작해 모든 라이브 커머스 인프라로 확장합니다"

카테고리 뱃지들 (flex-wrap justify-center):
- 🎮 게임 (active: border-mint/30 bg-mint/5 text-mint)
- 🃏 TCG
- 👗 패션/뷰티
- 📱 전자제품
- 🎵 K-POP
- 🎬 영화
- 🍜 음식

scale 0.8→1 stagger 애니메이션

## 11. src/components/WaitlistSection.tsx (신규)
id="waitlist"
glass-card rounded-3xl border border-purple/20 max-w-2xl mx-auto text-center

제목: "얼리 액세스 신청" (text-purple)
역할 버튼 3개: 🎙️ 스트리머 | 🎮 게임사 | 💰 투자자
선택된 버튼: border-purple bg-purple/10 text-purple
이메일 입력 + "신청하기" 버튼 (rounded-full flex)
성공 시: "🎉 신청 완료! 곧 연락드릴게요." (text-mint)
에러 시: "오류가 발생했습니다. 다시 시도해주세요." (text-red-400)

Supabase 저장 로직:
import { supabase } from "@/lib/supabase";
supabase가 null이면 localStorage fallback
supabase.from("waitlist").insert({ email, role })
role 매핑: 스트리머→streamer, 게임사→publisher, 투자자→investor

## 12. src/components/Footer.tsx (신규)
py-10 bg-dark border-t border-white/5 text-center
Enter.fun 로고 (Enter=민트)
"© 2025 Enter.fun — All rights reserved"
"모든 스트리머가 자신의 영향력만큼 보상받는 세상"

## 13. src/app/page.tsx (교체)
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketProblem from "@/components/MarketProblem";
import Multiplier25x from "@/components/Multiplier25x";
import Products from "@/components/Products";
import SteamComparison from "@/components/SteamComparison";
import TechStack from "@/components/TechStack";
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
      <TechStack />
      <ExpansionVision />
      <WaitlistSection />
      <Footer />
    </main>
  );
}

## 실행 순서
1. 기존 파일들 삭제
2. 위 순서대로 모든 파일 생성
3. npm run build 실행 → 에러 없는지 확인 (에러 있으면 수정)
4. git add . && git commit -m "feat: Enter.fun full rebuild — customer landing page" && git push origin main

완료 후 반드시 실행:
openclaw system event --text "Done: Enter.fun 완전 리빌드 완료, 빌드 성공, GitHub 푸시됨" --mode now
