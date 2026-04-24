import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="HAMZA GROUP Auto Import">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/15 bg-black shadow-[0_0_24px_rgba(230,0,18,0.18)]">
        <svg viewBox="0 0 44 44" aria-hidden="true" className="h-8 w-8">
          <path d="M4 6h8v13h8V6h8v32h-8V25h-8v13H4V6Z" fill="#fff" />
          <path d="M29 6h11L25 22l15 16H28L17 26l6-7L29 6Z" fill="#E60012" />
          <path d="M31 24h9v14h-9V24Z" fill="#E60012" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-heading text-lg font-black tracking-[0.04em] text-white">
            HAMZA GROUP
          </span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
            Auto Import
          </span>
        </span>
      )}
    </Link>
  );
}
