"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { telegramUrl } from "@/lib/sample-data";
import type { LeadPayload } from "@/types";

const initial: LeadPayload = {
  name: "",
  phone: "",
  desired_car: "",
  budget: "",
  country_preference: "Не знаю",
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

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      setMessage("Укажите имя и телефон, чтобы менеджер мог связаться.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setStatus("success");
      setMessage("Заявка подготовлена. Для сохранения подключите Supabase, либо напишите HAMZA GROUP в Telegram.");
      return;
    }

    const { error } = await supabase.from("leads").insert(form);

    if (error) {
      setStatus("error");
      setMessage("Не удалось сохранить заявку. Напишите HAMZA GROUP напрямую в Telegram.");
      return;
    }

    setStatus("success");
    setMessage("Заявка отправлена. Менеджер свяжется и предложит варианты.");
    setForm({ ...initial, source });
  }

  const fieldClass = "grid gap-2";
  const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-white/62";
  const inputClass =
    "min-h-12 rounded-md border border-line bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-muted/55 focus:border-accent focus:ring-2 focus:ring-accent/20";

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
            onChange={(event) => setForm({ ...form, name: event.target.value })}
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
            required
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </label>
      </div>
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
          <span className={labelClass}>Страна</span>
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
        <div className="flex items-start gap-2 rounded-md border border-line bg-white/[0.03] p-3 text-sm text-muted">
          <CheckCircle2 size={18} className={status === "error" ? "text-accent" : "text-white"} />
          <span>
            {message}{" "}
            <a className="font-bold text-white underline decoration-accent underline-offset-4" href={telegramUrl}>
              Написать в Telegram
            </a>
          </span>
        </div>
      )}
    </form>
  );
}
