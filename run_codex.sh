#!/bin/bash
cd /Users/gimseojun/enter-fun
codex exec --full-auto "
프로젝트: /Users/gimseojun/enter-fun/
Next.js App Router + TypeScript + Tailwind CSS 4 + Framer Motion

중요 규칙:
- 모든 컴포넌트에 use client 선언 필수
- Tailwind CSS 4 사용 중 - globals.css에서 bg-dark, text-mint, bg-purple, text-gray 정의됨
- framer-motion: motion, useInView import
- npm run build 에러 없어야 함
- globals.css, layout.tsx, tailwind.config.ts, lib/supabase.ts 절대 수정 금지

STEP 1: 기존 파일 삭제
rm -f src/components/ProblemSection.tsx src/components/SolutionSection.tsx src/components/SimulatorSection.tsx

STEP 2: src/components/CountUp.tsx 생성
숫자 카운트업 컴포넌트. useInView(once:true, margin:-100px)로 뷰포트 진입 시 0에서 end값까지 easeOutCubic으로 duration초 동안 카운트업. interface: end(number), duration(default 2), suffix(string), prefix(string).

STEP 3: src/components/Navbar.tsx 교체
고정 네비. scrollY>50 이면 bg-dark/80 backdrop-blur-md border-b border-white/5 표시.
좌측 로고: Enter(text-mint).fun(text-white) 폰트 볼드
우측 버튼: 얼리 액세스 -> #waitlist 스크롤, bg-purple rounded-full px-5 py-2

STEP 4: src/components/HeroSection.tsx 완전 교체
배경: min-h-screen hero-gradient (globals.css에 있음)
파티클: 15개 div 생성, className=particle, 랜덤 left/bottom/animationDuration/animationDelay
Framer Motion fade-in: 헤드라인 y:30->0 opacity:0->1 duration:0.8, 버튼 delay:0.4

헤드라인:
<h1>스트리밍하면<br/>
<span className='text-transparent bg-clip-text bg-gradient-to-r from-mint to-purple'>보상받는 세상</span>
</h1>

서브: 모든 스트리머가 자신의 영향력만큼 보상받는 세상을 만듭니다.
성과 기반 자동 보상 · 소형 스트리머 25배 전환율 · USDC 즉시 정산

버튼:
- 얼리 액세스 신청 → (bg-purple rounded-full) -> #waitlist 스크롤
- 자세히 알아보기 (border border-white/20 rounded-full) -> #problem 스크롤

STEP 5: src/components/MarketProblem.tsx 신규 생성
id=problem, 배경 bg-dark
제목: 180억달러 시장의 해결되지 않은 문제

CountUp 통계 3개 (grid-cols-3 glass-card):
- end=180 suffix=억달러 label=게임 스트리밍 시장 (2024)
- end=67 suffix=% label=스트리머 보고 게임 구매하는 게이머
- end=53 suffix=% label=수익 0원인 스트리머

문제 카드 3개:
- 아이콘 🎮 제목:스트리머 보상 없음 설명:게이머 67%가 스트리머 보고 게임을 사지만 스트리머 53%는 수익 0원
- 아이콘 📉 제목:스폰서 ROI 최악 설명:게임사 스폰서 스트리밍 ROI 매우 부정적 — Northwestern University 2024
- 아이콘 💸 제목:비효율적 마케팅 설명:대형 1명 $10,000 vs 소형 100명 $10,000 — 같은 비용 25배 전환율 차이

useInView stagger 애니메이션 (delay i*0.15)

STEP 6: src/components/Multiplier25x.tsx 신규 생성
배경 bg-dark2
제목: 소형 스트리머 100명 = 25배 전환율
부제: 동일 비용 $10,000 투자 시 성과 비교

비교 테이블 (max-w-3xl mx-auto, overflow-x-auto):
헤더: 지표 | 대형 1명 ($10,000) | 소형 100명 ($100x100)
소형 100명 헤더 text-mint font-bold

데이터 행들 (소형 컬럼 text-mint, 마지막 행 font-bold):
총 시청자 | 50,000명 | 50,000명
평균 시청시간 | 8분 | 25분
채팅 참여율 | 2% | 35%
게임 언급 반응률 | 0.5% | 12%
예상 전환율 | 0.1% | 2.5%
예상 구매자 | 50명 | 1,250명

하단 배지: text-5xl font-extrabold text-mint 25x + text-gray 더 높은 전환율
행 stagger x:-20->0 delay:0.2+i*0.1

STEP 7: src/components/Products.tsx 신규 생성
배경 bg-dark
제목: 3가지 핵심 제품

grid-cols-1 md:grid-cols-3 gap-6, 각 카드 glass-card rounded-2xl p-7 border border-white/5 hover:border-mint/20

카드 1: 🔌 성과 보상 플러그인 / 스트리밍만 하면 자동으로 보상
기능: Twitch/치지직/숲 데이터 수집, 임팩트 모먼트 AI 감지, 맞춤 캠페인 자동 매칭, USDC 즉시 정산

카드 2: 📊 스트리머 툴 플랫폼 / 데이터로 성장하는 스트리머
기능: 구독자 인사이트 대시보드, AI 하이라이트 자동 추출, 스트리머 랭킹 시스템, 성과 분석 리포트

카드 3: 🛒 게임 마켓플레이스 / Steam의 대안 스트리머가 수익을 나눈다
기능: 라이브 커머스 게임 판매, 스트리머 백마진 5-15%, 수수료 15% (Steam 30%), 블록체인 투명 정산

y:40->0 stagger delay i*0.2

STEP 8: src/components/SteamComparison.tsx 신규 생성
배경 bg-dark2
제목: Steam vs Enter.fun

테이블 max-w-2xl mx-auto:
헤더: 구분 | Steam(text-white/50) | Enter.fun(text-mint font-bold)
게임 발견 | 알고리즘 추천 | 스트리머 라이브 큐레이션
스트리머 보상 | 없음 | 판매 수수료 5-15%
수수료 | 30% | 15%
투명성 | 블랙박스 | 블록체인 기반 투명

Enter.fun 컬럼 text-mint font-semibold
행 stagger x:-20->0

STEP 9: src/components/TechStack.tsx 신규 생성
배경 bg-dark
제목: 기술 스택
grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center glass-card

카드 1: ⛓️ 블록체인
이더리움 L2 (Arbitrum) / Account Abstraction / 소셜 로그인 지갑 / USDC 정산

카드 2: 🔄 데이터 파이프라인
Apache Kafka / Flink / ClickHouse / 실시간 스트리밍 데이터 / 이벤트 드리븐

카드 3: 🤖 AI / ML
XGBoost + LSTM / 임팩트 모먼트 감지 / 하이라이트 자동 추출 / 전환율 예측 모델

y:30->0 stagger

STEP 10: src/components/ExpansionVision.tsx 신규 생성
배경 bg-dark2
제목: 게임을 넘어 모든 라이브 커머스
설명: Enter.fun은 게임에서 시작해 모든 라이브 커머스 인프라로 확장합니다

카테고리 뱃지 flex-wrap justify-center gap-4:
🎮 게임 (active: border-mint/30 bg-mint/5 text-mint)
🃏 TCG
👗 패션/뷰티
📱 전자제품
🎵 K-POP
🎬 영화
🍜 음식

scale 0.8->1 stagger delay 0.3+i*0.08

STEP 11: src/components/WaitlistSection.tsx 완전 교체
id=waitlist 배경 bg-dark

glass-card rounded-3xl p-10 md:p-14 border border-purple/20 max-w-2xl mx-auto text-center

제목: 얼리 액세스 신청 (text-purple)
역할 버튼 3개: 🎙️ 스트리머 | 🎮 게임사 | 💰 투자자
선택: border-purple bg-purple/10 text-purple, 미선택: border-white/10 text-gray
기본값: streamer

이메일 input + 신청하기 버튼 (flex gap-3):
input: bg-dark border border-white/10 rounded-full px-5 py-3 focus:border-purple
button: bg-purple rounded-full px-8 py-3 font-bold

Supabase 연동:
import { supabase, isSupabaseReady } from '@/lib/supabase'
isSupabaseReady 이면 supabase!.from('waitlist').insert({ email, role })
아니면 localStorage fallback
성공: 🎉 신청 완료! 곧 연락드릴게요. (text-mint)
에러: duplicate(code 23505) -> 이미 등록된 이메일입니다 / 기타 -> 오류가 발생했습니다

STEP 12: src/components/Footer.tsx 완전 교체
py-10 bg-dark border-t border-white/5 text-center
Enter.fun 로고 (Enter=text-mint)
© 2025 Enter.fun — All rights reserved
모든 스트리머가 자신의 영향력만큼 보상받는 세상

STEP 13: src/app/page.tsx 완전 교체
import Navbar, HeroSection, MarketProblem, Multiplier25x, Products, SteamComparison, TechStack, ExpansionVision, WaitlistSection, Footer
from 각 컴포넌트 경로

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
  )
}

STEP 14: npm run build 실행 -> 에러 있으면 수정 후 재빌드

STEP 15: git add . && git commit -m 'feat: Enter.fun full rebuild — customer landing page' && git push origin main

완료 후 반드시 실행:
openclaw system event --text 'Done: Enter.fun 완전 리빌드 완료 빌드 성공 GitHub 푸시됨' --mode now
"
