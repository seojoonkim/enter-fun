"use client";

import { FormEvent, useState } from "react";
import { isSupabaseReady, supabase } from "@/lib/supabase";

type Role = "streamer" | "game" | "investor";

const roles: Array<{ value: Role; label: string }> = [
  { value: "streamer", label: "🎙️ 스트리머" },
  { value: "game", label: "🎮 게임사" },
  { value: "investor", label: "💰 투자자" },
];

export default function WaitlistSection() {
  const [role, setRole] = useState<Role>("streamer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [loading, setLoading] = useState(false);

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
    <section id="waitlist" className="bg-dark py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl rounded-3xl border border-purple/20 p-10 text-center glass-card md:p-14">
          <h2 className="section-title text-3xl font-bold text-purple">얼리 액세스 신청</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {roles.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRole(item.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  role === item.value
                    ? "border-purple bg-purple/10 text-purple"
                    : "border-white/10 text-gray"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 md:flex-row"
          >
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해주세요"
              type="email"
              required
              className="w-full flex-1 rounded-full bg-dark border border-white/10 px-5 py-3 text-white outline-none transition focus:border-purple"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-purple px-8 py-3 font-bold text-white disabled:opacity-60"
            >
              신청하기
            </button>
          </form>
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
        </div>
      </div>
    </section>
  );
}
