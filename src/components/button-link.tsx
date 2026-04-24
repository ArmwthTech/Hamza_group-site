import Link from "next/link";
import type { ReactNode } from "react";
import { clsx } from "clsx";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const styles = {
    primary:
      "border-accent bg-accent text-white shadow-red hover:-translate-y-0.5 hover:bg-[#ff1022]",
    secondary:
      "border-line bg-white/5 text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10",
    ghost: "border-transparent text-white/80 hover:text-white"
  };

  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-12 items-center justify-center rounded-md border px-5 text-sm font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50",
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
