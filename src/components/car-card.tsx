import Image from "next/image";
import { ArrowUpRight, Gauge, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { formatPrice } from "@/lib/format";
import { telegramUrl } from "@/lib/sample-data";
import type { Car } from "@/types";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="dark-card group overflow-hidden rounded-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-panel">
        <Image
          src={car.image_url}
          alt={car.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-bold backdrop-blur">
          {car.country}
        </span>
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
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.03] px-3 py-2">
            <Gauge size={15} className="text-accent" />
            {car.mileage ?? "по запросу"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.03] px-3 py-2">
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
