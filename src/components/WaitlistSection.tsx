"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { type FormEvent } from "react";
import { useRef, useState } from "react";
import CountUp from "@/components/CountUp";
import { isSupabaseReady, supabase } from "@/lib/supabase";

type Role = "streamer" | "game" | "investor";

const roles: Array<{ value: Role; label: string }> = [
  { value: "streamer", label: "🎙️ 스트리머" },
  { value: "game", label: "🎮 게임사" },
  { value: "investor", label: "💰 투자자" },
];

const roleMessages: Record<Role, string> = {
  streamer: "평균 월 $500+ 추가 수익의 기회",
  game: "ROI 25배 향상, 성과 기반 과금",
  investor: "$18B 시장, 첫 번째 무버 어드밴티지",
};

export default function WaitlistSection() {
  const [role, setRole] = useState<Role>("streamer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const submitToLocalStorage = (nextEmail: string) => {
    const key = "waitlist-fallback";
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    const nextList = Array.isArray(parsed) ? parsed.filter((item: string) => typeof item === "string") : [];

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

    if (!nextEmail) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      if (isSupabaseReady) {
        const { error } = await supabase!.from("waitlist").insert({ email: nextEmail, role });

        if (error) {
          if (error.code === "23505") {
            setStatus("duplicate");
          } else {
            setStatus("error");
          }
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
      className="relative overflow-hidden bg-dark py-24"
      ref={sectionRef}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-mint/20 opacity-40" />
      </div>
      <div className="container px-4 relative z-10">
        <motion.div
          className="mx-auto max-w-2xl rounded-3xl border border-mint/30 p-10 glass-card md:p-14 bg-gradient-to-br from-dark/80 to-dark/30"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-badge">⏱ 지금 합류하면 가장 먼저 시작</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            지금 합류하면, 런칭 후 가장 먼저 시작합니다.
          </h2>
          <p className="mt-4 text-gray">
            얼리 액세스 멤버에게는 첫 3개월 수수료 0% 혜택이 제공됩니다.
          </p>
          <p className="mt-2 text-sm text-red-300 font-semibold">
            🔥 얼리 액세스는 1,000명까지만 받습니다
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {roles.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRole(item.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  role === item.value
                    ? "border-mint bg-mint/10 text-mint"
                    : "border-white/10 text-gray"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해주세요"
              type="email"
              required
              className="w-full flex-1 rounded-full bg-dark border border-white/10 px-5 py-3 text-white outline-none transition focus:border-mint"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-mint px-8 py-3 font-bold text-white disabled:opacity-60"
            >
              신청하기
            </button>
          </form>
          <AnimatePresence mode="wait">
            <motion.p
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 text-sm text-mint"
            >
              {roleMessages[role]}
            </motion.p>
          </AnimatePresence>
          <p
            className={`mt-4 min-h-6 text-sm ${
              status === "success"
                ? "text-mint"
                : status === "duplicate"
                ? "text-white"
                : status === "error"
                ? "text-white"
                : "text-transparent"
            }`}
          >
            {status === "success" && "🎉 신청 완료! 곧 연락드릴게요."}
            {status === "duplicate" && "이미 등록된 이메일입니다"}
            {status === "error" && "오류가 발생했습니다"}
          </p>
          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="text-xs text-mint">🔥 지금까지 500+명이 신청했습니다</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray">
              <p>
                <CountUp end={500} />+ 명
              </p>
              <p>🎮 스트리머 320명</p>
              <p>🏢 게임사 45개</p>
              <p>💰 투자자 135명</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
