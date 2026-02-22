"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { supabase, isSupabaseReady as supabaseReady } from "@/lib/supabase";

interface WaitlistSectionProps {
  language: "ko" | "en";
}

const STORAGE_KEY = "enter-fun-waitlist";

const getRoleValue = (role: string) => {
  if (role === "스트리머" || role === "Streamer") return "streamer";
  if (role === "게임사" || role === "Game Dev") return "gamedev";
  if (role === "투자자" || role === "Investor") return "investor";
  return role.toLowerCase();
};

export default function WaitlistSection({ language }: WaitlistSectionProps) {
  const title = language === "ko" ? "얼리 액세스 신청" : "Join Early Access";
  const subtitle =
    language === "ko"
      ? "지금 신청하면 베타 플러그인 무료 제공 + 첫 달 보상 2배"
      : "Apply now for a free beta plugin + 2x first-month rewards";

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("스트리머");
  const [notice, setNotice] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isSupabaseReady = supabaseReady;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice("");
    setSuccess(false);

    if (!validateEmail(email.trim())) {
      setSuccess(false);
      setNotice(
        language === "ko" ? "올바른 이메일을 입력해주세요." : "Please enter a valid email.",
      );
      setIsSubmitting(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const mappedRole = getRoleValue(role);

    const payload = { email: normalizedEmail, role: mappedRole };
    const localPayload = {
      email: normalizedEmail,
      role: mappedRole,
      language,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseReady) {
      const { error } = await supabase!.from("waitlist").insert(payload);

      if (error) {
        const duplicate = error.code === "23505";
        setNotice(
          duplicate
            ? "이미 등록된 이메일입니다 / Already registered"
            : language === "ko"
              ? "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
              : "Something went wrong while submitting. Please try again.",
        );
        setSuccess(false);
        setIsSubmitting(false);
        return;
      }
      setSuccess(true);
      setNotice(language === "ko" ? "신청 완료! 곧 연락드릴게요 🎮" : "Application sent! We will contact you soon 🎮");
      setEmail("");
      setIsSubmitting(false);
      return;
    }

    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const parsed = stored ? (JSON.parse(stored) as Array<{ email: string }>) : [];
    const exists = parsed.some((item) => item.email === normalizedEmail);

    if (exists) {
      setNotice("이미 등록된 이메일입니다 / Already registered");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }

    const next = [...parsed, localPayload];

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    setSuccess(true);
    setNotice(language === "ko" ? "신청 완료! 곧 연락드릴게요 🎮" : "Application sent! We will contact you soon 🎮");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true, amount: 0.2 }}
      className="section-fade bg-[#141a2d] px-4 py-20"
      id="waitlist"
    >
      <div className="container mx-auto">
        <h2 className="section-title font-bold text-white">{title}</h2>
        <p className="mt-2 text-gray-300">{subtitle}</p>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-white/10 bg-[#18233f] p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-3 md:grid-cols-[1fr_220px_140px]">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={language === "ko" ? "이메일 주소" : "Email address"}
              className="rounded-full border border-white/20 bg-dark px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-mint"
            />
            <select
              aria-label="Role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-full border border-white/20 bg-dark px-4 py-3 text-white outline-none focus:border-mint"
            >
              <option value="스트리머">{language === "ko" ? "스트리머" : "Streamer"}</option>
              <option value="게임사">{language === "ko" ? "게임사" : "Game Dev"}</option>
              <option value="투자자">{language === "ko" ? "투자자" : "Investor"}</option>
            </select>
            <button
              type="submit"
              className="rounded-full bg-mint px-4 py-3 font-semibold text-dark transition hover:brightness-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? "처리 중... / Submitting..." : language === "ko" ? "제출" : "Submit"}
            </button>
          </div>

          {notice ? (
            <p
              className={`mt-4 text-sm ${
                success ? "text-mint" : "text-white"
              }`}
            >
              {notice}
            </p>
          ) : null}
        </motion.form>
      </div>
    </motion.section>
  );
}
