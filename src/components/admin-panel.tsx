"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { seedCars } from "@/lib/sample-data";
import type { Car, CarStatus, Country } from "@/types";

type DraftCar = Omit<Car, "id"> & { id?: string; image_urls: string[] };
type CarsResponse = { ok: boolean; cars?: Car[]; mode?: "demo" | "supabase"; message?: string };
type UploadResponse = { ok: boolean; urls?: string[]; message?: string };

const adminStorageKey = "hamza-admin-auth";

const emptyCar: DraftCar = {
  title: "",
  country: "Китай",
  year: new Date().getFullYear(),
  price_from: 1500000,
  image_url: "",
  image_urls: [],
  description: "",
  mileage: "",
  engine: "",
  status: "draft"
};

export function AdminPanel({ passwordConfigured }: { passwordConfigured: boolean }) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [cars, setCars] = useState<Car[]>(seedCars);
  const [draft, setDraft] = useState<DraftCar>(emptyCar);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const publishedCount = useMemo(() => cars.filter((car) => car.status === "published").length, [cars]);
  const storageReady = isSupabaseConfigured;

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (!passwordConfigured) {
        setAuthChecked(true);
        return;
      }

      const localFlag = localStorage.getItem(adminStorageKey) === "true";
      const response = await fetch("/api/admin/session");
      const session = (await response.json()) as { authenticated: boolean };

      if (!mounted) return;
      setAuthenticated(Boolean(localFlag && session.authenticated));
      setAuthChecked(true);
    }

    void checkSession();
    return () => {
      mounted = false;
    };
  }, [passwordConfigured]);

  useEffect(() => {
    if (authenticated) void loadCars();
  }, [authenticated]);

  async function loadCars() {
    if (!isSupabaseConfigured) {
      setCars(seedCars);
      return;
    }

    const response = await fetch("/api/admin/cars");
    const result = (await response.json()) as CarsResponse;
    if (result.ok && result.cars) {
      setCars(result.cars);
    } else {
      setMessage(result.message || "Не удалось загрузить каталог.");
    }
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password })
    });
    const result = (await response.json()) as { ok: boolean; message?: string };

    setLoading(false);
    if (!response.ok || !result.ok) {
      setMessage(result.message || "Не удалось войти.");
      return;
    }

    localStorage.setItem(adminStorageKey, "true");
    setAuthenticated(true);
    setPassword("");
  }

  async function signOut() {
    localStorage.removeItem(adminStorageKey);
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setDraft(emptyCar);
  }

  function makePayload(): DraftCar {
    const imageUrls = uniqueUrls(draft.image_urls);
    const imageUrl = imageUrls[0] || draft.image_url || "/images/hamza-brand-board.png";

    return {
      ...draft,
      image_url: imageUrl,
      image_urls: imageUrls
    };
  }

  async function saveCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = makePayload();

    if (!isSupabaseConfigured) {
      const nextCar = {
        ...payload,
        id: draft.id ?? crypto.randomUUID(),
        created_at: new Date().toISOString()
      } as Car;
      setCars((current) => [nextCar, ...current.filter((car) => car.id !== nextCar.id)]);
      setDraft(emptyCar);
      setLoading(false);
      setMessage("Демо-режим: авто добавлено только в локальный список. Подключите Supabase для сохранения.");
      return;
    }

    const response = await fetch("/api/admin/cars", {
      method: draft.id ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !result.ok) {
      setMessage(result.message || "Не удалось сохранить авто.");
    } else {
      setMessage("Авто сохранено.");
      setDraft(emptyCar);
      await loadCars();
    }
    setLoading(false);
  }

  async function removeCar(id: string) {
    if (!confirm("Удалить авто из каталога?")) return;

    if (!isSupabaseConfigured) {
      setCars((current) => current.filter((car) => car.id !== id));
      return;
    }

    const response = await fetch(`/api/admin/cars?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Не удалось удалить авто.");
      return;
    }
    await loadCars();
  }

  async function uploadPhotos(files: FileList | null) {
    if (!files?.length) return;

    if (!storageReady) {
      setMessage("Загрузка файлов недоступна: настройте Supabase Storage. URL можно добавить вручную.");
      return;
    }

    setUploading(true);
    setMessage("");
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const result = (await response.json()) as UploadResponse;
    setUploading(false);

    if (!response.ok || !result.ok || !result.urls?.length) {
      setMessage(result.message || "Не удалось загрузить фото.");
      return;
    }

    setDraft((current) => ({
      ...current,
      image_urls: uniqueUrls([...current.image_urls, ...(result.urls || [])])
    }));
    setMessage(`Загружено фото: ${result.urls.length}.`);
  }

  function editCar(car: Car) {
    setDraft({
      ...car,
      image_urls: getCarImages(car)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!authChecked) {
    return (
      <main className="section-shell min-h-[calc(100vh-80px)] py-12">
        <div className="dark-card mx-auto max-w-md rounded-lg p-6 text-center">
          <Loader2 className="mx-auto animate-spin text-accent" />
          <p className="mt-3 text-sm text-muted">Проверяем доступ...</p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="section-shell min-h-[calc(100vh-80px)] py-12">
        <div className="mx-auto max-w-md">
          <h1 className="font-heading text-3xl font-black">Вход в админку</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            {passwordConfigured
              ? "Введите пароль администратора HAMZA GROUP."
              : "ADMIN_PASSWORD не настроен. Добавьте пароль в .env.local или переменные окружения хостинга."}
          </p>
          <form onSubmit={signIn} className="dark-card mt-6 grid gap-4 rounded-lg p-5">
            <input
              className={inputClass}
              type="password"
              placeholder="Пароль"
              value={password}
              disabled={!passwordConfigured}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loading || !passwordConfigured}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-white transition hover:bg-[#ff1022] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Войти
            </button>
            {message && <p className="text-sm text-muted">{message}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="section-shell py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-black">Админка каталога</h1>
          <p className="mt-2 text-sm text-muted">
            {isSupabaseConfigured
              ? "Данные сохраняются через защищённый admin API."
              : "Демо-режим без Supabase: интерфейс работает локально до перезагрузки."}
          </p>
        </div>
        <button onClick={signOut} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-bold transition hover:border-accent">
          <LogOut size={17} /> Выйти
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Metric label="Всего авто" value={cars.length} />
        <Metric label="Опубликовано" value={publishedCount} />
        <Metric label="Черновики" value={cars.length - publishedCount} />
      </div>

      <form onSubmit={saveCar} className="dark-card mt-8 grid gap-5 rounded-lg p-5">
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
          <select className={inputClass} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as CarStatus })}>
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
          </select>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">URL фото, по одному на строку</span>
            <textarea
              className={`${inputClass} min-h-36 py-3`}
              placeholder="https://example.com/car-1.jpg"
              value={draft.image_urls.join("\n")}
              onChange={(e) => setDraft({ ...draft, image_urls: parseUrls(e.target.value) })}
            />
          </label>
          <div className="rounded-lg border border-line p-4">
            <div className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide">
              <ImagePlus size={18} className="text-accent" />
              Загрузка фото
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              {storageReady
                ? "Можно выбрать несколько изображений. Они загрузятся в Supabase Storage."
                : "Загрузка файлов недоступна без Supabase Storage. Добавьте URL вручную."}
            </p>
            <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-line px-4 text-sm font-bold transition hover:border-accent">
              {uploading ? <Loader2 className="animate-spin" size={17} /> : <Upload size={17} />}
              Загрузить
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                disabled={!storageReady || uploading}
                onChange={(event) => void uploadPhotos(event.target.files)}
              />
            </label>
          </div>
        </div>

        {draft.image_urls.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {draft.image_urls.map((url, index) => (
              <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg border border-line bg-black/20">
                <div className="relative aspect-[16/10]">
                  <Image src={url} alt={`Фото ${index + 1}`} fill sizes="260px" className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      image_urls: current.image_urls.filter((item) => item !== url)
                    }))
                  }
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md bg-black/70 text-white transition hover:bg-accent"
                  aria-label="Удалить фото"
                >
                  <Trash2 size={15} />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-accent px-2 py-1 text-[10px] font-bold text-white">
                    Главное
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <textarea className={`${inputClass} min-h-28 py-3`} placeholder="Описание" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} required />
        <button disabled={loading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-white transition hover:bg-[#ff1022] disabled:opacity-70 md:w-fit">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Сохранить авто
        </button>
        {message && <p className="text-sm text-muted">{message}</p>}
      </form>

      <div className="mt-8 grid gap-4">
        {cars.map((car) => {
          const preview = getCarImages(car)[0] || "/images/hamza-brand-board.png";
          return (
            <article key={car.id} className="dark-card grid gap-4 rounded-lg p-4 md:grid-cols-[180px_1fr_auto] md:items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-black/20">
                <Image src={preview} alt={car.title} fill sizes="180px" className="object-cover" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-xl font-bold">{car.title}</h2>
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {car.status === "published" ? "Опубликовано" : "Черновик"}
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {getCarImages(car).length} фото
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {car.country}, {car.year}, ориентир от {car.price_from.toLocaleString("ru-RU")} ₽
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => editCar(car)} className="rounded-md border border-line px-4 py-2 text-sm font-bold transition hover:border-accent">
                  Изменить
                </button>
                <button type="button" onClick={() => removeCar(car.id)} className="rounded-md border border-line px-3 py-2 text-accent transition hover:border-accent" aria-label="Удалить авто">
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          );
        })}
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

function parseUrls(value: string) {
  return uniqueUrls(value.split(/\r?\n|,/).map((url) => url.trim()));
}

function uniqueUrls(urls: string[]) {
  return Array.from(new Set(urls.filter(Boolean)));
}

function getCarImages(car: Pick<Car, "image_url" | "image_urls">) {
  const urls = Array.isArray(car.image_urls) ? car.image_urls.filter(Boolean) : [];
  return urls.length ? urls : car.image_url ? [car.image_url] : [];
}

const inputClass =
  "min-h-12 rounded-md border border-line bg-[color:var(--field-bg)] px-4 text-sm text-[color:var(--text)] outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";
