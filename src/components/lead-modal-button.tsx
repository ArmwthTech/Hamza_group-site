"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Phone, X } from "lucide-react";
import { clsx } from "clsx";
import { LeadForm } from "@/components/lead-form";

type LeadModalButtonProps = {
  children: ReactNode;
  className?: string;
  source?: string;
  icon?: "phone" | "none";
};

export function LeadModalButton({
  children,
  className,
  source = "header",
  icon = "phone"
}: LeadModalButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const modal =
    open && typeof document !== "undefined" ? (
      <div
        className="modal-backdrop fixed inset-0 z-[100] grid min-h-svh place-items-center overflow-y-auto bg-[color:var(--modal-scrim)] p-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="modal-panel relative my-auto w-full max-w-xl rounded-lg border border-line bg-[color:var(--panel)] p-4 shadow-panel sm:p-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-line bg-[color:var(--panel-soft)] text-[color:var(--muted)] transition hover:border-accent hover:text-[color:var(--text)]"
            aria-label="Закрыть форму"
          >
            <X size={18} />
          </button>
          <div className="mb-5 pr-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Заявка на подбор
            </p>
            <h2 id="lead-modal-title" className="mt-2 font-heading text-2xl font-black">
              Получить расчёт автомобиля
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Оставьте контакты — менеджер HAMZA GROUP свяжется и уточнит бюджет,
              Telegram и желаемую модель.
            </p>
          </div>
          <LeadForm source={source} />
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-accent bg-accent px-5 text-sm font-bold text-white shadow-red transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff1022] focus:outline-none focus:ring-2 focus:ring-accent/50",
          className
        )}
      >
        {icon === "phone" && <Phone size={17} />}
        {children}
      </button>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
