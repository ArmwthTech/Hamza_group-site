import { CarCard } from "@/components/car-card";
import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedCars } from "@/lib/cars";

export const metadata = {
  title: "Каталог авто — HAMZA GROUP",
  description: "Ориентиры по автомобилям из Китая и Кореи для подбора под ключ."
};

export default async function CatalogPage() {
  const cars = await getPublishedCars();

  return (
    <>
      <SiteHeader />
      <main className="section-shell py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">Каталог</p>
          <h1 className="mt-3 font-heading text-4xl font-black tracking-tight md:text-5xl">
            Авто из Китая и Кореи
          </h1>
          <p className="mt-5 leading-7 text-muted">
            Это витрина популярных направлений. Стоимость указана как ориентир:
            итоговый расчёт формируется после проверки модели, страны, состояния,
            логистики и таможенных платежей.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">Не нашли модель?</p>
            <h2 className="mt-3 font-heading text-3xl font-black">Подберём альтернативы</h2>
            <p className="mt-4 leading-7 text-muted">
              Укажите желаемый автомобиль и бюджет — менеджер предложит варианты
              с похожей логикой владения и понятным расчётом.
            </p>
          </div>
          <LeadForm source="catalog" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
