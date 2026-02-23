"use client";

import { motion, useInView } from "framer-motion";
import { type FormEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { isSupabaseReady, supabase } from "@/lib/supabase";

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
    if (nextList.includes(nextEmail)) {
      setStatus("duplicate");
      return false;
    }
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
      style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a18 100%)" }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
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
          {/* Header */}
          <div className="text-center mb-8">
            <span className="section-badge">스트리머 얼리 액세스</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
              지금 신청하면,
              <br />
              <span className="gradient-text">가장 먼저 시작합니다.</span>
            </h2>
            <p className="mt-4 text-base text-gray">
              얼리 액세스 스트리머에게는{" "}
              <span className="font-semibold text-white">첫 3개월 수수료 0%</span>와{" "}
              <span className="font-semibold text-white">우선 캠페인 매칭</span> 혜택이 제공됩니다.
            </p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-red-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
              스트리머 얼리 액세스 1,000자리 한정
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
                className="rounded-xl border border-mint/10 bg-mint/5 px-3 py-3 text-center"
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
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm transition focus:border-mint focus:ring-1 focus:ring-mint/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-full bg-mint px-7 py-3.5 text-sm font-bold text-dark shadow-[0_0_20px_rgba(0,212,170,0.25)] transition hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,212,170,0.4)] disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? "처리 중…" : "신청하기 →"}
            </button>
          </form>

          {/* Status message */}
          <AnimatePresence>
            {status !== "idle" && (
              <motion.p
                className={`mt-3 text-center text-sm ${
                  status === "success"
                    ? "text-mint"
                    : status === "duplicate"
                    ? "text-yellow-400"
                    : "text-red-400"
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

          {/* Social proof */}
          <p className="mt-6 text-center text-xs text-white/30">
            이미{" "}
            <span className="font-semibold text-white/60">320명의 스트리머</span>가 신청했습니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
