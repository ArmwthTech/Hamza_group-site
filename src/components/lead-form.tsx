"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  formatRussianPhone,
  sanitizeName,
  sanitizeTelegramUsername,
  validateLead
} from "@/lib/lead-validation";
import { telegramUrl } from "@/lib/sample-data";
import type { LeadPayload } from "@/types";

const initial: LeadPayload = {
  name: "",
  phone: "",
  telegram_username: "",
  desired_car: "",
  budget: "",
  country_preference: "",
  source: "landing"
};

export function LeadForm({ source = "landing" }: { source?: string }) {
  const [form, setForm] = useState<LeadPayload>({ ...initial, source });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const validation = validateLead(form);

    if (!validation.ok) {
      setStatus("error");
      setMessage(validation.message);
      return;
    }

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validation.data)
    });
    const result = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Не удалось отправить заявку. Напишите HAMZA GROUP напрямую в Telegram.");
      return;
    }

    setStatus("success");
    setMessage(result.message || "Заявка отправлена. Менеджер свяжется и предложит варианты.");
    setForm({ ...initial, source });
  }

  const fieldClass = "grid gap-2";
  const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-muted";
  const inputClass =
    "min-h-12 rounded-md border border-line bg-[color:var(--field-bg)] px-4 text-sm text-[color:var(--text)] outline-none transition placeholder:text-muted/55 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={onSubmit} className="dark-card grid gap-4 rounded-lg p-5 md:p-6" aria-label="Форма заявки на подбор автомобиля">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={fieldClass}>
          <span className={labelClass}>Имя</span>
          <input
            className={inputClass}
            placeholder="Алексей"
            value={form.name}
            autoComplete="name"
            required
            onChange={(event) => setForm({ ...form, name: sanitizeName(event.target.value) })}
          />
        </label>
        <label className={fieldClass}>
          <span className={labelClass}>Телефон</span>
          <input
            className={inputClass}
            placeholder="+7 900 000-00-00"
            value={form.phone}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={16}
            pattern="^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$"
            required
            onChange={(event) => setForm({ ...form, phone: formatRussianPhone(event.target.value) })}
          />
        </label>
      </div>
      <label className={fieldClass}>
        <span className={labelClass}>Telegram username</span>
        <input
          className={inputClass}
          placeholder="@username"
          value={form.telegram_username}
          autoComplete="off"
          inputMode="text"
          maxLength={33}
          onChange={(event) =>
            setForm({ ...form, telegram_username: sanitizeTelegramUsername(event.target.value) })
          }
        />
      </label>
      <label className={fieldClass}>
        <span className={labelClass}>Желаемый автомобиль</span>
        <input
          className={inputClass}
          placeholder="Toyota Camry, Kia K5 или аналог"
          value={form.desired_car}
          autoComplete="off"
          onChange={(event) => setForm({ ...form, desired_car: event.target.value })}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={fieldClass}>
          <span className={labelClass}>Бюджет</span>
          <input
            className={inputClass}
            placeholder="от 1.5 млн ₽"
            value={form.budget}
            inputMode="numeric"
            onChange={(event) => setForm({ ...form, budget: event.target.value })}
          />
        </label>
        <label className={fieldClass}>
          <span className={labelClass}>Страна <span className="text-muted/60">(необязательно)</span></span>
          <select
            className={inputClass}
            value={form.country_preference}
            onChange={(event) =>
              setForm({
                ...form,
                country_preference: event.target.value as LeadPayload["country_preference"]
              })
            }
          >
            <option value="">Не указывать</option>
            <option>Китай</option>
            <option>Корея</option>
            <option>Не знаю</option>
          </select>
        </label>
      </div>
      <button
        disabled={status === "loading"}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-accent bg-accent px-5 text-sm font-bold text-white shadow-red transition hover:-translate-y-0.5 hover:bg-[#ff1022] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        Получить подборку
      </button>
      {message && (
        <div className="flex items-start gap-2 rounded-md border border-line bg-[color:var(--panel-soft)] p-3 text-sm text-muted">
          <CheckCircle2 size={18} className={status === "error" ? "text-accent" : "text-[color:var(--text)]"} />
          <span>
            {message}{" "}
            <a className="font-bold text-[color:var(--text)] underline decoration-accent underline-offset-4" href={telegramUrl}>
              Написать в Telegram
            </a>
          </span>
        </div>
      )}
    </form>
  );
}
