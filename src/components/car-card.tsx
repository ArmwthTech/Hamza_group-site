"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Gauge, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { formatPrice } from "@/lib/format";
import { telegramUrl } from "@/lib/sample-data";
import type { Car } from "@/types";

export function CarCard({ car }: { car: Car }) {
  const images = useMemo(() => {
    const imageUrls = Array.isArray(car.image_urls) ? car.image_urls.filter(Boolean) : [];
    return imageUrls.length ? imageUrls : car.image_url ? [car.image_url] : ["/images/hamza-brand-board.png"];
  }, [car.image_url, car.image_urls]);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasCarousel = images.length > 1;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <article className="dark-card group overflow-hidden rounded-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-panel">
        <Image
          src={images[activeIndex]}
          alt={car.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {car.country}
        </span>
        {hasCarousel && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition hover:border-accent hover:bg-accent"
              aria-label="Предыдущее фото"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition hover:border-accent hover:bg-accent"
              aria-label="Следующее фото"
            >
              <ArrowRight size={17} />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition ${
                    activeIndex === index ? "w-6 bg-accent" : "w-1.5 bg-white/55 hover:bg-white"
                  }`}
                  aria-label={`Показать фото ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold">{car.title}</h3>
            <p className="mt-1 text-sm text-muted">{car.year} год</p>
          </div>
          <ArrowUpRight className="text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mt-4 min-h-12 text-sm leading-6 text-muted">{car.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-[color:var(--panel-soft)] px-3 py-2">
            <Gauge size={15} className="text-accent" />
            {car.mileage ?? "по запросу"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-[color:var(--panel-soft)] px-3 py-2">
            <MapPin size={15} className="text-accent" />
            {car.engine ?? car.country}
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted">ориентир от</div>
            <div className="font-heading text-2xl font-bold">{formatPrice(car.price_from)} ₽</div>
          </div>
          <ButtonLink href={`${telegramUrl}?text=${encodeURIComponent(`Хочу такой авто: ${car.title}`)}`} className="sm:min-w-40">
            Хочу такой авто
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
