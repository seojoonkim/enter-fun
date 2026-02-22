"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SimulatorSection from "@/components/SimulatorSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [language, setLanguage] = useState<"ko" | "en">("ko");

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="relative">
        <HeroSection language={language} />
        <ProblemSection language={language} />
        <SolutionSection language={language} />
        <SimulatorSection language={language} />
        <WaitlistSection language={language} />
        <Footer language={language} />
      </main>
    </div>
  );
}
