"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { type FormEvent } from "react";
import { useRef, useState } from "react";
import { isSupabaseReady, supabase } from "@/lib/supabase";

const TOTAL_SLOTS = 1000;
const FILLED_SLOTS = 320;
const FILLED_PCT = Math.round((FILLED_SLOTS / TOTAL_SLOTS) * 100);

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const submitToLocalStorage = (nextEmail: string) => {
    const key = "waitlist-fallback";
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    const nextList = Array.isArray(parsed)
      ? parsed.filter((item: string) => typeof item === "string")
      : [];
    if (nextList.includes(nextEmail)) { setStatus("duplicate"); return false; }
    nextList.push(nextEmail);
    localStorage.setItem(key, JSON.stringify(nextList));
    setStatus("success");
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail) { setStatus("error"); return; }
    setLoading(true);
    setStatus("idle");
    try {
      if (isSupabaseReady) {
        const { error } = await supabase!.from("waitlist").insert({ email: nextEmail, role: "streamer" });
        if (error) {
          if (error.code === "23505") setStatus("duplicate");
          else setStatus("error");
        } else {
          setStatus("success");
          setEmail("");
        }
      } else if (submitToLocalStorage(nextEmail)) {
        setEmail("");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-24 md:py-32"
      ref={sectionRef}
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #08081a 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,170,0.12) 0%, rgba(123,97,255,0.06) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          className="mx-auto max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <span className="section-badge">스트리머 얼리 액세스</span>
            <h2 className="mt-4 section-title text-white">
              먼저 시작하는 사람이
              <br />
              <span className="gradient-text">먼저 법니다.</span>
            </h2>
            <p className="mt-4 text-base text-gray">
              얼리 액세스 스트리머:{" "}
              <span className="font-semibold text-white">첫 3개월 수수료 0%</span>
              , 캠페인 우선 매칭.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-7">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-white/40">얼리 액세스 신청 현황</span>
              <span className="font-semibold text-mint">{FILLED_SLOTS} / {TOTAL_SLOTS}자리</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-mint to-purple"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${FILLED_PCT}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              />
            </div>
            <p className="mt-1.5 text-right text-[11px] font-semibold text-red-400">
              {TOTAL_SLOTS - FILLED_SLOTS}자리 남음
            </p>
          </div>

          {/* Perks */}
          <div className="mb-7 grid grid-cols-3 gap-3">
            {[
              { icon: "💸", label: "수수료 0%", sub: "첫 3개월" },
              { icon: "🎯", label: "우선 매칭", sub: "캠페인 우선권" },
              { icon: "⚡", label: "즉시 정산", sub: "USDC 자동" },
            ].map((perk) => (
              <div
                key={perk.label}
                className="rounded-xl border border-mint/10 bg-mint/[0.04] px-3 py-3 text-center"
              >
                <p className="text-xl">{perk.icon}</p>
                <p className="mt-1 text-xs font-bold text-white">{perk.label}</p>
                <p className="text-[10px] text-gray">{perk.sub}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="내 이메일 주소"
              type="email"
              required
              className="input flex-1 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary shrink-0"
            >
              {loading ? "처리 중…" : "신청하기 →"}
            </button>
          </form>

          <AnimatePresence>
            {status !== "idle" && (
              <motion.p
                className={`mt-3 text-center text-sm ${
                  status === "success" ? "text-mint" :
                  status === "duplicate" ? "text-yellow-400" : "text-red-400"
                }`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status === "success" && "🎉 신청 완료! 런칭 전 가장 먼저 연락드릴게요."}
                {status === "duplicate" && "이미 등록된 이메일입니다."}
                {status === "error" && "오류가 발생했습니다. 다시 시도해주세요."}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-5 text-center text-xs text-white/25">
            이미{" "}
            <span className="font-semibold text-white/50">{FILLED_SLOTS}명의 스트리머</span>가
            신청했습니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
