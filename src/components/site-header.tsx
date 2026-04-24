import { MessageCircle, Phone } from "lucide-react";
import { LeadModalButton } from "@/components/lead-modal-button";
import { Logo } from "@/components/logo";

const nav = [
  { label: "О компании", href: "/#process" },
  { label: "Услуги", href: "/#services" },
  { label: "Авто в наличии", href: "/catalog" },
  { label: "Калькулятор", href: "/#calculator" },
  { label: "Кейсы", href: "/#cases" },
  { label: "FAQ", href: "/#faq" },
  { label: "Контакты", href: "/#contacts" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[#090A0D]/95 backdrop-blur-xl">
      <div className="section-shell flex h-[78px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-wide text-white/72 xl:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden text-right lg:block">
          <a href="tel:88007004070" className="font-heading text-lg font-black leading-none">
            8 800 700-40-70
          </a>
          <div className="mt-1 text-[11px] text-muted">Ежедневно 09:00 - 20:00</div>
        </div>
        <LeadModalButton className="h-11 min-h-11 w-11 gap-2 px-0 sm:h-12 sm:w-auto sm:px-6" source="header" icon="none">
          <MessageCircle size={17} className="sm:hidden" />
          <Phone size={17} className="hidden sm:block" />
          <span className="sr-only sm:not-sr-only">Получить расчёт</span>
        </LeadModalButton>
      </div>
    </header>
  );
}
