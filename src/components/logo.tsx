import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3.5" aria-label="HAMZA GROUP Auto Import">
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-black shadow-[0_0_28px_rgba(230,0,18,0.2)]">
        <Image
          src="/images/hamza-mark.png"
          alt=""
          fill
          sizes="56px"
          className="object-cover"
          priority
        />
      </span>
      {!compact && (
        <span className="hidden leading-none sm:block">
          <span className="block font-heading text-xl font-black tracking-[0.04em] text-white">
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
