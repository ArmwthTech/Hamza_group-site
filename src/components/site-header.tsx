"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
        <LeadModalButton className="h-11 min-h-11 w-11 gap-2 px-0 max-sm:!hidden sm:h-12 sm:w-auto sm:px-6" source="header" icon="none">
          <MessageCircle size={17} className="sm:hidden" />
          <Phone size={17} className="hidden sm:block" />
          <span className="sr-only sm:not-sr-only">Получить расчёт</span>
        </LeadModalButton>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-line bg-white/[0.03] text-white transition hover:border-accent hover:bg-accent/10 xl:hidden"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-x-0 top-[78px] z-50 border-b border-line bg-[#090A0D]/98 px-4 py-4 shadow-panel backdrop-blur-xl xl:hidden"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setMenuOpen(false);
          }}
        >
          <nav className="mx-auto grid max-w-2xl gap-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-line bg-white/[0.03] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition hover:border-accent hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 grid gap-3 rounded-md border border-line bg-white/[0.03] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <a href="tel:88007004070" className="font-heading text-lg font-black">
                  8 800 700-40-70
                </a>
                <p className="mt-1 text-xs text-muted">Ежедневно 09:00 - 20:00</p>
              </div>
              <LeadModalButton className="w-full sm:w-auto" source="mobile-menu" icon="phone">
                Получить расчёт
              </LeadModalButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
