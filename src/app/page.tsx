import {
  CasesSection,
  FaqSection,
  FinalCta,
  HeroSection,
  ReferenceDashboard
} from "@/components/landing-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedCars } from "@/lib/cars";

export default async function Home() {
  const cars = await getPublishedCars(5);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ReferenceDashboard cars={cars} />
        <CasesSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
