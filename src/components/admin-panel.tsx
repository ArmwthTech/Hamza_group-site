"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { seedCars } from "@/lib/sample-data";
import type { Car, CarStatus, Country } from "@/types";

type DraftCar = Omit<Car, "id"> & { id?: string };

const emptyCar: DraftCar = {
  title: "",
  country: "Китай",
  year: new Date().getFullYear(),
  price_from: 1500000,
  image_url: "",
  description: "",
  mileage: "",
  engine: "",
  status: "draft"
};

export function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(!isSupabaseConfigured);
  const [cars, setCars] = useState<Car[]>(seedCars);
  const [draft, setDraft] = useState<DraftCar>(emptyCar);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const publishedCount = useMemo(() => cars.filter((car) => car.status === "published").length, [cars]);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSessionReady(Boolean(data.session));
      if (data.session) void loadCars();
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionReady(Boolean(session));
      if (session) void loadCars();
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function loadCars() {
    if (!supabase) return;
    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (!error && data) setCars(data as Car[]);
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    setMessage(error ? "Не удалось войти. Проверьте email и пароль." : "Вход выполнен.");
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSessionReady(false);
  }

  async function saveCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...draft,
      image_url: draft.image_url || "/images/hamza-brand-board.png"
    };

    if (!supabase) {
      const nextCar = { ...payload, id: draft.id ?? crypto.randomUUID(), created_at: new Date().toISOString() } as Car;
      setCars((current) => [nextCar, ...current.filter((car) => car.id !== nextCar.id)]);
      setDraft(emptyCar);
      setLoading(false);
      setMessage("Демо-режим: авто добавлено только в локальный список. Подключите Supabase для сохранения.");
      return;
    }

    const { error } = draft.id
      ? await supabase.from("cars").update(payload).eq("id", draft.id)
      : await supabase.from("cars").insert(payload);

    if (error) {
      setMessage("Не удалось сохранить авто. Проверьте права Supabase.");
    } else {
      setMessage("Авто сохранено.");
      setDraft(emptyCar);
      await loadCars();
    }
    setLoading(false);
  }

  async function removeCar(id: string) {
    if (!confirm("Удалить авто из каталога?")) return;
    if (!supabase) {
      setCars((current) => current.filter((car) => car.id !== id));
      return;
    }
    await supabase.from("cars").delete().eq("id", id);
    await loadCars();
  }

  if (!sessionReady && isSupabaseConfigured) {
    return (
      <div className="section-shell min-h-[calc(100vh-80px)] py-12">
        <div className="mx-auto max-w-md">
          <h1 className="font-heading text-3xl font-black">Вход в админку</h1>
          <p className="mt-3 text-sm leading-6 text-muted">Используйте пользователя Supabase Auth.</p>
          <form onSubmit={signIn} className="dark-card mt-6 grid gap-4 rounded-lg p-5">
            <input className={inputClass} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={inputClass} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold transition hover:bg-[#ff1022]">
              {loading && <Loader2 className="animate-spin" size={18} />}
              Войти
            </button>
            {message && <p className="text-sm text-muted">{message}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="section-shell py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-black">Админка каталога</h1>
          <p className="mt-2 text-sm text-muted">
            {isSupabaseConfigured
              ? "Данные сохраняются в Supabase."
              : "Демо-режим без Supabase: интерфейс работает локально до перезагрузки."}
          </p>
        </div>
        {isSupabaseConfigured && (
          <button onClick={signOut} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-bold transition hover:border-accent">
            <LogOut size={17} /> Выйти
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Metric label="Всего авто" value={cars.length} />
        <Metric label="Опубликовано" value={publishedCount} />
        <Metric label="Черновики" value={cars.length - publishedCount} />
      </div>

      <form onSubmit={saveCar} className="dark-card mt-8 grid gap-4 rounded-lg p-5">
        <div className="flex items-center gap-2 font-heading text-xl font-bold">
          <Plus className="text-accent" />
          {draft.id ? "Редактировать авто" : "Добавить авто"}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Название" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
          <input className={inputClass} type="number" placeholder="Год" value={draft.year} onChange={(e) => setDraft({ ...draft, year: Number(e.target.value) })} required />
          <select className={inputClass} value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value as Country })}>
            <option>Китай</option>
            <option>Корея</option>
          </select>
          <input className={inputClass} type="number" placeholder="Цена от" value={draft.price_from} onChange={(e) => setDraft({ ...draft, price_from: Number(e.target.value) })} required />
          <input className={inputClass} placeholder="Пробег" value={draft.mileage ?? ""} onChange={(e) => setDraft({ ...draft, mileage: e.target.value })} />
          <input className={inputClass} placeholder="Двигатель" value={draft.engine ?? ""} onChange={(e) => setDraft({ ...draft, engine: e.target.value })} />
          <input className={`${inputClass} md:col-span-2`} placeholder="URL фото" value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} />
          <select className={inputClass} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as CarStatus })}>
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
          </select>
        </div>
        <textarea className={`${inputClass} min-h-28 py-3`} placeholder="Описание" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} required />
        <button disabled={loading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold transition hover:bg-[#ff1022] disabled:opacity-70 md:w-fit">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Сохранить авто
        </button>
        {message && <p className="text-sm text-muted">{message}</p>}
      </form>

      <div className="mt-8 grid gap-4">
        {cars.map((car) => (
          <article key={car.id} className="dark-card grid gap-4 rounded-lg p-4 md:grid-cols-[180px_1fr_auto] md:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-black">
              <Image src={car.image_url} alt={car.title} fill sizes="180px" className="object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-heading text-xl font-bold">{car.title}</h2>
                <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {car.status === "published" ? "Опубликовано" : "Черновик"}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                {car.country}, {car.year}, ориентир от {car.price_from.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setDraft(car)} className="rounded-md border border-line px-4 py-2 text-sm font-bold transition hover:border-accent">
                Изменить
              </button>
              <button onClick={() => removeCar(car.id)} className="rounded-md border border-line px-3 py-2 text-accent transition hover:border-accent">
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="dark-card rounded-lg p-5">
      <div className="font-heading text-3xl font-black">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

const inputClass =
  "min-h-12 rounded-md border border-line bg-black/35 px-4 text-sm text-white outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";
