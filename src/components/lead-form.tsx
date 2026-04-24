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

  const inputClass =
    "min-h-12 rounded-md border border-line bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={onSubmit} className="dark-card grid gap-4 rounded-lg p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Имя"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Телефон"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
      </div>
      <input
        className={inputClass}
        placeholder="Желаемый автомобиль"
        value={form.desired_car}
        onChange={(event) => setForm({ ...form, desired_car: event.target.value })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Бюджет"
          value={form.budget}
          onChange={(event) => setForm({ ...form, budget: event.target.value })}
        />
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
