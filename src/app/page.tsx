import {
  CalculatorSection,
  CasesSection,
  FaqSection,
  FinalCta,
  faqItems,
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
  const siteUrl = "https://hamzagroup-auto-import.ru";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "HAMZA GROUP Auto Import",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/images/hamza-brand-board.png`,
    description: "Подбор, выкуп, доставка и растаможка автомобилей из Китая и Кореи под ключ.",
    areaServed: "Russia",
    sameAs: [
      "https://t.me/hamza_group77",
      "https://youtube.com/@hamza_group77?si=5p1YCJOfyG_MkdWG",
      "https://max.ru/join/zJHbjfKO1napfiTO8G4eN7KWHofAqZbHPKoK-yfLvtk",
      "https://vk.ru/hamzagroup77"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+7-800-700-40-70",
      availableLanguage: "Russian",
      url: "https://t.me/hamza_group77"
    }
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
