import { PlayCircle, Send } from "lucide-react";
import { Logo } from "@/components/logo";
import { maxUrl, telegramUrl, vkUrl, youtubeUrl } from "@/lib/sample-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-black/30 py-10">
      <div className="section-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <Logo />
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            HAMZA GROUP — Auto Import. Авто из Китая и Кореи под ключ: подбор,
            выкуп, доставка, растаможка и выдача клиенту.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <a className="rounded-md border border-line px-4 py-3 transition hover:border-accent" href={telegramUrl}>
            Telegram HAMZA
          </a>
          <a className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 transition hover:border-accent" href={youtubeUrl}>
            <PlayCircle size={16} /> YouTube
          </a>
          <a className="rounded-md border border-line px-4 py-3 transition hover:border-accent" href={maxUrl}>
            MAX
          </a>
          <a className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-3 transition hover:border-accent" href={vkUrl}>
            <Send size={16} /> ВК
          </a>
        </div>
        <div className="text-xs text-muted md:col-span-2">
          © {new Date().getFullYear()} HAMZA GROUP. Политика конфиденциальности.
        </div>
      </div>
    </footer>
  );
}
