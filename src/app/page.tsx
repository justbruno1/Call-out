import { HeroSection } from "@/components/sections/HeroSection";
import {
  ProblemSection,
  SolutionSection,
  GenLayerSection,
  WorkflowSection,
  DefenseWindowSection,
} from "@/components/sections/ContentSections";
import {
  MetricsSection,
  DocketPreviewSection,
  WalletPreviewSection,
  FaucetSection,
  FinalCTASection,
} from "@/components/sections/ExtraSections";
import { FAQSection } from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <GenLayerSection />
      <WorkflowSection />
      <DefenseWindowSection />
      <MetricsSection />
      <DocketPreviewSection />
      <WalletPreviewSection />
      <FaucetSection />
      <FinalCTASection />
      <FAQSection />
    </>
  );
}
