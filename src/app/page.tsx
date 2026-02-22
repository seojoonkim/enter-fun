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
