import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketProblem from "@/components/MarketProblem";
import Multiplier25x from "@/components/Multiplier25x";
import SteamComparison from "@/components/SteamComparison";
import HowItWorks from "@/components/HowItWorks";
import Products from "@/components/Products";
import SocialProof from "@/components/SocialProof";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarketProblem />
      <Multiplier25x />
      <SteamComparison />
      <HowItWorks />
      <Products />
      <SocialProof />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
