import Image from "next/image";
import {
  BadgeCheck,
  Banknote,
  Car,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Gauge,
  Handshake,
  KeyRound,
  Layers,
  MapPinned,
  MessageCircle,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  Ship,
  Sparkles
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CarCard } from "@/components/car-card";
import { LeadForm } from "@/components/lead-form";
import { LeadModalButton } from "@/components/lead-modal-button";
import { cases, telegramUrl } from "@/lib/sample-data";
import type { Car as CarType } from "@/types";

const badges = ["От 1.5 млн ₽", "Проверка перед выкупом", "Доставка и растаможка", "Сопровождение под ключ"];

const trust = [
  { icon: ShieldCheck, title: "Проверяем авто до выкупа", text: "Смотрим состояние, документы и историю до оплаты." },
  { icon: ClipboardCheck, title: "Показываем этапы сделки", text: "Фиксируем ключевые шаги и держим клиента в курсе." },
  { icon: KeyRound, title: "Работаем под ключ", text: "От подбора до выдачи автомобиля в вашем городе." },
  { icon: Banknote, title: "Подбираем под бюджет", text: "Сравниваем варианты из Китая и Кореи по реальной выгоде." }
];

const services = [
  { icon: SearchCheck, title: "Подбор автомобиля" },
  { icon: Gauge, title: "Проверка состояния" },
  { icon: Banknote, title: "Выкуп и оплата" },
  { icon: Ship, title: "Логистика и доставка" },
  { icon: FileCheck2, title: "Таможенное оформление" },
  { icon: KeyRound, title: "Выдача клиенту" }
];

const process = ["Заявка", "Подбор вариантов", "Проверка авто", "Выкуп", "Доставка", "Растаможка", "Выдача"];

export const faqItems = [
  {
    q: "Сколько занимает доставка?",
    a: "Срок зависит от страны, города отправки, логистического маршрута и таможенного оформления. На консультации менеджер даст ориентир по выбранному авто."
  },
  {
    q: "Какие авто можно привезти?",
    a: "Седаны, кроссоверы, минивэны и электромобили из Китая и Кореи. Подбираем варианты под бюджет, год, пробег и желаемую комплектацию."
  },
  {
    q: "Что входит в услугу под ключ?",
    a: "Подбор, проверка, согласование, выкуп, логистика, растаможка, сопровождение документов и выдача автомобиля."
  },
  {
    q: "Можно ли уложиться в 1.5–2 млн ₽?",
    a: "Да, по части моделей это возможно. Итог зависит от курса, состояния авто, логистики, пошлин и комплектации."
  },
  {
    q: "Как проходит оплата?",
    a: "Этапы оплаты согласуются заранее. Клиент понимает, за что платит на каждом шаге, до выкупа и доставки."
  },
  {
    q: "Есть ли проверка перед выкупом?",
    a: "Да. Проверка перед выкупом — обязательный этап, чтобы снизить риск скрытых дефектов и проблем с документами."
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-78px)] overflow-hidden border-b border-line md:min-h-[760px] lg:min-h-[calc(100svh-78px)]">
      <Image
        src="/images/hamza-hero-port.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[66%_48%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,13,0.98)_0%,rgba(9,10,13,0.86)_34%,rgba(9,10,13,0.42)_62%,rgba(9,10,13,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,13,0.05)_0%,rgba(9,10,13,0.18)_55%,rgba(9,10,13,0.84)_100%)]" />
      <div className="section-shell relative z-10 flex min-h-[calc(100svh-78px)] flex-col justify-center py-14 sm:py-16 md:min-h-[760px] lg:min-h-[calc(100svh-78px)]">
        <div className="reveal max-w-[340px] sm:max-w-[760px]">
          <div className="mb-5 flex items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            <span>Автомобили из Китая и Кореи под ключ</span>
            <span className="h-px w-16 bg-accent" />
          </div>
          <h1 className="font-heading text-[34px] font-black uppercase leading-[1.08] tracking-normal min-[390px]:text-[36px] sm:text-6xl lg:text-[70px]">
            <span className="block sm:hidden">Премиальные</span>
            <span className="block sm:hidden">авто</span>
            <span className="hidden sm:block">Премиальные авто</span>
            <span className="block sm:hidden">из Китая</span>
            <span className="block sm:hidden">и Кореи</span>
            <span className="hidden sm:block">из Китая и Кореи</span>
            <span className="block">под ключ</span>
          </h1>
          <p className="mt-6 max-w-[340px] text-sm font-medium leading-7 text-white/74 sm:max-w-xl sm:text-lg">
            Полный цикл импорта с гарантией прозрачности и фиксированной стоимости.
            Доставим ваш автомобиль от подбора до выдачи ключей.
          </p>
          <div className="mt-8 flex max-w-[340px] flex-col gap-3 sm:max-w-xl sm:flex-row">
            <LeadModalButton className="w-full gap-2 px-7 sm:w-auto" source="hero" icon="none">
              Рассчитать стоимость
            </LeadModalButton>
            <ButtonLink href="#cases" variant="secondary" className="w-full gap-3 sm:w-auto">
              <PlayCircle size={19} />
              Смотреть видео
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferenceDashboard({ cars }: { cars: CarType[] }) {
  const compactCars = cars.slice(0, 3);

  return (
    <section className="section-shell -mt-px grid gap-3 py-4 lg:grid-cols-[250px_1fr_300px_320px]">
      <div id="services" className="dark-card rounded-md p-5">
        <PanelTitle title="Наши услуги" />
        <div className="mt-5 grid gap-4">
          {[
            ["Подбор автомобиля", CarFront],
            ["Проверка и диагностика", SearchCheck],
            ["Выкуп и экспорт", Banknote],
            ["Доставка и таможенное оформление", Ship],
            ["Сертификация и ЭПТС", FileCheck2],
            ["Постановка на учёт", ShieldCheck]
          ].map(([title, Icon]) => (
            <div key={String(title)} className="flex items-center gap-3 text-sm text-white/72">
              <Icon size={18} className="text-white/60" strokeWidth={1.6} />
              <span>{String(title)}</span>
            </div>
          ))}
        </div>
        <a href="#services" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase text-white/72 transition hover:text-white">
          Смотреть все услуги <span className="text-accent">›</span>
        </a>
      </div>

      <div id="process" className="dark-card rounded-md p-5">
        <PanelTitle title="Как мы работаем" />
        <div className="mt-7 grid gap-5 md:grid-cols-6">
          {process.slice(0, 6).map((step, index) => (
            <div key={step} className="relative">
              <div className="mb-3 text-sm font-bold text-white/80">{String(index + 1).padStart(2, "0")}</div>
              <div className="relative mb-5 h-px bg-line">
                <span className="absolute -top-[5px] left-0 h-3 w-3 rounded-full border-2 border-accent bg-ink" />
              </div>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-line text-white/80">
                {[MessageCircle, SearchCheck, Banknote, Ship, KeyRound, ShieldCheck][index] &&
                  (() => {
                    const Icon = [MessageCircle, SearchCheck, Banknote, Ship, KeyRound, ShieldCheck][index];
                    return <Icon size={19} strokeWidth={1.6} />;
                  })()}
              </div>
              <div className="text-xs font-black leading-4 text-white">{step}</div>
              <p className="mt-2 text-[10px] leading-4 text-muted">
                {[
                  "Определяем задачи и бюджет",
                  "Ищем лучшие варианты",
                  "Фиксируем стоимость",
                  "Доставляем и растамаживаем",
                  "Подготовка и выдача",
                  "Помогаем после покупки"
                ][index]}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 rounded-md border border-line p-4 sm:grid-cols-4">
          {[
            ["1200+", "автомобилей доставлено", CarFront],
            ["25–45 дней", "средний срок доставки", Clock3],
            ["100%", "довольных клиентов", ShieldCheck],
            ["5+ лет", "опыта в авто импорте", Gauge]
          ].map(([value, label, Icon]) => (
            <div key={String(value)} className="flex items-center gap-3 border-line sm:border-r last:border-r-0">
              <Icon size={24} className="text-white/70" strokeWidth={1.5} />
              <div>
                <div className="font-heading text-lg font-black">{String(value)}</div>
                <div className="text-[10px] leading-3 text-muted">{String(label)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dark-card rounded-md p-5">
        <div className="flex items-center justify-between gap-4">
          <PanelTitle title="Популярные авто" />
          <a href="/catalog" className="text-[10px] font-bold uppercase text-muted transition hover:text-white">
            Смотреть все
          </a>
        </div>
        <div className="mt-4 grid gap-4">
          {compactCars.map((car) => (
            <a key={car.id} href="/catalog" className="grid grid-cols-[110px_1fr] gap-3 rounded-md p-1 transition hover:bg-white/[0.03]">
              <div className="relative h-[70px] overflow-hidden rounded bg-black">
                <Image src={car.image_url} alt={car.title} fill sizes="110px" className="object-cover" />
              </div>
              <div className="min-w-0 pt-1">
                <div className="truncate text-xs font-bold">{car.title}</div>
                <div className="mt-2 h-2 rounded-full bg-white/20" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-white/14" />
                <div className="mt-3 h-2 w-4/5 rounded-full bg-accent" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div id="calculator" className="dark-card rounded-md p-5">
        <PanelTitle title="Калькулятор стоимости" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {["Марка", "Модель", "Год выпуска", "Тип топлива", "Бюджет, ₽", "Телефон"].map((label) => (
            <input
              key={label}
              className="h-10 rounded-sm border border-line bg-black/25 px-3 text-xs text-white outline-none transition placeholder:text-muted focus:border-accent"
              placeholder={label}
            />
          ))}
        </div>
        <div className="mt-5 h-px bg-line">
          <div className="relative h-px w-4/5 bg-accent">
            <span className="absolute -top-1.5 left-1/3 h-3 w-3 rounded-full bg-white" />
            <span className="absolute -top-1.5 right-0 h-3 w-3 rounded-full bg-white" />
          </div>
        </div>
        <LeadModalButton className="mt-7 w-full" source="dashboard-calculator" icon="none">
          Рассчитать стоимость
        </LeadModalButton>
      </div>
    </section>
  );
}

export function TrustBlock() {
  return (
    <section className="border-b border-line bg-[#0E0F13]" data-reveal>
      <div className="section-shell grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
        {[
          ["Прозрачные условия", "Фиксируем стоимость в договоре", ShieldCheck],
          ["Доставка 25–45 дней", "Собственные логистические маршруты", Layers],
          ["Юридическая чистота", "Проверка по 100+ параметрам", CheckCircle2],
          ["Сопровождение под ключ", "От подбора до постановки на учёт", Handshake]
        ].map(([title, text, Icon]) => (
          <div key={String(title)} className="flex min-h-32 gap-4 px-5 py-7 transition hover:bg-white/[0.025]">
            <Icon className="mt-1 shrink-0 text-accent" size={30} strokeWidth={1.7} />
            <div>
              <h3 className="font-heading text-base font-black">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{String(text)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section-shell py-16 md:py-20 xl:py-24" data-reveal>
      <SectionHeading
        eyebrow="Услуги"
        title="Закрываем весь путь автомобиля"
        text="Берём на себя подбор, проверку, сделку, логистику и документы, чтобы клиент получил понятный результат без хаоса."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title }, index) => (
          <div
            key={title}
            className="dark-card flex items-center gap-4 rounded-lg p-5 transition hover:-translate-y-1 hover:border-accent/60 sm:p-6"
            data-reveal
            data-reveal-delay={String(index % 3)}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-md border border-accent/30 bg-accent/10">
              <Icon size={22} className="text-accent" />
            </span>
            <h3 className="font-heading text-lg font-bold">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="border-y border-line bg-[#0E0F13] py-16 md:py-20 xl:py-24" data-reveal>
      <div className="section-shell">
        <SectionHeading
          eyebrow="Этапы"
          title="Сделка видна по шагам"
          text="Клиент понимает, где находится автомобиль, что уже сделано и какой этап следующий."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {process.map((step, index) => (
            <div
              key={step}
              className="dark-card relative rounded-lg p-5 transition hover:-translate-y-1 hover:border-accent/60"
              data-reveal
              data-reveal-delay={String(index % 4)}
            >
              <div className="font-heading text-2xl font-black text-accent">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-md border border-line text-white/80">
                {[MessageCircle, SearchCheck, Gauge, Banknote, Ship, FileCheck2, KeyRound][index] &&
                  (() => {
                    const Icon = [MessageCircle, SearchCheck, Gauge, Banknote, Ship, FileCheck2, KeyRound][index];
                    return <Icon size={21} strokeWidth={1.7} />;
                  })()}
              </div>
              <div className="mt-5 text-sm font-black leading-5">{step}</div>
              <p className="mt-3 text-xs leading-5 text-muted">
                {[
                  "Собираем задачу, бюджет и желаемую модель.",
                  "Показываем подходящие варианты и альтернативы.",
                  "Проверяем состояние, историю и документы.",
                  "Фиксируем условия и проводим оплату.",
                  "Везём авто по согласованному маршруту.",
                  "Оформляем таможню, ЭПТС и документы.",
                  "Передаём автомобиль клиенту в готовом виде."
                ][index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PopularCars({ cars }: { cars: CarType[] }) {
  return (
    <section id="catalog" className="section-shell py-16 md:py-20 xl:py-24" data-reveal>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Каталог"
          title="Популярные варианты"
          text="Цены указаны как ориентир. Финальный расчёт зависит от состояния, курса, логистики и таможенных платежей."
        />
        <ButtonLink href="/catalog" variant="secondary">
          Весь каталог
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}

export function CalculatorSection() {
  return (
    <section id="calculator" className="section-shell grid gap-8 py-16 md:gap-10 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center xl:py-24" data-reveal>
      <div>
        <SectionHeading
          eyebrow="Расчёт"
          title="Получите подборку под ваш бюджет"
          text="Оставьте контакты и желаемую модель. Менеджер уточнит вводные, сравнит варианты из Китая и Кореи и даст ориентир по стоимости."
        />
        <div className="mt-7 grid gap-3 text-sm text-muted">
          <div className="flex items-center gap-3">
            <BadgeCheck className="text-accent" size={20} /> Без финальной цены до проверки вводных.
          </div>
          <div className="flex items-center gap-3">
            <MapPinned className="text-accent" size={20} /> Учитываем доставку, растаможку и город выдачи.
          </div>
          <div className="flex items-center gap-3">
            <Car className="text-accent" size={20} /> Подберём альтернативы, если модель не проходит по бюджету.
          </div>
        </div>
      </div>
      <LeadForm source="calculator" />
    </section>
  );
}

export function CasesSection() {
  return (
    <section id="cases" className="section-shell py-16 md:py-20 xl:py-24" data-reveal>
      <SectionHeading
        eyebrow="Кейсы"
        title="Примеры выполненных сделок"
        text="Короткие сценарии, которые показывают типовой путь автомобиля от подбора до выдачи."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cases.map((item, index) => (
          <article
            key={item.title}
            className="dark-card rounded-lg p-5 transition hover:-translate-y-1 hover:border-accent/60 sm:p-6"
            data-reveal
            data-reveal-delay={String(index)}
          >
            <div className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              {item.status}
            </div>
            <h3 className="font-heading text-xl font-bold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.country}</p>
            <p className="mt-5 text-sm leading-6 text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="section-shell py-16 md:py-20 xl:py-24" data-reveal>
      <SectionHeading eyebrow="FAQ" title="Частые вопросы" text="Основные ответы перед первым расчётом." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqItems.map((item) => (
          <details key={item.q} className="dark-card group rounded-lg p-5 sm:p-6">
            <summary className="cursor-pointer list-none font-heading text-lg font-bold marker:hidden">
              {item.q}
            </summary>
            <p className="mt-4 text-sm leading-6 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section-shell py-16 md:py-20 xl:py-24" data-reveal>
      <div className="dark-card overflow-hidden rounded-lg p-6 sm:p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">Подбор под ключ</p>
            <h2 className="mt-3 font-heading text-3xl font-black md:text-4xl">Подберём авто под ваш бюджет</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Оставьте заявку — менеджер свяжется и предложит варианты из Китая и Кореи.
            </p>
          </div>
          <ButtonLink href={telegramUrl} className="gap-2">
            <MessageCircle size={18} />
            Написать в Telegram
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-[28px] font-black leading-tight tracking-normal md:text-4xl">{title}</h2>
      <p className="mt-4 leading-7 text-muted">{text}</p>
    </div>
  );
}

function PanelTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-black uppercase tracking-wide text-white">{title}</h2>
      <div className="mt-2 h-0.5 w-7 bg-accent" />
    </div>
  );
}
