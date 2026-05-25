import { BenefitsSection } from "@/components/landing/benefits-section";
import { CTASection } from "@/components/landing/cta-section";
import { FourSkillsSection } from "@/components/landing/four-skills-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LevelsSection } from "@/components/landing/levels-section";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main>
        <HeroSection />
        <FourSkillsSection />
        <LevelsSection />
        <BenefitsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  );
}
