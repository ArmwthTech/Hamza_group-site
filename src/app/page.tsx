import {
  CalculatorSection,
  CasesSection,
  FaqSection,
  FinalCta,
  HeroSection,
  PopularCars,
  ProcessSection,
  ServicesSection,
  TrustBlock
} from "@/components/landing-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedCars } from "@/lib/cars";

export default async function Home() {
  const cars = await getPublishedCars(6);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustBlock />
        <PopularCars cars={cars} />
        <ProcessSection />
        <ServicesSection />
        <CalculatorSection />
        <CasesSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
